#recipe foreign keys
ALTER TABLE recipe
ADD CONSTRAINT fk_finished_productID
FOREIGN KEY (finished_productID) REFERENCES product(productID),
ADD CONSTRAINT fk_intermediate_productID
FOREIGN KEY (intermediate_productID) REFERENCES product(productID),
ADD CONSTRAINT fk_ingredientID
FOREIGN KEY (ingredientID) REFERENCES ingredients(ingredientID);

#transactions foreign keys
ALTER TABLE transactions
ADD CONSTRAINT fk_tableID
FOREIGN KEY (tableID) REFERENCES table_(tableID),
ADD CONSTRAINT fk_employeeID
FOREIGN KEY (employeeID) REFERENCES employee(employeeID);

#product_order foreign keys
ALTER TABLE product_orders
ADD CONSTRAINT fk_transactionID
FOREIGN KEY (transactionID) REFERENCES transactions(transactionID),
ADD CONSTRAINT fk_productID
FOREIGN KEY (productID) REFERENCES product(productID);

#table foreign keys
ALTER TABLE sections
ADD CONSTRAINT fk_sectionID
FOREIGN KEY (sectionID) REFERENCES sections(sectionID);

#payrollRecords foreign keys
ALTER TABLE payroll_records
ADD CONSTRAINT fk_payrollRecordsemployeeID
FOREIGN KEY (employeeID) REFERENCES employees (employeeID),
ADD CONSTRAINT fk_payrollRecordspayPeriodID
FOREIGN KEY (payPeriodID) REFERENCES pay_periods (payPeriodID);

#timeclockEntries
ALTER TABLE timeclock_entries
ADD CONSTRAINT fk_timeclockEntriespayPeriodID
FOREIGN KEY (payPeriodID) REFERENCES payPeriods (payPeriodID),
ADD CONSTRAINT fk_timeclockEntriesemployeeID
FOREIGN KEY (employeeID) REFERENCES employees (employeeID),
ADD CONSTRAINT fk_timeclockEntriesscheduledShiftID
FOREIGN KEY (scheduledShiftID) REFERENCES scheduledShifts (scheduledShiftID)
