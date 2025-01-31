import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export const Profile = () => {
  const { user, token } = useAuth();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await api.getUserFriends(user.id, token);
        setFriends(response.friends);
      } catch (err) {
        setError('Failed to fetch friends');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchFriends();
    }
  }, [user, token]);

  if (!user) {
    return <div>Please login to view your profile</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="mb-6">
          <p className="text-lg">Name: {user.name}</p>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Friends</h3>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {friends.map((friend) => (
              <div key={friend._id} className="bg-gray-100 p-4 rounded-lg">
                <p className="font-medium">{friend.name}</p>
                <p className="text-gray-600">@{friend.username}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};