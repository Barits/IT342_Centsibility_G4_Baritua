package com.centsibility.controller;

import com.centsibility.dto.request.TransactionRequest;
import com.centsibility.dto.response.TransactionResponse;
import com.centsibility.model.Transaction;
import com.centsibility.model.User;
import com.centsibility.service.TransactionService;
import com.centsibility.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class TransactionController {

    private final TransactionService transactionService;
    private final UserService userService;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<TransactionResponse> createTransaction(
            @Valid @RequestBody TransactionRequest request,
            Authentication authentication) {
        User user = userService.getUserByUsername(authentication.getName());
        TransactionResponse response = transactionService.createTransaction(request, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<TransactionResponse>> getAllTransactions(Authentication authentication) {
        User user = userService.getUserByUsername(authentication.getName());
        List<TransactionResponse> transactions = transactionService.getAllTransactions(user);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<TransactionResponse> getTransactionById(
            @PathVariable Long id,
            Authentication authentication) {
        User user = userService.getUserByUsername(authentication.getName());
        TransactionResponse response = transactionService.getTransactionById(id, user);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/date-range")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<TransactionResponse>> getTransactionsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            Authentication authentication) {
        User user = userService.getUserByUsername(authentication.getName());
        List<TransactionResponse> transactions = transactionService.getTransactionsByDateRange(user, startDate, endDate);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/type/{type}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<TransactionResponse>> getTransactionsByType(
            @PathVariable Transaction.TransactionType type,
            Authentication authentication) {
        User user = userService.getUserByUsername(authentication.getName());
        List<TransactionResponse> transactions = transactionService.getTransactionsByType(user, type);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/category/{category}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<TransactionResponse>> getTransactionsByCategory(
            @PathVariable String category,
            Authentication authentication) {
        User user = userService.getUserByUsername(authentication.getName());
        List<TransactionResponse> transactions = transactionService.getTransactionsByCategory(user, category);
        return ResponseEntity.ok(transactions);
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<TransactionResponse> updateTransaction(
            @PathVariable Long id,
            @Valid @RequestBody TransactionRequest request,
            Authentication authentication) {
        User user = userService.getUserByUsername(authentication.getName());
        TransactionResponse response = transactionService.updateTransaction(id, request, user);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteTransaction(@PathVariable Long id, Authentication authentication) {
        User user = userService.getUserByUsername(authentication.getName());
        transactionService.deleteTransaction(id, user);
        return ResponseEntity.ok("Transaction deleted successfully");
    }

}
