import * as actionTypes from '../Action/actionTypes';
import { updateObject } from '../util';


const initialState = {
  userSchedule: {},
  isLogged: false,
  userChoosenLevel: 'Levels',
  showAllOpen: false,
};

export const LevelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LEVELS:
      return updateObject(state, action.payload);
    case actionTypes.GET_WORKOUT:
      return updateObject(state, action.payload);
    case actionTypes.LOG_NON_LEGACY_WORKOUT:
      return updateObject(state, action.payload);
    case actionTypes.REMOVE_LOG_NON_LEGACY_WORKOUT:
      return updateObject(state, action.payload);
    case actionTypes.CLEAR_DAY_LEVELS:
      return updateObject(state, action.payload);
    case actionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
