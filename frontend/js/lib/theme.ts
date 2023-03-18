import { extendTheme } from "@chakra-ui/react";

const THEME = extendTheme({
  styles: {
    global: {
      "html, body": {
        backgroundColor: "#F2F2F2",
        padding: 0,
        margin: 0,
      },
    },
  },
  colors: {
    brand: {
      black: "#222222",
      white: "#F2F2F2",
      lightWhite: "#FFFFFF",
      grey: "#808080",
      lightGrey: "#B0B0B0",
    },
  },
  fonts: {
    body: `'Open Sans', sans-serif`,
    heading: `'EB Garamond', serif`,
  },
});

export default THEME;
