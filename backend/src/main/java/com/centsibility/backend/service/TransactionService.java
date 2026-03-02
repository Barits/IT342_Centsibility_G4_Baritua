package com.centsibility.backend.service;

import com.centsibility.backend.dto.TransactionDTO;
import com.centsibility.backend.model.Transaction;
import com.centsibility.backend.model.User;
import com.centsibility.backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * TransactionService - Business logic for transaction management
 * 
 * TODO: 
 * - Implement full CRUD operations
 * - Add validation logic (amount > 0, valid categories, etc.)
 * - Implement pagination support
 * - Add financial calculations (totals, balance, etc.)
 * - Verify user owns transaction before update/delete
 */
@Service
@Transactional
public class TransactionService {
    
    @Autowired
    private TransactionRepository transactionRepository;
    
    /**
     * Create a new transaction
     * TODO: Implement this method
     * - Validate input data
     * - Set current user as owner
     * - Save to database
     * - Return DTO
     */
    public TransactionDTO createTransaction(TransactionDTO transactionDTO, User user) {
        // TODO: Implement
        throw new UnsupportedOperationException("Not implemented yet");
    }
    
    /**
     * Get all transactions for a user
     * TODO: Implement with pagination
     */
    public List<TransactionDTO> getUserTransactions(User user) {
        // TODO: Implement
        return transactionRepository.findByUser(user).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get transaction by ID
     * TODO: Implement with ownership verification
     */
    public TransactionDTO getTransactionById(Long id, User user) {
        // TODO: Implement
        throw new UnsupportedOperationException("Not implemented yet");
    }
    
    /**
     * Update existing transaction
     * TODO: Implement with ownership verification
     */
    public TransactionDTO updateTransaction(Long id, TransactionDTO transactionDTO, User user) {
        // TODO: Implement
        throw new UnsupportedOperationException("Not implemented yet");
    }
    
    /**
     * Delete transaction
     * TODO: Implement with ownership verification
     */
    public void deleteTransaction(Long id, User user) {
        // TODO: Implement
        throw new UnsupportedOperationException("Not implemented yet");
    }
    
    /**
     * Get transactions by type (INCOME/EXPENSE)
     * TODO: Implement
     */
    public List<TransactionDTO> getTransactionsByType(User user, Transaction.TransactionType type) {
        // TODO: Implement
        throw new UnsupportedOperationException("Not implemented yet");
    }
    
    /**
     * Get transactions within date range
     * TODO: Implement
     */
    public List<TransactionDTO> getTransactionsByDateRange(User user, LocalDateTime start, LocalDateTime end) {
        // TODO: Implement
        throw new UnsupportedOperationException("Not implemented yet");
    }
    
    // Helper method to convert Entity to DTO
    private TransactionDTO convertToDTO(Transaction transaction) {
        return new TransactionDTO(
            transaction.getId(),
            transaction.getAmount(),
            transaction.getType(),
            transaction.getCategory(),
            transaction.getDescription(),
            transaction.getTransactionDate(),
            transaction.getCreatedAt()
        );
    }
    
    // Helper method to convert DTO to Entity
    private Transaction convertToEntity(TransactionDTO dto) {
        Transaction transaction = new Transaction();
        transaction.setAmount(dto.getAmount());
        transaction.setType(dto.getType());
        transaction.setCategory(dto.getCategory());
        transaction.setDescription(dto.getDescription());
        transaction.setTransactionDate(dto.getTransactionDate());
        return transaction;
    }
}
