import React from "react";
import "./Input.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <div>
      <form onSubmit={sendMessage} className='message-form'>
        <Box
          display='flex'
          flexDirection='column'
          style={{ marginTop: "2rem" }}>
          <Box style={{ margin: "2rem" }}>
            <TextField
              type='text'
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              label='Type a Message'
              variant='outlined'
            />
          </Box>
          <Box>
            <Button type='submit' variant='contained' color='primary'>
              Send
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default Input;
