CREATE TABLE timeclock_entries(
    entryID INT AUTO_INCREMENT PRIMARY KEY,
    clockIn DATETIME,
    clockOut DATETIME,
    payPeriodID INT,
    employeeID INT,

    FOREIGN KEY (payPeriodID) REFERENCES PAY_PERIOD(payPeriodID),
    -- FOREIGN KEY (employeeID) REFERENCES EMPLOYEES
);