import * as actionTypes from '../Action/actionTypes';
import { updateObject } from '../util';

import { initialData } from './CalendarInitial';

const setCalendar = (state, updatedState) => {
  return updateObject(state, updatedState)
}


const SetCalFail = (state) => {
  return updateObject(state, { showToast: true, message: 'Oh No! Something Went Wrong. Try again :(', variation: 'error'});
}

const SetCalFailClear = (state) => {
  return updateObject(state, { showToast: false });
}

const SetCalSuccess = (state, level) => {
  let message = '';
  if (level === 0) message = 'Intro Plan';
  else message = `Level ${level}`
  return updateObject(state, { showToast: true, message: `Successfully Added ${message} To Your Schedule!`, variation: 'success'});
}

const ClearCalSuccess = (state) => {
  return updateObject(state, { showToast: false });
}

const ShowToast = (state, message, variation) => updateObject(state, { showToast: true, message: message, variation: variation})

const HideToast = (state) => updateObject(state, { showToast: false})

export const CalendarReducer = (state = initialData, action) => {
  switch (action.type) {
    case actionTypes.SET_CALENDAR: return setCalendar(state, action.data)
    case actionTypes.SET_CAL_FAIL: return SetCalFail(state);
    case actionTypes.SET_CAL_FAIL_CLEAR: return SetCalFailClear(state);
    case actionTypes.SET_CAL_SUCCESS: return SetCalSuccess(state, action.level);
    case actionTypes.CLEAR_CAL_SUCCESS: return ClearCalSuccess(state);
    case actionTypes.SHOW_TOAST: return ShowToast(state, action.message, action.variation);
    case actionTypes.HIDE_TOAST: return HideToast(state)
    case actionTypes.LOGOUT: return initialData;
    default: return state;
  }
}
