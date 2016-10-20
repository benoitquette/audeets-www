import * as t from './actionTypes';

const initialState = {
  dialogOpen: false
};

/**
 * Implementation of the reducer
 * @param {Object} state the reducer's state
 * @param {Object} action the reducer's action
 * @return {Object} an new instance of the state
 */
export default function dashboard(state = initialState, action) {
  switch (action.type) {
    case t.TOGGLE_DIALOG:
      return {
        ...state,
        dialogOpen: !state.dialogOpen
      };
    default:
      return state;
  }
}
