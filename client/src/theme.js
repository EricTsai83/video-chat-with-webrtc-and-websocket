import {createTheme} from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark", // Switching the palette to dark mode
    primary: {
      main: "#bb86fc", // A light purple for primary actions and elements, fitting the dark theme
      contrastText: "#000000", // Dark text may not be necessary here due to the lightness of primary
    },
    secondary: {
      main: "#03dac6", // A teal accent color, good for dark themes as well
      contrastText: "#000000", // Adjusting contrast text color if needed
    },
    background: {
      default: "#121212", // A deep gray for the main background, recommended for dark themes
      paper: "#1e1e1e", // Slightly lighter gray for paper elements to create depth
    },
    text: {
      primary: "#e0e0e0", // Light grey for primary text to ensure readability on dark backgrounds
      secondary: "#a5a5a5", // A softer grey for secondary text, providing hierarchy
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    // The default typography configurations should align well with the dark theme as well
  },
  components: {
    // Define any component overrides for the dark theme here if needed
  },
});

export default theme;
