import * as t from './actionTypes';

export const incrementStepper = () => ({
  type: t.INCREMENT_STEPPER
});

export const decrementStepper = () => ({
  type: t.DECREMENT_STEPPER
});

export const setUrl = url => ({
  type: t.SET_URL,
  url
});
