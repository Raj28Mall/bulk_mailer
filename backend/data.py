import pandas as pd
import re, html

def sanitize_input(text):
    """Escape HTML and strip dangerous characters"""
    return html.escape(str(text).strip()) if pd.notna(text) else ""

def is_valid_email(email):
    """Check if the email format is valid"""
    email_regex = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    return bool(re.match(email_regex, email))



def getContacts(filepath):
    file= pd.read_csv(filepath, dtype=str)
    file.columns=file.columns.str.lower().str.strip()
    file = file.map(sanitize_input)  # To protect against XSS and SQL injkections (ion know what that function is doing really)

    if file.isnull().values.any():
        return ({'message': 'false', "error": "Empty values detected"})
    
    required_headers=['email', 'name', 'description']
    file_headers=[h.lower().strip() for h in file.columns]

    if (file_headers) != required_headers:
        return ({"error": "Invalid headers. Use only email, name, description."})
    
    invalid_emails = file[~file["email"].apply(is_valid_email)]
    if not invalid_emails.empty:
        return ({"error": f"Invalid email(s) found: {invalid_emails['email'].tolist()}"})
    
    return {'message':'true', 'contacts':file.to_dict(orient='records')}
