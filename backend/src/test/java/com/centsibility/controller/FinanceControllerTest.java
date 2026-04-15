package com.centsibility.controller;

import com.centsibility.service.FinanceService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(FinanceController.class)
@AutoConfigureMockMvc(addFilters = false)
class FinanceControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FinanceService financeService;

    @Test
    @WithMockUser(username = "tester@centsibility.com")
    void getBudgetsWithMonthReturnsSummary() throws Exception {
        Map<String, Object> summary = Map.of(
                "budgeted", BigDecimal.valueOf(5000),
                "spent", BigDecimal.valueOf(1200),
                "remaining", BigDecimal.valueOf(3800),
                "percentage", BigDecimal.valueOf(24)
        );

        when(financeService.getBudgets(eq("tester@centsibility.com"), eq("2026-04")))
                .thenReturn(Map.of(
                        "summary", summary,
                        "categoryBudgets", List.of(),
                        "uncategorized", List.of(),
                        "selectedMonth", "2026-04"
                ));

        mockMvc.perform(get("/api/budgets").param("month", "2026-04"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.selectedMonth").value("2026-04"))
                .andExpect(jsonPath("$.summary.budgeted").value(5000));
    }

    @Test
    @WithMockUser(username = "tester@centsibility.com")
    void getBudgetPlansReturnsList() throws Exception {
        when(financeService.getBudgetPlans("tester@centsibility.com"))
                .thenReturn(List.of(
                        Map.of("month", "2026-04", "amount", BigDecimal.valueOf(6000)),
                        Map.of("month", "2026-05", "amount", BigDecimal.valueOf(6500))
                ));

        mockMvc.perform(get("/api/budgets/plans"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].month").value("2026-04"))
                .andExpect(jsonPath("$[1].month").value("2026-05"));
    }

    @Test
    @WithMockUser(username = "tester@centsibility.com")
    void upsertBudgetPlanReturnsSavedPlan() throws Exception {
        when(financeService.upsertBudgetPlan(eq("tester@centsibility.com"), any()))
                .thenReturn(Map.of(
                        "id", 1,
                        "month", "2026-04",
                        "amount", BigDecimal.valueOf(7000)
                ));

        mockMvc.perform(post("/api/budgets/plans")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"month\":\"2026-04\",\"amount\":7000}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.month").value("2026-04"))
                .andExpect(jsonPath("$.amount").value(7000));
    }
}
