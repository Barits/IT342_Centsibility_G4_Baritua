package com.centsibility.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class UpdateMonthlyBudgetRequest {

    @NotNull(message = "Monthly budget is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Monthly budget must be zero or greater")
    private BigDecimal monthlyBudget;

    public BigDecimal getMonthlyBudget() {
        return monthlyBudget;
    }

    public void setMonthlyBudget(BigDecimal monthlyBudget) {
        this.monthlyBudget = monthlyBudget;
    }
}