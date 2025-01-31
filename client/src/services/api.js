const API_URL = 'http://localhost:5001/api';

export const api = {
  async register(userData) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  async login(credentials) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  async sendFriendRequest(senderId, recipientId, token) {
    const response = await fetch(`${API_URL}/friends/sendFriendRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ senderId, recipientId }),
    });
    return response.json();
  },

  async acceptFriendRequest(requestId, token) {
    const response = await fetch(`${API_URL}/friends/acceptFriendRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ requestId }),
    });
    return response.json();
  },

  async getUserFriends(userId, token) {
    const response = await fetch(`${API_URL}/friends/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },
};