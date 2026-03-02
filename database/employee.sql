CREATE TABLE employee (
  employeeID INT PRIMARY KEY AUTO_INCREMENT,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  dateOfBirth DATE,
  role SMALLINT,
  hourlyRate FLOAT
);