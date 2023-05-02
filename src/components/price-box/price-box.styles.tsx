import styled from "styled-components";

export const PriceItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PriceItemDottedLine = styled.div`
  flex: 1;
  border-bottom: 2px dotted ${({ theme }) => theme.colors.primary};
  border-radius: 1px;
  position: relative;
  top: -2px;
`;
