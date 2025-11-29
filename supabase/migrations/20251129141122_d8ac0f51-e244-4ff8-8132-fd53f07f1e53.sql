-- Add comprehensive dummy data from January to September for test user
-- User ID: 30c54c8f-07f9-4520-90d1-320b22b87f1e

-- Insert monthly income (January - September)
INSERT INTO income (user_id, amount, date, source) VALUES 
-- January
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 5200, '2025-01-05', 'Monthly Salary'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 400, '2025-01-12', 'Freelance Project'),
-- February
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 5400, '2025-02-05', 'Monthly Salary'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 300, '2025-02-18', 'Side Gig'),
-- March
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 5100, '2025-03-05', 'Monthly Salary'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 600, '2025-03-22', 'Freelance Project'),
-- April
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 5600, '2025-04-05', 'Monthly Salary'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 200, '2025-04-15', 'Investment Returns'),
-- May
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 5800, '2025-05-05', 'Monthly Salary'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 500, '2025-05-20', 'Freelance Project'),
-- June
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 6000, '2025-06-05', 'Monthly Salary'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 350, '2025-06-18', 'Side Gig'),
-- July
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 5900, '2025-07-05', 'Monthly Salary'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 450, '2025-07-25', 'Freelance Project'),
-- August
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 6200, '2025-08-05', 'Monthly Salary'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 250, '2025-08-14', 'Investment Returns'),
-- September
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 6100, '2025-09-05', 'Monthly Salary'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 550, '2025-09-19', 'Freelance Project');

-- Insert expenses spread across January - September
INSERT INTO expenses (user_id, amount, date, category, description) VALUES 
-- January expenses
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 1200, '2025-01-01', 'Housing', 'Monthly rent'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 450, '2025-01-08', 'Food', 'Groceries'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 200, '2025-01-12', 'Transportation', 'Gas and parking'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 180, '2025-01-15', 'Utilities', 'Electric bill'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 250, '2025-01-20', 'Entertainment', 'Concert tickets'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 150, '2025-01-25', 'Others', 'Clothing'),
-- February expenses
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 1200, '2025-02-01', 'Housing', 'Monthly rent'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 500, '2025-02-07', 'Food', 'Groceries'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 220, '2025-02-14', 'Transportation', 'Gas and Uber'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 160, '2025-02-16', 'Utilities', 'Water and internet'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 300, '2025-02-20', 'Entertainment', 'Streaming and dining'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 200, '2025-02-25', 'Others', 'Gifts'),
-- March expenses
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 1200, '2025-03-01', 'Housing', 'Monthly rent'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 480, '2025-03-06', 'Food', 'Groceries'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 190, '2025-03-10', 'Transportation', 'Gas'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 175, '2025-03-15', 'Utilities', 'Electric and gas'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 280, '2025-03-22', 'Entertainment', 'Movie night'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 170, '2025-03-28', 'Others', 'Health supplies'),
-- April expenses
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 1200, '2025-04-01', 'Housing', 'Monthly rent'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 520, '2025-04-05', 'Food', 'Groceries'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 210, '2025-04-11', 'Transportation', 'Gas and maintenance'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 190, '2025-04-15', 'Utilities', 'All utilities'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 320, '2025-04-20', 'Entertainment', 'Weekend trip'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 180, '2025-04-26', 'Others', 'Books'),
-- May expenses
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 1200, '2025-05-01', 'Housing', 'Monthly rent'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 460, '2025-05-08', 'Food', 'Groceries'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 200, '2025-05-12', 'Transportation', 'Gas'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 185, '2025-05-16', 'Utilities', 'Electric and water'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 290, '2025-05-23', 'Entertainment', 'Concert'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 160, '2025-05-29', 'Others', 'Pet supplies'),
-- June expenses
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 1200, '2025-06-01', 'Housing', 'Monthly rent'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 550, '2025-06-07', 'Food', 'Groceries'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 230, '2025-06-13', 'Transportation', 'Gas and tolls'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 200, '2025-06-17', 'Utilities', 'All utilities'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 350, '2025-06-22', 'Entertainment', 'Vacation spending'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 190, '2025-06-28', 'Others', 'Summer clothes'),
-- July expenses
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 1200, '2025-07-01', 'Housing', 'Monthly rent'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 490, '2025-07-06', 'Food', 'Groceries'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 215, '2025-07-10', 'Transportation', 'Gas'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 195, '2025-07-15', 'Utilities', 'AC heavy month'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 310, '2025-07-21', 'Entertainment', 'BBQ and events'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 175, '2025-07-27', 'Others', 'Home supplies'),
-- August expenses
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 1200, '2025-08-01', 'Housing', 'Monthly rent'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 510, '2025-08-05', 'Food', 'Groceries'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 225, '2025-08-09', 'Transportation', 'Gas and car wash'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 210, '2025-08-14', 'Utilities', 'All utilities'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 330, '2025-08-20', 'Entertainment', 'Festival'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 185, '2025-08-26', 'Others', 'Electronics'),
-- September expenses
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 1200, '2025-09-01', 'Housing', 'Monthly rent'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 470, '2025-09-08', 'Food', 'Groceries'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 205, '2025-09-12', 'Transportation', 'Gas'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 180, '2025-09-16', 'Utilities', 'Electric and internet'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 295, '2025-09-22', 'Entertainment', 'Sports event'),
('30c54c8f-07f9-4520-90d1-320b22b87f1e', 165, '2025-09-28', 'Others', 'Fall clothing');