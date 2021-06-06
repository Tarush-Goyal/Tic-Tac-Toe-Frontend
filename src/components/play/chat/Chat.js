import React, { useState, useEffect, useContext } from "react";
import Input from "./input/Input";
import Message from "./Messages/Message";
import { UserContext } from "../../../UserContext";

const Chat = ({ socket, room_id }) => {
  const { user, setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(message);
    const msg = {
      message,
      name: user.name,
      user_id: user.id,
      room_id,
    };

    socket.emit("sendMessage", msg);
    setMessage("");
  };

  useEffect(() => {
    socket.on("messageReceived", (message) => {
      setMessages((msgs) => [...msgs, message]);
    });
  }, []);

  return (
    <div>
      <Message Messages={messages} user={user} />
      <Input
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default Chat;
