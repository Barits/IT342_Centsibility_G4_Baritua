-- Sample queries for Centsibility database

-- Get user with roles
SELECT u.*, GROUP_CONCAT(r.name) as roles
FROM users u
LEFT JOIN user_roles ur ON u.id = ur.user_id
LEFT JOIN roles r ON ur.role_id = r.id
WHERE u.username = 'johndoe'
GROUP BY u.id;

-- Get all transactions for a user in a date range
SELECT * FROM transactions
WHERE user_id = 1
AND transaction_date BETWEEN '2026-03-01' AND '2026-03-31'
ORDER BY transaction_date DESC;

-- Calculate total income for a user
SELECT SUM(amount) as total_income
FROM transactions
WHERE user_id = 1
AND type = 'INCOME'
AND transaction_date BETWEEN '2026-03-01' AND '2026-03-31';

-- Calculate total expenses for a user
SELECT SUM(amount) as total_expenses
FROM transactions
WHERE user_id = 1
AND type = 'EXPENSE'
AND transaction_date BETWEEN '2026-03-01' AND '2026-03-31';

-- Get expenses by category
SELECT category, SUM(amount) as total, COUNT(*) as transaction_count
FROM transactions
WHERE user_id = 1
AND type = 'EXPENSE'
AND transaction_date BETWEEN '2026-03-01' AND '2026-03-31'
GROUP BY category
ORDER BY total DESC;

-- Get active budgets for a user
SELECT * FROM budgets
WHERE user_id = 1
AND CURDATE() BETWEEN start_date AND end_date;

-- Get budget utilization percentage
SELECT 
    b.id,
    b.category,
    b.budget_limit,
    b.current_spent,
    ROUND((b.current_spent / b.budget_limit) * 100, 2) as utilization_percentage,
    CASE 
        WHEN (b.current_spent / b.budget_limit) * 100 >= b.alert_threshold THEN 'WARNING'
        ELSE 'OK'
    END as status
FROM budgets b
WHERE b.user_id = 1
AND CURDATE() BETWEEN b.start_date AND b.end_date;

-- Get recent transactions with budget impact
SELECT 
    t.id,
    t.transaction_date,
    t.category,
    t.amount,
    t.type,
    b.budget_limit,
    b.current_spent,
    ROUND((b.current_spent / b.budget_limit) * 100, 2) as budget_used_percentage
FROM transactions t
LEFT JOIN budgets b ON t.user_id = b.user_id 
    AND t.category = b.category
    AND t.transaction_date BETWEEN b.start_date AND b.end_date
WHERE t.user_id = 1
ORDER BY t.transaction_date DESC
LIMIT 10;
