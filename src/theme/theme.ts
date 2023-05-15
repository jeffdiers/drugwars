import type { DefaultTheme } from "styled-components";

import { media } from "./media";

export const theme: DefaultTheme = {
  colors: {
    black: "#121212",
    primary: "#1FB2A1",
    secondary: "#12685E",
  },
  fonts: {
    primary: "Share Tech Mono",
  },
  fontSize: {
    regular: "14pt",
    medium: "16pt",
    large: "24pt",
  },
  borderRadius: "3px",
  media,
};
