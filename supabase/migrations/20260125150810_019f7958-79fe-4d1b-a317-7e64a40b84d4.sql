-- First, clean up any existing data for the demo user savio@test.com
DELETE FROM income WHERE user_id = 'e64058d3-a8a4-4da6-94e1-5a4c623ed315';
DELETE FROM expenses WHERE user_id = 'e64058d3-a8a4-4da6-94e1-5a4c623ed315';
DELETE FROM savings_goals WHERE user_id = 'e64058d3-a8a4-4da6-94e1-5a4c623ed315';
DELETE FROM debts WHERE user_id = 'e64058d3-a8a4-4da6-94e1-5a4c623ed315';

-- Insert demo income data for savio@test.com
INSERT INTO income (user_id, source, amount, date) VALUES
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Monthly Salary', 5800, '2025-01-01'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Freelance Project', 1200, '2025-01-12'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Investment Returns', 350, '2025-01-20'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Monthly Salary', 5800, '2025-02-01'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Side Gig', 450, '2025-02-10'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Freelance Project', 2100, '2025-02-18'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Investment Returns', 280, '2025-02-25'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Monthly Salary', 5800, '2025-03-01'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Freelance Project', 3200, '2025-03-15'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Side Gig', 600, '2025-03-22'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Monthly Salary', 6000, '2025-04-01'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Investment Returns', 520, '2025-04-10'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Freelance Project', 1800, '2025-04-20'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Side Gig', 380, '2025-04-28'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Monthly Salary', 6000, '2025-05-01'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Freelance Project', 2500, '2025-05-12'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Investment Returns', 410, '2025-05-22'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Monthly Salary', 6000, '2025-06-01'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Side Gig', 720, '2025-06-08'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Freelance Project', 2800, '2025-06-18'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Investment Returns', 380, '2025-06-26'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Monthly Salary', 6200, '2025-07-01'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Freelance Project', 1500, '2025-07-14'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Side Gig', 550, '2025-07-25'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Monthly Salary', 6200, '2025-08-01'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Investment Returns', 620, '2025-08-12'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Freelance Project', 3500, '2025-08-20'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Side Gig', 480, '2025-08-28'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Monthly Salary', 6200, '2025-09-01'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Freelance Project', 2200, '2025-09-10'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Investment Returns', 450, '2025-09-18'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Side Gig', 350, '2025-09-25');

-- Insert demo expenses data for savio@test.com
INSERT INTO expenses (user_id, category, amount, date, description) VALUES
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Food & Dining', 680, '2025-01-05', 'Groceries'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Transportation', 320, '2025-01-08', 'Gas & transit'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Entertainment', 150, '2025-01-15', 'Streaming services'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Bills & Utilities', 420, '2025-01-20', 'Electric & internet'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Shopping', 280, '2025-01-25', 'Clothing'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Food & Dining', 720, '2025-02-04', 'Groceries & dining out'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Transportation', 290, '2025-02-10', 'Fuel'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Entertainment', 200, '2025-02-14', 'Concert tickets'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Healthcare', 180, '2025-02-18', 'Pharmacy'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Bills & Utilities', 450, '2025-02-22', 'Utilities'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Food & Dining', 650, '2025-03-03', 'Groceries'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Transportation', 350, '2025-03-08', 'Car maintenance'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Shopping', 420, '2025-03-15', 'Electronics'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Entertainment', 180, '2025-03-20', 'Movies & games'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Bills & Utilities', 400, '2025-03-28', 'Phone & internet'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Food & Dining', 700, '2025-04-02', 'Groceries'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Transportation', 280, '2025-04-09', 'Gas'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Travel', 850, '2025-04-15', 'Weekend trip'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Entertainment', 220, '2025-04-22', 'Dining out'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Bills & Utilities', 380, '2025-04-28', 'Utilities'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Food & Dining', 680, '2025-05-05', 'Groceries'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Transportation', 310, '2025-05-12', 'Fuel & parking'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Healthcare', 250, '2025-05-18', 'Doctor visit'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Entertainment', 160, '2025-05-24', 'Subscriptions'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Shopping', 350, '2025-05-30', 'Home goods'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Food & Dining', 750, '2025-06-03', 'Groceries & dining'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Transportation', 340, '2025-06-10', 'Gas'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Entertainment', 280, '2025-06-16', 'Events'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Bills & Utilities', 420, '2025-06-22', 'AC & utilities'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Shopping', 180, '2025-06-28', 'Accessories'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Food & Dining', 720, '2025-07-04', 'BBQ supplies'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Transportation', 260, '2025-07-11', 'Fuel'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Travel', 1200, '2025-07-18', 'Vacation'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Entertainment', 190, '2025-07-24', 'Theme park'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Bills & Utilities', 480, '2025-07-30', 'Summer utilities'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Food & Dining', 690, '2025-08-05', 'Groceries'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Transportation', 300, '2025-08-12', 'Gas & repairs'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Education', 450, '2025-08-18', 'Online course'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Entertainment', 210, '2025-08-24', 'Streaming'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Shopping', 520, '2025-08-30', 'Back to school'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Food & Dining', 660, '2025-09-03', 'Groceries'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Transportation', 290, '2025-09-10', 'Commute'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Entertainment', 175, '2025-09-17', 'Movies'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Bills & Utilities', 390, '2025-09-24', 'Utilities'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Healthcare', 120, '2025-09-28', 'Pharmacy');

-- Insert demo savings goals for savio@test.com
INSERT INTO savings_goals (user_id, goal_name, target_amount, current_progress, due_date) VALUES
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Emergency Fund', 10000, 6500, '2025-12-31'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Vacation Trip', 3000, 1800, '2025-08-15'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'New Laptop', 2000, 1200, '2025-06-30');

-- Insert demo debts for savio@test.com
INSERT INTO debts (user_id, debt_name, balance, interest_rate, minimum_payment, due_date) VALUES
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Student Loan', 25000, 4.5, 280, '2030-05-01'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Car Loan', 12000, 6.0, 350, '2027-03-15'),
  ('e64058d3-a8a4-4da6-94e1-5a4c623ed315', 'Credit Card', 2500, 18.9, 75, '2025-12-01');