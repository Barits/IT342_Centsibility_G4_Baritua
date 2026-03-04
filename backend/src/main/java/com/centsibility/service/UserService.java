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
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    
    public UserService(UserRepository userRepository, RoleRepository roleRepository,
                      PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager,
                      JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
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
}
