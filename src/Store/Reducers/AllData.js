import * as actionTypes from '../Action/actionTypes';

export const AllDataReducer = (state = [], action) => {
  switch (action.type) {

    case actionTypes.SET_ALL_DATA: return action.data;
    default: return state;
  }
}
