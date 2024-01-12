// third-party
import { configureStore } from '@reduxjs/toolkit';

// project import
import menu from './reducers/menu';
import { projectsApi } from './reducers/projectsApi';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
  reducer: {
    menu,
    [projectsApi.reducerPath]: projectsApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(projectsApi.middleware)
});

const { dispatch } = store;

export { store, dispatch };
