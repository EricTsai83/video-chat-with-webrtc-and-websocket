import {useContext} from "react";
import {Container, Typography, Paper, CardMedia} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {SocketContext} from "../context/SocketContext";

export default function VideoPlayer() {
  const theme = useTheme();
  const {name, callAccepted, myVideo, userVideo, callEnded, stream, call} =
    useContext(SocketContext);

  const styles = {
    container: {
      width: "100%",
      marginTop: "30px",
      display: "flex",
      gap: "10px",
      justifyContent: "center",
    },
    paper: {
      width: "100%",
      maxWidth: "600px",
      padding: "20px",
      borderRadius: "12px",
      [theme.breakpoints.down("sm")]: {
        width: "90%",
      },
    },
    cardMedia: {
      width: "100%",
      borderRadius: "12px",
    },
  };

  return (
    <Container sx={styles.container}>
      {stream && (
        <Paper sx={styles.paper}>
          <Typography variant="h6" gutterBottom>
            {name || "Anonymous"}
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
            {call.name || "Anonymous"}
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
    </Container>
  );
}
