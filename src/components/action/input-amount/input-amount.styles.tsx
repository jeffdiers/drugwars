import styled from "styled-components";

export const InputForm = styled.form`
  input {
    text-transform: uppercase;
    padding: 0.25em 1em;
    border-radius: 2px;
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;
