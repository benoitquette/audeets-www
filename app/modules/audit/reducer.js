import * as t from './actionTypes';

const initialState = {
  list: [],
  error: false,
  loading: false
};

export default function audit(state = initialState, action) {
  switch (action.type) {
    case `${t.FETCH_RESULTS}_PENDING`:
      return {
        ...state,
        loading: true,
        error: false
      };
    case `${t.FETCH_RESULTS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        errors: false,
        list: action.payload
      };
    case `${t.FETCH_RESULTS}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
}
