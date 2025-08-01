# Vibe Chat - Moodly

> *"The perfect soundtrack for every emotion, powered by AI"*

Vibe Chat - Moodly is an innovative platform that transforms your mood into personalized music experiences. Whether you're a music lover seeking the perfect playlist or a producer looking for inspiration, our AI-powered assistant curates the ideal soundtrack for your current vibe.

## Features

### For Music Lovers
- **AI-Powered Mood Detection** - Describe your mood in natural language and let our AI understand your emotions
- **Personalized Playlists** - Get Spotify playlists that match your current vibe
- **Smart Recommendations** - Discover new music based on your emotional state
- **Mood Tracking** - See how your music tastes evolve with your emotions
- **Currently Playing Integration** - Get recommendations based on what you're currently listening to

### For Music Producers
- **Mood Analysis** - Understand the emotional impact of your tracks
- **Genre Insights** - See how your music fits into different mood categories
- **Trending Moods** - Stay ahead of what listeners are feeling right now
- **Collaboration** - Connect with other producers and artists in the community

## Technical Stack

### Core Technologies
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Shadcn/UI
- **State Management**: React Hooks + Context API
- **Build Tool**: Vite

### Key Integrations
- **Music Platform**: Spotify Web API
- **Authentication**: Spotify OAuth 2.0
- **AI/ML**: Hugging Face emotion detection models
- **Real-time Updates**: WebSockets for live interactions

### Development Tools
- **Linting**: ESLint + Prettier
- **Version Control**: Git + GitHub
- **Package Manager**: npm

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── chat/            # Chat interface components
│   │   ├── ChatInterface.tsx      # Main chat controller
│   │   ├── MessageList.tsx        # Message display
│   │   ├── MessageInput.tsx       # User input field
│   │   └── MessageBubble.tsx      # Individual message UI
│   │
│   ├── music/           # Music-related components
│   │   ├── MusicCard.tsx          # Playlist/track display
│   │   └── MusicRecommendations.tsx # Recommendations view
│   │
│   ├── mood/            # Mood-related components
│   │   ├── MoodSelector.tsx      # Mood selection UI
│   │   └── MoodBubble.tsx        # Visual mood indicators
│   │
│   └── layout/          # Layout components
│       ├── Header.tsx           # App header
│       ├── ChatSidebar.tsx      # Navigation sidebar
│       └── AppSidebar.tsx       # Main app sidebar
│
├── pages/               # Page components
│   ├── Index.tsx       # Landing page
│   └── NotFound.tsx    # 404 page
│
├── services/            # API and service integrations
│   ├── auth.ts         # Authentication logic
│   └── musicService.ts # Spotify API wrapper
│
├── hooks/               # Custom React hooks
│   ├── use-mobile.tsx  # Responsive design helpers
│   └── useCurrentTrack.ts # Spotify playback state
│
├── lib/                # Core utilities
│   ├── moodDetection.ts # Mood analysis logic
│   └── utils.ts        # Helper functions
│
└── types/              # TypeScript type definitions
    └── chat.ts         # Shared type definitions
```

## How It Works

### 1. Authentication Flow
1. User clicks "Connect with Spotify" on the landing page
2. Redirected to Spotify's OAuth authorization page
3. After authorization, redirected back to app with access token
4. Tokens are securely stored in localStorage

### 2. Mood Detection
1. User describes their mood in the chat interface
2. AI analyzes the text using Hugging Face emotion detection models
3. Emotions are mapped to music moods (happy, sad, energetic, calm, focus)
4. System generates a conversational response

### 3. Music Recommendations
1. Based on detected mood, Spotify API is queried for relevant playlists
2. Results are formatted and displayed in the UI
3. Users can click to open playlists directly in Spotify

### 4. Currently Playing Recommendations
1. System detects what track the user is currently playing
2. Uses ReccoBeats API to find similar tracks
3. Retrieves detailed track information from Spotify
4. Displays recommendations in the sidebar

## API Integration

### Spotify API Endpoints Used:
- Search API for playlists
- User profile information
- Playlist details
- Currently playing track

### Mood Detection:
- Hugging Face emotion classification models
- Pattern matching for mood keywords as fallback
- Contextual analysis of user input

## State Management

The application uses React's useState and useEffect hooks for:
- Message history
- Current mood
- Playlist recommendations
- Loading states
- Authentication status
- Currently playing track

## Implementation Details

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

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Spotify Developer credentials
4. Create `.env` file with required keys
5. Run development server: `npm run dev`

## Environment Variables

```env
# Spotify API Credentials
VITE_SPOTIFY_CLIENT_ID=your_client_id
VITE_SPOTIFY_CLIENT_SECRET=your_client_secret
VITE_REDIRECT_URI=http://localhost:5173/callback

# Hugging Face API Token
VITE_HF_TOKEN=your_hugging_face_token

# Backend Server
VITE_BACKEND_URL=http://localhost:8888

# Optional Configuration
VITE_APP_ENV=development
```

## Backend Setup

1. Navigate to the backend directory: `cd backend`
2. Install Python dependencies: `pip install -r requirements.txt`
3. Set up environment variables in `backend/.env`
4. Run the server: `python main.py`

## Backend Environment Variables

```env
# Spotify API Credentials
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
REDIRECT_URI=http://localhost:5173/callback
FRONTEND_URI=http://localhost:5173
```

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Code Quality
- TypeScript for type safety
- ESLint and Prettier for code formatting
- Husky for git hooks
- Conventional commits for changelog generation

## Contributing

We welcome contributions to Vibe Chat - Moodly! Here's how you can help:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit with conventional commit messages
5. Push to your fork
6. Create a pull request

### Development Guidelines
- Follow existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## Troubleshooting

### Common Issues

1. **Spotify Authentication Fails**
   - Check that your Spotify credentials are correct
   - Ensure your redirect URI is registered in the Spotify Developer Dashboard
   - Verify that the backend server is running

2. **No Playlists Loading**
   - Check network requests in browser dev tools
   - Verify Spotify API access token is valid
   - Confirm internet connection

3. **Mood Detection Not Working**
   - Check Hugging Face API token
   - Verify internet connection
   - Check browser console for errors

## Roadmap

### Short Term
- [ ] Add more mood categories
- [ ] Implement user preferences
- [ ] Add playlist creation feature
- [ ] Improve mobile responsiveness

### Long Term
- [ ] Social features (share moods/playlists)
- [ ] Mood history tracking
- [ ] Integration with other music platforms
- [ ] Advanced recommendation algorithms

## Join Our Community

We're building something special for music lovers and producers. Your feedback is invaluable in shaping Vibe Chat - Moodly!

### How You Can Help
- Star this repository
- Report bugs or suggest features
- Join our Discord community
- Share with fellow music enthusiasts

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Hugging Face](https://huggingface.co/)
- All our amazing contributors and beta testers!

---

Idea Validation: If you're interested in music tech and want to help shape the future of music discovery, I'd love to hear from you! DM me to share your thoughts and be part of our early community. #MusicTech #Innovation
