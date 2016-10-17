import {combineReducers} from 'redux';
import console from '@modules/console/reducer';
import createProject from '@modules/create-project/reducer';
import audit from '@modules/audit/reducer';
import project from '@modules/project/reducer';
import dashboard from '@modules/dashboard/reducer';
import log from '@modules/log/reducer';

export default combineReducers({
  console,
  createProject,
  audit,
  project,
  dashboard,
  log
});
