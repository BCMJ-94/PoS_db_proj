CREATE TABLE customers(
customer_id INT PRIMARY KEY AUTO_INCREMENT,
firstName VARCHAR(50),
lastName VARCHAR(50),
dob DATE,
phoneNumber VARCHAR(20), -- made it a str for formatting purposes e.g. (XXX)-XXX-XXXX
email VARCHAR(100) UNIQUE,
`status` BOOL DEFAULT false,
rewardPoints INT DEFAULT 0
);