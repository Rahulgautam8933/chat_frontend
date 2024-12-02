const Message = ({ message, username }) => {
  return (
    <>
      {username == message.username ? (
        <div className="row">
          <div className="col-4">
            {" "}
            <div className="message p-2 me">
              <strong>{message.username}</strong>:{" "}
              <span>{message.content}</span>
            </div>
          </div>
          <div className="col-4"></div>
          <div className="col-4"></div>
        </div>
      ) : (
        <div className="row">
          <div className="col-4"> </div>
          <div className="col-4"></div>
          <div className="col-4">
            {" "}
            <div className="message p-2 you">
              <strong>{message.username}</strong>:{" "}
              <span>{message.content}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
