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
          <div>
            <input
              type="text"
              placeholder="room id"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={joinroom}>join</button>
          </div>
        </>
      )}

      <div>
        <div>
          messages:{" "}
          {messageList?.map((item, index) => {
            return (
              <>
                <p>{item?.message}</p>
              </>
            );
          })}
        </div>

        <input
          type="text"
          placeholder="hi..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={send}>send</button>
      </div>
    </>
  );
};

export default Client;
