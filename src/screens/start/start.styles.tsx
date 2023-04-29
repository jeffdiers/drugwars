import styled from "styled-components";

export const StartContainer = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  display: grid;
  align-content: center;
`;

export const TitleContainer = styled.div`
  margin-bottom: 5px;

  font-size: ${({ theme }) => theme.fontSize.large};
`;
