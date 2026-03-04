package com.centsibility.service;

import com.centsibility.dto.request.BudgetRequest;
import com.centsibility.dto.response.BudgetResponse;
import com.centsibility.model.Budget;
import com.centsibility.model.User;
import com.centsibility.repository.BudgetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BudgetService {

    private final BudgetRepository budgetRepository;

    @Transactional
    public BudgetResponse createBudget(BudgetRequest request, User user) {
        Budget budget = new Budget();
        budget.setUser(user);
        budget.setCategory(request.getCategory());
        budget.setBudgetLimit(request.getBudgetLimit());
        budget.setStartDate(request.getStartDate());
        budget.setEndDate(request.getEndDate());
        budget.setPeriod(request.getPeriod());
        budget.setAlertEnabled(request.getAlertEnabled());
        
        if (request.getAlertThreshold() != null) {
            budget.setAlertThreshold(request.getAlertThreshold());
        }

        Budget savedBudget = budgetRepository.save(budget);
        return mapToResponse(savedBudget);
    }

    public BudgetResponse getBudgetById(Long id, User user) {
        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found with id: " + id));
        
        if (!budget.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to budget");
        }
        
        return mapToResponse(budget);
    }

    public List<BudgetResponse> getAllBudgets(User user) {
        List<Budget> budgets = budgetRepository.findByUserOrderByStartDateDesc(user);
        return budgets.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<BudgetResponse> getActiveBudgets(User user) {
        LocalDate currentDate = LocalDate.now();
        List<Budget> budgets = budgetRepository.findByUserAndEndDateGreaterThanEqual(user, currentDate);
        return budgets.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<BudgetResponse> getBudgetsByCategory(User user, String category) {
        List<Budget> budgets = budgetRepository.findByUserAndCategory(user, category);
        return budgets.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public BudgetResponse updateBudget(Long id, BudgetRequest request, User user) {
        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found with id: " + id));
        
        if (!budget.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to budget");
        }

        budget.setCategory(request.getCategory());
        budget.setBudgetLimit(request.getBudgetLimit());
        budget.setStartDate(request.getStartDate());
        budget.setEndDate(request.getEndDate());
        budget.setPeriod(request.getPeriod());
        budget.setAlertEnabled(request.getAlertEnabled());
        
        if (request.getAlertThreshold() != null) {
            budget.setAlertThreshold(request.getAlertThreshold());
        }

        Budget updatedBudget = budgetRepository.save(budget);
        return mapToResponse(updatedBudget);
    }

    @Transactional
    public void deleteBudget(Long id, User user) {
        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found with id: " + id));
        
        if (!budget.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to budget");
        }

        budgetRepository.delete(budget);
    }

    @Transactional
    public void updateBudgetSpending(User user, String category, BigDecimal amount) {
        LocalDate currentDate = LocalDate.now();
        Budget budget = budgetRepository.findByUserAndCategoryAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
                user, category, currentDate, currentDate
        ).orElse(null);

        if (budget != null) {
            budget.setCurrentSpent(budget.getCurrentSpent().add(amount));
            budgetRepository.save(budget);
        }
    }

    private BudgetResponse mapToResponse(Budget budget) {
        BudgetResponse response = new BudgetResponse();
        response.setId(budget.getId());
        response.setCategory(budget.getCategory());
        response.setBudgetLimit(budget.getBudgetLimit());
        response.setCurrentSpent(budget.getCurrentSpent());
        response.setStartDate(budget.getStartDate());
        response.setEndDate(budget.getEndDate());
        response.setPeriod(budget.getPeriod());
        response.setAlertEnabled(budget.getAlertEnabled());
        response.setAlertThreshold(budget.getAlertThreshold());
        
        // Calculate percentage used
        if (budget.getBudgetLimit().compareTo(BigDecimal.ZERO) > 0) {
            BigDecimal percentageUsed = budget.getCurrentSpent()
                    .divide(budget.getBudgetLimit(), 4, RoundingMode.HALF_UP)
                    .multiply(new BigDecimal("100"));
            response.setPercentageUsed(percentageUsed);
        } else {
            response.setPercentageUsed(BigDecimal.ZERO);
        }
        
        response.setCreatedAt(budget.getCreatedAt());
        response.setUpdatedAt(budget.getUpdatedAt());
        return response;
    }

}
