USE bulkmail_db;

CREATE TABLE users (
    id VARCHAR(30) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    picture TEXT
);

CREATE TABLE templates(
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(30), 
    subject VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    body TEXT, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE recipients(
	id INT AUTO_INCREMENT PRIMARY KEY, 
    user_id VARCHAR(30), 
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    description TEXT,
    UNIQUE(user_id, email),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

DROP TABLE users;
DROP TABLE templates;
DROP TABLE recipients;

DESC users;
DESC templates;
DESC recipients;

SELECT * FROM users;
SELECT * FROM templates WHERE user_id=112911780107614691908;
DELETE FROM templates WHERE user_id=112911780107614691908 AND (id = 2 or id = 3);
SELECT * FROM recipients;

SHOW PROCESSLIST;

SHOW WARNINGS;
DESC templates;







