package com.centsibility.controller;

import com.centsibility.dto.request.CreateTransactionRequest;
import com.centsibility.dto.request.UpsertBudgetPlanRequest;
import com.centsibility.service.FinanceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class FinanceController {

    private final FinanceService financeService;

    public FinanceController(FinanceService financeService) {
        this.financeService = financeService;
    }

    @PostMapping("/transactions")
    public ResponseEntity<Map<String, Object>> createTransaction(
            Authentication authentication,
            @Valid @RequestBody CreateTransactionRequest request
    ) {
        String email = requireAuthenticatedEmail(authentication);
        return new ResponseEntity<>(financeService.createTransaction(email, request), HttpStatus.CREATED);
    }

    @GetMapping("/transactions")
    public ResponseEntity<List<Map<String, Object>>> getTransactions(Authentication authentication) {
        String email = requireAuthenticatedEmail(authentication);
        return ResponseEntity.ok(financeService.getTransactions(email));
    }

    @GetMapping("/dashboard/overview")
    public ResponseEntity<Map<String, Object>> getDashboardOverview(Authentication authentication) {
        String email = requireAuthenticatedEmail(authentication);
        return ResponseEntity.ok(financeService.getDashboardOverview(email));
    }

    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Object>> getAnalytics(Authentication authentication) {
        String email = requireAuthenticatedEmail(authentication);
        return ResponseEntity.ok(financeService.getAnalytics(email));
    }

    @GetMapping("/budgets")
    public ResponseEntity<Map<String, Object>> getBudgets(
            Authentication authentication,
            @RequestParam(required = false) String month
    ) {
        String email = requireAuthenticatedEmail(authentication);
        return ResponseEntity.ok(financeService.getBudgets(email, month));
    }

    @GetMapping("/budgets/plans")
    public ResponseEntity<List<Map<String, Object>>> getBudgetPlans(Authentication authentication) {
        String email = requireAuthenticatedEmail(authentication);
        return ResponseEntity.ok(financeService.getBudgetPlans(email));
    }

    @PostMapping("/budgets/plans")
    public ResponseEntity<Map<String, Object>> upsertBudgetPlan(
            Authentication authentication,
            @Valid @RequestBody UpsertBudgetPlanRequest request
    ) {
        String email = requireAuthenticatedEmail(authentication);
        return ResponseEntity.ok(financeService.upsertBudgetPlan(email, request));
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Map<String, Object>>> getCategories(Authentication authentication) {
        String email = requireAuthenticatedEmail(authentication);
        return ResponseEntity.ok(financeService.getCategories(email));
    }

    private String requireAuthenticatedEmail(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        return authentication.getName();
    }
}
