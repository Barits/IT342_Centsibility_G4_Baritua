package com.centsibility.service;

import com.centsibility.dto.request.LoginRequest;
import com.centsibility.dto.request.RegisterRequest;
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

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
        
        // Create new user
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        
        // Hash password with BCrypt
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        
        // Assign default role (USER)
        Role userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Default role not found"));
        Set<Role> roles = new HashSet<>();
        roles.add(userRole);
        user.setRoles(roles);
        
        // For now, set enabled to true (skip email verification for Phase 1)
        user.setEnabled(true);
        
        // Save user to database
        User savedUser = userRepository.save(user);
        
        // Build response
        AuthResponse response = new AuthResponse();
        response.setSuccess(true);
        response.setMessage("User registered successfully");
        
        AuthResponse.UserData userData = new AuthResponse.UserData();
        userData.setId(savedUser.getId());
        userData.setFirstName(savedUser.getFirstName());
        userData.setLastName(savedUser.getLastName());
        userData.setEmail(savedUser.getEmail());
        userData.setRole("USER");
        
        response.setData(userData);
        response.setTimestamp(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));
        
        return response;
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
        
        // Build response
        AuthResponse response = new AuthResponse();
        response.setSuccess(true);
        response.setMessage("Login successful");
        response.setToken(jwt); // Include JWT token
        
        AuthResponse.UserData userData = new AuthResponse.UserData();
        userData.setId(user.getId());
        userData.setFirstName(user.getFirstName());
        userData.setLastName(user.getLastName());
        userData.setEmail(user.getEmail());
        userData.setRole(user.getRoles().iterator().next().getName());
        
        response.setData(userData);
        response.setTimestamp(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));
        
        return response;
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

    private AuthResponse.UserData buildUserData(User user) {
        AuthResponse.UserData userData = new AuthResponse.UserData();
        userData.setId(user.getId());
        userData.setFirstName(user.getFirstName());
        userData.setLastName(user.getLastName());
        userData.setEmail(user.getEmail());
        userData.setRole(user.getRoles().isEmpty() ? "USER" : user.getRoles().iterator().next().getName());
        return userData;
    }

    private AuthResponse buildAuthResponse(User user, String message) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );

        String jwt = jwtUtils.generateJwtToken(authentication);
        AuthResponse response = new AuthResponse();
        response.setSuccess(true);
        response.setMessage(message);
        response.setToken(jwt);
        response.setData(buildUserData(user));
        response.setTimestamp(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));
        return response;
    }

    private User createGoogleUser(GoogleTokenPayload tokenPayload) {
        User user = new User();
        user.setFirstName(tokenPayload.firstName());
        user.setLastName(tokenPayload.lastName());
        user.setEmail(tokenPayload.email());
        user.setPassword(passwordEncoder.encode("google-auth-" + tokenPayload.email().toLowerCase(Locale.ENGLISH)));
        user.setEnabled(true);

        Role userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Default role not found"));
        Set<Role> roles = new HashSet<>();
        roles.add(userRole);
        user.setRoles(roles);

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
