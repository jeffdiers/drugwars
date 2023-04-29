import { DefaultTheme } from "styled-components";

import { media } from "./media";

export const theme: DefaultTheme = {
  colors: {
    black: "#141414",
    primary: "#1B998B",
  },
  fonts: {
    primary: "Helvetica Neue, Helvetica, Roboto, sans-serif",
  },
  fontSize: {
    regular: "16pt",
    large: "24pt",
  },
  borderRadius: "3px",
  media,
};
