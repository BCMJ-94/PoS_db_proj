CREATE TABLE timeclock_entries(
    entryID INT AUTO_INCREMENT PRIMARY KEY,
    clockIn DATETIME,
    clockOut DATETIME,
    payPeriodID INT,
    employeeID INT,

    FOREIGN KEY (payPeriodID) REFERENCES pay_period (payPeriodID),
    FOREIGN KEY (scheduledShiftID) REFERENCES scheduled_shifts (ScheduluedShiftID)
    -- FOREIGN KEY (employeeID) REFERENCES EMPLOYEES
);