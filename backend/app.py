from flask import Flask, request, jsonify, g
from flask_cors import CORS
import os
import uuid
from dotenv import load_dotenv # type: ignore
import mysql.connector # type: ignore
from data import getContacts

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": r"http://localhost:\d+"}}, supports_credentials=True)
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

@app.route("/api/email_template", methods=['POST'])
def save_template():
    try:
        db, cursor=get_db()
        data = request.json 
        subject = data.get("subject")
        body = data.get("body")
        name=data.get("name")

        if not subject or not body:
            return jsonify(error="Please provide both subject and body"), 400

        if not name:
            name=subject
        
        command = "INSERT INTO templates (user_id, name,  subject, body) VALUES (%s, %s, %s, %s)"
        values = (USER_ID, name, subject, body)
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

@app.route("/api/email_template/<int:id>", methods=['DELETE'])
def delete_template(id):
    try:
        db, cursor = get_db()
        cursor.execute("DELETE FROM templates WHERE id=%s", (id,))
        db.commit()
        return jsonify({"success": True}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/contacts", methods=["POST"])
def handleCSV():
    file=request.files['file']
    
    if not file or file.filename == '':
        return jsonify({'message': 'false', 'error':'No file received'}), 400
    
    if file.filename.split('.')[-1] != 'csv':
        return jsonify({'message':'false', 'error':'Incorrect file format'}), 400

    unique_filename= f"{str(uuid.uuid4())}_{file.filename}"
    filepath=os.path.join('/tmp', unique_filename)
    file.save(filepath)

    try:
        contact_data= getContacts(filepath)
        # if not contact_data.message:
        #     return jsonify(contact_data), 400
        return jsonify({'message':'true'}, {'contacts': contact_data}), 200
    except Exception as e:
        return jsonify({'message':'false', 'error':str(e)}), 400
    finally:
        if os.path.exists(filepath):
            os.remove(filepath)

    # try:
    #     db, cursor=get_db()
        # have to handle file of CSV into pandas and numpy bla bla bla, so will send to another function in backend, which will check
        # if the file is valid or not, if valid then will save the contact data in database


if __name__ == "__main__":
    app.run(debug=True)