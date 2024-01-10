// types
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

// project import
import { client } from 'utils/apiClient';

// adapters
const chartsAdapter = createEntityAdapter({
  selectId: (chart) => chart.category,
  sortComparer: (a, b) => a.category.localeCompare(b.category)
});

// thunks
export const fetchRollingWeek = createAsyncThunk('charts/fetchRollingWeek', async (id) => {
  return await client.get(`api/projects/${id}/rollingweek`);
});

// selectors
export const selectors = chartsAdapter.getSelectors((state) => state.charts);

// ==============================|| SLICE - DATA FOR CHARTS ||============================== //

const charts = createSlice({
  name: 'charts',
  initialState: chartsAdapter.getInitialState({
    status: 'idle',
    error: null
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRollingWeek.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRollingWeek.fulfilled, (state, action) => {
        if (state.status === 'loading') {
          state.status = 'succeeded';
          chartsAdapter.upsertMany(state, action);
        }
      })
      .addCase(fetchRollingWeek.rejected, (state, action) => {
        if (state.status === 'loading') {
          state.status = 'failed';
          state.error = action.payload;
        }
      });
  }
});

export default charts.reducer;

export const { chartsLoaded, chartsCleared } = charts.actions;
