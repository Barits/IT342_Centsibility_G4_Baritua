package com.centsibility.controller;

import com.centsibility.dto.request.BudgetRequest;
import com.centsibility.dto.response.BudgetResponse;
import com.centsibility.model.User;
import com.centsibility.service.BudgetService;
import com.centsibility.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class BudgetController {

    private final BudgetService budgetService;
    private final UserService userService;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<BudgetResponse> createBudget(
            @Valid @RequestBody BudgetRequest request,
            Authentication authentication) {
        User user = userService.getUserByUsername(authentication.getName());
        BudgetResponse response = budgetService.createBudget(request, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<BudgetResponse>> getAllBudgets(Authentication authentication) {
        User user = userService.getUserByUsername(authentication.getName());
        List<BudgetResponse> budgets = budgetService.getAllBudgets(user);
        return ResponseEntity.ok(budgets);
    }

    @GetMapping("/active")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<BudgetResponse>> getActiveBudgets(Authentication authentication) {
        User user = userService.getUserByUsername(authentication.getName());
        List<BudgetResponse> budgets = budgetService.getActiveBudgets(user);
        return ResponseEntity.ok(budgets);
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<BudgetResponse> getBudgetById(
            @PathVariable Long id,
            Authentication authentication) {
        User user = userService.getUserByUsername(authentication.getName());
        BudgetResponse response = budgetService.getBudgetById(id, user);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/category/{category}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<BudgetResponse>> getBudgetsByCategory(
            @PathVariable String category,
            Authentication authentication) {
        User user = userService.getUserByUsername(authentication.getName());
        List<BudgetResponse> budgets = budgetService.getBudgetsByCategory(user, category);
        return ResponseEntity.ok(budgets);
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<BudgetResponse> updateBudget(
            @PathVariable Long id,
            @Valid @RequestBody BudgetRequest request,
            Authentication authentication) {
        User user = userService.getUserByUsername(authentication.getName());
        BudgetResponse response = budgetService.updateBudget(id, request, user);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteBudget(@PathVariable Long id, Authentication authentication) {
        User user = userService.getUserByUsername(authentication.getName());
        budgetService.deleteBudget(id, user);
        return ResponseEntity.ok("Budget deleted successfully");
    }

}
