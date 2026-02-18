package com.centsibility.backend.controller;

import com.centsibility.backend.dto.TransactionDTO;
import com.centsibility.backend.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * TransactionController - REST API endpoints for transaction management
 * 
 * TODO: 
 * - Implement all CRUD endpoints
 * - Add authentication/authorization (require JWT token)
 * - Add input validation (@Valid annotations)
 * - Implement proper error handling
 * - Add pagination support
 * - Get current user from Security Context
 */
@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:3000") // TODO: Move to WebConfig
public class TransactionController {
    
    @Autowired
    private TransactionService transactionService;
    
    /**
     * Create a new transaction
     * POST /api/transactions
     * 
     * TODO:
     * - Add @Valid annotation for validation
     * - Get current authenticated user from SecurityContext
     * - Return 201 CREATED status
     */
    @PostMapping
    public ResponseEntity<TransactionDTO> createTransaction(@RequestBody TransactionDTO transactionDTO) {
        // TODO: Get current user from SecurityContextHolder
        // User currentUser = getCurrentUser();
        // TransactionDTO created = transactionService.createTransaction(transactionDTO, currentUser);
        // return ResponseEntity.status(HttpStatus.CREATED).body(created);
        
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }
    
    /**
     * Get all transactions for current user
     * GET /api/transactions
     * 
     * TODO:
     * - Get current authenticated user
     * - Add pagination parameters
     * - Add filtering options (date range, category, type)
     */
    @GetMapping
    public ResponseEntity<List<TransactionDTO>> getUserTransactions() {
        // TODO: Get current user from SecurityContextHolder
        // User currentUser = getCurrentUser();
        // List<TransactionDTO> transactions = transactionService.getUserTransactions(currentUser);
        // return ResponseEntity.ok(transactions);
        
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }
    
    /**
     * Get transaction by ID
     * GET /api/transactions/{id}
     * 
     * TODO:
     * - Verify user owns this transaction
     * - Return 404 if not found
     */
    @GetMapping("/{id}")
    public ResponseEntity<TransactionDTO> getTransactionById(@PathVariable Long id) {
        // TODO: Implement
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }
    
    /**
     * Update existing transaction
     * PUT /api/transactions/{id}
     * 
     * TODO:
     * - Verify user owns this transaction
     * - Add validation
     * - Return 404 if not found
     */
    @PutMapping("/{id}")
    public ResponseEntity<TransactionDTO> updateTransaction(
            @PathVariable Long id,
            @RequestBody TransactionDTO transactionDTO) {
        // TODO: Implement
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }
    
    /**
     * Delete transaction
     * DELETE /api/transactions/{id}
     * 
     * TODO:
     * - Verify user owns this transaction
     * - Return 204 NO CONTENT on success
     * - Return 404 if not found
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
        // TODO: Implement
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }
    
    // TODO: Add more endpoints
    // - GET /api/transactions/income - get income transactions only
    // - GET /api/transactions/expense - get expense transactions only
    // - GET /api/transactions/summary - get financial summary
    // - POST /api/transactions/{id}/receipt - upload receipt file
}
