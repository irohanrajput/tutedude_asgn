import { useContext, useEffect, useState } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    api.get("/friends")
      .then((res) => setFriends(res.data.friends))
      .catch((err) => console.error(err));
  }, []);

  const sendFriendRequest = async () => {
    await api.post("/friends/sendFriendRequest", { recipientUsername: username });
    alert("Friend request sent!");
  };

  return (
    <div>
      <h2>Welcome, {user?.userName}</h2>
      <button onClick={logout}>Logout</button>

      <h3>Your Friends</h3>
      <ul>
        {friends.map((friend) => (
          <li key={friend._id}>{friend.name} (@{friend.username})</li>
        ))}
      </ul>

      <h3>Add a Friend</h3>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <button onClick={sendFriendRequest}>Send Request</button>
    </div>
  );
};

export default Home;
