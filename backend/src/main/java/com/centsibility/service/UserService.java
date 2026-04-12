package com.centsibility.service;

import com.centsibility.dto.request.LoginRequest;
import com.centsibility.dto.request.RegisterRequest;
import com.centsibility.dto.request.UpdateMonthlyBudgetRequest;
import com.centsibility.dto.response.AuthResponse;
import com.centsibility.exception.DuplicateEmailException;
import com.centsibility.model.Role;
import com.centsibility.model.User;
import com.centsibility.repository.RoleRepository;
import com.centsibility.repository.UserRepository;
import com.centsibility.security.JwtUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.Optional;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserDetailsService userDetailsService;
    private final RestTemplate restTemplate;
    private final String googleClientId;
    
    public UserService(UserRepository userRepository, RoleRepository roleRepository,
                      PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager,
                      JwtUtils jwtUtils, UserDetailsService userDetailsService,
                      @Value("${google.oauth.client-id:${GOOGLE_CLIENT_ID:}}") String googleClientId) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.userDetailsService = userDetailsService;
        this.restTemplate = new RestTemplate();
        this.googleClientId = googleClientId;
    }
    
    @Transactional
    public AuthResponse registerUser(RegisterRequest request) {
        // Check for duplicate email
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateEmailException("Email already registered: " + request.getEmail());
        }
        
        // Assign default role (USER)
        Role userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Default role not found"));
        Set<Role> roles = new HashSet<>();
        roles.add(userRole);
        
        // Create new user using builder
        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .monthlyBudget(BigDecimal.ZERO)
                .roles(roles)
                .enabled(true)
                .build();
        
        // Save user to database
        User savedUser = userRepository.save(user);

        return AuthResponse.builder()
                .success(true)
                .message("User registered successfully")
                .data(AuthResponse.UserData.builder()
                        .id(savedUser.getId())
                        .firstName(savedUser.getFirstName())
                        .lastName(savedUser.getLastName())
                        .email(savedUser.getEmail())
                        .role("USER")
                        .build())
                .build();
    }
    
    public AuthResponse authenticateUser(LoginRequest request) {
        // Authenticate using Spring Security
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        // Generate JWT token
        String jwt = jwtUtils.generateJwtToken(authentication);
        
        // Get user details
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return AuthResponse.builder()
                .success(true)
                .message("Login successful")
                .token(jwt)
                .data(buildUserData(user))
                .build();
    }

    @Transactional
    public AuthResponse authenticateGoogleUser(String googleIdToken, boolean createIfMissing, boolean requireNewRegistration) {
        GoogleTokenPayload tokenPayload = verifyGoogleToken(googleIdToken);

        Optional<User> existingUser = userRepository.findByEmail(tokenPayload.email());
        if (existingUser.isPresent() && requireNewRegistration) {
            throw new DuplicateEmailException("Email already registered: " + tokenPayload.email());
        }

        User user = existingUser.orElseGet(() -> createGoogleUser(tokenPayload));

        if (existingUser.isEmpty() && !createIfMissing) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Google account is not registered");
        }

        return buildAuthResponse(user, existingUser.isPresent()
                ? "Google login successful"
                : "Google account created successfully");
    }

    @Transactional
    public AuthResponse registerGoogleUser(String googleIdToken) {
        return authenticateGoogleUser(googleIdToken, true, true);
    }

    @Transactional
    public AuthResponse loginWithGoogle(String googleIdToken) {
        return authenticateGoogleUser(googleIdToken, true, false);
    }

    @Transactional(readOnly = true)
    public AuthResponse.UserData getCurrentUserData(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return buildUserData(user);
    }

    @Transactional
    public AuthResponse.UserData updateMonthlyBudget(String email, UpdateMonthlyBudgetRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setMonthlyBudget(request.getMonthlyBudget());
        userRepository.save(user);

        return buildUserData(user);
    }

    private AuthResponse.UserData buildUserData(User user) {
        return AuthResponse.UserData.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRoles().isEmpty() ? "USER" : user.getRoles().iterator().next().getName())
                .monthlyBudget(user.getMonthlyBudget())
                .build();
    }

    private AuthResponse buildAuthResponse(User user, String message) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );

        String jwt = jwtUtils.generateJwtToken(authentication);
        return AuthResponse.builder()
                .success(true)
                .message(message)
                .token(jwt)
                .data(buildUserData(user))
                .build();
    }

    private User createGoogleUser(GoogleTokenPayload tokenPayload) {
        Role userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Default role not found"));
        Set<Role> roles = new HashSet<>();
        roles.add(userRole);

        User user = User.builder()
                .firstName(tokenPayload.firstName())
                .lastName(tokenPayload.lastName())
                .email(tokenPayload.email())
                .password(passwordEncoder.encode("google-auth-" + tokenPayload.email().toLowerCase(Locale.ENGLISH)))
                .monthlyBudget(BigDecimal.ZERO)
                .enabled(true)
                .roles(roles)
                .build();

        return userRepository.save(user);
    }

    private GoogleTokenPayload verifyGoogleToken(String googleIdToken) {
        if (googleClientId == null || googleClientId.isBlank()) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Google client ID is not configured");
        }

        try {
            String tokenInfoUrl = "https://oauth2.googleapis.com/tokeninfo?id_token={token}";
            ResponseEntity<Map> response = restTemplate.getForEntity(tokenInfoUrl, Map.class, googleIdToken);
            Map<String, Object> body = response.getBody();

            if (body == null) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid Google token");
            }

            String audience = String.valueOf(body.get("aud"));
            String email = String.valueOf(body.get("email"));
            String givenName = String.valueOf(body.getOrDefault("given_name", "Google"));
            String familyName = String.valueOf(body.getOrDefault("family_name", "User"));
            String emailVerified = String.valueOf(body.getOrDefault("email_verified", "false"));

            if (!googleClientId.equals(audience)) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Google token audience mismatch");
            }

            if (!"true".equalsIgnoreCase(emailVerified)) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Google email is not verified");
            }

            if (email == null || email.isBlank()) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Google account email is missing");
            }

            return new GoogleTokenPayload(email.trim(), normalizeGoogleName(givenName), normalizeGoogleName(familyName));
        } catch (RestClientException ex) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unable to verify Google token");
        }
    }

    private String normalizeGoogleName(String value) {
        if (value == null) {
            return "";
        }

        String trimmed = value.trim();
        return trimmed.isBlank() ? "" : trimmed;
    }

    private record GoogleTokenPayload(String email, String firstName, String lastName) { }
}
