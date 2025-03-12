export const getSpotifyAuthUrl = () => {
    const params = new URLSearchParams({
      client_id: process.env.SPOTIFY_CLIENT_ID!,
      response_type: 'code',
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
      scope: 'playlist-modify-public',
    });
    return `https://accounts.spotify.com/authorize?${params.toString()}`;
  };