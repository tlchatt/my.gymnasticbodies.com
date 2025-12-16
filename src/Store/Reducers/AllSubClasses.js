import * as actionTypes from '../Action/actionTypes';

export const AllSubClassesReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.SET_ALL_SUB_CLASSES: return action.subClasses;
    case actionTypes.LOGOUT: return null;
    default: return state;
  }
}
