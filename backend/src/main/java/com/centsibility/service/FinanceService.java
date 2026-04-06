package com.centsibility.service;

import com.centsibility.dto.request.CreateTransactionRequest;
import com.centsibility.model.TransactionEntry;
import com.centsibility.model.TransactionType;
import com.centsibility.model.User;
import com.centsibility.repository.TransactionEntryRepository;
import com.centsibility.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class FinanceService {

    private static final List<String> DEFAULT_EXPENSE_CATEGORIES = List.of(
            "Food",
            "Transport",
            "Shopping",
            "Bills",
            "Entertainment",
            "Health",
            "Education",
            "Housing",
            "Subscriptions",
            "Other"
    );

    private static final Set<String> INCOME_CATEGORY_KEYS = Set.of("income", "salary", "general income", "general-income");
    private static final Set<String> DEFAULT_EXPENSE_CATEGORY_KEYS = DEFAULT_EXPENSE_CATEGORIES
            .stream()
            .map(FinanceService::normalizeCategoryKey)
            .collect(Collectors.toSet());

    private static final DateTimeFormatter TIME_FORMAT = DateTimeFormatter.ofPattern("h:mm a", Locale.ENGLISH);
    private static final DateTimeFormatter MONTH_FORMAT = DateTimeFormatter.ofPattern("MMM", Locale.ENGLISH);
    private static final DateTimeFormatter PERIOD_FORMAT = DateTimeFormatter.ofPattern("MMM d", Locale.ENGLISH);

    private final UserRepository userRepository;
    private final TransactionEntryRepository transactionEntryRepository;

    public FinanceService(UserRepository userRepository, TransactionEntryRepository transactionEntryRepository) {
        this.userRepository = userRepository;
        this.transactionEntryRepository = transactionEntryRepository;
    }

    @Transactional
    public Map<String, Object> createTransaction(String email, CreateTransactionRequest request) {
        User user = getUserByEmail(email);
        String category = resolveAndValidateExpenseCategory(user, request.getCategory());

        TransactionEntry entry = new TransactionEntry();
        entry.setUser(user);
        entry.setType(TransactionType.EXPENSE);
        entry.setAmount(request.getAmount().abs());
        entry.setCategory(category);
        entry.setDescription((request.getDescription() == null || request.getDescription().isBlank())
                ? "Untitled transaction"
                : request.getDescription().trim());
        entry.setTransactionDate(request.getDate());
        entry.setNotes(request.getNotes());

        TransactionEntry saved = transactionEntryRepository.save(entry);
        return toTransactionPayload(saved);
    }

    @Transactional(readOnly = true)
    public List<Map<String, Object>> getTransactions(String email) {
        User user = getUserByEmail(email);
        List<TransactionEntry> transactions = transactionEntryRepository.findByUserOrderByTransactionDateDescCreatedAtDesc(user);

        return whereIsExpense(transactions)
                .stream()
                .map(this::toTransactionPayload)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getDashboardOverview(String email) {
        User user = getUserByEmail(email);
        List<TransactionEntry> transactions = whereIsExpense(
                transactionEntryRepository.findByUserOrderByTransactionDateDescCreatedAtDesc(user)
        );

        YearMonth currentMonth = YearMonth.now();
        YearMonth previousMonth = currentMonth.minusMonths(1);

        List<TransactionEntry> currentMonthExpenses = filterByMonth(transactions, currentMonth);
        List<TransactionEntry> previousMonthExpenses = filterByMonth(transactions, previousMonth);

        BigDecimal totalExpenses = sumAmounts(transactions);
        BigDecimal monthExpenses = sumAmounts(currentMonthExpenses);
        BigDecimal previousMonthAmount = sumAmounts(previousMonthExpenses);
        BigDecimal monthChange = monthExpenses.subtract(previousMonthAmount);

        BigDecimal todaySpending = currentMonthExpenses.stream()
                .filter(transaction -> LocalDate.now().equals(transaction.getTransactionDate()))
                .map(TransactionEntry::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        long daysInMonth = Math.max(1, LocalDate.now().getDayOfMonth());
        BigDecimal dailyAverage = monthExpenses.divide(BigDecimal.valueOf(daysInMonth), 2, RoundingMode.HALF_UP);

        List<Map<String, Object>> recentTransactions = transactions.stream()
                .limit(5)
                .map(this::toTransactionPayload)
                .collect(Collectors.toList());

        Map<String, Object> summary = new HashMap<>();
        summary.put("totalExpenses", totalExpenses);
        summary.put("currentMonthExpenses", monthExpenses);
        summary.put("previousMonthExpenses", previousMonthAmount);

        Map<String, Object> payload = new HashMap<>();
        payload.put("summary", summary);
        payload.put("totalExpenses", totalExpenses);
        payload.put("monthChange", monthChange);
        payload.put("todaySpending", todaySpending);
        payload.put("dailyAverage", dailyAverage);
        payload.put("recentTransactions", recentTransactions);
        return payload;
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getAnalytics(String email) {
        User user = getUserByEmail(email);
        List<TransactionEntry> transactions = whereIsExpense(
                transactionEntryRepository.findByUserOrderByTransactionDateDescCreatedAtDesc(user)
        );

        BigDecimal totalExpenses = sumAmounts(transactions);
        BigDecimal currentMonthBudget = sumAmounts(filterByMonth(transactions, YearMonth.now()));

        Map<String, BigDecimal> expenseByCategory = transactions.stream()
                .collect(Collectors.groupingBy(
                        TransactionEntry::getCategory,
                        LinkedHashMap::new,
                        Collectors.reducing(BigDecimal.ZERO, TransactionEntry::getAmount, BigDecimal::add)
                ));

        List<Map<String, Object>> spendingByCategory = new ArrayList<>();
        expenseByCategory.forEach((category, amount) -> {
            Map<String, Object> categoryPayload = new HashMap<>();
            categoryPayload.put("category", category);
            categoryPayload.put("amount", amount);
            categoryPayload.put("color", colorForCategory(category));
            categoryPayload.put("percentage", totalExpenses.compareTo(BigDecimal.ZERO) == 0
                    ? 0
                    : amount.multiply(BigDecimal.valueOf(100)).divide(totalExpenses, 0, RoundingMode.HALF_UP).intValue());
            spendingByCategory.add(categoryPayload);
        });

        List<Map<String, Object>> monthlyTrend = new ArrayList<>();
        for (int i = 5; i >= 0; i--) {
            YearMonth month = YearMonth.now().minusMonths(i);
            List<TransactionEntry> monthEntries = filterByMonth(transactions, month);
            Map<String, Object> monthPayload = new HashMap<>();
            monthPayload.put("month", month.format(MONTH_FORMAT));
            monthPayload.put("expenses", sumAmounts(monthEntries));
            monthlyTrend.add(monthPayload);
        }

        Map<String, Object> summary = new HashMap<>();
        summary.put("currentMonthBudget", currentMonthBudget);
        summary.put("totalExpenses", totalExpenses);

        Map<String, Object> payload = new HashMap<>();
        payload.put("summary", summary);
        payload.put("spendingByCategory", spendingByCategory);
        payload.put("monthlyTrend", monthlyTrend);
        payload.put("categoryBreakdown", spendingByCategory);
        return payload;
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getBudgets(String email) {
        User user = getUserByEmail(email);
        List<TransactionEntry> monthEntries = whereIsExpense(filterByMonth(
                transactionEntryRepository.findByUserOrderByTransactionDateDescCreatedAtDesc(user),
                YearMonth.now()
        ));

        BigDecimal spent = sumAmounts(monthEntries);

        Map<String, Object> payload = new HashMap<>();
        payload.put("summary", null);
        payload.put("categoryBudgets", new ArrayList<>());

        List<Map<String, Object>> uncategorized = monthEntries.stream()
                .map(TransactionEntry::getCategory)
                .filter(Objects::nonNull)
                .distinct()
                .map(category -> {
                    Map<String, Object> categoryPayload = new HashMap<>();
                    categoryPayload.put("id", category.toLowerCase(Locale.ENGLISH).replace(" ", "-"));
                    categoryPayload.put("name", category);
                    categoryPayload.put("icon", iconForCategory(category));
                    return categoryPayload;
                })
                .collect(Collectors.toList());

        payload.put("uncategorized", uncategorized);
        payload.put("spentThisMonth", spent);
        return payload;
    }

    @Transactional(readOnly = true)
    public List<Map<String, Object>> getCategories(String email) {
        User user = getUserByEmail(email);
        List<String> userCategories = whereIsExpense(
                transactionEntryRepository.findByUserOrderByTransactionDateDescCreatedAtDesc(user)
        ).stream()
                .map(TransactionEntry::getCategory)
                .filter(Objects::nonNull)
                .map(String::trim)
                .filter(category -> !category.isBlank())
                .distinct()
                .collect(Collectors.toList());

        List<String> categories = userCategories.isEmpty() ? DEFAULT_EXPENSE_CATEGORIES : userCategories;

        return categories.stream()
                .map(category -> {
                    Map<String, Object> categoryPayload = new HashMap<>();
                    categoryPayload.put("id", category.toLowerCase(Locale.ENGLISH).replace(" ", "-"));
                    categoryPayload.put("label", category);
                    categoryPayload.put("icon", iconForCategory(category));
                    categoryPayload.put("color", colorForCategory(category));
                    return categoryPayload;
                })
                .collect(Collectors.toList());
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private String resolveAndValidateExpenseCategory(User user, String rawCategory) {
        if (rawCategory == null || rawCategory.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category is required");
        }

        String normalizedCategory = normalizeCategoryKey(rawCategory);
        if (INCOME_CATEGORY_KEYS.contains(normalizedCategory)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Income categories are not allowed");
        }

        Set<String> allowedCategories = new HashSet<>(DEFAULT_EXPENSE_CATEGORY_KEYS);
        allowedCategories.addAll(whereIsExpense(
                transactionEntryRepository.findByUserOrderByTransactionDateDescCreatedAtDesc(user)
        ).stream().map(transaction -> normalizeCategoryKey(transaction.getCategory())).collect(Collectors.toSet()));

        if (!allowedCategories.contains(normalizedCategory)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unsupported expense category");
        }

        return canonicalizeCategoryLabel(rawCategory);
    }

    private List<TransactionEntry> whereIsExpense(List<TransactionEntry> transactions) {
        return transactions.stream()
                .filter(entry -> entry.getType() == TransactionType.EXPENSE)
                .filter(entry -> !isIncomeCategory(entry.getCategory()))
                .collect(Collectors.toList());
    }

    private boolean isIncomeCategory(String category) {
        return INCOME_CATEGORY_KEYS.contains(normalizeCategoryKey(category));
    }

    private static String normalizeCategoryKey(String category) {
        return String.valueOf(category == null ? "" : category)
                .trim()
                .toLowerCase(Locale.ENGLISH)
                .replace('_', ' ')
                .replace('-', ' ')
                .replaceAll("\\s+", " ");
    }

    private String canonicalizeCategoryLabel(String category) {
        String normalized = normalizeCategoryKey(category);

        if (DEFAULT_EXPENSE_CATEGORY_KEYS.contains(normalized)) {
            return DEFAULT_EXPENSE_CATEGORIES.stream()
                    .filter(defaultCategory -> normalizeCategoryKey(defaultCategory).equals(normalized))
                    .findFirst()
                    .orElse(category.trim());
        }

        return category.trim();
    }

    private List<TransactionEntry> filterByMonth(List<TransactionEntry> transactions, YearMonth month) {
        return transactions.stream()
                .filter(entry -> entry.getTransactionDate() != null)
                .filter(entry -> YearMonth.from(entry.getTransactionDate()).equals(month))
                .collect(Collectors.toList());
    }

    private BigDecimal sumAmounts(List<TransactionEntry> transactions) {
        return transactions.stream()
                .map(TransactionEntry::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private Map<String, Object> toTransactionPayload(TransactionEntry entry) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("id", entry.getId());
        payload.put("name", entry.getDescription());
        payload.put("category", entry.getCategory());
        payload.put("icon", iconForCategory(entry.getCategory()));
        payload.put("amount", entry.getAmount().abs().negate());
        payload.put("time", entry.getCreatedAt() == null ? "" : entry.getCreatedAt().format(TIME_FORMAT));
        payload.put("period", periodLabel(entry.getTransactionDate()));
        payload.put("date", entry.getTransactionDate() == null ? null : entry.getTransactionDate().toString());
        payload.put("color", colorForCategory(entry.getCategory()));
        return payload;
    }

    private String periodLabel(LocalDate date) {
        if (date == null) {
            return "Recent";
        }
        if (date.equals(LocalDate.now())) {
            return "Today";
        }
        if (date.equals(LocalDate.now().minusDays(1))) {
            return "Yesterday";
        }
        return date.format(PERIOD_FORMAT);
    }

    private String iconForCategory(String category) {
        if (category == null) {
            return "📦";
        }

        return switch (normalizeCategoryKey(category)) {
            case "food" -> "🍔";
            case "transport" -> "🚗";
            case "shopping" -> "🛍️";
            case "bills", "utilities" -> "💡";
            case "entertainment" -> "🎬";
            case "health", "healthcare" -> "💊";
            case "education" -> "📚";
            case "housing" -> "🏠";
            case "subscriptions" -> "📱";
            default -> "📦";
        };
    }

    private String colorForCategory(String category) {
        if (category == null) {
            return "#6B7280";
        }

        return switch (normalizeCategoryKey(category)) {
            case "food" -> "#EF4444";
            case "transport" -> "#3B82F6";
            case "shopping" -> "#EC4899";
            case "bills", "utilities" -> "#F59E0B";
            case "entertainment" -> "#8B5CF6";
            case "health", "healthcare" -> "#EF4444";
            case "education" -> "#3B82F6";
            case "housing" -> "#10B981";
            case "subscriptions" -> "#3B82F6";
            default -> "#6B7280";
        };
    }
}
