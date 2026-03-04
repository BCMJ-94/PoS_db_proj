CREATE TABLE employees (
  employeeID INT PRIMARY KEY AUTO_INCREMENT,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  dateHired DATE NOT NULL,
  dateOfBirth DATE,
  ShiftRole SMALLINT,
  hourlyRate FLOAT

  sectionID INT NOT NULL,
  FOREIGN KEY (sectionID) REFERENCES sections(sectionID)
);