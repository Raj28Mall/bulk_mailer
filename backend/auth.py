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

    with open("token.pickle", "wb") as token_file:
        pickle.dump(creds, token_file)

    print("Authentication successful!")

    response = requests.get(
    "https://www.googleapis.com/oauth2/v1/userinfo",
    headers={"Authorization": f"Bearer {creds.token}"}
    )

    raw_user_info=response.json()
    user_info={}
    user_info["id"]=raw_user_info["id"]
    user_info["name"]=raw_user_info["name"]
    user_info["email"]=raw_user_info["email"]
    user_info["picture"]=raw_user_info["picture"]
    return user_info


if __name__ == "__main__":
    user_data = authenticate()
