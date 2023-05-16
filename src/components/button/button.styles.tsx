import styled from "styled-components";

export const BaseButton = styled.button`
  text-transform: uppercase;
  padding: 0.25em 1em;
  border-radius: 2px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
`;

export const SimpleButton = styled(BaseButton)`
  padding: 0;
  border: none;
`;

export const InvertedButton = styled(BaseButton)`
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.black};
`;
