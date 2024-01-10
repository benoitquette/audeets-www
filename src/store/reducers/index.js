// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import projects from './projects';
import scores from './scores';
import charts from './charts';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, projects, scores, charts });

export default reducers;
