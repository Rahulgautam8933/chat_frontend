import { useEffect, useState } from "react";
import socket from "../socket";
import Message from "./Message";
import Sidebar from "./Sidebar";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [username, setUsername] = useState("user" + Math.floor(Math.random() * 1000));
  const [room, setRoom] = useState("general");

  useEffect(() => {
    // Join the current room (private or public) on component mount
    socket.emit("join", { username, room });

    // Listen for incoming messages
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Cleanup on unmount
    return () => {
      socket.off("receive_message");
    };
  }, [room, username]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const messageData = {
        room,
        username,
        content: messageInput,
      };

      socket.emit("send_message", messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setMessageInput(""); // Clear input
    }
  };

  const startPrivateChat = (targetUsername) => {
    // Create a unique room name for private chat based on both usernames
    const room =  targetUsername;
    setRoom(room); // Switch to the private chat room
    setMessages([]); // Clear previous messages
    socket.emit("join", { username, room }); // Join the private room on the server
  };

  return (
    <div className="chat-container">
      <div className="chat-layout">
        <div className="sidebar-container">
          <Sidebar startPrivateChat={startPrivateChat} />
        </div>

        <div className="chat-window-container">
          <div className="chat-window">
            {/* <h2 className="chat-room-title">Chat Room: {room}</h2> */}
            <div className="messages">
              {messages.map((message, index) => {

                return(
                  
                  
                  <Message key={index} message={message} username = {username} />
                )
              }
              )}
            </div>

            <div className="message-input-container">
              <input
                type="text"
                className="message-input"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
              />
              <button className="send-button" onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
