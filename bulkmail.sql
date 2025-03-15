USE bulkmail_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sub VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    picture TEXT
);

CREATE TABLE templates(
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, 
    subject VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    body TEXT, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE recipients(
	id INT AUTO_INCREMENT PRIMARY KEY, 
    user_id INT, 
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    description TEXT,
    UNIQUE(user_id, email),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);


INSERT INTO users (sub, email, name, picture) 
VALUES ('abcdefgh', 'rajmall.0206@gmail.com', 'Raj Mall', 'rajukaju');

SELECT * FROM templates;
DELETE FROM templates WHERE id=2;
TRUNCATE TABLE templates;
DROP TABLE templates;

SHOW WARNINGS;
DESC templates;








