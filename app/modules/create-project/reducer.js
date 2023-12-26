import * as t from './actionTypes';

const initialState = {
  stepIndex: 0,
  url: '',
  name: ''
};

/**
 * Implementation of the reducer
 * @param {Object} state the reducer's state
 * @param {Object} action the reducer's action
 * @return {Object} an new instance of the state
 */
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
    case t.SET_NAME:
      return {
        ...state,
        name: action.name
      };
    case t.RESET:
      return initialState;
    default:
      return state;
  }
}
