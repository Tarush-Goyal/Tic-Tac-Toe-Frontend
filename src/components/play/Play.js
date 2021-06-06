import React, { useState, useContext, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import Chat from "./chat/Chat";
import io from "socket.io-client";
import { UserContext } from "../../UserContext";
import Board from "./tc-toe Board/Board";
import "./play.css";
import Loading from "./Loading/Loading";

let socket;
const Play = () => {
  const ENDPT = `http://${process.env.REACT_APP_BACKEND_URL}/`;
  const { user, setUser } = useContext(UserContext);
  const { room_id } = useParams();

  const [socketHasBeenInitialized, setSocketHasBeenInitialized] =
    useState(false);
  const [playNow, setPlayNow] = useState(false);

  useEffect(() => {
    socket = io(ENDPT);
    setSocketHasBeenInitialized(true);
    if (!user) {
      return;
    }
    socket.emit("join", room_id);
    console.log(user.name + " " + user.id + " " + room_id);
  }, [ENDPT]);

  useEffect(() => {
    socket.on("youCanPLayNow", () => {
      setPlayNow(true);
    });
  }, []);

  if (!user) {
    return <Redirect to='/Nickname' />;
  }
  return playNow && socketHasBeenInitialized ? (
    <div className='play'>
      <div style={{ marginRight: "5rem" }}>
        <Board socket={socket} room_id={room_id ? room_id : ""} />
      </div>
      <Chat socket={socket} room_id={room_id ? room_id : ""} />
    </div>
  ) : (
    <div>
      <Loading room_id={room_id} />
    </div>
  );
};

export default Play;
