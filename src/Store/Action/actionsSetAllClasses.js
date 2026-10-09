import * as actionTypes from './actionTypes';
import _ from 'lodash'
import axios from 'axios';
import * as Sentry from "@sentry/react";
import { AxiosConfigNeon, validId } from '../util';
import { SetAllSubClassesInitial } from './actionsSetAllSubClasses';


export const SetAllClassesInitial = (data) => {
  let newData = _.cloneDeep(data);
  // Checks for sub courses and updates parent course to show in class finder
  data.forEach((element, index) => {
    if (element.classInfo && element.classInfo.workouts) {
      let updatedObj = _.cloneDeep(element);
      let isInSchedule = updatedObj.classInfo.workouts.find(item => item.dayIndexes) ? true : false;

      if (isInSchedule) {
        updatedObj.mySchedule = "MySchedule"
        newData[index] = updatedObj;
      }
    }
  });
  return {
    type: actionTypes.SET_ALL_CLASSES,
    classes: newData
  }
}


export const SetAllClasses = (data) => {
  return {
    type: actionTypes.SET_ALL_CLASSES,
    classes: data
  }
}


// Class Finder feed (replaces the retired AWS /welcome/users -> myCourses).
// Course catalog: static, served by app. (data/workout/classFinderCourses.json).
// "My Schedule": the member's own Guided-Plans week (levels_schedule days). Each class's
// days are written into classInfo.dayIndexes / workouts[].dayIndexes, the same shape the
// old feed carried, so the cards' Edit icon and the add-to-schedule switches pre-fill.
export const FetchClassFinder = () => (dispatch, getState) => {
  const { webToken, neonUserId } = getState().login;
  const userId = validId(neonUserId) || validId(localStorage.getItem('neonUserId'));

  const catalog = axios(AxiosConfigNeon('get', '/api/user/workout/byo?op=class-finder', webToken));
  const schedule = userId
    ? axios(AxiosConfigNeon('get', `/api/user/workout/levels?op=schedule-days&userId=${encodeURIComponent(userId)}`, webToken))
        .then(res => res.data.days || {})
        .catch(err => { Sentry.captureException(err); return {}; })
    : Promise.resolve({});

  return Promise.all([catalog, schedule]).then(([catalogRes, days]) => {
    const daysById = {};
    Object.keys(days).forEach(dayIndex => {
      (days[dayIndex] || []).forEach(id => {
        daysById[id] = [...(daysById[id] || []), Number(dayIndex)];
      });
    });

    const courses = (catalogRes.data || []).map(course => {
      const workouts = course.classInfo.workouts.map(workout => (
        daysById[workout.wp_postid] ? { ...workout, dayIndexes: daysById[workout.wp_postid] } : workout
      ));
      const ownDays = daysById[course.wp_postid];
      const inSchedule = !!ownDays || workouts.some(workout => workout.dayIndexes);
      return {
        ...course,
        show: true,
        mySchedule: inSchedule ? 'MySchedule' : '',
        classInfo: { ...course.classInfo, workouts, ...(ownDays ? { dayIndexes: ownDays } : {}) },
      };
    });

    dispatch(SetAllSubClassesInitial(courses));
    dispatch(SetAllClasses(courses));
  }).catch(err => Sentry.captureException(err));
};
