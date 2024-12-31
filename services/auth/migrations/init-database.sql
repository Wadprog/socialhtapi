-- Create roles table
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description VARCHAR(255),
    access_level INT NOT NULL
);

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    email_verification_key VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Create auth table
CREATE TABLE auth (
    user_id INT NOT NULL,
    password_reset_key VARCHAR(255) UNIQUE,
    password_reset_expires TIMESTAMP,
    CHECK (
        (password_reset_key IS NOT NULL AND password_reset_expires IS NOT NULL) OR 
        (password_reset_key IS NULL AND password_reset_expires IS NULL)
    ),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create logins table
CREATE TABLE logins (
    user_id INT NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert default roles
INSERT INTO roles (name, description, access_level) 
VALUES 
('admin', 'Admin user', 1),
('user', 'Regular user', 3),
('moderator', 'Moderator user', 2),
('superadmin', 'Super admin user', 0);

-- Insert default user
INSERT INTO users (first_name, last_name, email, password, role_id)
VALUES 
('Dev', 'One', 'default@app.com', 'admin', 1);

-- kubectl create configmap auth-init-config --from-file=init-database.sql=./services/auth/migrations/init-database.sql

