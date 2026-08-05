import * as actionTypes from './actionTypes';
import axios from 'axios';
import { SetAllClassesInitial } from './actionsSetAllClasses';
import { SetAllSubClassesInitial } from './actionsSetAllSubClasses';
import { getCurrentWeek } from '../util';
import _ from 'lodash'
import * as Sentry from "@sentry/react";
import { logEvent } from '../../util/clientLogger';

const NEWAPI = process.env.REACT_APP_API_NEW;

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
  axios.post(`${NEWAPI}/api/user/workout/levels`, {
    userId: (state.login.neonUserId || localStorage.getItem('neonUserId')),
    op: 'move-item',
    level: state.login.levelId,
    classId: Number(postId),
    fromDayIndex: DtoDIndex[oldDay],
    toDayIndex: DtoDIndex[newDay],
  }, userConfig)
    .then(() => {})
    .catch(err => {
      // The optimistic SetCaladner above already moved the card, so a silent failure here
      // means the UI and the stored week disagree until the next reload.
      logEvent('my.calendar.move_failed', {
        data: { classId: postId, oldDay, newDay, status: err?.response?.status ?? null },
      });
      Sentry.captureException(err);
    })
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
  axios.post(`${NEWAPI}/api/user/workout/levels`, {
    userId: (state.login.neonUserId || localStorage.getItem('neonUserId')),
    op: 'remove-item',
    level: state.login.levelId,
    dayIndex: dayIndex + 1,
    classId: Number(postId),
  }, userConfig).then(data => {
    dispatch(SetCaladner(newState))
  }).catch(err => {
    logEvent('my.calendar.delete_failed', {
      data: { classId: postId, dayIndex, status: err?.response?.status ?? null },
    });
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
  // Choosing a plan level rewrites the stored week from that level's template, which is
  // what AWS did. The follow-up /welcome/users refresh is dropped: it only repopulated
  // myCourses, which no longer comes from AWS.
  const level = planData.planId - 1;
  axios.post(`${NEWAPI}/api/user/workout/levels`, {
    userId: (state.login.neonUserId || localStorage.getItem('neonUserId')),
    op: 'choose-level',
    level,
    workoutOrPlanId: planData.planId,
  }, userConfig)
    .then(() => {
      dispatch(UpdateUserPlan({
        planId: planData.planId,
        weekIndex: planData.weekIndex,
        level
      }))
      dispatch(asyncSetLevelSuccess(level));
    })
    .catch(err => {
      logEvent('my.calendar.choose_level_failed', {
        data: { planId: planData.planId, level, status: err?.response?.status ?? null },
      });
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
  axios.post(`${NEWAPI}/api/user/workout/levels`, {
    userId: (state.login.neonUserId || localStorage.getItem('neonUserId')),
    op: 'add-class-days',
    level: state.login.levelId,
    classId: Number(data.courseId),
    dayIndexes: data.dayIndexes,
  }, userConfig)
    .then(() => {})
    .catch(err => {
      logEvent('my.calendar.update_schedule_failed', {
        data: { classId: data.courseId, dayIndexes: String(data.dayIndexes), status: err?.response?.status ?? null },
      });
      Sentry.captureException(err)
    })
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

  axios.post(`${NEWAPI}/api/user/workout/levels`, {
    userId: (state.login.neonUserId || localStorage.getItem('neonUserId')),
    op: 'log-class',
    date: currentDay,
    classIds: [Number(courseId)],
  }, userConfig)
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


