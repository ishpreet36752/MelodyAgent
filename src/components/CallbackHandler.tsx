import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CallbackHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const accessToken = query.get('access_token');
    const refreshToken = query.get('refresh_token');

    if (accessToken && refreshToken) {
      // Store tokens individually in localStorage
      localStorage.setItem('spotify_access_token', accessToken);
      localStorage.setItem('spotify_refresh_token', refreshToken);
      localStorage.setItem('spotify_token_timestamp', Date.now().toString());
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  }, [location, navigate]);

  return <div className="p-4 text-center">Processing authentication...</div>;
};

export default CallbackHandler;
