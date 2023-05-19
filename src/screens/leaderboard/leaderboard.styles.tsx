import styled from "styled-components";

export const LeaderboardContainer = styled.div`
  height: 100%;
  width: 100%;
  margin: auto;
  display: grid;
  align-content: center;
  text-align: center;
  row-gap: 7px;
`;

export const LeaderboardTitleContainer = styled.div`
  margin-bottom: 5px;
  text-transform: uppercase;

  font-size: ${({ theme }) => theme.fontSize.large};
`;

export const LeaderboardCountdownContainer = styled.div`
  margin-bottom: 5px;

  font-size: ${({ theme }) => theme.fontSize.small};
`;

export const LeaderboardItem = styled.div`
  display: flex;
  justify-content: space-between;
  text-transform: capitalize;
`;
