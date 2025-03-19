import base64
import pickle
from email.mime.text import MIMEText
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/gmail.send"]

def load_credentials():
    with open("token.pickle", "rb") as token_file:
        creds = pickle.load(token_file)
    return creds

def send_email(to_email, subject, message_body):
    creds = load_credentials()
    service = build("gmail", "v1", credentials=creds)

    message = MIMEText(message_body)
    message["to"] = to_email
    message["subject"] = subject
    raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode()

    message = {"raw": raw_message}

    try:
        service.users().messages().send(userId="me", body=message).execute()
        print(f"Email sent to {to_email}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    send_email("rajmall.0206@gmail.com", "Test Subject", "Hello, this is a test email!")
