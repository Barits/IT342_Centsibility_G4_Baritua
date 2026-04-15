package com.centsibility.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(DuplicateEmailException.class)
    public ResponseEntity<ErrorResponse> handleDuplicateEmailException(DuplicateEmailException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
            false,
            ex.getMessage(),
            HttpStatus.CONFLICT.value(),
            LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME)
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }
    
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentialsException(BadCredentialsException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
            false,
            "Invalid email or password",
            HttpStatus.UNAUTHORIZED.value(),
            LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME)
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        
        ValidationErrorResponse errorResponse = new ValidationErrorResponse(
            false,
            "Validation failed",
            HttpStatus.BAD_REQUEST.value(),
            LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME),
            errors
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ErrorResponse> handleResponseStatusException(ResponseStatusException ex) {
        HttpStatus status = HttpStatus.valueOf(ex.getStatusCode().value());

        ErrorResponse errorResponse = new ErrorResponse(
            false,
            ex.getReason() == null ? status.getReasonPhrase() : ex.getReason(),
            status.value(),
            LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME)
        );

        return new ResponseEntity<>(errorResponse, status);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        ErrorResponse errorResponse = new ErrorResponse(
            false,
            "An unexpected error occurred: " + ex.getMessage(),
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME)
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    // Error response class
    public static class ErrorResponse {
        private boolean success;
        private String message;
        private int status;
        private String timestamp;
        
        public ErrorResponse(boolean success, String message, int status, String timestamp) {
            this.success = success;
            this.message = message;
            this.status = status;
            this.timestamp = timestamp;
        }
        
        // Getters and setters
        public boolean isSuccess() {
            return success;
        }
        
        public void setSuccess(boolean success) {
            this.success = success;
        }
        
        public String getMessage() {
            return message;
        }
        
        public void setMessage(String message) {
            this.message = message;
        }
        
        public int getStatus() {
            return status;
        }
        
        public void setStatus(int status) {
            this.status = status;
        }
        
        public String getTimestamp() {
            return timestamp;
        }
        
        public void setTimestamp(String timestamp) {
            this.timestamp = timestamp;
        }
    }
    
    // Validation error response class
    public static class ValidationErrorResponse extends ErrorResponse {
        private Map<String, String> errors;
        
        public ValidationErrorResponse(boolean success, String message, int status, String timestamp, Map<String, String> errors) {
            super(success, message, status, timestamp);
            this.errors = errors;
        }
        
        public Map<String, String> getErrors() {
            return errors;
        }
        
        public void setErrors(Map<String, String> errors) {
            this.errors = errors;
        }
    }
}
