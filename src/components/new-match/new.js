import React, { useState, useContext } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { UserContext } from "../../UserContext";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const New = () => {
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState("");

  const browserHistory = useHistory();

  const genereateUniqueID = () => {
    console.log(process.env.REACT_APP_BACKEND_URL);
    axios
      .get(`http://${process.env.REACT_APP_BACKEND_URL}/create_room`)
      .then((res) => {
        browserHistory.push("/play/" + res.data);
      });
  };

  if (user === null) {
    return <Redirect to='/Nickname' />;
  }

  return (
    <>
      <Box display='flex' flexDirection='column' m={3}>
        <Box display='flex' flexDirection='row' justifyContent='center'>
          <Button
            variant='contained'
            color='primary'
            onClick={genereateUniqueID}>
            vs Player
          </Button>
        </Box>
        <Box display='flex' flexDirection='row' justifyContent='center' m={3}>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => {
              browserHistory.push("/PlayComputer");
            }}>
            vs Computer
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default New;
