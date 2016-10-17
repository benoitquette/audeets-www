import * as t from './actionTypes';
import async from 'async';

const initialState = {
  projects: [],
  drawerOpen: true,
  errors: {
    fetchProjects: false,
    addProject: false,
    deleteProject: false
  },
  confirmations: {
    fetchProjects: false,
    addProject: false,
    deleteProject: false
  },
  loading: false
};

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
    case `${t.ADD_PROJECT}_PENDING`:
      return {
        ...state,
        loading: true,
        errors: {
          ...state.errors,
          addProject: false
        },
        confirmations: {
          ...state.confirmations,
          addProject: false
        }
      };
    case `${t.ADD_PROJECT}_FULFILLED`:
      return {
        ...state,
        loading: false,
        errors: {
          ...state.errors,
          addProject: false
        },
        confirmations: {
          ...state.confirmations,
          addProject: true
        },
        projects: state.projects.concat(action.payload)
      };
    case `${t.ADD_PROJECT}_REJECTED`:
      return {
        ...state,
        loading: false,
        errors: {
          ...state.errors,
          addProject: true
        },
        confirmations: {
          ...state.confirmations,
          addProject: false
        }
      };
    case `${t.ADD_PROJECT}_ACK`:
      return {
        ...state,
        confirmations: {
          ...state.confirmations,
          addProject: false
        }
      };
    case `${t.DELETE_PROJECT}_PENDING`:
      return {
        ...state,
        loading: true,
        errors: {
          ...state.errors,
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
    case `${t.DELETE_PROJECT}_ACK`:
      return {
        ...state,
        confirmations: {
          ...state.confirmations,
          deleteProject: false
        }
      };
    default:
      return state;
  }
}
