# MoodMelody Current Flow Documentation

This document outlines the complete workflow of the MoodMelody application, explaining the interaction between the FastAPI backend and the TypeScript frontend.

## 1. Project Overview

MoodMelody is a music recommendation application that analyzes user messages to detect mood and recommends appropriate playlists from Spotify. The application integrates with the Spotify API for authentication and playlist retrieval, and uses Hugging Face models for mood detection.

**Backend**: FastAPI server handling Spotify OAuth and token management
**Frontend**: React/TypeScript client with mood detection and playlist UI

[View Project on GitHub](https://github.com/KaranSingh36752/MelodyAgent)

## 2. Authentication Flow

### Backend Authentication Endpoints

* [Login Endpoint](https://github.com/KaranSingh36752/MelodyAgent/blob/main/backend/main.py#L40-L50) - Initiates the Spotify OAuth flow
* [Callback Endpoint](https://github.com/KaranSingh36752/MelodyAgent/blob/main/backend/main.py#L52-L92) - Exchanges auth code for tokens
* [Refresh Token Endpoint](https://github.com/KaranSingh36752/MelodyAgent/blob/main/backend/main.py#L94-L121) - Renews expired access tokens

### Frontend Token Management

* [Token Storage](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/services/musicService.ts#L25-L30) - Retrieves tokens from localStorage
* [Token Expiration Check](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/services/musicService.ts#L32-L35) - Verifies if token needs refreshing
* [Token Refresh Function](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/services/musicService.ts#L37-L52) - Requests new tokens from backend

### Authentication Flow Diagram

![Authentication Flow Diagram](screenshot_placeholder.png)
*Screenshot planned: Diagram showing the OAuth flow from user login to token storage*

## 3. Mood Detection System

### Emotion Classification

* [Emotion Mapping](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/services/musicService.ts#L13-L24) - Converts detected emotions to music moods
* [Primary Detection](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/services/musicService.ts#L125-L137) - Uses Hugging Face model for sentiment analysis
* [Fallback Detection](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/services/musicService.ts#L140-L157) - Text-based mood detection when API fails

### Response Generation

* [Conversational Response](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/services/musicService.ts#L159-L189) - Creates human-like responses to user messages

![Mood Detection Example](screenshot_placeholder.png)
*Screenshot planned: Example of user message and detected mood visualization*

## 4. Playlist Recommendation System

### User Message Processing

* [Process User Message](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/services/musicService.ts#L191-L212) - Main entry point for user interactions
  - Detects mood from user message
  - Fetches playlists based on mood
  - Generates conversational response

### Playlist Fetching 

* [Fetch Playlists](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/services/musicService.ts#L54-L97) - Retrieves playlists from Spotify API based on mood
  - Handles token refresh when needed
  - Formats response into consistent data structure
  - Manages API errors including rate limiting

![Playlist Recommendations](screenshot_placeholder.png)
*Screenshot planned: Example of recommended playlists with UI components*

## 5. Currently Playing Track Recommendations

### Current Track Detection

* [Get Currently Playing Track](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/services/musicService.ts#L215-L231) - Retrieves current track from Spotify

### Similar Track Recommendations

* [Get Track Recommendations](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/services/musicService.ts#L234-L301) - Uses ReccoBeats API to find similar tracks
  - Fetches recommendations based on seed track
  - Retrieves detailed track information from Spotify
  - Formats into consistent UI structure

* [Current Track Recommendations](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/services/musicService.ts#L303-L307) - Convenience function combining the above steps

![Track Recommendations](screenshot_placeholder.png)
*Screenshot planned: Example of track recommendations UI with currently playing track*

## 6. Rate Limiting and Error Handling

### Backend Rate Limit Management

* [Rate Limit Handler](https://github.com/KaranSingh36752/MelodyAgent/blob/main/backend/main.py#L27-L48) - Implements intelligent retry logic for Spotify API

### Frontend Error Handling

* [Playlist Fetch Error Handling](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/services/musicService.ts#L85-L96) - Manages 401 and 429 errors
* [Recommendation Error Handling](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/services/musicService.ts#L294-L301) - Detailed error reporting

![Error Handling](screenshot_placeholder.png)
*Screenshot planned: Example of graceful error handling in the UI*
