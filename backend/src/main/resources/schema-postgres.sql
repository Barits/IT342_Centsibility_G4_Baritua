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
    enabled BOOLEAN DEFAULT TRUE, -- Account enabled status
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_email ON users(email);

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
COMMENT ON TABLE user_roles IS 'Junction table for many-to-many relationship between users and roles';
COMMENT ON COLUMN users.password IS 'BCrypt hashed password';
COMMENT ON COLUMN users.enabled IS 'Account enabled status';
