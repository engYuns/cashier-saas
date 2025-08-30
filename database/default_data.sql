-- Insert default tenant
INSERT INTO tenants (name, domain, currency) VALUES 
('Demo Business', 'demo.localhost', 'USD');

-- Insert default superadmin user (password: admin123)
INSERT INTO users (tenant_id, email, password_hash, first_name, last_name, role) VALUES 
(1, 'admin@demo.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Super', 'Admin', 'superadmin');
