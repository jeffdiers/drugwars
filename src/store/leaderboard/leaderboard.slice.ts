import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../root-reducer";

export type PlayerScore = {
  id: string;
  name: string;
  score: string;
};

export type LeaderBoardState = {
  readonly loading: boolean;
  readonly error: string | undefined;
  readonly topTen: PlayerScore[] | undefined;
};

const initialState: LeaderBoardState = {
  loading: false,
  error: undefined,
  topTen: undefined,
};

export const getTopTen = createAsyncThunk(
  "leaderboard/getTopTenStatus",
  async () => {
    const response = await fetch("/.netlify/functions/get-top-ten");
    return (await response.json()) as PlayerScore[];
  }
);

const bankSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTopTen.pending, (state: LeaderBoardState) => {
      return { ...state, loading: true };
    });
    builder.addCase(
      getTopTen.fulfilled,
      (state: LeaderBoardState, action: PayloadAction<PlayerScore[]>) => {
        return { ...state, loading: false, topTen: action.payload };
      }
    );
    builder.addCase(getTopTen.rejected, (state: LeaderBoardState, action) => {
      return { ...state, loading: false, error: action.error.message };
    });
  },
});

export const selectLeaderboardTopTen = (state: RootState) =>
  state.leaderboard.topTen;

export default bankSlice.reducer;
