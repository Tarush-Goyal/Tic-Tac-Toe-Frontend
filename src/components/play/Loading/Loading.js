import React, { useState } from "react";

import "./Loading.css";

const Loading = ({ room_id }) => {
  const [copySuccess, setCopySuccess] = useState("");

  return (
    <div>
      Click Below to Copy Room Id and Share it with another player to join room
      <div id='loadingroom_idcontainer'>
        <p id='loadingroom_id'>{room_id}</p>
        <p>{copySuccess}</p>
      </div>
    </div>
  );
};

export default Loading;
