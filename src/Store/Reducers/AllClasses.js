import * as actionTypes from '../Action/actionTypes';

export const AllClassesReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.SET_ALL_CLASSES: return action.classes;
    case actionTypes.LOGOUT: return null;
    default: return state;
  }
}
