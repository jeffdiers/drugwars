import type { DefaultTheme } from "styled-components";

import { media } from "./media";

export const theme: DefaultTheme = {
  colors: {
    black: "#080808",
    primary: "#1FAD9D",
    secondary: "#12685E",
  },
  fonts: {
    primary: "Share Tech Mono",
  },
  fontSize: {
    small: "9pt",
    regular: "14pt",
    medium: "16pt",
    large: "24pt",
  },
  borderRadius: "3px",
  media,
};
