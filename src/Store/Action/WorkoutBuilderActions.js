import * as actionTypes from './actionTypes';
import { showToast } from './calendarActions';
import axios from 'axios';
import * as Sentry from "@sentry/react";
import _ from 'lodash';

import { getCalanderDate } from '../../Components/UtilComponents/GetCurrentWeek';
import { AxiosConfig, areAllSame, idToClass, legacyNameToId } from '../util'


export const addNewCategory = (categoryType, sectionIndex, sectionType, count) => (dispatch, getState) => {
  const state = getState();
  const buildYourOwn = state.buildYourOwn;
  let courseArray = _.cloneDeep(buildYourOwn[sectionType]);
  const currentCount = count + 1;
  let categoryId = courseArray[sectionIndex].categoryId


  courseArray.splice(
    sectionIndex + 1,
    0,
    {
      category: categoryType,
      hasWorkout: false,
      courseData: {},
      isLegacy: false,
      count: currentCount,
      categoryId: categoryId
    }
  )

  courseArray = courseArray.map(course => {
    if (course.category === categoryType) {
      return {
        ...course,
        count: currentCount
      }
    }
    return course
  })
  dispatch({
    type: actionTypes.BYO_ADD_NEW_CATEGORY,
    payload: {
      ...buildYourOwn,
      [sectionType]: courseArray
    }
  })
}

export const removeCategory = (sectionIndex, sectionType) => (dispatch, getState) => {
  const state = getState();
  const buildYourOwn = state.buildYourOwn;
  let courseArray = _.cloneDeep(buildYourOwn[sectionType]);

  let courseData = courseArray[sectionIndex];
  let categoryType = courseData.category;
  let count = courseData.count;

  if (count > 1) {
    courseArray.splice(sectionIndex, 1);

    courseArray = courseArray.map(course => {
      if (course.category === categoryType) {
        return {
          ...course,
          count: count - 1
        }
      }
      return course
    })

  }
  else {
    courseArray[sectionIndex] = {
      ...courseArray[sectionIndex],
      hasWorkout: false,
      courseData: {},
      count: 1
    }
  }


  dispatch({
    type: actionTypes.BYO_REMOVE_WORKOUT,
    payload: {
      ...buildYourOwn,
      [sectionType]: courseArray
    }
  })
}

export const addToEditRow = (workoutData, sectionIndex, sectionType, isLegacy) => (dispatch, getState) => {
  const state = getState();
  const buildYourOwn = state.buildYourOwn;

  let courseArray = _.cloneDeep(buildYourOwn[sectionType]);

  let filteredTypes = courseArray
    .filter(courses => courses.category === workoutData.trainingType)
    .filter(courses => courses.courseData?.classOrExerciseName === workoutData.classOrExerciseName);

  if (filteredTypes.length) {
    dispatch(showToast('You can only add this course once.', 'error', 3000))
  }
  else {
    courseArray[sectionIndex] = {
      ...courseArray[sectionIndex],
      hasWorkout: true,
      courseData: workoutData,
      isLegacy: isLegacy
    }

    dispatch({
      type: actionTypes.BYO_ADD_WORKOUT,
      payload: {
        ...buildYourOwn,
        [sectionType]: courseArray
      }
    })
  }
}

export const clearAll = () => {
  return {
    type: actionTypes.BYO_RESET
  }
}

export const saveWorkout = (dateIndex, dateKey, hasCallBack, cb) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, timezone } = state.login;
  const date = getCalanderDate(timezone)[dateIndex];
  const buildYourOwn = state.buildYourOwn;

  let data = {
    userId: UserId,
    date: date,
    classOrExerciseInfoList: []
  }

  buildYourOwn.mainCourses.forEach(item => {
    if (item.courseData?.classIdOrExerciseId) {
      data.classOrExerciseInfoList.push({
        classOrProgramOrExId: item.courseData?.classIdOrExerciseId,
        orderingType: item.courseData?.orderingType,
      })
    }
  })

  buildYourOwn.individualWorkouts.forEach(item => {
    if (item.courseData?.classIdOrExerciseId) {
      data.classOrExerciseInfoList.push({
        classOrProgramOrExId: item.courseData?.classIdOrExerciseId,
        orderingType: item.courseData?.orderingType,
      })
    }
  })

  // checks if there are wokrouts in the schedule for that day
  // is so then edit mode wokrouts (put request) else post request for new schedule
  const method = buildYourOwn.userSchedule[dateKey].mainWorkouts.length || buildYourOwn.userSchedule[dateKey].individualWorkouts.length
    ? 'put'
    : 'post';

  axios(AxiosConfig(method, `/byo/schedule/builder/users/${UserId}`, webToken, { data: data })).then(res => {
    let newWorkoutArray = [...res.data.workoutsInADayList];
    newWorkoutArray = newWorkoutArray.map(proccessWorkoutObj).filter(x => !!x);


    const mainWorkouts = newWorkoutArray.filter(item => item.type !== 'Exercise');
    const individualWorkouts = newWorkoutArray.filter(item => item.type === 'Exercise');
    const rounds = individualWorkouts.length ? areAllSame(individualWorkouts, 'rounds') : 0

    dispatch({
      type: actionTypes.BYO_SET_USER_SCHEDULE,
      payload: {
        userSchedule: {
          ...buildYourOwn.userSchedule,
          [dateKey]: {
            mainWorkouts: mainWorkouts,
            individualWorkouts: individualWorkouts,
            rounds: rounds
          }
        }
      }
    })
  }).then(() => {
    if (hasCallBack) {
      cb();
    }
  }).then(() => {
    dispatch(clearAll());
  }).catch(err => {
    Sentry.captureException(err);
  })
}

const proccessWorkoutObj = w => {
  let newWokroutObj = { ...w };

  let isWorkoutAccessable = newWokroutObj.workout ? true : false;

  if (newWokroutObj.type === 'Program') {
    newWokroutObj = {
      ...newWokroutObj,
      ...newWokroutObj.workout,
      trainingType: idToClass[newWokroutObj.classOrProgOrExId].trainingType,
      className: newWokroutObj.classOrProgOrExName,
      showInLegacyModal: true,
      isWorkoutAccessable
    }
  }
  else if (newWokroutObj.type === 'Exercise') {
    if (isWorkoutAccessable) {
      newWokroutObj = {
        ...newWokroutObj,
        ...newWokroutObj.workout,
        trainingType: newWokroutObj.category,
        mediaId: newWokroutObj.workout.videos?.length ? newWokroutObj.workout.videos[0].mediaId : '',
        repsOrSecs: newWokroutObj.workout.isLogged ? newWokroutObj.workout.numOfSecsOrRepsLogged : newWokroutObj.workout.repsOrSecs,
        imageUrl: newWokroutObj.image,
        exerciseName: newWokroutObj.classOrProgOrExName,
        isWorkoutAccessable
      }
    }
    else {
      newWokroutObj = {
        ...newWokroutObj,
        ...newWokroutObj.workout,
        trainingType: newWokroutObj.category,
        mediaId: '',
        repsOrSecs: '5',
        imageUrl: newWokroutObj.image,
        exerciseName: newWokroutObj.classOrProgOrExName,
        rounds: 1,
        isWorkoutAccessable
      }
    }
    delete newWokroutObj.workout;
    delete newWokroutObj.image;
  }
  else {
    newWokroutObj = {
      ...newWokroutObj,
      ...newWokroutObj.workout,
      trainingType: newWokroutObj.category,
      className: newWokroutObj.classOrProgOrExName,
      isWorkoutAccessable
    }

    delete newWokroutObj.workout;
  }

  return newWokroutObj;
}

const proccessScheduleData = (userSchedule) => {
  const userScheduleKeys = Object.keys(userSchedule);
  let newUserSchedule = {}

  userScheduleKeys.forEach(k => {
    let weekDay = userSchedule[k]?.workoutsInADayList;

    if (weekDay) {
      weekDay = weekDay.map(proccessWorkoutObj).filter(x => !!x);
    }
    else {
      weekDay = []
    }

    const mainWorkouts = weekDay.filter(item => item.type !== 'Exercise');
    const individualWorkouts = weekDay.filter(item => item.type === 'Exercise');
    const rounds = individualWorkouts.length ? areAllSame(individualWorkouts, 'rounds') : 0;

    newUserSchedule[k] = {
      mainWorkouts: mainWorkouts,
      individualWorkouts: individualWorkouts,
      rounds: rounds,
      favoriteId: userSchedule[k]?.favoriteId
    };
  })

  return newUserSchedule;
}

export const getBYODashoard = () => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId } = state.login;

  axios(AxiosConfig('get', `/byo/schedule/view/weekly/users/${UserId}`, webToken)).then(res => {
    dispatch({
      type: actionTypes.BYO_SET_USER_SCHEDULE,
      payload: {
        userSchedule: {
          ...proccessScheduleData(res.data)
        }
      }
    })
    dispatch(getSavedWorkoutsBYO());
  }).catch(err => {
    Sentry.captureException(err);
  })
}


export const loadScheduleToEdit = (dateKey) => (dispatch, getState) => {
  const state = getState();
  const BuildYourOwn = state.buildYourOwn;
  const singleDaySchedule = state.buildYourOwn.userSchedule[dateKey];
  let action;

  if (!singleDaySchedule.mainWorkouts.length && !singleDaySchedule.individualWorkouts.length) {
    action = {
      type: actionTypes.BYO_INITIALIZE,
      payload: {}
    }
  }
  else {
    const mainWorkouts = singleDaySchedule.mainWorkouts;
    const individualWorkouts = singleDaySchedule.individualWorkouts;

    let warmUps = mainWorkouts.filter(item => item.orderingType === 1);
    let followAlongs = mainWorkouts.filter(item => item.orderingType >= 2 && item.orderingType <= 12);
    let foundation = mainWorkouts.filter(item => item.orderingType === 13);
    let skill = mainWorkouts.filter(item => item.orderingType === 14);

    let push = individualWorkouts.filter(item => item.orderingType === 15);
    let pull = individualWorkouts.filter(item => item.orderingType === 16);
    let core = individualWorkouts.filter(item => item.orderingType === 17);
    let legs = individualWorkouts.filter(item => item.orderingType === 18);
    let mobility = individualWorkouts.filter(item => item.orderingType === 19);

    let newMainCoursesObj = {
      'Warm-Up': {
        courses: warmUps,
        count: warmUps.length,
        categoryId: 1
      },
      'Follow Along': {
        courses: followAlongs,
        count: followAlongs.length,
        categoryId: 2
      },
      'Foundation': {
        courses: foundation,
        count: foundation.length,
        isLegacy: true,
        categoryId: 13
      },
      'Skill': {
        courses: skill,
        count: skill.length,
        isLegacy: true,
        categoryId: 14
      }
    };

    let mainKeys = Object.keys(newMainCoursesObj);
    let newMainArray = [];
    mainKeys.forEach(k => {
      let count = newMainCoursesObj[k].count;
      if (newMainCoursesObj[k].courses.length) {
        newMainCoursesObj[k].courses.forEach(item => {
          if (item.showInLegacyModal) {
            newMainArray.push({
              category: item.trainingType,
              hasWorkout: true,
              courseData: {
                ...idToClass[item.classOrProgOrExId],
              },
              count: newMainCoursesObj[k].count,
              categoryId: newMainCoursesObj[k].categoryId,
              isLegacy: true,
            })
          }
          else {
            newMainArray.push({
              category: item.category,
              hasWorkout: true,
              courseData: {
                classOrExerciseName: item.className,
                image: item.image,
                trainingType: item.category,
                mediaId: item.mediaId,
                orderingType: item.orderingType,
                classIdOrExerciseId: item.classOrProgOrExId
              },
              count: newMainCoursesObj[k].count,
              categoryId: newMainCoursesObj[k].categoryId
            })
          }
        })
      }
      else {
        newMainArray.push({
          category: k,
          hasWorkout: false,
          courseData: {},
          count: count,
          isLegacy: false,
          categoryId: newMainCoursesObj[k].categoryId
        })
      }
    });


    let newIndividualCoursesObj = {
      'Push': {
        courses: push,
        count: push.length,
        categoryId: 15
      },
      'Pull': {
        courses: pull,
        count: pull.length,
        categoryId: 16
      },
      'Core': {
        courses: core,
        count: core.length,
        categoryId: 17
      },
      'Legs': {
        courses: legs,
        count: legs.length,
        categoryId: 18
      },
      'Mobility': {
        courses: mobility,
        count: mobility.length,
        categoryId: 19
      }
    };

    let individualKeys = Object.keys(newIndividualCoursesObj);
    let newIndividualArray = [];

    individualKeys.forEach(k => {
      let count = newIndividualCoursesObj[k].count;
      if (newIndividualCoursesObj[k].courses.length) {
        newIndividualCoursesObj[k].courses.forEach(item => {
          newIndividualArray.push({
            category: item.category,
            hasWorkout: true,
            courseData: {
              classOrExerciseName: item.exerciseName,
              image: item.imageUrl,
              trainingType: item.category,
              mediaId: item.mediaId,
              orderingType: item.orderingType,
              classIdOrExerciseId: item.classOrProgOrExId
            },
            count: newIndividualCoursesObj[k].count,
            categoryId: newIndividualCoursesObj[k].categoryId
          })
        })
      }
      else {
        newIndividualArray.push({
          category: k,
          hasWorkout: false,
          courseData: {},
          count: count,
          categoryId: newIndividualCoursesObj[k].categoryId
        })
      }
    })

    action = {
      type: actionTypes.BYO_INITIALIZE,
      payload: {
        ...BuildYourOwn,
        mainCourses: newMainArray,
        individualWorkouts: newIndividualArray
      }
    }
  }

  dispatch(action);
}


export const logMainCourses = (dateIndex, dateKey, classId) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, timezone } = state.login;
  const date = getCalanderDate(timezone)[dateIndex];
  const userSchedule = _.cloneDeep(state.buildYourOwn.userSchedule);


  axios(AxiosConfig('post', `/byo/log/class/${classId}/users/${UserId}?loggedDate=${date}`, webToken)).then(res => {
    const index = userSchedule[dateKey].mainWorkouts.findIndex(item => item.classOrProgOrExId === classId);
    userSchedule[dateKey].mainWorkouts[index].isLogged = true;

    dispatch({
      type: actionTypes.BYO_LOG_MAIN_COURSES,
      payload: {
        userSchedule: {
          ...userSchedule,
          [dateKey]: {
            ...userSchedule[dateKey],
            mainWorkouts: userSchedule[dateKey].mainWorkouts
          }
        }
      }
    })
  }).catch(err => {
    Sentry.captureException(err);
  })
}

export const removeMainCourseLog = (dateIndex, dateKey, classId) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, timezone } = state.login;
  const date = getCalanderDate(timezone)[dateIndex];
  const userSchedule = _.cloneDeep(state.buildYourOwn.userSchedule);


  axios(AxiosConfig('delete', `/byo/log/class/${classId}/users/${UserId}?loggedDate=${date}`, webToken)).then(res => {
    const index = userSchedule[dateKey].mainWorkouts.findIndex(item => item.classOrProgOrExId === classId);
    userSchedule[dateKey].mainWorkouts[index].isLogged = false;

    dispatch({
      type: actionTypes.BYO_REMOVE_LOG_MAIN_COURSES,
      payload: {
        userSchedule: {
          ...userSchedule,
          [dateKey]: {
            ...userSchedule[dateKey],
            mainWorkouts: userSchedule[dateKey].mainWorkouts
          }
        }
      }
    })
  }).catch(err => {
    Sentry.captureException(err);
  })
}

export const updateRepsSecs_BYO = (dateKey, classOrProgOrExId, repsOrSecs) => (dispatch, getState) => {
  const state = getState();
  const { userSchedule } = state.buildYourOwn;
  const individualWorkouts = _.cloneDeep(userSchedule[dateKey].individualWorkouts);
  const index = individualWorkouts.findIndex(item => item.classOrProgOrExId === classOrProgOrExId);

  individualWorkouts[index].repsOrSecs = repsOrSecs;

  dispatch({
    type: actionTypes.BYO_UPDATE_REPS_SECS,
    payload: {
      userSchedule: {
        ...userSchedule,
        [dateKey]: {
          ...userSchedule[dateKey],
          individualWorkouts: individualWorkouts
        }
      }
    }
  })
}

export const updateRounds_BYO = (dateKey, value) => (dispatch, getState) => {
  const state = getState();
  const { userSchedule } = state.buildYourOwn;

  dispatch({
    type: actionTypes.BYO_UPDATE_ROUNDS,
    payload: {
      userSchedule: {
        ...userSchedule,
        [dateKey]: {
          ...userSchedule[dateKey],
          rounds: value
        }
      }
    }
  })
}

export const logIndividualWorkouts = (dateKeyIndex, dateKey, exerciseId, numOfSecsOrReps) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, timezone } = state.login;
  const rounds = state.buildYourOwn.userSchedule[dateKey].rounds;
  const userSchedule = _.cloneDeep(state.buildYourOwn.userSchedule);
  const date = getCalanderDate(timezone)[dateKeyIndex];

  let body = {
    "userId": UserId,
    "exerciseId": exerciseId,
    "rounds": rounds,
    "numOfSecsOrReps": numOfSecsOrReps,
    "createdDate": date
  }

  axios(AxiosConfig('post', `/byo/log/exercises/users/${UserId}`, webToken, { data: body })).then(res => {
    const index = userSchedule[dateKey].individualWorkouts.findIndex(item => item.classOrProgOrExId === exerciseId);

    userSchedule[dateKey].individualWorkouts[index].isLogged = true;
    dispatch({
      type: actionTypes.BYO_LOG_INDIVIDUAL_WORKOUTS,
      payload: {
        userSchedule: {
          ...userSchedule,
          [dateKey]: {
            ...userSchedule[dateKey],
            individualWorkouts: userSchedule[dateKey].individualWorkouts
          }
        }
      }
    })
  }).catch(err => {
    Sentry.captureException(err);
  })
}

export const unlogIndividualWorkouts = (dateKeyIndex, dateKey, exerciseId) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, timezone } = state.login;
  const userSchedule = _.cloneDeep(state.buildYourOwn.userSchedule);
  const date = getCalanderDate(timezone)[dateKeyIndex];

  axios(AxiosConfig('delete', `/byo/log/exercises/${exerciseId}/users/${UserId}?loggedDate=${date}`, webToken)).then(res => {
    const index = userSchedule[dateKey].individualWorkouts.findIndex(item => item.classOrProgOrExId === exerciseId);

    userSchedule[dateKey].individualWorkouts[index].isLogged = false;
    dispatch({
      type: actionTypes.BYO_REMOVE_LOG_INDIVIDUAL_WORKOUTS,
      payload: {
        userSchedule: {
          ...userSchedule,
          [dateKey]: {
            ...userSchedule[dateKey],
            individualWorkouts: userSchedule[dateKey].individualWorkouts
          }
        }
      }
    })
  }).catch(err => {
    Sentry.captureException(err);
  })
}

export const openLegacyWorkoutModal = (courseName, dateIndex, isInDrawer = false) => {
  return {
    type: actionTypes.BYO_OPEN_LEGACY_WORKOUT_MODAL,
    payload: {
      courseName,
      dateIndex,
      open: true,
      isInDrawer,
    }
  }
}

export const getLegacyDataBYO = (courseName, dateIndex) => async (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, timezone } = state.login;
  const date = getCalanderDate(timezone)[dateIndex];

  const courseId = legacyNameToId[courseName];

  axios(AxiosConfig('get', `/byo/workout/${courseId}/users/${UserId}?date=${date}`, webToken))
    .then(function (response) {
      let orderedData = response.data.body;
      let userChosenProgressions = _.cloneDeep(orderedData);
      let LevelKeys = Object.keys(orderedData);
      let newArray = [];
      let index = 0;


      LevelKeys.forEach(lvlKey => {
        const section = orderedData[lvlKey];
        let sectionKeys = Object.keys(section);

        sectionKeys.forEach(sctKey => {
          userChosenProgressions[lvlKey][sctKey] = section[sctKey].filter(progression => progression.selected);

          if (userChosenProgressions[lvlKey][sctKey].length) {

            userChosenProgressions[lvlKey][sctKey].forEach(item => {
              newArray = [...newArray, { ...item, section: sctKey, levelKey: lvlKey, index: index }];
              index++;
            })
          }
        })
      })
      dispatch({
        type: actionTypes.BYO_SET_PROGS,
        payload: {
          selectedProgessions: newArray,
          loading: false,
          name: courseName,
          courseId: courseId,
          byoDate: date,
          isBuildYourOwn: true
        }
      })
    }).catch(function (error) {
      Sentry.captureException(error);
    });
}

export const openEditLegacyModalBYO = () => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId } = state.login;
  const { courseId } = state.legacyCourse;

  axios(AxiosConfig('get', `/byo/settings/edit-workout/users/${UserId}?workoutType=${courseId}`, webToken))
    .then(res => {
      dispatch({
        type: actionTypes.BYO_GET_ALL_LEGACY_PROGS,
        payload: {
          allProgressions: res.data.body,
          showEditModal: true
        },
      })
    }).catch(function (error) {
      Sentry.captureException(error);
    });
}

export const clearDay = (dateIndex, dateKey) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, timezone } = state.login;
  const date = getCalanderDate(timezone)[dateIndex];
  const buildYourOwn = state.buildYourOwn;

  axios(AxiosConfig('delete', `/byo/schedule/builder/users/${UserId}?currentDate=${date}`, webToken)).then(res => {
    dispatch({
      type: actionTypes.BYO_CLEAR_DAY,
      payload: {
        ...buildYourOwn,
        userSchedule: {
          ...buildYourOwn.userSchedule,
          [dateKey]: {
            mainWorkouts: [],
            individualWorkouts: [],
            rounds: 0
          }
        }
      }
    })
  }).catch(err => {
    Sentry.captureException(err);
  })
}

export const copyLastWorkoutBYO = (dateIndex, dateKey) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, timezone } = state.login;
  const date = getCalanderDate(timezone)[dateIndex];
  const buildYourOwn = state.buildYourOwn;

  axios(AxiosConfig('post', `/byo/schedule/copy-previous/users/${UserId}?date=${date}`, webToken))
    .then(res => {
      if (res.data === "There is no previous day's workout") {
        dispatch(showToast('There is no previous day\'s workout', 'error'));
      }
      else {
        let weekDay = res.data.workoutsInADayList;

        if (weekDay) {
          weekDay = weekDay.map(proccessWorkoutObj).filter(x => !!x);
        }
        else {
          weekDay = []
        }

        const mainWorkouts = weekDay.filter(item => item.type !== 'Exercise');
        const individualWorkouts = weekDay.filter(item => item.type === 'Exercise');
        const rounds = individualWorkouts.length ? areAllSame(individualWorkouts, 'rounds') : 0;

        dispatch({
          type: actionTypes.BYO_COPY_LAST_WORKOUT,
          payload: {
            ...buildYourOwn,
            userSchedule: {
              ...buildYourOwn.userSchedule,
              [dateKey]: {
                mainWorkouts: mainWorkouts,
                individualWorkouts: individualWorkouts,
                rounds: rounds,
                favoriteId: res.data.favoriteId
              }
            }
          }
        })
      }

    }).catch(function (error) {
      Sentry.captureException(error);
    });
}

export const saveWorkoutTofavoriteBYO = (dateIndex, title, description) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, timezone } = state.login;
  const date = getCalanderDate(timezone)[dateIndex];
  const buildYourOwn = state.buildYourOwn;
  const dateKey = Object.keys(buildYourOwn.userSchedule)[dateIndex]
  const mainWorkouts = buildYourOwn.userSchedule[dateKey].mainWorkouts.map(item => `${item.classOrProgOrExId}-${item.orderingType}`).join(',');
  const individualWorkouts = buildYourOwn.userSchedule[dateKey].individualWorkouts.map(item => `${item.classOrProgOrExId}-${item.orderingType}`).join(',');
  const workoutIdList = [ mainWorkouts, individualWorkouts].join(',');


  const data = {
    "userId": UserId,
    "title": title,
    "description": description,
    "workoutIdList":  workoutIdList,
    "dateCreated": date
  }


  axios(AxiosConfig('post', `/byo/favorites/users/${UserId}`, webToken, { data: data }))
    .then(res => {
      dispatch({
        type: actionTypes.BYO_SAVE_WORKOUT,
        payload: {
          ...buildYourOwn,
          userSchedule: {
            ...buildYourOwn.userSchedule,
            [dateKey]: {
              ...buildYourOwn.userSchedule[dateKey],
              favoriteId: res.data.favoriteId
            }
          },
          savedWorkouts: [
            ...buildYourOwn.savedWorkouts,
            res.data
          ]
        }
      })
    }).catch(function (error) {
      Sentry.captureException(error);
    });
}

export const getSavedWorkoutsBYO = () => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId } = state.login;
  const buildYourOwn = state.buildYourOwn;

  AxiosConfig('get', `/byo/favorites/all/users/${UserId}`, webToken);

  axios(AxiosConfig('get', `/byo/favorites/all/users/${UserId}`, webToken)).then(res => {
    dispatch({
      type: actionTypes.BYO_GET_SAVED_WORKOUTS,
      payload: {
        ...buildYourOwn,
        savedWorkouts: res.data
      }
    })
  }).catch(function (error) {
    Sentry.captureException(error);
  });
}

export const loadSavedWorkoutToScheduleBYO = (favoriteId, dateIndex) => (dispatch, getState) => {
  const state = getState();
  const { timezone, webToken, UserId } = state.login;
  const date = getCalanderDate(timezone)[dateIndex];
  const buildYourOwn = state.buildYourOwn;
  const dateKey = Object.keys(buildYourOwn.userSchedule)[dateIndex];

  axios(AxiosConfig('post', `/byo/favorites/${favoriteId}/users/${UserId}?date=${date}`, webToken))
    .then(res => {
      let weekDay = res.data.workoutsInADayList;

      if (weekDay) {
        weekDay = weekDay.map(proccessWorkoutObj).filter(x => !!x);
      }
      else {
        weekDay = []
      }

      const mainWorkouts = weekDay.filter(item => item.type !== 'Exercise');
      const individualWorkouts = weekDay.filter(item => item.type === 'Exercise');
      const rounds = individualWorkouts.length ? areAllSame(individualWorkouts, 'rounds') : 0;

      dispatch({
        type: actionTypes.BYO_LOAD_FAV_WORKOUT_SCHEDULE,
        payload: {
          ...buildYourOwn,
          userSchedule: {
            ...buildYourOwn.userSchedule,
            [dateKey]: {
              mainWorkouts: mainWorkouts,
              individualWorkouts: individualWorkouts,
              rounds: rounds,
              favoriteId: res.data.favoriteId
            }
          }
        }
      })
    }).catch(error => {
      Sentry.captureException(error);
    });
}

export const deleteFavoriteWorkoutBYO = (favoriteId) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId } = state.login;
  const buildYourOwn = state.buildYourOwn;

  axios(AxiosConfig('delete', `/byo/favorites/${favoriteId}/users/${UserId}`, webToken))
    .then(res => {
      const userSchedule = _.cloneDeep(buildYourOwn.userSchedule);
      const userScheduleKeys = Object.keys(userSchedule);

      userScheduleKeys.forEach(key => {
        if (userSchedule[key].favoriteId && userSchedule[key].favoriteId === favoriteId) {
          userSchedule[key].favoriteId = null;
        }
      })

      dispatch({
        type: actionTypes.BYO_DELETE_FAV_WORKOUT,
        payload: {
          ...buildYourOwn,
          savedWorkouts: buildYourOwn.savedWorkouts.filter(item => item.favoriteId !== favoriteId),
          userSchedule: {
            ...userSchedule
          }
        }
      })
    }).catch(error => {
      Sentry.captureException(error);
    });
}

export const handleLegacyLogCheck = () => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId } = state.login;
  const legacyCourse = state.legacyCourse;
  const buildYourOwn =  state.buildYourOwn;
  const courseId = legacyCourse.courseId;

  axios(AxiosConfig('get', `/byo/log/program/status/users/${UserId}/workout/${courseId}`, webToken))
    .then(res => {
      const dateKeys = Object.keys(res.data);
      const userSchedule = _.cloneDeep(buildYourOwn.userSchedule);

      dateKeys.forEach(key => {
        let legacyIndex = userSchedule[key].mainWorkouts.findIndex(item => item.classOrProgOrExId === res.data[key].classOrProgOrExId);
        userSchedule[key].mainWorkouts[legacyIndex].isLogged = res.data[key].isLogged;
      })

      dispatch({
        type: actionTypes.BYO_LEGACY_LOG_CHECK,
        payload: {
          ...buildYourOwn,
          userSchedule: {
            ...userSchedule
          }
        }
      })
    }).catch(function (error) {
      Sentry.captureException(error);
    });
}

export const copyLastWeeksWorkout = () => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId } = state.login;

  axios(AxiosConfig('post', `/byo/schedule/view/weekly/copy-last/users/${UserId}`, webToken)).then(res => {
    dispatch({
      type: actionTypes.BYO_SET_USER_SCHEDULE,
      payload: {
        userSchedule: {
          ...proccessScheduleData(res.data)
        }
      }
    })
    dispatch(getSavedWorkoutsBYO());
  }).catch(err => {
    Sentry.captureException(err);
  })
}
