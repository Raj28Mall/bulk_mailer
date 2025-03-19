from google_auth_oauthlib.flow import InstalledAppFlow
import pickle
import requests

SCOPES = [
    "openid", 
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
]


def authenticate():
    flow = InstalledAppFlow.from_client_secrets_file(
        "client_secret.json", SCOPES
    )
    creds = flow.run_local_server(port=5005)

    # Save credentials for later use
    with open("token.pickle", "wb") as token_file:
        pickle.dump(creds, token_file)

    print("Authentication successful!")

    response = requests.get(
    "https://www.googleapis.com/oauth2/v1/userinfo",
    headers={"Authorization": f"Bearer {creds.token}"}
    )

    print("Raw Response:", response.text) 
    print("Status Code:", response.status_code)  

    user_info = response.json()
    print("Parsed User Info:", user_info)


if __name__ == "__main__":
    user_data = authenticate()
    # print(f"Signed in as: {user_data['name']} ({user_data['email']})")
