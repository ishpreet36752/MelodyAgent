export const getSpotifyAuthUrl = () => {
    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID!,
      response_type: 'code',
      redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI!,
      scope: 'user-read-private user-read-email user-read-playback-state user-read-currently-playing playlist-modify-public playlist-read-private',
    });
    return `https://accounts.spotify.com/authorize?${params.toString()}`;
  };