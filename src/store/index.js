import { configureStore } from '@reduxjs/toolkit';
import menu from './reducers/menu';
import projects from './reducers/projects-api';
import user from './reducers/user';
import globalScores from './reducers/global-scores';
import audits from './reducers/audits';

const store = configureStore({
  reducer: {
    [menu.reducerPath]: menu.reducer,
    [user.reducerPath]: user.reducer,
    [globalScores.reducerPath]: globalScores.reducer,
    [projects.reducerPath]: projects.reducer,
    [audits.reducerPath]: audits.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(projects.middleware)
});

const { dispatch } = store;

export { store, dispatch };
