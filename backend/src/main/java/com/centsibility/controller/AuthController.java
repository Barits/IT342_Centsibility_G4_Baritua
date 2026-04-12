package com.centsibility.controller;

import com.centsibility.dto.request.LoginRequest;
import com.centsibility.dto.request.RegisterRequest;
import com.centsibility.dto.request.UpdateMonthlyBudgetRequest;
import com.centsibility.dto.response.AuthResponse;
import com.centsibility.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    private final UserService userService;
    
    public AuthController(UserService userService) {
        this.userService = userService;
    }
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = userService.registerUser(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = userService.authenticateUser(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/google/login")
    public ResponseEntity<AuthResponse> googleLogin(@RequestBody GoogleAuthRequest request) {
        AuthResponse response = userService.loginWithGoogle(request.getToken());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/google/register")
    public ResponseEntity<AuthResponse> googleRegister(@RequestBody GoogleAuthRequest request) {
        AuthResponse response = userService.registerGoogleUser(request.getToken());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/me")
    public ResponseEntity<AuthResponse.UserData> currentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(userService.getCurrentUserData(authentication.getName()));
    }

    @PutMapping("/me/budget")
    public ResponseEntity<AuthResponse.UserData> updateMonthlyBudget(
            Authentication authentication,
            @Valid @RequestBody UpdateMonthlyBudgetRequest request
    ) {
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(userService.updateMonthlyBudget(authentication.getName(), request));
    }

    public static class GoogleAuthRequest {
        private String token;

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }
    }
}
