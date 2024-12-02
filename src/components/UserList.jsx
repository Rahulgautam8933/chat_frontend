import { useEffect, useState } from "react";
import socket from "../socket";

const UserList = ({ startPrivateChat }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
     const fetchUsers = async () => {
      const response = await fetch("http://localhost:5000/api/users");
      const data = await response.json();
      setUsers(data); 
    };

    fetchUsers();

    const interval = setInterval(fetchUsers, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="user-list">
      <h3>Users:</h3>
      <ul>
        {users.map((user) => (
          <li key={user.socketId}>
            {user.username} <button onClick={() => startPrivateChat(user.username)}>Chat</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
