# MelodyAgent Setup Guide

## 🚨 Critical Issues Fixed

This guide addresses the main problems that were causing 403 and 401 errors:

1. **Scope Mismatch**: Frontend and backend were requesting different Spotify scopes
2. **Environment Variables**: Missing or incorrectly configured environment variables
3. **Error Handling**: Poor error handling for API failures

## 🔧 Environment Setup

### 1. Create Environment Files

#### Frontend (.env file in root directory)
```bash
# Spotify Configuration
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id_here
VITE_SPOTIFY_REDIRECT_URI=http://localhost:8080/callback
VITE_BACKEND_URI=http://localhost:8888

# HuggingFace Configuration
VITE_HF_TOKEN=your_huggingface_api_token_here
```

#### Backend (.env file in backend directory)
```bash
# Spotify Configuration
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
REDIRECT_URI=http://localhost:8888/callback
FRONTEND_URI=http://localhost:8080
```

### 2. Get Required API Keys

#### Spotify API
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Add redirect URI: `http://localhost:8080/callback` (for development)
4. Copy Client ID and Client Secret

#### HuggingFace API
1. Go to [HuggingFace Settings](https://huggingface.co/settings/tokens)
2. Create a new token with read permissions
3. Copy the token

## 🎯 What Was Fixed

### 1. Scope Alignment
- **Before**: Frontend requested only `playlist-modify-public`
- **After**: Both frontend and backend request comprehensive scopes:
  - `user-read-private`
  - `user-read-email` 
  - `user-read-playback-state`
  - `user-read-currently-playing`
  - `playlist-modify-public`
  - `playlist-read-private`

### 2. Environment Variable Handling
- **Before**: Hardcoded localhost URLs and missing environment variables
- **After**: Proper environment variable usage with fallbacks

### 3. Error Handling
- **Before**: App crashed when HuggingFace API failed
- **After**: Graceful fallbacks to text-based mood detection
- **Before**: 403 errors caused app to fail
- **After**: Proper handling of permission issues and premium account requirements

## 🚀 Running the Application

### Development Mode
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
cd backend
python main.py
```

### Production Deployment
1. Update environment variables with production URLs
2. Build frontend: `npm run build`
3. Deploy backend to your hosting service
4. Update redirect URIs in Spotify Developer Dashboard

## 🔍 Troubleshooting

### Still Getting 403 Errors?
1. **Check Scopes**: Ensure user approved all requested scopes during login
2. **Premium Account**: Some features require Spotify Premium
3. **Token Refresh**: Clear localStorage and re-login if tokens are expired

### HuggingFace API Still Failing?
1. **Check Token**: Verify `VITE_HF_TOKEN` is set correctly
2. **Model Access**: Ensure your token has access to the required models
3. **Fallback Mode**: The app will work without HuggingFace using text-based mood detection

### Environment Variables Not Loading?
1. **Restart Dev Server**: Environment changes require server restart
2. **File Location**: Ensure .env files are in the correct directories
3. **Vite Prefix**: Frontend variables must start with `VITE_`

## 📱 Testing Different Accounts

### Why It Works for Your Account
- Your developer account has all required scopes approved
- Tokens are properly stored and refreshed
- Premium features are available

### Why It Fails for Other Accounts
- New users need to approve all scopes during first login
- Each user gets their own tokens
- Some users may not have Premium accounts

### Solution
- Ensure proper OAuth flow for all users
- Handle permission errors gracefully
- Provide fallback features for non-Premium users

## 🎵 Features That Now Work

✅ **Mood Detection**: Works with or without HuggingFace API  
✅ **Playlist Fetching**: Proper Spotify API integration  
✅ **Current Track**: Graceful handling of permission issues  
✅ **User Authentication**: Proper OAuth flow for all users  
✅ **Error Recovery**: App continues working even when APIs fail  

## 🔐 Security Notes

- Never commit .env files to version control
- Use different API keys for development and production
- Regularly rotate API tokens
- Monitor API usage and rate limits
