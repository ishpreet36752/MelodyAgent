import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem('spotify_access_token');
      if (accessToken) {
        try {
          const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setUserData(response.data);
          console.log(userData)
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {userData ? (
        <div className="flex items-center text-primary font-bold gap-4">
          {userData.external_urls?.spotify ? (
            <a href={userData.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              <img
                src={userData.images[0]?.url}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            </a>
          ) : (
            <img
              src={userData.images[0]?.url}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          )}
          <span>{userData.display_name}</span>
        </div>
      ) : (
        <span>Loading user data...</span>
      )}
    </div>
  );
};

export default UserProfile;
