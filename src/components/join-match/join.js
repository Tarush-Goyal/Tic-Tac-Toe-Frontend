import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { useHistory, Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Alert from "@material-ui/lab/Alert";

const Join = () => {
  const [room_id, setRoom_id] = useState("");
  const [error, setError] = useState("");
  const browserHistory = useHistory();
  const [open, setOpen] = React.useState(false);

  const joinRoom = async (e) => {
    e.preventDefault();

    const options = {
      url: `http://${process.env.REACT_APP_BACKEND_URL}/join_room`,
      method: "POST",
      withCredentials: false,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        room_id,
      },
    };

    axios(options).then((res) => {
      console.log(res);
      if (res.data.err) {
        setError(res.data.err);
        setOpen(true);
      } else if (res.data.doc) {
        browserHistory.push("/play/" + room_id);
        console.log("bye");
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>Error encountered</DialogTitle>
        <DialogContent>
          <Alert severity='error' style={{ marginBottom: "1rem" }}>
            Incorrect Room ID
          </Alert>
          {/* <DialogContentText id='alert-dialog-description'> */}
          Please enter correct Room ID
          {/* </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
            }}
            color='primary'>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
            }}
            color='primary'>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <form onSubmit={joinRoom}>
        <Box
          display='flex'
          flexDirection='column'
          style={{ marginTop: "2rem" }}>
          <Box style={{ margin: "2rem" }}>
            <TextField
              type='text'
              value={room_id}
              onChange={(e) => {
                setError("");
                setRoom_id(e.target.value);
              }}
              id='join Room'
              label='Enter Room ID'
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

export default Join;
