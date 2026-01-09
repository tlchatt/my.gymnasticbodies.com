import * as actionTypes from '../Action/actionTypes';

export const AllDataReducer = (state = [], action) => {
  console.log("action type:",action.type)
  switch (action.type) {
    case actionTypes.SET_ALL_DATA: return action.data;
    default: return state;
  }
}
