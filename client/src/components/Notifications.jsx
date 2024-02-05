import {useContext} from "react";
import {Button, Box, Typography} from "@mui/material";
import {SocketContext} from "../context/SocketContext";

const Notifications = () => {
  const {answerCall, call, callAccepted} = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "15px",
          }}>
          <Typography variant="h6" gutterBottom>
            {call.name || "Anonymous"} is calling:
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={answerCall}>
            Answer
          </Button>
        </Box>
      )}
    </>
  );
};

export default Notifications;
