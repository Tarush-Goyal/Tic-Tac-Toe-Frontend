import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../UserContext";
import Cookies from "universal-cookie";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

const Nickname = () => {
  const { user, setUser } = useContext(UserContext);
  const [nick, setNick] = useState("");
  const cookies = new Cookies();

  const register = (e) => {
    e.preventDefault();
    if (nick) {
      let alphabet = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
      ];

      let result = "";
      for (let index = 0; index < 15; index++) {
        if (index === 5 || index === 10) {
          result += "-";
        } else result += alphabet[Math.floor(Math.random() * 10000) % 35];
      }

      const newUser = {
        name: nick,
        id: result,
      };

      cookies.set("user", newUser, { path: "/" });
      setUser(newUser);
    }
  };

  if (user !== null && user !== undefined) {
    console.log(cookies.get("user"));
    return <Redirect to='/home' />;
  }

  return (
    <>
      <form onSubmit={register}>
        <Box
          display='flex'
          flexDirection='column'
          style={{ marginTop: "2rem" }}>
          <Box style={{ margin: "2rem" }}>
            <TextField
              type='text'
              value={nick}
              onChange={(e) => {
                setNick(e.target.value);
              }}
              id='Nickname'
              label='Enter Your Nickname'
              variant='outlined'
            />
          </Box>
          <Box>
            <Button type='submit' variant='contained' color='primary'>
              Join Room
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default Nickname;
