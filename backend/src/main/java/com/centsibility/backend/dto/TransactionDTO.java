package com.centsibility.backend.dto;

import com.centsibility.backend.model.Transaction;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * TransactionDTO - Data Transfer Object for Transaction
 * 
 * TODO: 
 * - Add validation annotations
 * - Include user information (userId or userEmail)
 * - Add receipt URL field
 */
public class TransactionDTO {
    
    private Long id;
    private BigDecimal amount;
    private Transaction.TransactionType type;
    private Transaction.Category category;
    private String description;
    private LocalDateTime transactionDate;
    private LocalDateTime createdAt;
    
    // Constructors
    public TransactionDTO() {}
    
    public TransactionDTO(Long id, BigDecimal amount, Transaction.TransactionType type, 
                         Transaction.Category category, String description, 
                         LocalDateTime transactionDate, LocalDateTime createdAt) {
        this.id = id;
        this.amount = amount;
        this.type = type;
        this.category = category;
        this.description = description;
        this.transactionDate = transactionDate;
        this.createdAt = createdAt;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public BigDecimal getAmount() {
        return amount;
    }
    
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    
    public Transaction.TransactionType getType() {
        return type;
    }
    
    public void setType(Transaction.TransactionType type) {
        this.type = type;
    }
    
    public Transaction.Category getCategory() {
        return category;
    }
    
    public void setCategory(Transaction.Category category) {
        this.category = category;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public LocalDateTime getTransactionDate() {
        return transactionDate;
    }
    
    public void setTransactionDate(LocalDateTime transactionDate) {
        this.transactionDate = transactionDate;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
