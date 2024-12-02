import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatWindow from "./components/ChatWindow";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css'

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
        <Route
            path="/"
            element={<ProtectedRoute element={<ChatWindow />} />}
          />
          
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
