package com.centsibility.backend.dto;

/**
 * UserDTO - Data Transfer Object for User (excludes password)
 * 
 * TODO: 
 * - Add validation annotations (@NotNull, @Email, etc.)
 * - Create separate DTOs for different use cases (UserResponseDTO, UserCreateDTO, etc.)
 */
public class UserDTO {
    
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private Boolean enabled;
    
    // Constructors
    public UserDTO() {}
    
    public UserDTO(Long id, String email, String firstName, String lastName, Boolean enabled) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.enabled = enabled;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
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
    
    public Boolean getEnabled() {
        return enabled;
    }
    
    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }
}
