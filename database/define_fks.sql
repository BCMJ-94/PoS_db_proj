#recipe foreign keys
ALTER TABLE recipes
ADD CONSTRAINT fkFinishedProductID
FOREIGN KEY (finishedProductID) REFERENCES products(productID),
ADD CONSTRAINT fkIntermediateProductID
FOREIGN KEY (intermediateProductID) REFERENCES products(productID),
ADD CONSTRAINT fkIngredientID
FOREIGN KEY (ingredientID) REFERENCES ingredients(ingredientID);

#transactions foreign keys
ALTER TABLE transactions
ADD CONSTRAINT fkTableID
FOREIGN KEY (tableID) REFERENCES `tables`(tableID),
ADD CONSTRAINT fkEmployeeID
FOREIGN KEY (employeeID) REFERENCES employees(employeeID);

#product_order foreign keys
ALTER TABLE product_orders
ADD CONSTRAINT fkTransactionID
FOREIGN KEY (transactionID) REFERENCES transactions(transactionID),
ADD CONSTRAINT fkProductID
FOREIGN KEY (productID) REFERENCES products(productID);

#table foreign keys
ALTER TABLE `tables`
ADD CONSTRAINT fkSectionID
FOREIGN KEY (sectionID) REFERENCES sections(sectionID);

#payrollRecords foreign keys
ALTER TABLE payroll_records
ADD CONSTRAINT fkPayrollRecordsEmployeeID
FOREIGN KEY (employeeID) REFERENCES employees (employeeID),
ADD CONSTRAINT fkPayrollRecordsPayPeriodID
FOREIGN KEY (payPeriodID) REFERENCES pay_periods (payPeriodID);

#timeclockEntries
ALTER TABLE timeclock_entries
ADD CONSTRAINT fkTimeClockEntriesPayPeriodID
FOREIGN KEY (payPeriodID) REFERENCES pay_periods (payPeriodID),
ADD CONSTRAINT fkTimeClockEntriesEmployeeID
FOREIGN KEY (employeeID) REFERENCES employees (employeeID),
ADD CONSTRAINT fkTimeClockEntriesScheduledShiftID
FOREIGN KEY (scheduledShiftID) REFERENCES scheduled_shifts (scheduledShiftID);
