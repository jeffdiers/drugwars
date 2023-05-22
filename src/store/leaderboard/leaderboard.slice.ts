import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../root-reducer";

export type PlayerScoreData = {
  name: string;
  score: string | number;
  season: string;
};

export type PlayerScore = {
  id: string;
} & PlayerScoreData;

export type LeaderBoardState = {
  readonly loading: boolean;
  readonly error: string | undefined;
  readonly topTen: PlayerScore[] | undefined;
  readonly scorePosted: boolean;
  readonly scoreId: string | undefined;
};

const initialState: LeaderBoardState = {
  loading: false,
  error: undefined,
  topTen: undefined,
  scorePosted: false,
  scoreId: undefined,
};

export const getTopTen = createAsyncThunk(
  "leaderboard/getTopTenStatus",
  async () => {
    const response = await fetch("/.netlify/functions/get-top-ten");
    return (await response.json()) as PlayerScore[];
  }
);

export const postScore = createAsyncThunk<PlayerScore, PlayerScoreData>(
  "leaderboard/postScoreStatus",
  async (score) => {
    const response = await fetch("/.netlify/functions/post-score", {
      method: "POST",
      body: JSON.stringify(score),
    });
    return (await response.json()) as PlayerScore;
  }
);

type EditScoreName = {
  id: string;
  name: string;
};

export const editScoreName = createAsyncThunk<PlayerScore, EditScoreName>(
  "leaderboard/editScoreNameStatus",
  async (name) => {
    const response = await fetch("/.netlify/functions/edit-score-name", {
      method: "PUT",
      body: JSON.stringify(name),
    });
    return (await response.json()) as PlayerScore;
  }
);

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    resetScoreIsPosted(state: LeaderBoardState, _action: PayloadAction) {
      return { ...state, scorePosted: false, scoreId: undefined };
    },
  },
  extraReducers: (builder) => {
    // GET TOP TEN
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
    // POST NEW SCORE
    builder.addCase(
      postScore.fulfilled,
      (state: LeaderBoardState, action: PayloadAction<PlayerScore>) => {
        return { ...state, scorePosted: true, scoreId: action.payload.id };
      }
    );
  },
});

export const selectLeaderboardTopTen = (state: RootState) =>
  state.leaderboard.topTen;
export const selectLeaderboardIsLoading = (state: RootState) =>
  state.leaderboard.loading;
export const selectLeaderboardScoreIsPosted = (state: RootState) =>
  state.leaderboard.scorePosted;
export const selectLeaderboardScoreId = (state: RootState) =>
  state.leaderboard.scoreId;

export const { resetScoreIsPosted } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
