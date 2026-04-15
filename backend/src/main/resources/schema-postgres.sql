-- ======================================
-- Centsibility Database Schema - PostgreSQL
-- Phase 1: User Registration and Login
-- ======================================

-- ======================================
-- Table: roles
-- Description: Stores user roles for role-based access control
-- ======================================
CREATE TABLE IF NOT EXISTS roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ======================================
-- Table: users
-- Description: Stores user account information
-- ======================================
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- BCrypt hashed password
    monthly_budget NUMERIC(14, 2) DEFAULT 0,
    enabled BOOLEAN DEFAULT TRUE, -- Account enabled status
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_email ON users(email);

ALTER TABLE users
    ADD COLUMN IF NOT EXISTS monthly_budget NUMERIC(14, 2) DEFAULT 0;

-- ======================================
-- Table: expense_categories
-- Description: Stores available expense categories shown in the app
-- ======================================
CREATE TABLE IF NOT EXISTS expense_categories (
    id VARCHAR(50) PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    icon VARCHAR(20) NOT NULL,
    color VARCHAR(20) NOT NULL,
    sort_order INTEGER NOT NULL
);

-- Seed the default expense categories used by the UI
INSERT INTO expense_categories (id, label, icon, color, sort_order)
VALUES
    ('food', 'Food', '🍔', '#EF4444', 1),
    ('transport', 'Transport', '🚗', '#3B82F6', 2),
    ('shopping', 'Shopping', '🛍️', '#EC4899', 3),
    ('bills', 'Bills', '💡', '#F59E0B', 4),
    ('entertainment', 'Entertainment', '🎬', '#8B5CF6', 5),
    ('health', 'Health', '💊', '#EF4444', 6),
    ('education', 'Education', '📚', '#3B82F6', 7),
    ('housing', 'Housing', '🏠', '#10B981', 8),
    ('subscriptions', 'Subscriptions', '📱', '#3B82F6', 9),
    ('other', 'Other', '📦', '#6B7280', 10)
ON CONFLICT (id) DO NOTHING;

-- ======================================
-- Table: user_roles
-- Description: Junction table for many-to-many relationship between users and roles
-- ======================================
CREATE TABLE IF NOT EXISTS user_roles (
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Create indexes for foreign keys
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role_id ON user_roles(role_id);

-- ======================================
-- Table: transactions
-- Description: Stores user financial transaction entries
-- ======================================
CREATE TABLE IF NOT EXISTS transactions (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    type VARCHAR(20) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    amount NUMERIC(14, 2) NOT NULL,
    transaction_date DATE NOT NULL,
    notes VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_transactions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(transaction_date);

-- ======================================
-- Table: budget_plans
-- Description: Stores per-user monthly budget plans (YYYY-MM)
-- ======================================
CREATE TABLE IF NOT EXISTS budget_plans (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    budget_month VARCHAR(7) NOT NULL,
    amount NUMERIC(14, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_budget_plans_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT uk_budget_plans_user_month UNIQUE (user_id, budget_month)
);

CREATE INDEX IF NOT EXISTS idx_budget_plans_user_id ON budget_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_budget_plans_month ON budget_plans(budget_month);

-- ======================================
-- Function: Update timestamp on row update
-- ======================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ======================================
-- Trigger: Auto-update updated_at for users table
-- ======================================
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_budget_plans_updated_at BEFORE UPDATE ON budget_plans
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ======================================
-- Default Roles Data
-- ======================================
INSERT INTO roles (name, description) 
VALUES 
    ('USER', 'Standard user role with basic permissions'),
    ('ADMIN', 'Administrator role with full permissions')
ON CONFLICT (name) DO NOTHING;

-- ======================================
-- Comments for documentation
-- ======================================
COMMENT ON TABLE roles IS 'Stores user roles for role-based access control';
COMMENT ON TABLE users IS 'Stores user account information';
COMMENT ON TABLE expense_categories IS 'Stores available expense categories shown in the app';
COMMENT ON TABLE user_roles IS 'Junction table for many-to-many relationship between users and roles';
COMMENT ON TABLE transactions IS 'Stores financial transactions for each user';
COMMENT ON TABLE budget_plans IS 'Stores monthly budget plans per user';
COMMENT ON COLUMN users.password IS 'BCrypt hashed password';
COMMENT ON COLUMN users.enabled IS 'Account enabled status';
