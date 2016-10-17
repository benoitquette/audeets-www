import * as t from './actionTypes';

const initialState = {
  stepIndex: 0,
  url: '',
  error: false,
  confirmation: false,
  loading: false
};

export default function createProject(state = initialState, action) {
  switch (action.type) {
    case t.INCREMENT_STEPPER:
      return {
        ...state,
        stepIndex: state.stepIndex + 1
      };
    case t.DECREMENT_STEPPER:
      return {
        ...state,
        stepIndex: state.stepIndex - 1
      };
    case t.SET_URL:
      return {
        ...state,
        url: action.url
      };
    default:
      return state;
  }
}
