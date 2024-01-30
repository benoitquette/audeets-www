// types
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// project import
import { client } from '~/utils/apiClient';
import { urlApiUsers } from '~/config';

// thunks
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  return await client.get(`${urlApiUsers}/api/users/current`, { credentials: 'include' });
});

// ==============================|| SLICE - USER ||============================== //

const user = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: 'succeeded',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        if (state.status === 'loading') {
          state.status = 'succeeded';
          state.user = action.payload;
        }
      })
      .addCase(fetchUser.rejected, (state, action) => {
        if (state.status === 'loading') {
          state.status = 'failed';
          state.error = action.payload;
        }
      });
  }
});

export default user.reducer;

// export const { userLoaded, userCleared } = user.actions;
