import {useContext} from "react";
import {Box, Grid, Typography, Paper, CardMedia} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {SocketContext} from "../context/SocketContext";

export default function VideoPlayer() {
  const theme = useTheme();
  const {name, callAccepted, myVideo, userVideo, callEnded, stream, call} =
    useContext(SocketContext);

  const styles = {
    flexBox: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    paper: {
      width: "100%",
      maxWidth: "600px",
      padding: "10px",
      border: "2px solid black",
      [theme.breakpoints.down("sm")]: {
        width: "80%",
        minWidth: "260px",
      },
    },
    cardMedia: {
      width: "100%",
    },
  };

  return (
    <Box sx={styles.flexBox}>
      {stream && (
        <Paper sx={styles.paper}>
          <Typography variant="h5" gutterBottom>
            {name || "Name"}
          </Typography>
          <CardMedia
            component="video"
            playsInline
            muted
            ref={myVideo}
            autoPlay
            sx={styles.cardMedia}
          />
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper sx={styles.paper}>
          <Typography variant="h5" gutterBottom>
            {call.name || "Name"}
          </Typography>
          <CardMedia
            component="video"
            playsInline
            ref={userVideo}
            autoPlay
            sx={styles.cardMedia}
          />
        </Paper>
      )}
    </Box>
  );
}
