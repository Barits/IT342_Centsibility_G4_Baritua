package com.centsibility.controller;

import com.centsibility.model.User;
import com.centsibility.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        User user = userService.getUserByUsername(authentication.getName());
        return ResponseEntity.ok(user);
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getUserById(@PathVariable Long id, Authentication authentication) {
        User currentUser = userService.getUserByUsername(authentication.getName());
        
        // Users can only view their own profile unless they're admin
        if (!currentUser.getId().equals(id) && !isAdmin(authentication)) {
            return ResponseEntity.status(403).body("Access denied");
        }
        
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User userDetails, Authentication authentication) {
        User currentUser = userService.getUserByUsername(authentication.getName());
        
        // Users can only update their own profile unless they're admin
        if (!currentUser.getId().equals(id) && !isAdmin(authentication)) {
            return ResponseEntity.status(403).body("Access denied");
        }
        
        User updatedUser = userService.updateUser(id, userDetails);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteUser(@PathVariable Long id, Authentication authentication) {
        User currentUser = userService.getUserByUsername(authentication.getName());
        
        // Users can only delete their own account unless they're admin
        if (!currentUser.getId().equals(id) && !isAdmin(authentication)) {
            return ResponseEntity.status(403).body("Access denied");
        }
        
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    private boolean isAdmin(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));
    }

}
