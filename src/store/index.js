import { configureStore } from '@reduxjs/toolkit';
import menu from './reducers/menu';
import { projectsApi } from './reducers/projects-api';
import user from './reducers/user';

const store = configureStore({
  reducer: {
    menu,
    user,
    [projectsApi.reducerPath]: projectsApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(projectsApi.middleware)
});

const { dispatch } = store;

export { store, dispatch };
