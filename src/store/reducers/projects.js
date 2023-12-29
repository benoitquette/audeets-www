// types
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

// project import
import { client } from 'utils/apiClient';

// adapters
const projectsAdapter = createEntityAdapter({
  selectId: (project) => project._id,
  sortComparer: (a, b) => a.title.localeCompare(b.title)
});

// thunks
export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  return await client.get('api/projects');
});

// selectors
export const selectors = projectsAdapter.getSelectors((state) => state.projects);

// ==============================|| SLICE - PROJECTS ||============================== //

const projects = createSlice({
  name: 'projects',
  initialState: projectsAdapter.getInitialState({
    status: 'idle',
    error: null
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        if (state.status === 'loading') {
          state.status = 'succeeded';
          projectsAdapter.upsertMany(state, action);
        }
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        if (state.status === 'loading') {
          state.status = 'failed';
          state.error = action.payload;
        }
      });
  }
});

export default projects.reducer;

export const { projectsLoaded, projectsCleared } = projects.actions;

export const reloadAllProjects = () => async (dispatch) => {
  dispatch(projectsCleared());
  dispatch(fetchProjects());
};
