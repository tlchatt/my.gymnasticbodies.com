import * as actionTypes from '../Action/LegacyAction';
import * as allActionTypes from '../Action/actionTypes';
import { updateObject } from '../util';

const initailState = {
  selectedProgessions: [],
  allProgressions: {},
  loading: true,
  isOpenToast: false,
  toastMessage: ''
}

const SetProgression = (state, action) => {
  return updateObject(state, {
    selectedProgessions: action.selectedProgression,
    allProgressions: action.allProgressions,
    loading: action.loading,
    name: action.name,
    ...action
  })
}

const UpdateProgression = (state, action) => {
  return updateObject(state, {
    selectedProgessions: action.selectedProgression,
    allProgressions: action.allProgressions
  })
}

export const LegacyReducer = (state = initailState, action) => {
  switch (action.type) {
    case actionTypes.SET_PROGRESSION: return SetProgression(state, action);
    case actionTypes.UPDATE_PROGRESSIONS: return UpdateProgression(state, action);
    case allActionTypes.BYO_OPEN_LEGACY_WORKOUT_MODAL: return updateObject(state, action.payload);
    case allActionTypes.BYO_GET_ALL_LEGACY_PROGS: return updateObject(state, action.payload);
    case allActionTypes.BYO_SET_PROGS : return updateObject(state, action.payload);
    case actionTypes.CLOSE_EDIT_MODAL: return updateObject(state, action.payload);
    case actionTypes.RESET_LEGACY_PAGE: return initailState;
    default: return state;
  }
}
