// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import projects from './projects';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, projects });

export default reducers;
