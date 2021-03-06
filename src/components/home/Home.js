import React, { useState, useContext } from "react";
import "./Home.css";
import { UserContext } from "../../UserContext";
import { useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const Home = () => {
  const { user, setUser } = useContext(UserContext);

  const [error, setError] = useState("");

  const browserHistory = useHistory();

  return (
    <div>
      <h3 style={{ color: "black", margin: "3rem" }}>
        Hello {user ? user.name : ""}! 😀
      </h3>

      <div className='error' style={{ display: !error ? "none" : "flex" }}>
        {error}
      </div>
      <Box display='flex' flexDirection='column'>
        <Box display='flex' flexDirection='row' justifyContent='center'>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              console.log("clicked");
              browserHistory.push("/join");
            }}>
            Join Match
          </Button>
        </Box>
        <Box display='flex' flexDirection='row' justifyContent='center' m={3}>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => {
              browserHistory.push("/new");
            }}>
            Start New Match
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
