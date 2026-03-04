CREATE DATABASE RestaurantTestDB
CREATE TABLE ingredients(
	ingredientID INT PRIMARY KEY,
    _name SMALLINT,
    pricePerUnit FLOAT,
    quantity FLOAT
);

CREATE TABLE product(
	productID INT PRIMARY KEY,
    _name SMALLINT,
    price FLOAT,
    menuType SMALLINT,
    isAvailable BOOL,
    stationID SMALLINT
);

CREATE TABLE transactions(
	transactionID INT PRIMARY KEY AUTO_INCREMENT,
    tableID INT,
    employeeID INT NOT NULL,
    customerID INT,
    timePlaced DATETIME,
    total FLOAT,
    tipAmount FLOAT,
    paymentMethod SMALLINT
);

CREATE TABLE purchaseOrder(
	orderID INT,
    supplierName VARCHAR(50),
    ingredientID INT,
    quantity INT,
    dateOrdered DATETIME
);

CREATE TABLE productOrders(
	quantity SMALLINT,
	productID INT,
	transactionID INT,
	PRIMARY KEY (transactionID, productID)
);

CREATE TABLE recipe(
	recipeID INT PRIMARY KEY,
	ingredientID INT,
    finished_productID INT,
    intermediate_productID INT
);

CREATE TABLE customers(
	customerID INT PRIMARY KEY AUTO_INCREMENT,
	firstName VARCHAR(50) NOT NULL,
	lastName VARCHAR(50) NOT NULL,
	dob DATE,
	dateJoined DATE,
	phoneNumber VARCHAR(20), -- made it a str for formatting purposes e.g. (XXX)-XXX-XXXX
	email VARCHAR(100) UNIQUE NOT NULL,
	`status` BOOL DEFAULT true,
	rewardPoints INT DEFAULT 0
);

CREATE TABLE employees (
  employeeID INT PRIMARY KEY AUTO_INCREMENT,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  dateHired DATE NOT NULL,
  dateOfBirth DATE,
  ShiftRole SMALLINT,
  hourlyRate FLOAT,
  sectionID INT NOT NULL,
  FOREIGN KEY (sectionID) REFERENCES sections(sectionID)
);

CREATE TABLE pay_periods(
    payPeriodID INT AUTO_INCREMENT PRIMARY KEY,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    CONSTRAINT endDateAfterStartDate CHECK (endDate > startDate)
);

CREATE TABLE payroll_records(
    employeeID INT,
    payPeriodID INT,
    totalHours FLOAT,
    totalPay FLOAT,

    PRIMARY KEY (employeeID, payPeriodID)
);



CREATE TABLE printers(
	stationID SMALLINT PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE scheduled_shifts(
	scheduledShiftID INT PRIMARY KEY AUTO_INCREMENT,
	startTime DATETIME,
	endTime DATETIME,
	shiftRole SMALLINT
);

CREATE TABLE sections (
  sectionID INT PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE tables (
  tableID INT PRIMARY KEY AUTO_INCREMENT,
  capacity INT NOT NULL,
  sectionID INT NOT NULL
);
