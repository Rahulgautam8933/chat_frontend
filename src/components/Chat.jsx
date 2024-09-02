// // src/Chat.js
// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000"); // Ensure this matches the server URL

// function Chat() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     socket.on("message", (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => {
//       socket.off("message");
//     };
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (message) {
//       socket.emit("message", message);
//       setMessage("");
//     }
//   };

//   return (
//     <div>
//       <div>
//         {messages.map((msg, index) => (
//           <div key={index}>{msg}</div>
//         ))}
//       </div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// }

// export default Chat;

// src/Chat.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Adjust the URL if necessary

function Chat() {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    socket.on("userList", (userList) => {
      setUsers(userList);
    });

    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("userList");
      socket.off("message");
    };
  }, []);

  const handleRegister = () => {
    if (username) {
      socket.emit("register", username);
      setCurrentUser(username);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message && selectedUser) {
      socket.emit("privateMessage", { to: selectedUser, message });
      setMessage("");
    }
  };

  return (
    <div>
      {!currentUser ? (
        <div>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleRegister}>Register</button>
        </div>
      ) : (
        <div>
          <h2>Welcome, {currentUser}</h2>
          <div>
            <h3>Users:</h3>
            <ul>
              {users.map((user, index) => (
                <li
                  key={index}
                  onClick={() => setSelectedUser(user)}
                  style={{ cursor: "pointer" }}
                >
                  {user}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Chat with {selectedUser}</h3>
            <div>
              {messages
                .filter(
                  (msg) => msg.from === selectedUser || msg.from === currentUser
                )
                .map((msg, index) => (
                  <div key={index}>
                    <strong>{msg.from}:</strong> {msg.message}
                  </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Type your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
