USE folkusdb;
INSERT INTO account (UserName, PassWord, Authority) VALUES ("123456","123456", 2);
INSERT INTO account (UserName, PassWord, Authority) VALUES ("123456","123456", 2);
SELECT LAST_INSERT_ID();
INSERT INTO verification (Email,Phone,AccountID) VALUES("Email","PhoneF",LAST_INSERT_ID());
SELECT UserName, PassWord FROM account WHERE UserName = "123456"; 