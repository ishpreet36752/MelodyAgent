# Vibe Chat - Moodly

> *"The perfect soundtrack for every emotion, powered by AI"*

Vibe Chat - Moodly is an innovative platform that transforms your mood into personalized music experiences. Whether you're a music lover seeking the perfect playlist or a producer looking for inspiration, our AI-powered assistant curates the ideal soundtrack for your current vibe.
## Share Your Feedback

Hey #MusicLovers! I'm building something special for music enthusiasts and producers. Would you like to help validate this idea? Let's connect and shape the future of music discovery together! 

**DM me to share your thoughts** - Let's make this the next big thing in music tech! #MusicTech #Innovation

## Key Features

### For Music Lovers 
- **Mood-Based Playlists** - Get personalized playlists that match your current vibe
- **AI Chat Interface** - Simply describe your mood in words and let our AI do the rest
- **Spotify Integration** - Seamless connection to your Spotify account
- **Mood Tracking** - See how your music tastes evolve with your emotions
- **Discover New Music** - Expand your horizons with AI-curated recommendations

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
- **AI/ML**: Custom mood detection algorithms
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

### 1. Connect & Share
- Sign in with your Spotify account
- Share your current mood through text or emojis
- Let our AI analyze your emotional state

### 2. Discover Music
- Get personalized playlist recommendations
- Explore different genres and moods
- Save your favorite tracks and playlists

### 3. For Music Producers
- Analyze the mood of your tracks
- Get insights into your music's emotional impact
- Connect with listeners who vibe with your sound

### 4. Build Your Vibe Profile
- Track your mood patterns over time
- Discover how your music tastes evolve
- Get smarter recommendations as you use the app

## Key Features in Depth

### Smart Chat Interface
- Natural language processing to understand your mood
- Context-aware responses and suggestions
- Quick mood selection with visual feedback

### Advanced Mood Analysis
- Real-time mood detection from text input
- Emotion mapping to music characteristics
- Personalized mood history and insights

### Music Discovery Engine
- AI-curated playlists based on emotional state
- Blend of familiar favorites and new discoveries
- Mood-based radio stations

### Producer Tools
- Track mood analysis dashboard
- Compare your music's emotional profile
- Audience mood insights

## Secure & Private

### Authentication
- OAuth 2.0 with Spotify
- Secure token management
- Optional anonymous browsing

### Data Privacy
- Your listening data stays private
- Clear data controls
- Transparent data usage policies

## Design Philosophy

### Immersive Experience
- Dark theme optimized for music discovery
- Smooth animations and transitions
- Haptic feedback for interactions

### Accessibility First
- High contrast modes
- Screen reader support
- Keyboard navigation

### Responsive Design
- Beautiful on all devices
- Optimized for mobile listening
- Seamless desktop experience

## API Integration

### Spotify API Endpoints Used:
- Search API for playlists
- User profile information
- Playlist details

### Mood Detection:
- Pattern matching for mood keywords
- Fallback to predefined moods
- Contextual analysis of user input

## State Management

The application uses React's useState and useEffect hooks for:
- Message history
- Current mood
- Playlist recommendations
- Loading states
- Authentication status

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

# Optional Configuration
VITE_APP_ENV=development
VITE_API_BASE_URL=http://localhost:3000/api
```

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
- All our amazing contributors and beta testers!

---

Idea Validation: If you're interested in music tech and want to help shape the future of music discovery, I'd love to hear from you! DM me to share your thoughts and be part of our early community. #MusicTech #Innovation
