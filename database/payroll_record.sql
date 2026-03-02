CREATE TABLE PAYROLL_RECORD(
    emloyeeID INT,
    payPeriodID INT,
    totalHours FLOAT,
    totalPay FLOAT,

    PRIMARY KEY (employeeID, payPeriodID),
    -- FOREIGN KEY (employeeID) REFERENCES EMPLOYEES (employeeID)
    FOREIGN KEY (payPeriodID) REFERENCES PAY_PERIOD (payPeriodID)
);