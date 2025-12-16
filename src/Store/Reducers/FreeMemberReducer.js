import * as actionTypes from '../Action/actionTypes';
import { updateObject } from '../util';


const initialState = {
    startDate: "",
    endDate: "",
    todaysDate: "",
    dayView: {},
    rounds: 1,
    isLogged: false,
    savedWrokout: [],
};

export const FreeMemberReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_FREE_MEMBER:
            return updateObject(state, action.payload);
        case actionTypes.EDIT_PROG:
            return updateObject(state, action.payload);
        case actionTypes.EDIT_ROUNDS:
            return updateObject(state, action.payload);
        case actionTypes.RESET_SINGLE_PROG:
            return updateObject(state, action.payload);
        case actionTypes.RESET_ALL_PROG:
            return updateObject(state, action.payload);
        case actionTypes.TRACK_ACTION:
            return updateObject(state, action.payload);
        case actionTypes.MARK_ALL_PROG:
            return updateObject(state, action.payload);
        case actionTypes.REMOVE_SINGLE_PROG:
            return updateObject(state, action.payload);
        case actionTypes.ADD_SINGLE_PROG:
            return updateObject(state, action.payload);
        case actionTypes.LOG_INDIVIDUAL_DAYS:
            return updateObject(state, action.payload);
        case actionTypes.GET_ALL_SAVED_WORKOUTS:
            return updateObject(state, action.payload);
        case actionTypes.UPDATE_SAVED_WORKOUTS:
            return updateObject(state, action.payload);
        case actionTypes.LOGOUT:
            return initialState;
        default:
            return state;
    }
}
