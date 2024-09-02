// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./components/Admin";

import Home from "./components/Home";
import Client from "./components/Client";

import { io, Socket } from "socket.io-client";

// const socket = io("http://localhost:5000");
const socket = io("https://chat-backend-drt2.onrender.com");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const [connection, setConnection] = useState(false);

  const joinroom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join", room);
      setConnection(true);
    }
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/admin"
            element={
              <Admin
                socket={socket}
                username={username}
                room={room}
                setConnection={setConnection}
                setUsername={setUsername}
                setRoom={setRoom}
                joinroom={joinroom}
                connection={connection}
              />
            }
          />
          <Route
            path="/chat"
            element={
              <Client
                socket={socket}
                username={username}
                room={room}
                setConnection={setConnection}
                setUsername={setUsername}
                setRoom={setRoom}
                joinroom={joinroom}
                connection={connection}
              />
            }
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
