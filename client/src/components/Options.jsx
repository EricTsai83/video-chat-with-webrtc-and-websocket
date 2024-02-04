import {useState, useContext} from "react";
import {
  Button,
  TextField,
  Box,
  Container,
  Paper,
  FormControl,
  FormLabel,
} from "@mui/material";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {Assignment, Phone, PhoneDisabled} from "@mui/icons-material";
import {useTheme} from "@mui/material/styles";
import {SocketContext} from "../context/SocketContext";

export default function Options({children}) {
  const {me, callAccepted, name, setName, callEnded, leaveCall, callUser} =
    useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");

  const theme = useTheme();

  const styles = {
    container: {
      width: "100%",
      marginTop: "30px",
      display: "flex",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        width: "80%",
      },
    },
    flexBox: {
      display: "flex",
      justifyContent: "center",
      gap: 5,
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        minWidth: "260px",
      },
    },
    margin: {
      marginTop: 2,
    },
    paper: {
      width: "100%",
      maxWidth: "600px",
      padding: "10px 20px",
      border: "2px solid black",
      [theme.breakpoints.down("sm")]: {
        width: "80%",
        minWidth: "260px",
      },
    },
  };

  return (
    <Container sx={styles.container}>
      <Paper elevation={10} sx={styles.paper}>
        <Box sx={styles.flexBox}>
          <FormControl>
            <FormLabel>Account Info</FormLabel>
            <TextField
              label="Enter your name"
              size="small"
              variant="filled"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
            <CopyToClipboard text={me} sx={styles.margin}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<Assignment fontSize="large" />}>
                Copy Your ID
              </Button>
            </CopyToClipboard>
          </FormControl>

          <FormControl>
            <FormLabel>Make a call</FormLabel>
            <TextField
              label="ID to call"
              size="small"
              variant="filled"
              value={idToCall}
              onChange={(e) => setIdToCall(e.target.value)}
              fullWidth
            />
            {callAccepted && !callEnded ? (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<PhoneDisabled fontSize="large" />}
                fullWidth
                onClick={leaveCall}
                sx={styles.margin}>
                Hang Up
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                startIcon={<Phone fontSize="large" />}
                fullWidth
                onClick={() => callUser(idToCall)}
                sx={styles.margin}>
                Call
              </Button>
            )}
          </FormControl>
        </Box>
        {children}
      </Paper>
    </Container>
  );
}
