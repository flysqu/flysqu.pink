from fastapi import FastAPI, Request, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import os
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
    allow_origins=[
        "http://127.0.0.1:8000",  # Adjust port number to match your frontend
        "http://localhost:8000",   # Adjust port number to match your frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api")
def get_spotify_secrets():
    client_tokens = get_client_tokens()
    tokens = get_tokens()
    client_id = client_tokens[0][0]
    client_secret = client_tokens[0][1]
    access_token = tokens[0][0]
    refresh_token = tokens[0][1]
    return spotify_handler.get(client_id, client_secret, access_token, refresh_token)

# Serve the "frontend" directory at "/static"
app.mount("/static", StaticFiles(directory="../frontend"), name="static")

# Serve index.html at "/"
@app.get("/")
async def serve_index():
    index_path = os.path.join(os.path.dirname(__file__), "../frontend/index.html")
    return FileResponse(index_path)