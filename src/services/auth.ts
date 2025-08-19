export const getSpotifyAuthUrl = () => {
    // Use backend OAuth endpoint to ensure consistent scope handling
    const backendUri = import.meta.env.VITE_BACKEND_URI || 'http://localhost:8888';
    return `${backendUri}/login`;
  };