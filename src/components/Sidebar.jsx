import React, { useEffect, useState } from "react";
import { getRequest } from "../helper/Helper";  // Assuming you have a helper for API calls
import { GoDotFill } from "react-icons/go";

const Sidebar = ({ startPrivateChat }) => {
  const [users, setUsers] = useState([]);

  // Fetch users when the component mounts
  useEffect(() => {
    getRequest("users/getUser")
      .then((res) => {
        console.log("Users:", res?.data?.users);
        setUsers(res?.data?.users);  // Set the users to state
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Users</h3>
      <ul className="user-list">
        {users?.map((user, index) => (
          <li key={index} className="user-item">
            <div className="user-info">
              <div style={{position:"relative"}} className="username">
                <span>{user?.username}</span>
                {
                  user?.isOnline ? 
                  <span style={{position:"absolute",top:"-10px",left:"-10px"}}><GoDotFill /></span>
                  :""
                }
              </div>
              <button
                className="chat-button"
                onClick={() => startPrivateChat(user?.username)}
              >
                Chat
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
