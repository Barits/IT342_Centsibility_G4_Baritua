package com.centsibility.dto.response;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.math.BigDecimal;

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

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private boolean success;
        private UserData data;
        private String message;
        private String timestamp = LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME);
        private String token;

        public Builder success(boolean success) {
            this.success = success;
            return this;
        }

        public Builder data(UserData data) {
            this.data = data;
            return this;
        }

        public Builder message(String message) {
            this.message = message;
            return this;
        }

        public Builder timestamp(String timestamp) {
            this.timestamp = timestamp;
            return this;
        }

        public Builder token(String token) {
            this.token = token;
            return this;
        }

        public AuthResponse build() {
            AuthResponse response = new AuthResponse();
            response.setSuccess(success);
            response.setData(data);
            response.setMessage(message);
            response.setTimestamp(timestamp);
            response.setToken(token);
            return response;
        }
    }
    
    // Inner class for user data
    public static class UserData {
        private Long id;
        private String firstName;
        private String lastName;
        private String email;
        private String role;
        private BigDecimal monthlyBudget;
        
        // Default constructor
        public UserData() {
        }
        
        // Constructor with all fields
        public UserData(Long id, String firstName, String lastName, String email, String role, BigDecimal monthlyBudget) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.role = role;
            this.monthlyBudget = monthlyBudget;
        }

        public static Builder builder() {
            return new Builder();
        }

        public static class Builder {
            private Long id;
            private String firstName;
            private String lastName;
            private String email;
            private String role;
            private BigDecimal monthlyBudget;

            public Builder id(Long id) {
                this.id = id;
                return this;
            }

            public Builder firstName(String firstName) {
                this.firstName = firstName;
                return this;
            }

            public Builder lastName(String lastName) {
                this.lastName = lastName;
                return this;
            }

            public Builder email(String email) {
                this.email = email;
                return this;
            }

            public Builder role(String role) {
                this.role = role;
                return this;
            }

            public Builder monthlyBudget(BigDecimal monthlyBudget) {
                this.monthlyBudget = monthlyBudget;
                return this;
            }

            public UserData build() {
                return new UserData(id, firstName, lastName, email, role, monthlyBudget);
            }
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

        public BigDecimal getMonthlyBudget() {
            return monthlyBudget;
        }

        public void setMonthlyBudget(BigDecimal monthlyBudget) {
            this.monthlyBudget = monthlyBudget;
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
