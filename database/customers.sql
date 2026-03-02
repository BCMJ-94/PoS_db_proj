CREATE TABLE customers(
customerID INT PRIMARY KEY AUTO_INCREMENT,
firstName VARCHAR(50) NOT NULL,
lastName VARCHAR(50) NOT NULL,
dob DATE,
phoneNumber VARCHAR(20), -- made it a str for formatting purposes e.g. (XXX)-XXX-XXXX
email VARCHAR(100) UNIQUE,
`status` BOOL DEFAULT false,
rewardPoints INT DEFAULT 0
);