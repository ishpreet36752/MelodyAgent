# MoodMelody - AI-Powered Music Mood Assistant

MoodMelody is a web application that recommends music playlists based on your mood using Spotify's API and an AI-powered mood detection system.

## 🎵 Features

- Mood-based music recommendations
- Real-time chat interface
- Spotify integration
- Dynamic playlist suggestions
- Responsive design
- Interactive mood selection

## 🔧 Technical Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Spotify OAuth
- **API Integration**: Spotify Web API
- **State Management**: React Hooks

## 🏗️ Project Structure
src/
├── components/
│ ├── ChatInterface.tsx # Main chat interface
│ ├── Header.tsx # Application header with auth
│ ├── MessageList.tsx # Chat messages display
│ ├── MessageInput.tsx # User input component
│ ├── MessageBubble.tsx # Individual message display
│ ├── MoodSelector.tsx # Mood selection interface
│ ├── MusicRecommendations.tsx # Playlist recommendations
│ └── AnimatedLogo.tsx # Animated app logo
├── services/
│ └── musicService.ts # Spotify API integration
├── types/
│ └── chat.ts # TypeScript interfaces
├── pages/
│ ├── Index.tsx # Landing page
│ └── NotFound.tsx # 404 page
└── lib/
└── moodDetection.ts # Mood detection logic

## 🔄 Application Flow

1. **Authentication Flow**:
   - User clicks "Sign In" button
   - Redirected to Spotify OAuth
   - Callback handles token storage
   - Redirected to dashboard

2. **Chat Interface**:
   - User can input their mood via text or select predefined moods
   - AI processes the input to detect mood
   - System fetches relevant playlists from Spotify

3. **Playlist Recommendations**:
   - Based on detected mood
   - Displays playlist details
   - Direct links to Spotify

## 💡 Key Components

### ChatInterface
- Main component orchestrating the application
- Manages message state and mood detection
- Handles user interactions and API calls

### MoodSelector
- Provides predefined mood options
- Interactive mood bubbles
- Triggers playlist recommendations

### MusicRecommendations
- Displays recommended playlists
- Shows playlist details and artwork
- Provides links to Spotify

## 🔐 Authentication

The application uses Spotify's OAuth 2.0 for authentication:
- Access tokens stored in localStorage
- Token expiration handling
- Automatic redirect to login when needed

## 🎨 UI/UX Features

- Glassmorphic design elements
- Responsive layout
- Loading animations (shimmer effects)
- Interactive message bubbles
- Dynamic color themes based on mood

## 🔌 API Integration

### Spotify API Endpoints Used:
- Search API for playlists
- User profile information
- Playlist details

### Mood Detection:
- Pattern matching for mood keywords
- Fallback to predefined moods
- Contextual analysis of user input

## 💾 State Management

The application uses React's useState and useEffect hooks for:
- Message history
- Current mood
- Playlist recommendations
- Loading states
- Authentication status

## 🎯 Implementation Details

### Message Handling
```typescript
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  detectedMood?: MoodType;
}
```

### Mood Types
```typescript
type MoodType = 'happy' | 'sad' | 'energetic' | 'calm' | 'focus';
```

### Playlist Structure
```typescript
interface Playlist {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
  tracks: number;
  owner: string;
}
```

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Spotify Developer credentials
4. Create `.env` file with required keys
5. Run development server: `npm run dev`

## 🔑 Environment Variables

```env
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
REDIRECT_URI=http://localhost:8080/callback
```

## 📝 Notes

- Ensure Spotify Developer account is set up
- Configure correct redirect URIs in Spotify Dashboard
- Handle token refresh mechanism
- Implement error boundaries for production
- updating some stuff