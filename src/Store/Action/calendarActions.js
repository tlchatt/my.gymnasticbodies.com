import * as actionTypes from './actionTypes';
import axios from 'axios';
import { SetAllClassesInitial } from './actionsSetAllClasses';
import { SetAllSubClassesInitial } from './actionsSetAllSubClasses';
import { getCurrentWeek } from '../util';
import _ from 'lodash'
import * as Sentry from "@sentry/react";
const API = process.env.REACT_APP_API;

export const SetCaladner = (updatedData) => {
  return {
    type: actionTypes.SET_CALENDAR,
    data: updatedData
  }
}

export const DragAndDrop = ({ postId, oldDay, newDay }, updatedData) => (dispatch, getState) => {
  const state = getState();
  const userId = state.login.UserId;
  const userConfig = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Bearer ${state.login.webToken}`
    }
  }

  dispatch(SetCaladner(updatedData));
  const DtoDIndex = {
    'MONDAY': 1,
    'TUESDAY': 2,
    'WEDNESDAY': 3,
    'THURSDAY': 4,
    'FRIDAY': 5,
    'SATURDAY': 6,
    'SUNDAY' : 7,
  }
  axios.put(
    `${API}/myschedule/users/${userId}?wpPostId=${postId}&oldDayIndex=${DtoDIndex[oldDay]}&newDayIndex=${DtoDIndex[newDay]}`,
    null,
    userConfig
  ).then(data => {}).catch(err => Sentry.captureException(err))
}

export const DeleteClass = ({ dayIndex, postId }, newState) => (dispatch, getState) => {
  const state = getState();
  const userId = state.login.UserId;
  const userConfig = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Bearer ${state.login.webToken}`
    }
  }
  axios.delete(
    `${API}/myschedule/users/${userId}?dayIndex=${dayIndex+1}&wpPostId=${postId}`,
    userConfig
  ).then(data => {
    dispatch(SetCaladner(newState))
  }).catch(err => {
    // console.log(err)
    Sentry.captureException(err)
  })
}

const UpdateUserPlan = (planData) => {
  return {
    type: actionTypes.UPDATE_USER_PLAN,
    planData: {
      level: planData.level,
      weekIndex: planData.weekIndex,
      planId: planData.planId
    }
  }
}

const SetLevelFail = () => {
  return {
    type: actionTypes.SET_CAL_FAIL
  }
}

const clearSetLevelFail = () => {
  return {
    type: actionTypes.SET_CAL_FAIL_CLEAR
  }
}

const asyncSetLevelFail = () => dispatch => {
  dispatch(SetLevelFail())
  setTimeout(() => {
    dispatch(clearSetLevelFail());
  }, 2500)
}

const SetLevelSuccess = (level) => {
  return {
    type: actionTypes.SET_CAL_SUCCESS,
    level
  }
}

const clearLevelSuccess = () => {
  return {
    type: actionTypes.CLEAR_CAL_SUCCESS
  }
}

const asyncSetLevelSuccess = (level) => dispatch => {
  dispatch(SetLevelSuccess(level))
  setTimeout(() => {
    dispatch(clearLevelSuccess());
  }, 2500)
}


export const ChooseLevel = (planData) => (dispatch, getState) => {
  const state = getState();
  const userId = state.login.UserId;
  const userConfig = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Bearer ${state.login.webToken}`
    }
  }
  const url = `${API}/myschedule/users/${userId}/plans/${planData.planId}/weekIndexes/${planData.weekIndex}`;

  axios.post(url, null, userConfig)
    .then(data => {
      dispatch(SetCaladner(data.data.body))
      dispatch(UpdateUserPlan({
        planId: planData.planId,
        weekIndex: planData.weekIndex,
        level: planData.planId - 1
      }))

      dispatch(asyncSetLevelSuccess(planData.planId - 1));

      axios.get(`${API}/welcome/users`, userConfig)
        .then(userData => {
          dispatch(SetAllClassesInitial(userData.data.myCourses))
          dispatch(SetAllSubClassesInitial(userData.data.myCourses))
        })
    })
    .catch(err => {
      // console.log(err);
      dispatch(asyncSetLevelFail());
      Sentry.captureException(err)
    });
}

export const UpdateSchedule = (data) => (dispatch, getState) => {
  const state = getState();
  const userId = state.login.UserId;
  const userConfig = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Bearer ${state.login.webToken}`
    }
  }
  const url = `${API}/myschedule/users/${userId}/classes/${data.courseId}?dayIndexes=${data.dayIndexes}`;
  axios.put(url, null, userConfig)
    .then(data => dispatch(SetCaladner(data.data.body))).catch(err => Sentry.captureException(err))
}

export const LogNonLegacyCourse = (courseId, day, taskId) => (dispatch, getState) => {
  const state = getState();
  const currentDay = getCurrentWeek(state.login.timezone)[day];
  const userId = state.login.UserId;

  const userConfig = {
    headers: {
      "Authorization": `Bearer ${state.login.webToken}`
    }
  }

  axios.post(`${API}/workout-service/classes/users/${userId}/logging?wpPostId=${courseId}&date=${currentDay}`, null, userConfig)
    .then(res => {
      let userTasks = _.cloneDeep(state.calendar.tasks);

      let updatedTask = {
        ...userTasks[taskId],
        workoutData: {
          completed: 1,
          total: 1
        }
      }

      userTasks[taskId] = updatedTask;

      dispatch({
        type: actionTypes.SET_CALENDAR,
        data: {
          ...state.calendar,
          tasks: userTasks
        }
      })

    }).catch(err =>  Sentry.captureException(err))
}


export const showToast = (message, variation, timeout=2500) => (dispatch) => {
  dispatch({ type: actionTypes.SHOW_TOAST, message: message, variation: variation })
  setTimeout(() => {
    dispatch({ type: actionTypes.HIDE_TOAST });
  }, timeout)
}


