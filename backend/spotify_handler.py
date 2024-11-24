import base64
import sqlite3
import requests
from typing import Dict
import time
import json

def refresh_spotify_token(client_id: str, client_secret: str, access_token: str, refresh_token: str) -> Dict[str, str]:
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
            'refresh_token': refresh_token
        }
    )
    
    # Raise an error if the request failed
    response.raise_for_status()
    
    # Get the new tokens
    token_data = response.json()
    #print(token_data)

    # Update the secrets
    access_token = token_data["access_token"]
    # Some responses don't include a new refresh token, so only update if present
    if 'refresh_token' in token_data:
        refresh_token = token_data["refresh_token"]
    
    expires_in = token_data['expires_in']
    time_at_creation = time.time()

    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()
    cursor.execute('DELETE FROM tokens')
    conn.commit

    cursor.execute("INSERT INTO tokens (access_token, refresh_token, time_at_creation, expires_in) VALUES (?, ?, ?, ?)", (access_token, refresh_token, time_at_creation, expires_in))
    conn.commit()
    conn.close()

    
    return {
    "access_token": access_token,
    "refresh_token": refresh_token
    }

def get_spotify_currently_playing(access_token: str) -> dict:
    url = "https://api.spotify.com/v1/me/player/currently-playing"
    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    try:
        # Make the GET request to Spotify's API
        response = requests.get(url, headers=headers)
        
        # Check for success
        if response.status_code == 200:
            response_json = response.json()

            artists = []

            cont = True
            i = 0
            for artist in response_json["item"]["artists"]:
                artists.append(response_json["item"]["artists"][i]["name"])
                print(artists)
                i += 1
            
            currently_playing_song = {"title": response_json["item"]["name"], "is_playing": response_json["is_playing"], "progress_ms": response_json["progress_ms"], "duration_ms": response_json["item"]["duration_ms"], "artists": artists}
            return currently_playing_song
        elif response.status_code == 204:
            # 204 No Content means no track is currently playing
            print("No track is currently playing.")
            return {}
        else:
            # Handle other HTTP errors
            print(f"Failed to fetch currently playing track: {response.status_code} - {response.text}")
            return {}
    except requests.RequestException as e:
        print(f"An error occurred while fetching the currently playing track: {e}")
        return {}

def get(client_id: str, client_secret: str, access_token: str, refresh_token: str) -> Dict[str, str]:
    #check if spotify secret updating is needed, if not run code to get status
    tokens = refresh_spotify_token(client_id, client_secret, access_token, refresh_token)
    print(tokens)
    track_data = get_spotify_currently_playing(tokens["access_token"])
    return track_data