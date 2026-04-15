package com.centsibility.service;

import com.centsibility.model.ExpenseCategory;
import com.centsibility.model.ExpenseCategoryDefinition;

import java.util.List;
import java.util.Locale;

public final class ExpenseCategoryDefaults {

    private static final List<ExpenseCategoryDefinition> DEFAULT_EXPENSE_CATEGORIES = List.of(
            new ExpenseCategoryDefinition("food", "Food", "🍔", "#EF4444", 1),
            new ExpenseCategoryDefinition("transport", "Transport", "🚗", "#3B82F6", 2),
            new ExpenseCategoryDefinition("shopping", "Shopping", "🛍️", "#EC4899", 3),
            new ExpenseCategoryDefinition("bills", "Bills", "💡", "#F59E0B", 4),
            new ExpenseCategoryDefinition("entertainment", "Entertainment", "🎬", "#8B5CF6", 5),
            new ExpenseCategoryDefinition("health", "Health", "💊", "#EF4444", 6),
            new ExpenseCategoryDefinition("education", "Education", "📚", "#3B82F6", 7),
            new ExpenseCategoryDefinition("housing", "Housing", "🏠", "#10B981", 8),
            new ExpenseCategoryDefinition("subscriptions", "Subscriptions", "📱", "#3B82F6", 9),
            new ExpenseCategoryDefinition("other", "Other", "📦", "#6B7280", 10)
    );

    private ExpenseCategoryDefaults() {
    }

    public static List<ExpenseCategoryDefinition> getDefaultExpenseCategories() {
        return DEFAULT_EXPENSE_CATEGORIES;
    }

    public static String normalizeCategoryKey(String category) {
        return String.valueOf(category == null ? "" : category)
                .trim()
                .toLowerCase(Locale.ENGLISH)
                .replace('_', ' ')
                .replace('-', ' ')
                .replaceAll("\\s+", " ");
    }

    public static String canonicalizeExpenseCategoryLabel(String category) {
        String normalized = normalizeCategoryKey(category);

        return DEFAULT_EXPENSE_CATEGORIES.stream()
                .filter(definition -> normalizeCategoryKey(definition.id()).equals(normalized)
                        || normalizeCategoryKey(definition.label()).equals(normalized))
                .map(ExpenseCategoryDefinition::label)
                .findFirst()
                .orElse(category == null ? "" : category.trim());
    }

    public static ExpenseCategory toEntity(ExpenseCategoryDefinition definition) {
        ExpenseCategory category = new ExpenseCategory();
        category.setId(definition.id());
        category.setLabel(definition.label());
        category.setIcon(definition.icon());
        category.setColor(definition.color());
        category.setSortOrder(definition.sortOrder());
        return category;
    }
}