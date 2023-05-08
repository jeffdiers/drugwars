import type { DefaultTheme } from "styled-components";

import { media } from "./media";

export const theme: DefaultTheme = {
  colors: {
    black: "#141414",
    primary: "#1B998B",
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
