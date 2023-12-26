/* eslint-disable no-undef */
import * as t from './actionTypes'

export const incrementStepper = () => ({
  type: t.INCREMENT_STEPPER,
})

export const decrementStepper = () => ({
  type: t.DECREMENT_STEPPER,
})

export const setUrl = url => ({
  type: t.SET_URL,
  url,
})

export const setName = name => ({
  type: t.SET_NAME,
  name,
})

export const reset = () => ({
  type: t.RESET,
})
