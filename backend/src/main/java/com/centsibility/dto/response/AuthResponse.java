package com.centsibility.dto.response;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class AuthResponse {
    
    private boolean success;
    private UserData data;
    private String message;
    private String timestamp;
    private String token; // JWT token
    
    // Default constructor
    public AuthResponse() {
        this.timestamp = LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME);
    }
    
    // Inner class for user data
    public static class UserData {
        private Long id;
        private String firstName;
        private String lastName;
        private String email;
        private String role;
        
        // Default constructor
        public UserData() {
        }
        
        // Constructor with all fields
        public UserData(Long id, String firstName, String lastName, String email, String role) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.role = role;
        }
        
        // Getters and setters
        public Long getId() {
            return id;
        }
        
        public void setId(Long id) {
            this.id = id;
        }
        
        public String getFirstName() {
            return firstName;
        }
        
        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }
        
        public String getLastName() {
            return lastName;
        }
        
        public void setLastName(String lastName) {
            this.lastName = lastName;
        }
        
        public String getEmail() {
            return email;
        }
        
        public void setEmail(String email) {
            this.email = email;
        }
        
        public String getRole() {
            return role;
        }
        
        public void setRole(String role) {
            this.role = role;
        }
    }
    
    // Getters and setters
    public boolean isSuccess() {
        return success;
    }
    
    public void setSuccess(boolean success) {
        this.success = success;
    }
    
    public UserData getData() {
        return data;
    }
    
    public void setData(UserData data) {
        this.data = data;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public String getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
    
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
}
