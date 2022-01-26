import { createTheme } from "@material-ui/core/styles";
const serifFontFamily = {
  fontFamily: ["Ovo"].join(","),
};
const sansSerifFontFamily = {
  fontFamily: [
    "Muli",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
};
const theme = createTheme({
  typography: {
    ...sansSerifFontFamily,
    h1: { ...serifFontFamily },
    h2: { ...serifFontFamily },
    h3: { ...serifFontFamily },
    h4: { ...serifFontFamily },
    h5: { ...serifFontFamily },
    h6: { ...serifFontFamily },
  },
  palette: {
    primary: {
      light: "#ffc8be",
      main: "#f4978e",
      dark: "#bf6861",
      contrastText: "#000",
    },
    secondary: {
      light: "#fff",
      main: "#f4c98e",
      dark: "#a8b0aa",
      contrastText: "#000",
    },
  },
});

export default theme;
