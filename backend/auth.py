from google_auth_oauthlib.flow import InstalledAppFlow
import pickle
import requests

SCOPES = [
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile"
]

def authenticate():
    flow = InstalledAppFlow.from_client_secrets_file(
        "client_secret.json", SCOPES
    )
    creds = flow.run_local_server(port=5050)

    # Save credentials for later use
    with open("token.pickle", "wb") as token_file:
        pickle.dump(creds, token_file)

    print("Authentication successful!")

    # Fetch user info
    user_info = requests.get(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        headers={"Authorization": f"Bearer {creds.token}"}
    ).json()

    print("User Info:", user_info)  # Prints email and name
    return user_info

if __name__ == "__main__":
    user_data = authenticate()
    print(f"Signed in as: {user_data['name']} ({user_data['email']})")
