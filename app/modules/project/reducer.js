import * as t from './actionTypes';

const initialState = {
  list: [],
  error: false,
  loading: false,
  projectStates: {}
};

/**
 * Implementation of the reducer
 * @param {Object} state the reducer's state
 * @param {Object} action the reducer's action
 * @return {Object} an new instance of the state
 */
export default function project(state = initialState, action) {
  switch (action.type) {
    case `${t.FETCH_DATA}_PENDING`:
      return {
        ...state,
        loading: true,
        error: false
      };
    case `${t.FETCH_DATA}_FULFILLED`:
      return {
        ...state,
        loading: false,
        error: false,
        list: action.payload
      };
    case `${t.FETCH_DATA}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: true
      };
    case t.SET_PROJECT_STATE: {
      let newState = {};
      newState[action.projectId] = action.projectState;
      return {
        ...state,
        projectStates: Object.assign({}, state.projectStates, newState)
      };
    }
    default:
      return state;
  }
}
