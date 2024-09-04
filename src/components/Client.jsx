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
          <div className="roam">
            <input
              type="text"
              placeholder="Room Id"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
            <input
              type="text"
              placeholder="User-Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={joinroom} className="dj">Join</button>
          </div>
        </>
      )}
<br />
   
<div className="mesg">
          Messages:{" "}
          <br /><br />
          {messageList?.map((item, index) => {
            return (
              <>
                <p>{item?.message}</p>
              </>
            );
          })}
       
      
        <input
          type="text"
          placeholder="HELLO.."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={send}>send</button>
      </div>
    </>
  );
};

export default Client;
