export const LOGN_START = 'LOGIN_START';
export const LOGIN_SUCESS = 'LOGIN_SUCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_FAIL_CLEAR = 'LOGIN_FAIL_CLEAR';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';
export const CHECK_WELCOME_SERVICE = 'CHECK_WELCOME_SERVICE';
export const UPDATED_USER_LEVEL = 'UPDATED_USER_LEVEL';
export const LOGOUT = 'LOGOUT';

export const GET_NEW_SIGNED_URL = 'GET_NEW_SIGNED_URL'


export const SET_CALENDAR = 'SET_CALENDAR';
export const DELETE_CLASS = 'DELETE_CLASS'
export const CHOOSE_LEVEL = 'CHOOSE_LEVEL';
export const SET_CAL_FAIL = 'SET_CAL_FAIL';
export const SET_CAL_FAIL_CLEAR = 'SET_CAL_FAIL_CLEAR';
export const SET_CAL_SUCCESS = 'SET_CAL_SUCCESS';
export const CLEAR_CAL_SUCCESS = 'CLEAR_CAL_SUCCESS';
export const UPDATE_USER_PLAN = 'UPDATE_USER_PLAN';

export const SET_ALL_CLASSES = 'SET_ALL_CLASSES';
export const SET_ALL_DATA = 'SET_ALL_DATA';
export const SET_ALL_SUB_CLASSES = 'SET_ALL_SUB_CLASSES'

export const SHOW_TOAST = 'SHOW_TOAST'
export const HIDE_TOAST = 'HIDE_TOAST'

export const SET_NEW_AUTH = 'SET_NEW_AUTH';

/*
* Reason for all these actions for New memebr site is to make it easier to test and debug with sentry
* can work with only one action type, but if we use more, we can detect which action is cauing the error and which endpoint
*/
export const SET_FREE_MEMBER = 'SET_FREE_MEMBER';
export const RESET_SINGLE_PROG = 'RESET_SINGLE_PROG';
export const RESET_ALL_PROG = 'RESET_ALL_PROG';
export const REMOVE_SINGLE_PROG = 'REMOVE_SINGLE_PROG';
export const ADD_SINGLE_PROG = 'ADD_SINGLE_PROG';
export const MARK_ALL_PROG = 'MARK_ALL_PROG';
export const EDIT_PROG = 'EDIT_PROG';
export const EDIT_ROUNDS = 'EDIT_ROUNDS';
export const TRACK_ACTION = 'TRACK_ACTION';
export const LOG_INDIVIDUAL_DAYS = 'LOG_INDIVIDUAL_DAYS';
export const GET_ALL_SAVED_WORKOUTS = 'GET_ALL_SAVED_WORKOUTS';
export const UPDATE_SAVED_WORKOUTS = 'UPDATE_SAVED_WORKOUTS';


export const SET_USER_LEVEL = 'SET_USER_LEVEL';
export const CONTINUE_USER_LEVEL = 'CONTINUE_USER_LEVEL';
export const SET_LEVELS = 'SET_LEVELS';
export const GET_WORKOUT = 'GET_WORKOUT';
export const LOG_NON_LEGACY_WORKOUT = 'LOG_NON_LEGACY_WORKOUT';
export const REMOVE_LOG_NON_LEGACY_WORKOUT = 'REMOVE_LOG_NON_LEGACY_WORKOUT';
export const CLEAR_DAY_LEVELS = 'CLEAR_DAY_LEVELS';


export const BYO_SET_UP = 'BYO_SET_UP';
export const BYO_ADD_WORKOUT = 'BYO_ADD_WORKOUT';
export const BYO_REMOVE_WORKOUT = 'BYO_REMOVE_WORKOUT';
export const BYO_RESET = 'BYO_RESET';
export const BYO_ADD_NEW_CATEGORY = 'BYO_ADD_NEW_CATEGORY';
export const BYO_SET_USER_SCHEDULE = 'BYO_SET_USER_SCHEDULE';
export const BYO_INITIALIZE = 'BYO_INITIALIZE';
export const BYO_CLEAR_DAY = 'BYO_CLEAR_DAY'
export const BYO_LOG_MAIN_COURSES = 'BYO_LOG_MAIN_COURSES';
export const BYO_REMOVE_LOG_MAIN_COURSES = 'BYO_REMOVE_LOG_MAIN_COURSES';
export const BYO_UPDATE_REPS_SECS = 'BYO_UPDATE_REPS_SECS';
export const BYO_UPDATE_ROUNDS = 'BYO_UPDATE_ROUNDS';
export const BYO_LOG_INDIVIDUAL_WORKOUTS = 'BYO_LOG_INDIVIDUAL_WORKOUTS'
export const BYO_REMOVE_LOG_INDIVIDUAL_WORKOUTS = 'BYO_REMOVE_LOG_INDIVIDUAL_WORKOUTS'
export const BYO_COPY_LAST_WORKOUT = 'BYO_COPY_LAST_WORKOUT';
export const BYO_GET_SAVED_WORKOUTS = 'BYO_GET_SAVED_WORKOUTS';
export const BYO_SAVE_WORKOUT = 'BYO_SAVE_WORKOUT';
export const BYO_LOAD_FAV_WORKOUT_SCHEDULE = 'BYO_LOAD_FAV_WORKOUT_SCHEDULE';
export const BYO_DELETE_FAV_WORKOUT = 'BYO_DELETE_FAV_WORKOUT';
export const BYO_LEGACY_LOG_CHECK = 'BYO_LEGACY_LOG_CHECK';

export const BYO_OPEN_LEGACY_WORKOUT_MODAL = 'BYO_OPEN_LEGACY_WORKOUT_MODAL';
export const BYO_GET_ALL_LEGACY_PROGS = 'BYO_GET_ALL_LEGACY_PROGS';
export const BYO_SET_PROGS = 'BYO_SET_PROGS';
