import * as t from './actionTypes';

const initialState = {
  latestScores: {
    data: [],
    error: false,
    loading: false,
    loaded: false
  },
  lastAudits: {
    data: [],
    error: false,
    loading: false,
    loaded: false
  },
  rollingWeek: {
    data: [],
    error: false,
    loading: false,
    loaded: false
  },
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
    case `${t.FETCH_LATEST_SCORES}_PENDING`:
      return {
        ...state,
        latestScores: {
          ...state.latestScores,
          error: false,
          loading: true,
          loaded: false
        }
      };
    case `${t.FETCH_LATEST_SCORES}_FULFILLED`:
      return {
        ...state,
        latestScores: {
          error: false,
          loading: false,
          data: action.payload,
          loaded: true
        }
      };
    case `${t.FETCH_LATEST_SCORES}_REJECTED`:
      return {
        ...state,
        latestScores: {
          ...state.latestScores,
          error: true,
          loading: false,
          loaded: true
        }
      };
    case `${t.FETCH_LAST_AUDITS}_PENDING`:
      return {
        ...state,
        lastAudits: {
          ...state.lastAudits,
          error: false,
          loading: true,
          loaded: false
        }
      };
    case `${t.FETCH_LAST_AUDITS}_FULFILLED`:
      return {
        ...state,
        lastAudits: {
          error: false,
          loading: false,
          data: action.payload,
          loaded: true
        }
      };
    case `${t.FETCH_LAST_AUDITS}_REJECTED`:
      return {
        ...state,
        lastAudits: {
          ...state.lastAudits,
          error: true,
          loading: false,
          loaded: true
        }
      };
    case `${t.FETCH_ROLLING_WEEK}_PENDING`:
      return {
        ...state,
        rollingWeek: {
          ...state.rollingWeek,
          error: false,
          loading: true,
          loaded: false
        }
      };
    case `${t.FETCH_ROLLING_WEEK}_FULFILLED`:
      return {
        ...state,
        rollingWeek: {
          error: false,
          loading: false,
          data: action.payload,
          loaded: true
        }
      };
    case `${t.FETCH_ROLLING_WEEK}_REJECTED`:
      return {
        ...state,
        rollingWeek: {
          ...state.rollingWeek,
          error: true,
          loading: false,
          loaded: true
        }
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
