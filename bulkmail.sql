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

CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(255) NULL,
);

CREATE TABLE lists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE contact_list_mapping (
    contact_id INT,
    list_id INT,
    PRIMARY KEY (contact_id, list_id),
    FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE,
    FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE CASCADE
);

INSERT INTO users (sub, email, name, picture) 
VALUES ('abcdefgh', 'rajmall.0206@gmail.com', 'Raj Mall', 'rajukaju');

SELECT * FROM templates;
DELETE FROM templates WHERE id=2;
TRUNCATE TABLE templates;
DROP TABLE templates;
TRUNCATE TABLE contacts;
DROP TABLE contacts;
SELECT * FROM contacts;
SELECT * FROM users;
SELECT * FROM users WHERE email = 'rajmall.0206@gmail.com' OR sub = 'abcdefgh';


SHOW WARNINGS;
DESC templates;
DESC contacts;
