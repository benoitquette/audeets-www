import * as t from './actionTypes';

const initialState = {
  dialogOpen: false
};

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
