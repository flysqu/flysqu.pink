from fastapi import FastAPI, Request, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
import spotify_handler


def init_db():
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()

    cursor.execute('''CREATE TABLE IF NOT EXISTS tokens (access_token TEXT, refresh_token TEXT, time_at_creation TEXT, expires_in TEXT)''')
    cursor.execute('''CREATE TABLE IF NOT EXISTS client_tokens (client_id TEXT, client_secret TEXT)''')

    conn.commit()
    conn.close()

def get_tokens():
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM tokens")

    secrets = cursor.fetchall()
    conn.close()

    return secrets

def get_client_tokens():
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM client_tokens")
    secrets = cursor.fetchall()
    conn.close()

    return secrets

init_db()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["OPTIONS", "GET"],
    allow_headers=["*"],
)

@app.get("/api/get_currently_playing")
def get_spotify_secrets():
    client_tokens = get_client_tokens()
    tokens = get_tokens()
    client_id = client_tokens[0][0]
    client_secret = client_tokens[0][1]
    access_token = tokens[0][0]
    refresh_token = tokens[0][1]
    return spotify_handler.get(client_id, client_secret, access_token, refresh_token)