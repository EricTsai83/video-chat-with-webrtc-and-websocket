import VideoPlayer from "./components/VideoPlayer";
import Notifications from "./components/Notifications";
import Options from "./components/Options";
import DrawerAppBar from "./components/DrawerAppBar";
import {ThemeProvider} from "@mui/material/styles";
import theme from "./theme";
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#2d2f31",
//       contrastText: "#e3e3e3",
//     },
//     // secondary: {
//     //   main: "#6C757D",
//     // },
//     background: {
//       default: "#1f1f1f",
//     },
//     text: {
//       // primary: "#070707",
//       secondary: "#e3e3e3",
//     },
//   },
//   typography: {
//     fontFamily: "roboto",
//     // fontWeightLight: 100,
//     // fontWeightRegular: 400,
//     // fontWeightMedium: 500,
//     // fontWeightBold: 900,
//   },
// });

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#242526",
//     },
//     secondary: {
//       main: "#d975d0",
//     },
//     text: {
//       primary: "#E4E6EB",
//       secondary: "#B0B3B8",
//     },
//     background: {
//       default: "#3e3f40",
//       paper: "#242526",
//     },
//   },
// });

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
