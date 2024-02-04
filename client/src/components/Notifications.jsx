import {useContext} from "react";
import {Button, Box} from "@mui/material";
import {SocketContext} from "../context/SocketContext";

const Notifications = () => {
  const {answerCall, call, callAccepted} = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <Box sx={{display: "flex", justifyContent: "space-around"}}>
          <h1>{call.name} is calling:</h1>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer
          </Button>
        </Box>
      )}
    </>
  );
};

export default Notifications;
