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
FOREIGN KEY (employeeID) REFERENCES employee(employeeID)
