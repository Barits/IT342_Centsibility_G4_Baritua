package com.centsibility.controller;

import com.centsibility.dto.request.LoginRequest;
import com.centsibility.dto.request.RegisterRequest;
import com.centsibility.dto.request.GoogleTokenRequest;
import com.centsibility.dto.response.AuthResponse;
import com.centsibility.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<AuthResponse> googleLogin(@Valid @RequestBody GoogleTokenRequest request) {
        AuthResponse response = userService.authenticateGoogleUser(request.getToken());
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/google/register")
    public ResponseEntity<AuthResponse> googleRegister(@Valid @RequestBody GoogleTokenRequest request) {
        AuthResponse response = userService.registerGoogleUser(request.getToken());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
