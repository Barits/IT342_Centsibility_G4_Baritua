package com.centsibility.backend.controller;

import com.centsibility.backend.dto.UserDTO;
import com.centsibility.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * UserController - REST API endpoints for user management
 * 
 * TODO: 
 * - Implement /me endpoint (get current authenticated user)
 * - Implement profile update endpoint
 * - Implement admin endpoints for user management
 * - Add proper authorization (role checks)
 */
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    /**
     * Get current authenticated user
     * GET /api/users/me
     * 
     * TODO:
     * - Get user from SecurityContextHolder
     * - Return user info (exclude password)
     */
    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser() {
        // TODO: Get current user from SecurityContextHolder
        // Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        // String email = auth.getName();
        // User user = userService.getUserByEmail(email);
        // return ResponseEntity.ok(convertToDTO(user));
        
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }
    
    /**
     * Update current user's profile
     * PUT /api/users/me
     * 
     * TODO:
     * - Get current user
     * - Update allowed fields only
     * - Return updated user info
     */
    @PutMapping("/me")
    public ResponseEntity<UserDTO> updateProfile(@RequestBody UserDTO userDTO) {
        // TODO: Implement profile update
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }
    
    /**
     * Get all users (Admin only)
     * GET /api/admin/users
     * 
     * TODO:
     * - Add @PreAuthorize("hasRole('ADMIN')") annotation
     * - Implement pagination
     */
    @GetMapping("/admin/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        // TODO: Add authorization check
        // List<UserDTO> users = userService.getAllUsers();
        // return ResponseEntity.ok(users);
        
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }
    
    /**
     * Delete user (Admin only)
     * DELETE /api/admin/users/{id}
     * 
     * TODO:
     * - Add @PreAuthorize("hasRole('ADMIN')") annotation
     * - Implement user deletion
     */
    @DeleteMapping("/admin/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        // TODO: Implement user deletion (Admin only)
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }
}
