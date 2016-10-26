import * as t from './actionTypes';

const initialState = {
  list: [],
  error: false,
  loading: false
};

/**
 * Implementation of the reducer
 * @param {Object} state the reducer's state
 * @param {Object} action the reducer's action
 * @return {Object} an new instance of the state
 */
export default function log(state = initialState, action) {
  switch (action.type) {
    case `${t.FETCH_AUDITS_LIST}_PENDING`:
      return {
        ...state,
        loading: true,
        error: false
      };
    case `${t.FETCH_AUDITS_LIST}_FULFILLED`:
      return {
        ...state,
        loading: false,
        errors: false,
        list: action.payload
      };
    case `${t.FETCH_AUDITS_LIST}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
}
