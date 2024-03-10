import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { sortAndCapitalizeCategories } from './transformers';
import client from '~/utils/api-client';
import { urlApiProjects } from '~/config';

const entityAdapter = createEntityAdapter({
  selectId: (score) => `${score[0].project}`
});

export const fetchGlobalScores = createAsyncThunk('globalScores/fetchGlobalScores', async (id) => {
  return await client.get(`${urlApiProjects}/api/projects/${id}/scores/latest/global`, {
    credentials: 'include'
  });
});

const globalScores = createSlice({
  name: 'globalScores',
  initialState: entityAdapter.getInitialState({}),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGlobalScores.fulfilled, (state, action) => {
      entityAdapter.addOne(state, sortAndCapitalizeCategories(action.payload));
    });
  }
});

export const selectors = entityAdapter.getSelectors((state) => state.globalScores);

export default globalScores;
