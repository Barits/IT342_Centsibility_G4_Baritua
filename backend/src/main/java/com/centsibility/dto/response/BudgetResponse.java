package com.centsibility.dto.response;

import com.centsibility.model.Budget;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BudgetResponse {

    private Long id;
    private String category;
    private BigDecimal budgetLimit;
    private BigDecimal currentSpent;
    private LocalDate startDate;
    private LocalDate endDate;
    private Budget.BudgetPeriod period;
    private Boolean alertEnabled;
    private BigDecimal alertThreshold;
    private BigDecimal percentageUsed;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
