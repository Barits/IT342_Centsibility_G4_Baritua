package com.centsibility.backend.service;

import com.centsibility.backend.dto.UserDTO;
import com.centsibility.backend.model.User;
import com.centsibility.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * UserService - Business logic for user management
 * 
 * TODO: 
 * - Implement user registration with password hashing (BCrypt)
 * - Implement email verification workflow
 * - Add password reset functionality
 * - Implement user profile updates
 * - Add role assignment logic
 */
@Service
@Transactional
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    // TODO: Inject PasswordEncoder (BCrypt)
    // @Autowired
    // private PasswordEncoder passwordEncoder;
    
    /**
     * Register a new user
     * TODO: Implement this method
     * - Validate email doesn't exist
     * - Hash password with BCrypt
     * - Assign default role (USER)
     * - Send verification email
     * - Save to database
     */
    public UserDTO registerUser(String email, String password, String firstName, String lastName) {
        // TODO: Implement
        throw new UnsupportedOperationException("Not implemented yet");
    }
    
    /**
     * Get user by email
     * TODO: Implement
     */
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found")); // TODO: Create custom exception
    }
    
    /**
     * Get user by ID
     * TODO: Implement
     */
    public UserDTO getUserById(Long id) {
        // TODO: Implement
        throw new UnsupportedOperationException("Not implemented yet");
    }
    
    /**
     * Update user profile
     * TODO: Implement
     */
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        // TODO: Implement
        throw new UnsupportedOperationException("Not implemented yet");
    }
    
    /**
     * Get all users (Admin only)
     * TODO: Implement
     */
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Enable/verify user account
     * TODO: Implement email verification logic
     */
    public void verifyUserEmail(String email, String token) {
        // TODO: Implement
        throw new UnsupportedOperationException("Not implemented yet");
    }
    
    // Helper method to convert Entity to DTO (excludes password)
    private UserDTO convertToDTO(User user) {
        return new UserDTO(
            user.getId(),
            user.getEmail(),
            user.getFirstName(),
            user.getLastName(),
            user.getEnabled()
        );
    }
}
