package com.centsibility.backend.controller;

import com.centsibility.backend.dto.UserDTO;
import com.centsibility.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * AuthController - REST API endpoints for authentication
 * 
 * TODO: 
 * - Implement registration endpoint with validation
 * - Implement login endpoint with JWT token generation
 * - Implement logout (token blacklist or client-side removal)
 * - Implement password reset flow
 * - Implement email verification
 * - Implement Google OAuth login
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    // TODO: Inject JwtUtil or TokenProvider
    // TODO: Inject AuthenticationManager
    // TODO: Inject PasswordEncoder
    
    /**
     * Register a new user
     * POST /api/auth/register
     * 
     * TODO:
     * - Validate input (email format, password strength, etc.)
     * - Check if email already exists
     * - Hash password with BCrypt
     * - Assign default role (USER)
     * - Send verification email
     * - Return 201 CREATED
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO userDTO) {
        // TODO: Implement registration logic
        // - Validate input
        // - Check email doesn't exist
        // - Create user with hashed password
        // - Send verification email
        // - Return success response
        
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
                .body("Registration endpoint not implemented yet");
    }
    
    /**
     * Login user and return JWT token
     * POST /api/auth/login
     * 
     * TODO:
     * - Authenticate user with username/password
     * - Generate JWT token
     * - Return token in response
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // TODO: Implement login logic
        // - Authenticate credentials
        // - Generate JWT token
        // - Return token with user info
        
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
                .body("Login endpoint not implemented yet");
    }
    
    /**
     * Logout user
     * POST /api/auth/logout
     * 
     * TODO:
     * - Invalidate token (add to blacklist if using)
     * - Or rely on client to remove token
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // TODO: Implement logout logic
        return ResponseEntity.ok("Logout endpoint not implemented yet");
    }
    
    /**
     * Verify email with token
     * GET /api/auth/verify?token=xxx
     * 
     * TODO: Implement email verification
     */
    @GetMapping("/verify")
    public ResponseEntity<?> verifyEmail(@RequestParam String token) {
        // TODO: Implement email verification
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
                .body("Email verification not implemented yet");
    }
    
    /**
     * Google OAuth login
     * POST /api/auth/google
     * 
     * TODO: Implement Google OAuth flow
     * - Verify Google token
     * - Create or retrieve user
     * - Generate JWT token
     */
    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody GoogleLoginRequest googleRequest) {
        // TODO: Implement Google OAuth login
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
                .body("Google OAuth not implemented yet");
    }
    
    // TODO: Create request/response DTOs
    static class LoginRequest {
        private String email;
        private String password;
        
        // Getters and setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
    
    static class GoogleLoginRequest {
        private String token;
        
        // Getters and setters
        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }
    }
}
