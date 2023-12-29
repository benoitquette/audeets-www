// types
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

// project import
import { client } from 'utils/apiClient';

// adapters
const scoresAdapter = createEntityAdapter({
  selectId: (score) => score.category,
  sortComparer: (a, b) => a.category.localeCompare(b.category)
});

// thunks
export const fetchLatestScore = createAsyncThunk('scores/fetchLatestScore', async (id) => {
  return await client.get(`api/projects/${id}/latestscore`);
});

// export const fetchRollingWeek = (id) => {
//   createAsyncThunk('projects/fetchRollingWeek', async () => {
//     return await client.get(`api/projects/${id}/rollingweek`);
//   });
// };

// selectors
export const selectors = scoresAdapter.getSelectors((state) => state.scores);

// ==============================|| SLICE - PROJECTS ||============================== //

const scores = createSlice({
  name: 'scores',
  initialState: scoresAdapter.getInitialState({
    status: 'idle',
    error: null
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestScore.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchLatestScore.fulfilled, (state, action) => {
        if (state.status === 'loading') {
          state.status = 'succeeded';
          scoresAdapter.upsertMany(state, action);
        }
      })
      .addCase(fetchLatestScore.rejected, (state, action) => {
        if (state.status === 'loading') {
          state.status = 'failed';
          state.error = action.payload;
        }
      });
  }
});

export default scores.reducer;

export const { scoresLoaded, scoresCleared } = scores.actions;

export const reloadAllProjects = () => async (dispatch) => {
  dispatch(scoresCleared());
  dispatch(fetchLatestScore());
};
