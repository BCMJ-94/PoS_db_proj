CREATE TABLE PAY_PERIOD(
    payPeriodID INT AUTO_INCREMENT PRIMARY KEY,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    CONSTRAINT endDateAfterStartDate CHECK (endDate > startDate)
);