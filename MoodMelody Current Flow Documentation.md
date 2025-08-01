# MoodMelody Current Flow Documentation

This document outlines the complete workflow of the MoodMelody application, explaining the interaction between the FastAPI backend and the TypeScript frontend.

## 1. Project Overview

MoodMelody is a music recommendation application that analyzes user messages to detect mood and recommends appropriate playlists from Spotify. The application integrates with the Spotify API for authentication and playlist retrieval, and uses Hugging Face models for mood detection.

**Backend**: FastAPI server handling Spotify OAuth and token management
**Frontend**: React/TypeScript client with mood detection and playlist UI

[View Project on GitHub](https://github.com/KaranSingh36752/MelodyAgent)

## 2. Authentication Flow

### Backend Authentication Endpoints

* [Login Endpoint](https://github.com/KaranSingh36752/MelodyAgent/blob/main/backend/main.py#L67-L77) - Initiates the Spotify OAuth flow
* [Callback Endpoint](https://github.com/KaranSingh36752/MelodyAgent/blob/main/backend/main.py#L80-L117) - Exchanges auth code for tokens
* [Refresh Token Endpoint](https://github.com/KaranSingh36752/MelodyAgent/blob/main/backend/main.py#L120-L150) - Renews expired access tokens

### Frontend Token Management

* [Token Storage](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/services/musicService.ts#L27-L32) - Retrieves tokens from localStorage
* [Token Expiration Check](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/services/musicService.ts#L34-L37) - Verifies if token needs refreshing
* [Token Refresh Function](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/services/musicService.ts#L39-L55) - Requests new tokens from backend

## 3. Mood Detection System

### Emotion Classification

* [Emotion Mapping](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/services/musicService.ts#L15-L26) - Converts detected emotions to music moods
* [Primary Detection](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/services/musicService.ts#L113-L126) - Uses Hugging Face model for sentiment analysis
* [Fallback Detection](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/services/musicService.ts#L129-L145) - Text-based mood detection when API fails

### Response Generation

* [Conversational Response](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/services/musicService.ts#L147-L182) - Creates human-like responses to user messages

![Mood Detection Example](assets/Screenshot%202025-04-03%20005104.png)
*Screenshot planned: Example of user message and detected mood visualization*

## 4. Playlist Recommendation System

### User Message Processing

* [Process User Message](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/services/musicService.ts#L184-L205) - Main entry point for user interactions
  - Detects mood from user message
  - Fetches playlists based on mood
  - Generates conversational response

### Playlist Fetching 

* [Fetch Playlists](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/services/musicService.ts#L57-L111) - Retrieves playlists from Spotify API based on mood
  - Handles token refresh when needed
  - Formats response into consistent data structure
  - Manages API errors including rate limiting

![Playlist Recommendations](assets/convo.png)
*Screenshot planned: Example of recommended playlists with UI components*

## 5. Currently Playing Track Recommendations

### Current Track Detection

* [Get Currently Playing Track](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/services/musicService.ts#L208-L227) - Retrieves current track from Spotify

### Similar Track Recommendations

* [Get Track Recommendations](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/services/musicService.ts#L230-L306) - Uses ReccoBeats API to find similar tracks
  - Fetches recommendations based on seed track
  - Retrieves detailed track information from Spotify
  - Formats into consistent UI structure

* [Current Track Recommendations](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/services/musicService.ts#L308-L312) - Convenience function combining the above steps
-Here I mixed the reccoBeats API with the spotify get tracks api endpint as the recconBeats API does not have the image url as the response so I used the spotify get tracks api to get the image url

![Track Recommendations](assets/recommend.png)
*Screenshot planned: Example of track recommendations UI with currently playing track*

## 6. Rate Limiting and Error Handling

### Backend Rate Limit Management

* [Rate Limit Handler](https://github.com/KaranSingh36752/MelodyAgent/blob/main/backend/main.py#L34-L64) - Implements intelligent retry logic for Spotify API

### Frontend Error Handling

* [Playlist Fetch Error Handling](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/services/musicService.ts#L93-L106) - Manages 401 and 429 errors
* [Recommendation Error Handling](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/services/musicService.ts#L294-L301) - Detailed error reporting

## 7. Component Architecture

### Frontend Components

* [ChatInterface](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/components/ChatInterface.tsx) - Main chat component orchestrating all functionality
* [MessageList](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/components/MessageList.tsx) - Displays conversation history
* [MessageInput](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/components/MessageInput.tsx) - Handles user input and message submission
* [MusicRecommendations](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/components/MusicRecommendations.tsx) - Displays recommended playlists
* [ChatSidebar](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/components/ChatSidebar.tsx) - Navigation sidebar
* [Header](https://github.com/KaranSingh36752/MelodyAgent/blob/main/src/components/Header.tsx) - Application header

### Backend Endpoints

* `/login` - Initiates Spotify OAuth flow
* `/callback` - Handles Spotify OAuth callback
* `/refresh_token` - Refreshes Spotify access token
* `/current_user` - Retrieves current Spotify user information
* `/logout` - Handles user logout

## 8. Data Flow Diagram

```mermaid
graph TD
    A[User] --> B[Frontend React App]
    B --> C[Spotify OAuth]
    C --> D[Backend FastAPI]
    D --> E[Spotify API]
    B --> F[Hugging Face API]
    B --> G[ReccoBeats API]
    G --> E
    B --> H[Spotify Web Playback SDK]
```

## 9. Development Setup

### Prerequisites

* Node.js >= 16
* Python >= 3.8
* Spotify Developer Account
* Hugging Face Account

### Frontend Setup

1. Install dependencies: `npm install`
2. Create `.env` file with required variables
3. Run development server: `npm run dev`

### Backend Setup

1. Navigate to backend directory: `cd backend`
2. Install Python dependencies: `pip install -r requirements.txt`
3. Create `.env` file with required variables
4. Run server: `python main.py`

## 10. Testing

### Frontend Testing

* Unit tests for services and utilities
* Component tests for UI elements
* Integration tests for API interactions

### Backend Testing

* Unit tests for API endpoints
* Integration tests for Spotify API interactions
* Load testing for rate limit handling

## 11. Deployment

### Frontend Deployment

* Build for production: `npm run build`
* Deploy to Vercel, Netlify, or similar platform

### Backend Deployment

* Deploy to Heroku, AWS, or similar platform
* Configure environment variables
* Set up SSL certificates

## 12. Monitoring and Analytics

* Error tracking with Sentry
* Performance monitoring
* User behavior analytics
* API usage tracking

## 13. Security Considerations

* Token storage in localStorage (consider more secure alternatives)
* CORS configuration
* Rate limiting implementation
* Input validation and sanitization

## 14. Future Enhancements

* Machine learning model improvements
* Additional music platform integrations
* Social features
* Advanced recommendation algorithms
* Mobile app development
