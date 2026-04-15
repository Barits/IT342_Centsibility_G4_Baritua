package com.centsibility.repository;

import com.centsibility.model.BudgetPlan;
import com.centsibility.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BudgetPlanRepository extends JpaRepository<BudgetPlan, Long> {

    Optional<BudgetPlan> findByUserAndBudgetMonth(User user, String budgetMonth);

    List<BudgetPlan> findByUserOrderByBudgetMonthAsc(User user);
}
