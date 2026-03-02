CREATE TABLE payroll_records(
    employeeID INT,
    payPeriodID INT,
    totalHours FLOAT,
    totalPay FLOAT,

    PRIMARY KEY (employeeID, payPeriodID),
    FOREIGN KEY (employeeID) REFERENCES employees (employeeID),
    FOREIGN KEY (payPeriodID) REFERENCES pay_periods (payPeriodID)
);