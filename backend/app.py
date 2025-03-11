from flask import Flask
import os
from dotenv import load_dotenv
import mysql.connector

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, Flask!"

@app.route("/about")
def about():
    return "This is the About Page."

@app.route("/contact")
def contact():
    return "Contact us at: contact@example.com"

@app.route("/user/<name>")
def greet_user(name):
    return f"Hello, {name}!"

load_dotenv()

db = mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME")
)
    
cursor = db.cursor()
cursor.execute("SHOW TABLES")

tables = cursor.fetchall()

if tables:
    print("📌 Tables in the database:")
    for table in tables:
        print(f"  - {table[0]}")
else:
    print("No tables found in the database.")

cursor.close()
db.close()

if __name__ == "__main__":
    app.run(debug=True)