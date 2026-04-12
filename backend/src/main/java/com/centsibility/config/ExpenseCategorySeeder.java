package com.centsibility.config;

import com.centsibility.repository.ExpenseCategoryRepository;
import com.centsibility.service.ExpenseCategoryDefaults;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class ExpenseCategorySeeder {

    private final ExpenseCategoryRepository expenseCategoryRepository;

    public ExpenseCategorySeeder(ExpenseCategoryRepository expenseCategoryRepository) {
        this.expenseCategoryRepository = expenseCategoryRepository;
    }

    @Transactional
    @EventListener(ApplicationReadyEvent.class)
    public void seedDefaultCategories() {
        ExpenseCategoryDefaults.getDefaultExpenseCategories().stream()
                .map(ExpenseCategoryDefaults::toEntity)
                .filter(category -> !expenseCategoryRepository.existsById(category.getId()))
                .forEach(expenseCategoryRepository::save);
    }
}