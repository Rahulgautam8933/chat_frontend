import React, { useEffect, useState } from "react";

const Client = ({
  username,
  connection,
  room,
  socket,
  setRoom,
  joinroom,
  setUsername,
}) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  console.log("messageList", messageList);

  const send = async () => {
    if (message !== "") {
      const messageData = {
        room: room,
        author: username,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes() +
          ":" +
          new Date(Date.now()).getSeconds(),
      };
      console.log("send", messageData);

      await socket.emit("send_message", messageData);
      setMessageList((prevMessageList) => [...prevMessageList, messageData]);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("receive", data);
      setMessageList((prevMessageList) => [...prevMessageList, data]);
    });
  }, [socket]);

  return (
    <>
      {connection ? (
        <></>
      ) : (
        <>
            <div className="roam"> Enter Your Room ID:-<br></br> <br />
            <input type="text"
              placeholder="Room Id"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
            </div> <br />

            <div className="user1">
            <input
              type="text"
              placeholder="User-Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}

            />
            <br></br>
            <button onClick={joinroom} className="dj">Join</button>
          </div>
        </>
      )}
<br />
   
<div className="mesg">
          Write Your Messages Here:{" "}
          <br /><br />
          {messageList?.map((item, index) => {
            return (
              <>
                <p>{item?.message}</p>
              </>
            );
          })}
       </div>
      <div className="sms">
        <input
          type= "text"
          placeholder="Type Your Messege Here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        </div>
        
<div className="buter">
        <button onClick={send}className="psd">Send</button> 
     
      </div>
      <div className="feed">

    
      
      </div>
    </>
  );
};

export default Client;
