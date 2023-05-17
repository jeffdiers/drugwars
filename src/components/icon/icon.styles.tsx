import styled from "styled-components";

export const BaseIcon = styled.svg`
  width: 14px;
  height: 14px;
  path {
    fill: ${({ theme }) => theme.colors.primary};
  }
`;

export const InvertedIcon = styled(BaseIcon)`
  path {
    fill: ${({ theme }) => theme.colors.black};
  }
`;
