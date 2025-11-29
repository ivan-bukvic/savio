-- Insert dummy expenses for test user
INSERT INTO expenses (user_id, amount, date, category, description) VALUES 
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 1200, '2025-01-15', 'Housing', 'Monthly rent payment'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 350, '2025-01-18', 'Food', 'Grocery shopping'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 150, '2025-01-20', 'Transportation', 'Gas and parking'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 200, '2025-01-22', 'Entertainment', 'Concert tickets'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 120, '2025-01-25', 'Utilities', 'Electric and water bills'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 250, '2025-01-10', 'Food', 'Dining out'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 80, '2025-01-12', 'Transportation', 'Uber rides'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 100, '2025-01-14', 'Entertainment', 'Streaming subscriptions'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 180, '2025-01-16', 'Others', 'Clothing purchase');

-- Insert dummy income for test user
INSERT INTO income (user_id, amount, date, source) VALUES 
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 5000, '2025-01-01', 'Monthly Salary'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 500, '2025-01-15', 'Freelance Project'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 150, '2025-01-20', 'Investment Returns');

-- Insert dummy savings goals for test user
INSERT INTO savings_goals (user_id, goal_name, target_amount, current_progress, due_date) VALUES 
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 'Emergency Fund', 10000, 7500, '2025-12-31'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 'Vacation', 3000, 1800, '2025-06-30'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 'New Car', 15000, 5000, '2026-06-30'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 'Home Down Payment', 50000, 12000, '2027-12-31');

-- Insert dummy debts for test user
INSERT INTO debts (user_id, debt_name, balance, interest_rate, minimum_payment, due_date) VALUES 
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 'Credit Card', 2500, 18.5, 75, '2025-02-15'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 'Student Loan', 15000, 4.5, 200, '2025-02-01'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 'Car Loan', 8000, 6.2, 250, '2025-02-10');