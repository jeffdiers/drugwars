import styled from "styled-components";

const marginBottom = "7px";

export const GameStatsContainer = styled.div`
  padding: 0 12px 12px 12px;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;
  grid-template-areas:
    "title title"
    "days hold"
    "stash-title coat-title"
    "stash coat"
    "price-title price-title"
    "price price";
`;

export const Title = styled.div`
  grid-area: title;
  text-transform: uppercase;
  margin-bottom: ${marginBottom};
  font-size: ${({ theme }) => theme.fontSize.large};
`;

export const Menu = styled.div`
  grid-area: title;
  display: grid;
  justify-content: end;
  align-items: end;
  margin-bottom: ${marginBottom};
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSize.medium};
`;

export const Days = styled.div`
  grid-area: days;
  margin-bottom: ${marginBottom};
`;

export const Hold = styled.div`
  grid-area: hold;
  margin-bottom: ${marginBottom};
  text-align: right;
`;

export const StashTitle = styled.div`
  grid-area: stash-title;
  text-transform: uppercase;
  padding: 5px;
  text-align: center;
  border-top-left-radius: ${({ theme }) => theme.borderRadius};
  border-top: 2px solid ${({ theme }) => theme.colors.primary};
  border-left: 2px solid ${({ theme }) => theme.colors.primary};
  border-right: 2px solid ${({ theme }) => theme.colors.primary};
`;

export const Stash = styled.div`
  grid-area: stash;
  padding: 5px;
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius};
  border-top: 2px solid ${({ theme }) => theme.colors.primary};
  border-left: 2px solid ${({ theme }) => theme.colors.primary};
  border-right: 2px solid ${({ theme }) => theme.colors.primary};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  margin-bottom: ${marginBottom};
`;

export const CoatTitle = styled.div`
  grid-area: coat-title;
  text-transform: uppercase;
  padding: 5px;
  text-align: center;
  border-top-right-radius: ${({ theme }) => theme.borderRadius};
  border-top: 2px solid ${({ theme }) => theme.colors.primary};
  border-right: 2px solid ${({ theme }) => theme.colors.primary};
`;

export const Coat = styled.div`
  grid-area: coat;
  padding: 5px;
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius};
  border-top: 2px solid ${({ theme }) => theme.colors.primary};
  border-right: 2px solid ${({ theme }) => theme.colors.primary};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  margin-bottom: ${marginBottom};
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
`;
