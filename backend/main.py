import os
import secrets
import asyncio
from fastapi import FastAPI, Request, HTTPException, status, Depends
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import httpx
import time


load_dotenv()
client_id = os.getenv("SPOTIFY_CLIENT_ID")
client_secret = os.getenv("SPOTIFY_CLIENT_SECRET")
redirect_uri = os.getenv("REDIRECT_URI")
frontend_uri = os.getenv("FRONTEND_URI")

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_uri],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


state_store = {}
rate_limit_store = {}


async def handle_rate_limits(
    client: httpx.AsyncClient,
    method: str,
    endpoint: str,
    data: dict = None,
    max_retries: int = 3,
):
    retries = 0
    while retries < max_retries:
        if endpoint in rate_limit_store:
            reset_time = rate_limit_store[endpoint]
            if reset_time > time.time():
                await asyncio.sleep(
                    reset_time - time.time()
                )  # wait until rate limit resets
            del rate_limit_store[endpoint]

        ## Check if endpoint is rate-limited
        if method == "POST":
            response = await client.post(endpoint, data=data)
        else:
            response = await client.get(endpoint)
        # if blocked by rate limit wait for retry time
        if response.status_code == 429:
            retry_after = int(response.headers.get("Retry-After", 1))
            rate_limit_store[endpoint] = time.time() + retry_after
            await asyncio.sleep(retry_after)
            retries += 1
        else:
            return response  # return the response if successful
    raise HTTPException(status_code=429, detail="Rate limit exceeded")


@app.get("/login")
async def login(request: Request):
    state = secrets.token_hex(16)
    state_store[state] = True
    scope = "user-read-private user-read-email user-read-playback-state user-read-currently-playing"
    auth_url = (
        f"https://accounts.spotify.com/authorize?"
        f"response_type=code&client_id={client_id}&"
        f"scope={scope}&redirect_uri={redirect_uri}&state={state}"
    )
    return RedirectResponse(auth_url)


@app.get("/callback")
async def callback(request: Request, code: str = None, state: str = None):
    if not state or state not in state_store:
        raise HTTPException(status_code=400, detail="Invalid state")
    del state_store[state]

    async with httpx.AsyncClient() as client:
        data = {
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": redirect_uri,
            "client_id": client_id,
            "client_secret": client_secret,
        }

        try:
            response = await handle_rate_limits(
                client,
                method="POST",
                endpoint="https://accounts.spotify.com/api/token",
                max_retries=3,
                data=data,
            )
        except HTTPException as e:
            return JSONResponse(
                status_code=e.status_code,
                content={"error": "Spotify API rate limit exceeded"},
            )

        if response.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to get tokens")

        tokens = response.json()
        access_token = tokens["access_token"]
        refresh_token = tokens.get("refresh_token")

    frontend_redirect = f"{frontend_uri}/callback?access_token={access_token}&refresh_token={refresh_token}"
    return RedirectResponse(frontend_redirect)


@app.get("/refresh_token")
async def refresh_token(refresh_token: str):
    async with httpx.AsyncClient() as client:
        data = {
            "grant_type": "refresh_token",
            "refresh_token": refresh_token,
            "client_id": client_id,
            "client_secret": client_secret,
        }
        try:
            response = await handle_rate_limits(
                client=client,
                method="POST",
                data=data,
                endpoint="https://accounts.spotify.com/api/token",
                max_retries=3,
            )
        except HTTPException as e:
            return JSONResponse(
                status_code=e.status_code,
                content={"error": "Spotify API rate limit exceeded"},
            )

        if response.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to refresh token")

        new_tokens = response.json()
        return {
            "access_token": new_tokens["access_token"],
            "refresh_token": new_tokens.get("refresh_token", refresh_token),
        }


@app.get("/current_user")
async def get_current_user(access_token: str):
    async with httpx.AsyncClient() as client:
        headers = {"Authorization": f"Bearer {access_token}"}
        try:
            response = await handle_rate_limits(
                client,
                method="GET",
                endpoint="https://api.spotify.com/v1/me",
                max_retries=3,
            )
            return response.json()
        except HTTPException as e:
            return JSONResponse(
                status_code=e.status_code, content={"error": "Rate limit exceeded"}
            )


@app.get("/logout")
async def logout():
    return RedirectResponse(frontend_uri)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8888, reload=True)
