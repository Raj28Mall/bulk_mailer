from flask import Flask, request, jsonify, g
from flask_cors import CORS
import os
from dotenv import load_dotenv # type: ignore
import mysql.connector # type: ignore
app = Flask(__name__)
CORS(app)
load_dotenv()

USER_ID=1

def get_db():
    """Get database connection (create one if not exists)."""
    if 'db' not in g:
        g.db = mysql.connector.connect(
            host=os.getenv("DB_HOST"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            database=os.getenv("DB_NAME")
        )
        g.cursor = g.db.cursor()
    return g.db, g.cursor

@app.teardown_appcontext
def close_db(exception):
    """Close the database connection at the end of the request."""
    db = g.pop('db', None)
    cursor = g.pop('cursor', None)
    if cursor:
        cursor.close()
    if db:
        db.close()

@app.route("/")
def home():
    return "Flask is running!"

@app.route("/about")
def about():
    return "This is the About Page."

@app.route("/contact")
def contact():
    return "Contact me at: rajmall.0206@gmail.com"

@app.route("/user/<name>")
def greet_user(name):
    return f"Hello, {name}!"

@app.route("/api/email_template", methods=['POST'])
def save_template():
    try:
        db, cursor=get_db()
        data = request.json 
        subject = data.get("subject")
        body = data.get("body")

        if not subject or not body:
            return jsonify(error="Please provide both subject and body"), 400
        
        command = "INSERT INTO templates (user_id, subject, body) VALUES (%s, %s, %s)"
        values = (USER_ID,subject, body)
        cursor.execute(command, values)
        db.commit()

        return "Template saved successfully!"
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/email_template", methods=['GET'])
def get_templates():
    try:
        db, cursor = get_db()
        cursor.execute("SELECT * FROM templates WHERE user_id=%s", (USER_ID,))
        templates = cursor.fetchall()
        return jsonify(templates)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)