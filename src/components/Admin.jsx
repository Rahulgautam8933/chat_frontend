import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:5000");

function Admin() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in as admin, redirect if not
    socket.emit("register", { username: "admin", role: "admin" });

    socket.on("message", (data) => {
      console.log("Message received:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("userList", (clients) => {
      console.log("clients", clients);
      setClients(clients);
    });

    return () => {
      socket.off("message");
      socket.off("userList");
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message && selectedClient) {
      socket.emit("message", { to: selectedClient, from: "admin", message });
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Admin Chat</h2>
      <div>
        <h3>Clients:</h3>
        <ul>
          {clients.map((client, index) => (
            <li
              key={index}
              onClick={() => setSelectedClient(client.username)}
              style={{
                cursor: "pointer",
                color: client.username === selectedClient ? "blue" : "black",
              }}
            >
              {client.username}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Chat with {selectedClient}</h3>
        <div>
          {messages
            .filter(
              (msg) => msg.from === selectedClient || msg.from === "admin"
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
  );
}

export default Admin;
