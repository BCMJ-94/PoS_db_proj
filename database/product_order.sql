CREATE TABLE product_orders(
quantity SMALLINT,
productID INT,
transactionID INT,
PRIMARY KEY (transactionID, productID),
FOREIGN KEY (transactionID) REFERENCES placeholder_table(placeholder_column),
FOREIGN KEY (productID) REFERENCES placeholder_table(placeholder_column)
);