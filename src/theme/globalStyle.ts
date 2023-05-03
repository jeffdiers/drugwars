import { createGlobalStyle } from "styled-components";

import ShareTechMonoTTF from "./fonts/Share-Tech-Mono/ShareTechMono-Regular.ttf";

const GlobalStyle = createGlobalStyle` 
  @font-face {
    font-family: "Share Tech Mono";
    src: url(${ShareTechMonoTTF}) format("truetype");
    font-weight: 400;
    font-style: normal;
  }
  
  body {
    background-color: ${({ theme }) => theme.colors.black};
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSize.regular};
    color: ${({ theme }) => theme.colors.primary};
  }`;

export default GlobalStyle;
