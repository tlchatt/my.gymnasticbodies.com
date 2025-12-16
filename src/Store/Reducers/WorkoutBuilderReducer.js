import * as actionTypes from '../Action/actionTypes';
import { updateObject } from '../util';

const initialEditMode = {
  mainCourses: [
    {
      category: 'Warm-Up',
      hasWorkout: false,
      courseData: {},
      count: 1,
      isLegacy: false,
      categoryId: 1,
      maxCount: 3
    },
    {
      category: 'Follow Along',
      hasWokrout: false,
      courseData: {},
      count: 1,
      isLegacy: false,
      categoryId: 2,
      maxCount: 7
    },
    {
      category: 'Foundation',
      hasWorkout: false,
      courseData: {},
      count: 1,
      isLegacy: false,
      categoryId: 13,
      maxCount: 3
    },
    {
      category: 'Skill',
      hasWorkout: false,
      courseData: {},
      count: 1,
      isLegacy: false,
      categoryId: 14,
      maxCount: 3
    }
  ],
  individualWorkouts: [
    {
      category: 'Push',
      hasWorkout: false,
      courseData: {},
      count: 1,
      categoryId: 15,
      maxCount: 3
    },
    {
      category: 'Pull',
      hasWorkout: false,
      courseData: {},
      count: 1,
      categoryId: 16,
      maxCount: 3
    },
    {
      category: 'Core',
      hasWorkout: false,
      courseData: {},
      count: 1,
      categoryId: 17,
      maxCount: 3
    },
    {
      category: 'Legs',
      hasWorkout: false,
      courseData: {},
      count: 1,
      categoryId: 18,
      maxCount: 3
    },
    {
      category: 'Mobility',
      hasWorkout: false,
      courseData: {},
      count: 1,
      categoryId: 19,
      maxCount: 3
    }
  ],
}

const initialState = {
  ...initialEditMode,
  date: '',
  dateRequest: '',
  userSchedule: null,
  savedWorkouts: []
}


export const WorkoutBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BYO_SET_UP:
      return updateObject(state, action.payload);
    case actionTypes.BYO_ADD_WORKOUT:
      return updateObject(state, action.payload);
    case actionTypes.BYO_REMOVE_WORKOUT:
      return updateObject(state, action.payload);
    case actionTypes.BYO_ADD_NEW_CATEGORY:
      return updateObject(state, action.payload);
    case actionTypes.BYO_SET_USER_SCHEDULE:
      return updateObject(state, action.payload);
    case actionTypes.BYO_INITIALIZE:
      return updateObject(state, action.payload)
    case actionTypes.BYO_RESET:
      return updateObject(state, initialEditMode);
    case actionTypes.BYO_CLEAR_DAY:
      return updateObject(state, action.payload);
    case actionTypes.BYO_LOG_MAIN_COURSES:
      return updateObject(state, action.payload);
    case actionTypes.BYO_REMOVE_LOG_MAIN_COURSES:
      return updateObject(state, action.payload);
    case actionTypes.BYO_UPDATE_REPS_SECS:
      return updateObject(state, action.payload);
    case actionTypes.BYO_UPDATE_ROUNDS:
      return updateObject(state, action.payload);
    case actionTypes.BYO_LOG_INDIVIDUAL_WORKOUTS:
      return updateObject(state, action.payload);
    case actionTypes.BYO_REMOVE_LOG_INDIVIDUAL_WORKOUTS:
      return updateObject(state, action.payload);
    case actionTypes.BYO_COPY_LAST_WORKOUT:
      return updateObject(state, action.payload);
    case actionTypes.BYO_GET_SAVED_WORKOUTS:
      return updateObject(state, action.payload);
    case actionTypes.BYO_SAVE_WORKOUT:
      return updateObject(state, action.payload);
    case actionTypes.BYO_LOAD_FAV_WORKOUT_SCHEDULE:
      return updateObject(state, action.payload);
    case actionTypes.BYO_DELETE_FAV_WORKOUT:
      return updateObject(state, action.payload);
    case actionTypes.BYO_LEGACY_LOG_CHECK:
      return updateObject(state, action.payload);
    case actionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
