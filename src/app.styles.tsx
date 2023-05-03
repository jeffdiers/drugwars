import styled, { css } from "styled-components";

export const AppContainer = styled.div`
  display: grid;
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  background-color: ${({ theme }) => theme.colors.black};

  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.regular};
  color: ${({ theme }) => theme.colors.primary};

  ${({ theme }) =>
    theme.media.sm(css`
      grid-template-columns: auto minmax(auto, 720px) auto;
      grid-template-rows: 24px auto auto;
    `)}
`;

export const GameScreen = styled.div`
  padding: 7px;

  ${({ theme }) =>
    theme.media.sm(css`
      grid-area: 2 / 2 / auto / auto;
    `)}
`;
