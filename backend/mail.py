import base64
import pickle
from email.mime.text import MIMEText
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/gmail.send"]

def load_credentials():
    with open("token.pickle", "rb") as token_file:
        creds = pickle.load(token_file)
    return creds

def send_test_email(subject, message_body, to_email):
    creds = load_credentials()
    service = build("gmail", "v1", credentials=creds)

    message = MIMEText(message_body)
    message["to"] = to_email
    message["subject"] = subject
    raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode()

    final_mail = {"raw": raw_message}

    try:
        service.users().messages().send(userId="me", body=final_mail).execute()
        print(f"Email sent to {to_email}")
        return True
    except Exception as e:
        print(f"Error: {e}")
        return False

def send_all_email(subject, message_body, to_emails, to_names=None):
    success=True
    creds=load_credentials()
    service=build("gmail", "v1", credentials=creds)
    names_provided=False
    if to_names:
        names_provided=True
        if len(to_emails) != len(to_names):
            print("Number of names and emails do not match")
            return

    for i, to_email in enumerate(to_emails):
        if names_provided:
            body=message_body.replace("[name]", to_names[i])
        else:
            body=message_body
        message = MIMEText(body)
        message["subject"] = subject
        message["to"] = to_email
        raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode()
        final_mail = {"raw": raw_message}
        try:
            service.users().messages().send(userId="me", body=final_mail).execute()
            print(f"Email sent to {to_email}")
        except Exception as e:
            print(f"Error sending to {to_email}: {e}")
            success = False  

    return success

if __name__=="__main__":
    send_all_email(["raj282bss@gmail.com", "rajmall.0206@gmail.com", "anamikameghrag@gmail.com"], "Test from python terminal", "This is a test email from python terminal")