package com.centsibility.repository;

import com.centsibility.model.Budget;
import com.centsibility.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {

    List<Budget> findByUserOrderByStartDateDesc(User user);

    List<Budget> findByUserAndCategory(User user, String category);

    Optional<Budget> findByUserAndCategoryAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
        User user, 
        String category, 
        LocalDate date1, 
        LocalDate date2
    );

    List<Budget> findByUserAndEndDateGreaterThanEqual(User user, LocalDate currentDate);

}
