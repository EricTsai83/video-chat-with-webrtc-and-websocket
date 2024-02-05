import VideoPlayer from "./components/VideoPlayer";
import Notifications from "./components/Notifications";
import Options from "./components/Options";
import DrawerAppBar from "./components/DrawerAppBar";
import {ThemeProvider} from "@mui/material/styles";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DrawerAppBar />
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </ThemeProvider>
  );
}

export default App;
