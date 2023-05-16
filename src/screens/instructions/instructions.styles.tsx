import styled from "styled-components";

export const InstructionsContainer = styled.div`
  height: 100%;
  width: 100%;
  margin: auto;
  display: grid;
  align-content: center;
  row-gap: 7px;
`;

export const InstructionsTitleContainer = styled.div`
  margin-bottom: 5px;
  text-transform: uppercase;
  text-align: center;

  font-size: ${({ theme }) => theme.fontSize.large};
`;
