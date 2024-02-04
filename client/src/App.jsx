import Typography from "@mui/material/Typography";
// import AppBar from "@mui/material/AppBar";

import VideoPlayer from "./components/VideoPlayer";
import Notifications from "./components/Notifications";
import Options from "./components/Options";
import DrawerAppBar from "./components/DrawerAppBar";

function App() {
  return (
    <>
      <DrawerAppBar />
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </>
  );
}

export default App;
