CREATE TABLE timeclock_entries(
    entryID INT AUTO_INCREMENT PRIMARY KEY,
    clockIn DATETIME,
    clockOut DATETIME,
    payPeriodID INT,
    employeeID INT,
    scheduledShiftID INT,

    FOREIGN KEY (payPeriodID) REFERENCES pay_periods (payPeriodID),
    FOREIGN KEY (employeeID) REFERENCES employees (employeeID),
    FOREIGN KEY (scheduledShiftID) REFERENCES scheduled_shifts (ScheduledShiftID)
);