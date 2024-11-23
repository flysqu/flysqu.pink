import base64
import sqlite3
import requests
from typing import Dict
import time

def refresh_spotify_token(spotify_secrets: Dict[str, str], client_id: str, client_secret: str) -> Dict[str, str]:


    # Encode client ID and secret in base64 for authorization header
    auth = base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()
    
    # Make the token refresh request
    response = requests.post(
        'https://accounts.spotify.com/api/token',
        headers={
            'Authorization': f'Basic {auth}',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data={
            'grant_type': 'refresh_token',
            'refresh_token': spotify_secrets['refresh_token']
        }
    )
    
    # Raise an error if the request failed
    response.raise_for_status()
    
    # Get the new tokens
    token_data = response.json()
    print(token_data)

    # Update the secrets
    spotify_secrets['access_token'] = token_data['access_token']
    # Some responses don't include a new refresh token, so only update if present
    if 'refresh_token' in token_data:
        spotify_secrets['refresh_token'] = token_data['refresh_token']
    
    expires_in = token_data['expires_in']
    time_at_creation = time.time()

    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()
    cursor.execute('DELETE * FROM secrets')
    conn.commit

    cursor.execute("INSERT INTO secrets (access_token, refresh_token, time_at_creation, expires_in) VALUES (?, ?, ?, ?)", (spotify_secrets['access_token'], spotify_secrets['refresh_token'], time_at_creation, expires_in))
    conn.commit()
    conn.close()

    print(spotify_secrets)
    return spotify_secrets

def get(client_secrets, tokens) -> Dict[str, str]:
    #check if spotify secret updating is needed, if not run code to get status

    spotify_secrets = {"access_token": "BQClMXWGRfJCUgIm0bbrH8Em1qeoZ86WdUsDamF6zFxvUvnQC9TVIx3q1oZqZIM6f6096f7rxywd6cQuBkhJRrESvPBHxnjWPnZ-F4-d6vfYIM0ZlHNh3XkjHP0efMVZ24HkBGBH-KeKuWPVWMSR1zijlJkNE7s6N-59G1C2HsLj2Ga90xZ-va8uBtAeiwJXxz2SobWPYmbftoCYcnU", "refresh_token": "AQAZUpZu-R00Oslj1fWQhwVGNGRKGDfJeszXHugi5cfAzfmllOEbD279XRKPWvk6rC_RzD6A7Mx6d2XZJrYDDCdDF1mflntPrXLLPJJosH2Fh_SAPzCTyFVzyojFBP79P3g"}
    client_id = "fe35b3ffb54344b6b3c01737a3eeac5e"
    client_secret = "f729812dd7f344b391158693ff270297"
    
    return refresh_spotify_token(spotify_secrets, client_id, client_secret)