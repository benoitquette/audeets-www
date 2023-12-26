import * as t from './actionTypes';
import async from 'async';

const initialState = {
  projects: [],
  drawerOpen: false,
  errors: {
    fetchProjects: false,
    createProject: false,
    deleteProject: false
  },
  confirmations: {
    fetchProjects: false,
    createProject: false,
    deleteProject: false
  },
  loading: false
};

/**
 * Implementation of the reducer
 * @param {Object} state the reducer's state
 * @param {Object} action the reducer's action
 * @return {Object} an new instance of the state
 */
export default function console(state = initialState, action) {
  switch (action.type) {
    case `${t.FETCH_PROJECTS}_PENDING`:
      return {
        ...state,
        loading: true,
        errors: {
          ...state.errors,
          fetchProjects: false
        }
      };
    case `${t.FETCH_PROJECTS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        errors: {
          ...state.errors,
          fetchProjects: false
        },
        projects: action.payload
      };
    case `${t.FETCH_PROJECTS}_REJECTED`:
      return {
        ...state,
        loading: false,
        errors: {
          ...state.errors,
          fetchProjects: true
        }
      };
    case t.TOGGLE_DRAWER:
      return {
        ...state,
        drawerOpen: !state.drawerOpen
      };
    case `${t.CREATE_PROJECT}_PENDING`:
      return {
        ...state,
        loading: true,
        errors: {
          ...state.errors,
          createProject: false
        },
        confirmations: {
          ...state.confirmations,
          createProject: false
        }
      };
    case `${t.CREATE_PROJECT}_FULFILLED`:
      return {
        ...state,
        loading: false,
        errors: {
          ...state.errors,
          createProject: false
        },
        confirmations: {
          ...state.confirmations,
          createProject: true
        },
        projects: state.projects.concat(action.payload)
      };
    case `${t.CREATE_PROJECT}_REJECTED`:
      return {
        ...state,
        loading: false,
        errors: {
          ...state.errors,
          createProject: true
        },
        confirmations: {
          ...state.confirmations,
          createProject: false
        }
      };
    case `${t.DELETE_PROJECT}_PENDING`:
      return {
        ...state,
        loading: true,
        errors: {
          ...state.errors,
          deleteProject: false
        },
        confirmations: {
          ...state.confirmations,
          deleteProject: false
        }
      };
    case `${t.DELETE_PROJECT}_FULFILLED`: {
      let newState = {
        ...state,
        loading: false,
        errors: {
          ...state.errors,
          deleteProject: false
        },
        confirmations: {
          ...state.confirmations,
          deleteProject: true
        }
      };
      async.reject(state.projects, (project, callback) => {
        callback(null, action.payload.id === project._id);
      }, (err, results) => {
        if (err) return console.log(err);
        newState.projects = results;
      });
      return newState;
    }
    case `${t.DELETE_PROJECT}_REJECTED`:
      return {
        ...state,
        loading: false,
        errors: {
          ...state.errors,
          deleteProject: true
        },
        confirmations: {
          ...state.confirmations,
          deleteProject: false
        }
      };
    default:
      return state;
  }
}
