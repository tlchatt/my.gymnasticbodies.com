import Axios from 'axios'
import { useSelector } from 'react-redux';
import axios from 'axios'
import moment from 'moment-timezone'
import _ from 'lodash'
import * as Sentry from "@sentry/react";

import { getCalanderDate } from '../../Components/UtilComponents/GetCurrentWeek'
import * as actionTypes from '../Action/actionTypes';
import { AxiosConfig } from '../util'
import { showToast } from './calendarActions';
import { SET_PROGRESSION } from './LegacyAction';
import { getData, updateData } from './dataManipulation';
const NEWAPI = process.env.REACT_APP_API_NEW

export const getBeginnerLevel = () => (dispatch, getState) => {/* incomplete, has failover directly to lukeData */
  console.log('getBeginnerLevel = () => `/myschedule/beginner/view/weekly/users/$')
  const state = getState();
  const { webToken, UserId } = state.login;
  let lukeData = {
    "MONDAY,DECEMBER 1": {
      "scheduleId": 31595,
      "workoutId": 3,
      "classesList": [
        {
          "classId": 59600,
          "className": "7 Minute Warm-Up",
          "trainingType": "Warm-Up",
          "mediaId": "jTRUtQhq.json?exp=1764613848769&sig=04f1d51b2a5c189dd815a28e32134877",
          "image": "330x220-7min.jpg",
          "caption": null,
          "isLogged": false,
          "description": "Skipping your warm up should be out of the question, but if you want to hit the important points in seven minutes, this one will do the trick. Warm up and stretch all of your biggest muscle groups and be ready to jump into your strength work."
        },
        {
          "classId": 59526,
          "className": "Crab/Ape",
          "trainingType": "Fundamentals",
          "mediaId": "J6YVXB0m.json?exp=1764613848769&sig=42c191d5825a0aedf297b18050374724",
          "image": "Fundamentals-Posters.jpg",
          "caption": "3x Walk 25 ft ",
          "isLogged": false,
          "description": "Learn to execute the crab and ape movements. The crab position will test your shoulder extension mobility while the ape exercise will assess your ankle and hip range. Both of these movements will have you working into your best variation of the exercise, and moving across the floor in the positions."
        },
        {
          "classId": 59528,
          "className": "Body Orientations",
          "trainingType": "Fundamentals",
          "mediaId": "WA2YRETv.json?exp=1764613848769&sig=cf4bcd5ffcb7f72a05c1f7cd30fcb6f5",
          "image": "Fundamentals-Posters2.jpg",
          "caption": "Hold 3x30 sec",
          "isLogged": false,
          "description": "You’ll become proficient in four new body positions: front support, rear support, supine, and prone. Knowing what these terms mean, and practicing their shapes, will prepare you to use them as building blocks in more advanced movements"
        },
        {
          "classId": 59530,
          "className": "Wrist Mobility",
          "trainingType": "Fundamentals",
          "mediaId": "ShsIhtjD.json?exp=1764613848769&sig=38910f3260de8a4fabb4acc70debbda7",
          "image": "Fundamentals-Posters3.jpg",
          "caption": "Follow Along",
          "isLogged": false,
          "description": "In this lesson, you’ll move your wrists through a sequence of stretches created to help you regain your full movement ability in these key joints. When done consistently, these mobilities will prepare the wrists to be healthy and strong, even with additional pressure and load from movements like push-ups."
        },
        {
          "classId": 59873,
          "className": "Bands Elbow & Wrist",
          "trainingType": "Bands",
          "mediaId": "WGwT0Sv5.json?exp=1764613848769&sig=91ebed7c73833d3fb6bca698632f9d32",
          "image": "330x220-Elbows-WristsBands-1.jpg",
          "caption": null,
          "isLogged": false,
          "description": null
        },
        {
          "classId": 59251,
          "className": "Thoracic",
          "trainingType": "Restore",
          "mediaId": "4hoH3sAq.json?exp=1764613848769&sig=735823516eb4c4020f587aef78379c25",
          "image": "restore-thoracic-330x2206.jpg",
          "caption": null,
          "isLogged": false,
          "description": "In just 10 minutes, you can begin building essential range of motion for healthy daily movement as well as mobility in the thoracic spine, a first step if bridge work is on your horizon."
        }
      ]
    },
    "TUESDAY,DECEMBER 2": {
      "scheduleId": 31772,
      "workoutId": 4,
      "classesList": [
        {
          "classId": 59600,
          "className": "7 Minute Warm-Up",
          "trainingType": "Warm-Up",
          "mediaId": "jTRUtQhq.json?exp=1764613848771&sig=0da83a460fae5631b1b88f728ffe97e7",
          "image": "330x220-7min.jpg",
          "caption": null,
          "isLogged": false,
          "description": "Skipping your warm up should be out of the question, but if you want to hit the important points in seven minutes, this one will do the trick. Warm up and stretch all of your biggest muscle groups and be ready to jump into your strength work."
        },
        {
          "classId": 59526,
          "className": "Crab/Ape",
          "trainingType": "Fundamentals",
          "mediaId": "J6YVXB0m.json?exp=1764613848771&sig=c141e0850b8a102edf507e5e60be123c",
          "image": "Fundamentals-Posters.jpg",
          "caption": "3x Walk 25 ft ",
          "isLogged": false,
          "description": "Learn to execute the crab and ape movements. The crab position will test your shoulder extension mobility while the ape exercise will assess your ankle and hip range. Both of these movements will have you working into your best variation of the exercise, and moving across the floor in the positions."
        },
        {
          "classId": 59528,
          "className": "Body Orientations",
          "trainingType": "Fundamentals",
          "mediaId": "WA2YRETv.json?exp=1764613848772&sig=710ccf8136676758ed1a560b685c0d86",
          "image": "Fundamentals-Posters2.jpg",
          "caption": "Hold 3x30 sec",
          "isLogged": false,
          "description": "You’ll become proficient in four new body positions: front support, rear support, supine, and prone. Knowing what these terms mean, and practicing their shapes, will prepare you to use them as building blocks in more advanced movements"
        },
        {
          "classId": 59530,
          "className": "Wrist Mobility",
          "trainingType": "Fundamentals",
          "mediaId": "ShsIhtjD.json?exp=1764613848772&sig=4780826a8c57ce739f8af517ba59b49d",
          "image": "Fundamentals-Posters3.jpg",
          "caption": "Follow Along",
          "isLogged": false,
          "description": "In this lesson, you’ll move your wrists through a sequence of stretches created to help you regain your full movement ability in these key joints. When done consistently, these mobilities will prepare the wrists to be healthy and strong, even with additional pressure and load from movements like push-ups."
        },
        {
          "classId": 59532,
          "className": "Body Positions",
          "trainingType": "Fundamentals",
          "mediaId": "5XTTWF9G.json?exp=1764613848772&sig=abcb569c3904eb7db9c927e44eeb13e9",
          "image": "Fundamentals-Posters4.jpg",
          "caption": "Hold 3x30 sec",
          "isLogged": false,
          "description": "You’ll learn the positioning for a straight body, a tuck, a straddle, and a pike. These four movements serve as the base for many stretches and core exercises, so take your time getting comfortable with them!"
        },
        {
          "classId": 59263,
          "className": "Hamstring",
          "trainingType": "Restore",
          "mediaId": "XfFTWgh1.json?exp=1764613848772&sig=44522112b8895a4ed10cec929f4fc009",
          "image": "restore-hamstrings-330x2203.jpg",
          "caption": null,
          "isLogged": false,
          "description": "Develop balance, prevent common issues such as hip and low back pain, and create better posture by spending 10 minutes focusing on hamstring health!"
        },
        {
          "classId": 59286,
          "className": "Ankle/Knee",
          "trainingType": "Restore",
          "mediaId": "ti9rOyVr.json?exp=1764613848772&sig=897206ef50151499a09e41619051316a",
          "image": "restore-ankle-knee-330x2202.jpg",
          "caption": null,
          "isLogged": false,
          "description": "Support your knees and ankles with this 10-minute course. Learn to squat, stand, crouch, jump, and walk with less effort, all while preventing common issues, like ankle rolling and chronic knee pain."
        }
      ]
    },
    "WEDNESDAY,DECEMBER 3": {
      "scheduleId": null,
      "workoutId": 5,
      "classesList": null
    },
    "THURSDAY,DECEMBER 4": {
      "scheduleId": null,
      "workoutId": 5,
      "classesList": null
    },
    "FRIDAY,DECEMBER 5": {
      "scheduleId": null,
      "workoutId": 5,
      "classesList": null
    },
    "SATURDAY,DECEMBER 6": {
      "scheduleId": null,
      "workoutId": 5,
      "classesList": null
    },
    "SUNDAY,DECEMBER 7": {
      "scheduleId": null,
      "workoutId": 5,
      "classesList": null
    }
  }
  Axios(AxiosConfig('get', `/myschedule/beginner/view/weekly/users/${UserId}`, webToken)).then(res => {
    console.log('  res', res)
    dispatch({
      type: actionTypes.SET_LEVELS,
      payload: { userSchedule: res.data }
    })
  }).catch(err => {
    console.warn('getBeginnerLevel using lukes data')
    dispatch({
      type: actionTypes.SET_LEVELS,
      payload: { userSchedule: lukeData }
    })
  });

}

export const selectBeginenrWorkout = (dateIndex, dateKey, workoutId) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, timezone } = state.login;
  const { userSchedule } = state.levels;
  const date = getCalanderDate(timezone)[dateIndex];


  Axios(AxiosConfig('POST', `/myschedule/beginner/users/${UserId}/workouts/${workoutId}?date=${date}`, webToken)).then(res => {
    dispatch({
      type: actionTypes.GET_WORKOUT,
      payload: {
        userSchedule: {
          ...userSchedule,
          [dateKey]: res.data
        }
      }
    })
  }).catch(error => {
    Sentry.captureException(error);
  });
}
export const logAllBeginnerWorkout = (dateIndex, dateKey, courseIds = []) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, timezone, levelId } = state.login;
  const { userSchedule } = state.levels;
  const date = getCalanderDate(timezone)[dateIndex];

  const levelsOneToFour = between(levelId, 1, 4);

  let newWorkoutData = levelsOneToFour ? userSchedule[dateKey] : userSchedule[dateKey].classesList;

  let courseIdArray = courseIds.length > 0
    ? courseIds
    : newWorkoutData.filter(w => w.isLogged === false).map(w => w.classId);

  Axios(AxiosConfig('POST', `/class-log/beginner/users/${UserId}?loggedDate=${date}`, webToken, { data: courseIdArray }))
    .then(res => {
      console.log('Axios response:', res);

      courseIdArray.forEach(c => {
        const index = newWorkoutData.findIndex(w => w.classId === c);
        newWorkoutData[index].isLogged = true;
      });

      let action = levelsOneToFour ?
        { type: actionTypes.LOG_NON_LEGACY_WORKOUT, payload: { userSchedule: { ...userSchedule, [dateKey]: [...newWorkoutData] } } } :
        { type: actionTypes.LOG_NON_LEGACY_WORKOUT, payload: { userSchedule: { ...userSchedule, [dateKey]: { ...userSchedule[dateKey], classesList: newWorkoutData } } } };
      dispatch(action);
    })
    .catch(error => {
      Sentry.captureException(error);
    });

}
export const logAllBeginnerWorkoutNew = (dateIndex, dateKey, courseIds = []) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, timezone, levelId } = state.login;
  const { userSchedule } = state.levels;
  const date = getCalanderDate(timezone)[dateIndex];

  const levelsOneToFour = between(levelId, 1, 4);

  let newWorkoutData = levelsOneToFour ? userSchedule[dateKey] : userSchedule[dateKey].classesList;
  let newData = newWorkoutData ? _.cloneDeep(newWorkoutData) : [];


  let courseIdArray = courseIds.length > 0
    ? courseIds
    : newWorkoutData.filter(w => w.isLogged === false).map(w => w.classId);

  courseIdArray.forEach(c => {
    const index = newWorkoutData.findIndex(w => w.classId === c);
    newData[index].isLogged = true;
    delete newData[index]['description']
    delete newData[index]['image']
    delete newData[index]['mediaId']
    delete newData[index]['trainingType']
  });

  // console.log("dateKey", dateKey)//pass this -> Wednesday, December 31
  // console.log("date", date)//2025-12-31
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  let data = {
    userId: UserId,
    userScheduleDate: dateKey,
    updatedData: newData
  }
  Axios.post(NEWAPI + '/api/user/log', data, config)
    .then(res => {
      courseIdArray.forEach(c => {
        const index = newWorkoutData.findIndex(w => w.classId === c);
        newWorkoutData[index].isLogged = true;
      });

      let action = levelsOneToFour ?
        { type: actionTypes.LOG_NON_LEGACY_WORKOUT, payload: { userSchedule: { ...userSchedule, [dateKey]: [...newWorkoutData] } } } :
        { type: actionTypes.LOG_NON_LEGACY_WORKOUT, payload: { userSchedule: { ...userSchedule, [dateKey]: { ...userSchedule[dateKey], classesList: newWorkoutData } } } };
      dispatch(action);
    })
    .catch(error => {
      Sentry.captureException(error);
    })



  /*Axios(AxiosConfig('POST', `/class-log/beginner/users/${UserId}?loggedDate=${date}`, webToken, { data: courseIdArray }))
    .then(res => {
      courseIdArray.forEach(c => {
        const index = newWorkoutData.findIndex(w => w.classId === c);
        newWorkoutData[index].isLogged = true;
      })

      let action = levelsOneToFour
        ? {
          type: actionTypes.LOG_NON_LEGACY_WORKOUT,
          payload: {
            userSchedule: {
              ...userSchedule,
              [dateKey]: [...newWorkoutData]
            }
          }
        }
        : {
          type: actionTypes.LOG_NON_LEGACY_WORKOUT,
          payload: {
            userSchedule: {
              ...userSchedule,
              [dateKey]: {
                ...userSchedule[dateKey],
                classesList: newWorkoutData
              }
            }
          }
        }
      dispatch(action)
    }).catch(error => {
      Sentry.captureException(error);
    });*/
}
export const removeBeginnerWorkoutLog = (dateIndex, dateKey, courseId) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, timezone, levelId } = state.login;
  const { userSchedule } = state.levels;
  const date = getCalanderDate(timezone)[dateIndex];

  const levelsOneToFour = between(levelId, 1, 4);

  let newWorkoutData = levelsOneToFour ? userSchedule[dateKey] : userSchedule[dateKey].classesList;

  Axios(AxiosConfig('DELETE', `/class-log/beginner/users/${UserId}?loggedDate=${date}&classId=${courseId}`, webToken)).then(res => {
    const index = newWorkoutData.findIndex(w => w.classId === courseId);
    newWorkoutData[index].isLogged = false;
    let action = levelsOneToFour
      ? {
        type: actionTypes.REMOVE_LOG_NON_LEGACY_WORKOUT,
        payload: {
          userSchedule: {
            ...userSchedule,
            [dateKey]: [...newWorkoutData]
          }
        }
      }
      : {
        type: actionTypes.REMOVE_LOG_NON_LEGACY_WORKOUT,
        payload: {
          userSchedule: {
            ...userSchedule,
            [dateKey]: {
              ...userSchedule[dateKey],
              classesList: newWorkoutData
            }
          }
        }
      }

    dispatch(action)
  }).catch(error => {
    Sentry.captureException(error);
  });
}
export const removeBeginnerWorkoutLogNew = (dateIndex, dateKey, courseIds = []) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, timezone, levelId } = state.login;
  const { userSchedule } = state.levels;
  const date = getCalanderDate(timezone)[dateIndex];

  const levelsOneToFour = between(levelId, 1, 4);

  let newWorkoutData = levelsOneToFour ? userSchedule[dateKey] : userSchedule[dateKey].classesList;
  let newData = newWorkoutData ? _.cloneDeep(newWorkoutData) : [];

  let courseIdArray = courseIds.length > 0
    ? courseIds
    : newWorkoutData.filter(w => w.isLogged === false).map(w => w.classId);


  courseIdArray.forEach(c => {
    const index = newWorkoutData.findIndex(w => w.classId === c);
    newData[index].isLogged = false;
    delete newData[index]['description']
    delete newData[index]['image']
    delete newData[index]['mediaId']
    delete newData[index]['trainingType']
  });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  console.log("newWorkoutData in DELETE:", newWorkoutData)
  let data = {
    userId: UserId,
    userScheduleDate: dateKey,
    updatedData: newData
  }
  Axios({
    method: 'DELETE',
    url: NEWAPI + '/api/user/log',
    data: data,
    headers: config.headers
  })
    .then(res => {
      let courseIdArray = courseIds.length > 0
        ? courseIds
        : newWorkoutData.filter(w => w.isLogged === false).map(w => w.classId);
      courseIdArray.forEach(c => {
        const index = newWorkoutData.findIndex(w => w.classId === c);
        newWorkoutData[index].isLogged = false;
      });


      let action = levelsOneToFour
        ? {
          type: actionTypes.REMOVE_LOG_NON_LEGACY_WORKOUT,
          payload: {
            userSchedule: {
              ...userSchedule,
              [dateKey]: [...newWorkoutData]
            }
          }
        }
        : {
          type: actionTypes.REMOVE_LOG_NON_LEGACY_WORKOUT,
          payload: {
            userSchedule: {
              ...userSchedule,
              [dateKey]: {
                ...userSchedule[dateKey],
                classesList: newWorkoutData
              }
            }
          }
        }

      dispatch(action)
    })
    .catch(error => {
      Sentry.captureException(error);
    })
}
const levelObj = {
  0: {
    userLevel: 'Beginner',
    levelId: 0
  },
  1: {
    userLevel: 'Intermediate One',
    levelId: 1
  },
  2: {
    userLevel: 'Intermediate Two',
    levelId: 2
  },
  3: {
    userLevel: 'Advanced One',
    levelId: 3
  },
  4: {
    userLevel: 'Advanced Two',
    levelId: 4
  },
  9: {
    userLevel: 'White Board',
    levelId: 9
  },
  10: {
    userLevel: 'Build Your Own',
    levelId: 10
  }
}
function between(x, min, max) {
  return x >= min && x <= max;
}
export const continutePreviosLevel = (levelId) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId } = state.login;

  Axios(AxiosConfig('put', `/myschedule/choose/continue/level/${levelId}/users/${UserId}`, webToken))
    .then(res => {
      dispatch({
        type: actionTypes.CONTINUE_USER_LEVEL,
        payload: {
          ...levelObj[levelId],
          showAllOpen: between(levelId, 1, 4),
        }
      })
    }).then(() => {
      // this ensures that if a user selects the same level again after doing something in their schedule like clearing a day etc.
      // it will reload the data
      if (between(levelId, 1, 4)) {
        dispatch(getLevelPLan());
      }
    }).catch(error => {
      Sentry.captureException(error);
    });
}
export const setLevelPath = (leveld, isCallback = false, workoutOrPlanId = 0) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, timezone, userLevel } = state.login;
  const currentDate = moment().tz(timezone).format('YYYY-MM-DD');

  if (userLevel === "New User" && leveld === 0) {
    workoutOrPlanId = 1;
  }
  const config = AxiosConfig('post', `/myschedule/choose/level/${leveld}/users/${UserId}?workoutOrPlanId=${workoutOrPlanId}&date=${currentDate}`, webToken)
  axios(config)
    .then(res => {
      if (res.status != 200) {
        dispatch(setLevelPathNew(leveld, workoutOrPlanId));
      }
      dispatch({
        type: actionTypes.SET_USER_LEVEL,
        payload: {
          ...levelObj[leveld],
          showAllOpen: between(leveld, 1, 4),
        }
      })
    })
    .then(() => {
      console.log('setLevelPath .then()')
      if (isCallback) {
        isCallback();
      }
      // this ensures that if a user selects the same level again after doing something in their schedule like clearing a day etc.
      // it will reload the data
      if (between(leveld, 1, 4)) {
        dispatch(getLevelPLan());
      }
    }).catch(error => {
      console.log('setLevelPath .catch error', error)
      dispatch(setLevelPathNew(leveld, workoutOrPlanId));

    });
}
export const setLevelPathNew = (leveld, workoutOrPlanId) => (dispatch, getState) => {
  const state = getState();
  let resLevelId
  const { webToken, UserId, timezone, userLevel } = state.login;
  const currentDate = moment().tz(timezone).format('YYYY-MM-DD');
  let type = 'levelPath'
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  let data = {
    userId: UserId,
    currentDate: currentDate,
    type: type,
    data: {
      workoutOrPlanId: workoutOrPlanId,
      leveld: leveld,
    }
  }
  Axios.post(NEWAPI + '/api/user/userStatus', data, config)
    .then(res => {
      let returnData = res.data[0]?.data;
      resLevelId = JSON.parse(returnData).leveld;
      dispatch({
        type: actionTypes.SET_USER_LEVEL,
        payload: {
          ...levelObj[resLevelId],
          showAllOpen: between(resLevelId, 1, 4),
        }
      })
    }).then(() => {
      if (between(resLevelId, 1, 4)) {
        dispatch(getLevelPLan(type));
      }
    }).catch(error => {
      console.error('setLevelPathNew failure')
    });
}
const processUserWorkout = workout => {
  if (workout.type === 'Class') {
    let workOutData = { ...workout.workout, showRefresh: showRefreshArray.includes(workout.workout.trainingType) };

    delete workout.workout;

    return {
      ...workout,
      ...workOutData
    }
  }

  if (workout.type === 'Program') {
    return proccesLegacyCourses(workout);
  }
}
const processUserWorkoutNew = workout => {

  if (workout.type === 'Class') {
    let workOutData = {}
    if (workout?.workout) {
      workOutData = { ...workout.workout, showRefresh: showRefreshArray.includes(workout.workout.trainingType) };
      delete workout.workout;
    }
    return {
      ...workout,
      ...workOutData
    }
  }

  if (workout.type === 'Program') {
    return proccesLegacyCoursesNew(workout);
  }
}
export const proccesLegacyCourses = (data) => {
  const { workout } = data;
  let levelKeys = Object.keys(workout);
  let chosenProgs = [];
  let groupName;

  const idToClassName = {
    59207: 'Foundation Core',
    59219: 'Foundation Upper Body',
    59213: 'Foundation Lower Body'
  }

  levelKeys.forEach(lKey => {
    let progKeys = Object.keys(workout[lKey]);

    progKeys.forEach(pKey => {
      let progessions = workout[lKey][pKey];
      groupName = checkGroup(progessions);

      progessions.forEach(prog => {
        chosenProgs = [...chosenProgs, { ...prog, section: pKey, levelKey: lKey }]
      })
    })
  });

  if (!groupName) {
    groupName = idToClassName[data.classId]
  }
  return { chosenProgs: chosenProgs, isLegacy: true, category: groupName };
}
export const proccesLegacyCoursesNew = (data) => {

  const { workout = {} } = data;
  let levelKeys = Object.keys(workout);
  let chosenProgs = [];
  let groupName;

  const idToClassName = {
    59207: 'Foundation Core',
    59219: 'Foundation Upper Body',
    59213: 'Foundation Lower Body'
  }

  levelKeys.forEach(lKey => {
    // console.log("lKey:", lKey)
    let progKeys = workout[lKey] ? Object.keys(workout[lKey]) : [];

    progKeys.forEach(pKey => {
      let progessions = workout[lKey][pKey];
      groupName = checkGroup(progessions);
      progessions.forEach(prog => {
        chosenProgs = [...chosenProgs, { ...prog, section: pKey, levelKey: lKey }]
      })
    })
  });

  if (!groupName) {
    groupName = idToClassName[data.classId]
  }
  return { chosenProgs: chosenProgs, isLegacy: true, category: groupName };
}
const checkGroup = workouts => {
  const first = workouts[0].group;
  return workouts.every(item => item.group === first) ? first : '';
}
const showRefreshArray = ['Warm-Up', 'Mobility', 'Stretch'];
export const getLevelPLan = (type) => (dispatch, getState) => {/*  has failover directly to getLevelPLanNew */
  const state = getState();
  const { webToken, UserId, levelId } = state.login;
  console.log('getLevelPLan = () =>  `/myschedule/levels/view/weekly/users/${UserId}/levels/${levelId}` ',)
  /*old data*/
  let intermediate1 = {
    "MONDAY,DECEMBER 15": [
      {
        "scheduleId": 517934,
        "classId": 59176,
        "type": "Class",
        "dayIndex": 1,
        "workout": {
          "className": "Extended Warmup",
          "trainingType": "Warm-Up",
          "mediaId": "UCGHRpMp.json?exp=1765848832826&sig=2e3935fef5ceb919cb43c9a26c7e6412",
          "image": "330x220-ExtendedWU.jpg",
          "description": "This 25-minute warm-up will create heat in your body from head to toe, while focusing on active and engaging stretches to increase your flexibility while getting you fired up!",
          "isLogged": false
        }
      },
      {
        "scheduleId": 517935,
        "classId": 59915,
        "type": "Class",
        "dayIndex": 1,
        "workout": {
          "className": "Weekly Shoulders",
          "trainingType": "Mobility",
          "mediaId": "cgQuL34L.json?exp=1765848832826&sig=9f2f596733f5601e54d9764ee4d74bdb",
          "image": "330x220-satshoulders.jpg",
          "description": "Follow along with this prehab routine used weekly by Coach Sommer’s athletes to keep your shoulders healthy and strong. All it requires is a couple light dumbbells and a set of rings.",
          "isLogged": false
        }
      },
      {
        "scheduleId": 517936,
        "classId": 59219,
        "type": "Program",
        "dayIndex": 1,
        "workout": {
          "LEVEL 1": {},
          "LEVEL 2": {
            "Hollow Back Press": [
              {
                "exerciseId": 129,
                "name": "Single Bar Dip",
                "image": "HBPPE7",
                "group": "Foundation Upper Body",
                "exerciseNotation": "A7",
                "stepNo": 1,
                "masterySteps": {
                  "1": {
                    "masterySetId": 1,
                    "masteryLevel": "5r",
                    "weekNum": 1.0,
                    "sets": 3,
                    "repsOrSecs": "1r"
                  },
                  "2": {
                    "masterySetId": 2,
                    "masteryLevel": "5r",
                    "weekNum": 2.0,
                    "sets": 5,
                    "repsOrSecs": "1r"
                  },
                  "3": {
                    "masterySetId": 3,
                    "masteryLevel": "5r",
                    "weekNum": 3.0,
                    "sets": 3,
                    "repsOrSecs": "2r"
                  },
                  "4": {
                    "masterySetId": 5,
                    "masteryLevel": "5r",
                    "weekNum": 5.0,
                    "sets": 4,
                    "repsOrSecs": "2r"
                  },
                  "5": {
                    "masterySetId": 6,
                    "masteryLevel": "5r",
                    "weekNum": 6.0,
                    "sets": 4,
                    "repsOrSecs": "3r"
                  },
                  "6": {
                    "masterySetId": 7,
                    "masteryLevel": "5r",
                    "weekNum": 7.0,
                    "sets": 5,
                    "repsOrSecs": "3r"
                  },
                  "7": {
                    "masterySetId": 9,
                    "masteryLevel": "5r",
                    "weekNum": 9.0,
                    "sets": 4,
                    "repsOrSecs": "4r"
                  },
                  "8": {
                    "masterySetId": 10,
                    "masteryLevel": "5r",
                    "weekNum": 10.0,
                    "sets": 4,
                    "repsOrSecs": "5r"
                  },
                  "9": {
                    "masterySetId": 11,
                    "masteryLevel": "5r",
                    "weekNum": 11.0,
                    "sets": 5,
                    "repsOrSecs": "5r"
                  }
                },
                "selected": true,
                "usersWorkoutSettingsId": 5211183,
                "setsAndReps": "3x1r",
                "order": 7,
                "isLogged": false,
                "notes": null,
                "workoutInfo": {
                  "Strength": {
                    "name": "Single Bar Dip",
                    "setsAndReps": "3x1r",
                    "imageName": "HBPPE7",
                    "group": "Foundation Upper Body",
                    "focusPoints": [
                      {
                        "exerciseId": 129,
                        "description": "1) Lightly slide down along the bar; do not lay on the bar.",
                        "type": 1,
                        "order": 1
                      },
                      {
                        "exerciseId": 129,
                        "description": "2) Full ROM is lowering to the bottom of the chest.",
                        "type": 1,
                        "order": 2
                      }
                    ],
                    "instructions": [
                      {
                        "type": 1,
                        "exerciseId": 129,
                        "instructions": "Start supported above a single bar with your arms extended and body straight. Be sure your hands are placed at approximately shoulder width. Begin with and maintain strong scapular depression. Initiate the dip by bending your elbows. Lightly slide down the bar until the bottom of your chest touches it. Dip back up and repeat for reps. Minimize the piking of your hips at all times during the single bar dip and avoid resting on the bar. ",
                        "equipment": "Pull-up Bar"
                      }
                    ],
                    "videos": [
                      {
                        "exercisesVideoId": 1288,
                        "exerciseId": 129,
                        "tag": 1,
                        "videoName": "M75P8tL0.json?exp=1765848832903&sig=aafe9623594042155776c45bc11d3697",
                        "weekNum": 0,
                        "order": 1
                      }
                    ],
                    "technicalTips": null
                  },
                  "Mobility": {
                    "name": "Static Cat",
                    "setsAndReps": "3x30s",
                    "imageName": "HBPPE7IM",
                    "group": "Foundation Upper Body",
                    "focusPoints": [
                      {
                        "exerciseId": 129,
                        "description": "1) At the bottom, the glutes should be either on top or just in front of the knees to maintain the intensity of the stretch.",
                        "type": 2,
                        "order": 1
                      }
                    ],
                    "instructions": [
                      {
                        "type": 2,
                        "exerciseId": 129,
                        "instructions": "Begin kneeling with your hips above your knees. Slide your hands out in front of you straightening your elbows and shrugging your shoulders to your ears as your chest drops close to the floor. Keep your hips over your knees and continue to stretch your chest and arms toward the floor as you hold for time.",
                        "equipment": "Body Only"
                      }
                    ],
                    "videos": [
                      {
                        "exercisesVideoId": 1289,
                        "exerciseId": 129,
                        "tag": 2,
                        "videoName": "b9EfOeZR.json?exp=1765848832903&sig=40822d64c85df7661b2cbc501449ec5e",
                        "weekNum": 0,
                        "order": 1
                      }
                    ],
                    "technicalTips": null
                  }
                }
              }
            ],
            "Rope Climb": [
              {
                "exerciseId": 137,
                "name": "Negative Pull-up",
                "image": "RCPE7",
                "group": "Foundation Upper Body",
                "exerciseNotation": "B7",
                "stepNo": 1,
                "masterySteps": {
                  "1": {
                    "masterySetId": 133,
                    "masteryLevel": "5rx10s",
                    "weekNum": 1.0,
                    "sets": 3,
                    "repsOrSecs": "1rx10s"
                  },
                  "2": {
                    "masterySetId": 134,
                    "masteryLevel": "5rx10s",
                    "weekNum": 2.0,
                    "sets": 5,
                    "repsOrSecs": "1rx10s"
                  },
                  "3": {
                    "masterySetId": 135,
                    "masteryLevel": "5rx10s",
                    "weekNum": 3.0,
                    "sets": 3,
                    "repsOrSecs": "2rx10s"
                  },
                  "4": {
                    "masterySetId": 137,
                    "masteryLevel": "5rx10s",
                    "weekNum": 5.0,
                    "sets": 4,
                    "repsOrSecs": "2rx10s"
                  },
                  "5": {
                    "masterySetId": 138,
                    "masteryLevel": "5rx10s",
                    "weekNum": 6.0,
                    "sets": 4,
                    "repsOrSecs": "3rx10s"
                  },
                  "6": {
                    "masterySetId": 139,
                    "masteryLevel": "5rx10s",
                    "weekNum": 7.0,
                    "sets": 5,
                    "repsOrSecs": "3rx10s"
                  },
                  "7": {
                    "masterySetId": 141,
                    "masteryLevel": "5rx10s",
                    "weekNum": 9.0,
                    "sets": 4,
                    "repsOrSecs": "4rx10s"
                  },
                  "8": {
                    "masterySetId": 142,
                    "masteryLevel": "5rx10s",
                    "weekNum": 10.0,
                    "sets": 4,
                    "repsOrSecs": "5rx10s"
                  },
                  "9": {
                    "masterySetId": 143,
                    "masteryLevel": "5rx10s",
                    "weekNum": 11.0,
                    "sets": 5,
                    "repsOrSecs": "5rx10s"
                  }
                },
                "selected": true,
                "usersWorkoutSettingsId": 5211184,
                "setsAndReps": "3x1rx10s",
                "order": 7,
                "isLogged": false,
                "notes": null,
                "workoutInfo": {
                  "Strength": {
                    "name": "Negative Pull-up",
                    "setsAndReps": "3x1rx10s",
                    "imageName": "RCPE7",
                    "group": "Foundation Upper Body",
                    "focusPoints": [
                      {
                        "exerciseId": 137,
                        "description": "1) Do not allow the chin to touch the bar at the top.",
                        "type": 1,
                        "order": 1
                      },
                      {
                        "exerciseId": 137,
                        "description": "2) Maintain an even tempo during the entire descent.",
                        "type": 1,
                        "order": 2
                      }
                    ],
                    "instructions": [
                      {
                        "type": 1,
                        "exerciseId": 137,
                        "instructions": "Grab a pull-up bar with an over grip (palms away) and jump to the top of a pull-up position. Be sure your chin is over the bar at a minimum. Lower down, performing the negative, or eccentric, portion of a pull-up. Keep a steady pace and take a full 10 seconds to descend to straight elbows. Keep your feet together and body straight throughout the descent. At the bottom, relax into a full dead hang with elevated shoulders. Jump or step back up to the top and repeat.",
                        "equipment": "Pull-up Bar"
                      }
                    ],
                    "videos": [
                      {
                        "exercisesVideoId": 1304,
                        "exerciseId": 137,
                        "tag": 1,
                        "videoName": "ob9rG2mc.json?exp=1765848832903&sig=6c360e0a489cdfc79adb6eaf6de80e48",
                        "weekNum": 0,
                        "order": 1
                      }
                    ],
                    "technicalTips": null
                  },
                  "Mobility": {
                    "name": "Undergrip Bent Lean",
                    "setsAndReps": "3x30s",
                    "imageName": "RCPE7IM",
                    "group": "Foundation Upper Body",
                    "focusPoints": [
                      {
                        "exerciseId": 137,
                        "description": "1) Grasp the rail at approximately hip height.",
                        "type": 2,
                        "order": 1
                      },
                      {
                        "exerciseId": 137,
                        "description": "2) Use the hips to pull the torso away from the hands.",
                        "type": 2,
                        "order": 2
                      }
                    ],
                    "instructions": [
                      {
                        "type": 2,
                        "exerciseId": 137,
                        "instructions": "Stand approximately 2 feet from the stall bars or other sturdy grip that is near hip-height. Grab on with both hands using an under-grip (palms up) and sit back, pulling against the bars and dropping your torso down. Lean back until your elbows straighten and your torso is roughly parallel to the floor. You should have a straight line from hands to hips. Maintain constant backward pressure to maximize the effectiveness of this stretch. Hold this stretch for time.",
                        "equipment": "Fixed Bar"
                      }
                    ],
                    "videos": [
                      {
                        "exercisesVideoId": 1305,
                        "exerciseId": 137,
                        "tag": 2,
                        "videoName": "hBDYw3XP.json?exp=1765848832903&sig=d34d50841b684f3dd7d838cb2762e8b9",
                        "weekNum": 0,
                        "order": 1
                      }
                    ],
                    "technicalTips": null
                  }
                }
              }
            ],
            "Straddle Planche": [
              {
                "exerciseId": 109,
                "name": "Elevated Planche Bounce",
                "image": "sPLPE7",
                "group": "Foundation Upper Body",
                "exerciseNotation": "C7",
                "stepNo": 1,
                "masterySteps": {
                  "1": {
                    "masterySetId": 25,
                    "masteryLevel": "15r",
                    "weekNum": 1.0,
                    "sets": 3,
                    "repsOrSecs": "3r"
                  },
                  "2": {
                    "masterySetId": 26,
                    "masteryLevel": "15r",
                    "weekNum": 2.0,
                    "sets": 5,
                    "repsOrSecs": "3r"
                  },
                  "3": {
                    "masterySetId": 27,
                    "masteryLevel": "15r",
                    "weekNum": 3.0,
                    "sets": 3,
                    "repsOrSecs": "6r"
                  },
                  "4": {
                    "masterySetId": 29,
                    "masteryLevel": "15r",
                    "weekNum": 5.0,
                    "sets": 4,
                    "repsOrSecs": "6r"
                  },
                  "5": {
                    "masterySetId": 30,
                    "masteryLevel": "15r",
                    "weekNum": 6.0,
                    "sets": 4,
                    "repsOrSecs": "9r"
                  },
                  "6": {
                    "masterySetId": 31,
                    "masteryLevel": "15r",
                    "weekNum": 7.0,
                    "sets": 5,
                    "repsOrSecs": "9r"
                  },
                  "7": {
                    "masterySetId": 33,
                    "masteryLevel": "15r",
                    "weekNum": 9.0,
                    "sets": 4,
                    "repsOrSecs": "12r"
                  },
                  "8": {
                    "masterySetId": 34,
                    "masteryLevel": "15r",
                    "weekNum": 10.0,
                    "sets": 4,
                    "repsOrSecs": "15r"
                  },
                  "9": {
                    "masterySetId": 35,
                    "masteryLevel": "15r",
                    "weekNum": 11.0,
                    "sets": 5,
                    "repsOrSecs": "15r"
                  }
                },
                "selected": true,
                "usersWorkoutSettingsId": 5211179,
                "setsAndReps": "3x3r",
                "order": 7,
                "isLogged": false,
                "notes": null,
                "workoutInfo": {
                  "Strength": {
                    "name": "Elevated Planche Bounce",
                    "setsAndReps": "3x3r",
                    "imageName": "sPLPE7",
                    "group": "Foundation Upper Body",
                    "focusPoints": [
                      {
                        "exerciseId": 109,
                        "description": "1) As much as possible, initiate the lift from the upper back.",
                        "type": 1,
                        "order": 1
                      },
                      {
                        "exerciseId": 109,
                        "description": "2) Minimize the piking of hips during the bounces.",
                        "type": 1,
                        "order": 2
                      }
                    ],
                    "instructions": [
                      {
                        "type": 1,
                        "exerciseId": 109,
                        "instructions": "Begin from a foot-elevated straight arm plank, with your feet placed on a box at approximately shoulder height. Ensure that your shoulders are directly above your hands, your elbows are completely straight, and your feet are together. Rotate your fingers out approximately 45-degrees and begin to lean forward. As your shoulders move in front of your hands, keep constant tension in your glutes and core to maintain a posterior pelvic tilt. Lean forward until you can shift your foot position from curled to pointed toes so that you're on the tops of your feet. At this point, your hands should be roughly underneath your hips. Push your chest away from the floor to keep your shoulder blades spread apart (protracted). Also keep your shoulders pressed down, away from your ears (depressed). Scapular protraction and depression are essential for maintaining a strong elevated planche lean position. From this elevated planche lean start position, bounce your legs up and down on the box. As you bounce, keep a comfortable head position, strong forward lean, and straight body. As much as possible, initiate each bounce from your upper back and not your hips. Repeat for reps.",
                        "equipment": "Body Only"
                      }
                    ],
                    "videos": [
                      {
                        "exercisesVideoId": 1236,
                        "exerciseId": 109,
                        "tag": 1,
                        "videoName": "s4NYHkFh.json?exp=1765848832903&sig=54a95f0f8f226085ecec5534c25bac19",
                        "weekNum": 0,
                        "order": 1
                      }
                    ],
                    "technicalTips": null
                  },
                  "Mobility": {
                    "name": "Prone Half Straddle Planche Double Leg Extension",
                    "setsAndReps": "3x5r",
                    "imageName": "sPLPE7IM",
                    "group": "Foundation Upper Body",
                    "focusPoints": [
                      {
                        "exerciseId": 109,
                        "description": "1) Do not allow the knees to drop below the hips at any time.",
                        "type": 2,
                        "order": 1
                      },
                      {
                        "exerciseId": 109,
                        "description": "2) The hips should remain completely open and flat.",
                        "type": 2,
                        "order": 2
                      }
                    ],
                    "instructions": [
                      {
                        "type": 2,
                        "exerciseId": 109,
                        "instructions": "Begin lying on your stomach on top of a box and place your hips on the edge so that your legs hang off. Bend your knees to 90-degrees and lift both legs up and as far sideways as possible. Be sure both of your thighs are parallel to the floor and you've achieved your widest half-straddle. Extend your legs until your knees completely straighten. Pause momentarily, retract your legs, and return to the prone half straddle. Repeat for reps.",
                        "equipment": "Plyometric Box"
                      }
                    ],
                    "videos": [
                      {
                        "exercisesVideoId": 1237,
                        "exerciseId": 109,
                        "tag": 2,
                        "videoName": "9j43jx5r.json?exp=1765848832903&sig=34a77c4cdc4e4d88bb79bab2ddfcca4f",
                        "weekNum": 0,
                        "order": 1
                      }
                    ],
                    "technicalTips": null
                  }
                }
              }
            ]
          },
          "LEVEL 3": {},
          "LEVEL 4": {}
        }
      }
    ],
    "TUESDAY,DECEMBER 16": [
      {
        "scheduleId": 517937,
        "classId": 59176,
        "type": "Class",
        "dayIndex": 2,
        "workout": {
          "className": "Extended Warmup",
          "trainingType": "Warm-Up",
          "mediaId": "UCGHRpMp.json?exp=1765848832903&sig=f652cec62c7b8b8ae76df49e41d9ee2d",
          "image": "330x220-ExtendedWU.jpg",
          "description": "This 25-minute warm-up will create heat in your body from head to toe, while focusing on active and engaging stretches to increase your flexibility while getting you fired up!",
          "isLogged": false
        }
      },
      {
        "scheduleId": 517938,
        "classId": 60205,
        "type": "Class",
        "dayIndex": 2,
        "workout": {
          "className": "Stall Bar Stretch",
          "trainingType": "Mobility",
          "mediaId": "bDAm39hs.json?exp=1765848832903&sig=9a942341461c2212a457f3cf6f51f68b",
          "image": "330x220-stallbar-stretch-3.jpg",
          "description": "Use stall bars to find relief through deep stretches in your upper and lower body. You’ll weight your straddle and pike stretches by hanging on the stall bars. You’ll also stretch your shoulders using the stall bars to go deeper. This 6-minute class is perfect for those days when you’re feeling frozen and locked up. Use it to loosen up before your workout or to shake out tension after!",
          "isLogged": false
        }
      },
      {
        "scheduleId": 517939,
        "classId": 59207,
        "type": "Program",
        "dayIndex": 2,
        "workout": {
          "LEVEL 1": {},
          "LEVEL 2": {
            "Front Lever": [
              {
                "exerciseId": 101,
                "name": "Negative Body Lever Straddle",
                "image": "FLPE7",
                "group": "Foundation Core",
                "exerciseNotation": "A7",
                "stepNo": 1,
                "masterySteps": {
                  "1": {
                    "masterySetId": 133,
                    "masteryLevel": "5rx10s",
                    "weekNum": 1.0,
                    "sets": 3,
                    "repsOrSecs": "1rx10s"
                  },
                  "2": {
                    "masterySetId": 134,
                    "masteryLevel": "5rx10s",
                    "weekNum": 2.0,
                    "sets": 5,
                    "repsOrSecs": "1rx10s"
                  },
                  "3": {
                    "masterySetId": 135,
                    "masteryLevel": "5rx10s",
                    "weekNum": 3.0,
                    "sets": 3,
                    "repsOrSecs": "2rx10s"
                  },
                  "4": {
                    "masterySetId": 137,
                    "masteryLevel": "5rx10s",
                    "weekNum": 5.0,
                    "sets": 4,
                    "repsOrSecs": "2rx10s"
                  },
                  "5": {
                    "masterySetId": 138,
                    "masteryLevel": "5rx10s",
                    "weekNum": 6.0,
                    "sets": 4,
                    "repsOrSecs": "3rx10s"
                  },
                  "6": {
                    "masterySetId": 139,
                    "masteryLevel": "5rx10s",
                    "weekNum": 7.0,
                    "sets": 5,
                    "repsOrSecs": "3rx10s"
                  },
                  "7": {
                    "masterySetId": 141,
                    "masteryLevel": "5rx10s",
                    "weekNum": 9.0,
                    "sets": 4,
                    "repsOrSecs": "4rx10s"
                  },
                  "8": {
                    "masterySetId": 142,
                    "masteryLevel": "5rx10s",
                    "weekNum": 10.0,
                    "sets": 4,
                    "repsOrSecs": "5rx10s"
                  },
                  "9": {
                    "masterySetId": 143,
                    "masteryLevel": "5rx10s",
                    "weekNum": 11.0,
                    "sets": 5,
                    "repsOrSecs": "5rx10s"
                  }
                },
                "selected": true,
                "usersWorkoutSettingsId": 5211178,
                "setsAndReps": "3x1rx10s",
                "order": 7,
                "isLogged": false,
                "notes": null,
                "workoutInfo": {
                  "Strength": {
                    "name": "Negative Body Lever Straddle",
                    "setsAndReps": "3x1rx10s",
                    "imageName": "FLPE7",
                    "group": "Foundation Core",
                    "focusPoints": [
                      {
                        "exerciseId": 101,
                        "description": "1) Do not allow the lower back to arch during the descent.",
                        "type": 1,
                        "order": 1
                      },
                      {
                        "exerciseId": 101,
                        "description": "2) The arms should be comfortably bent.",
                        "type": 1,
                        "order": 2
                      }
                    ],
                    "instructions": [
                      {
                        "type": 1,
                        "exerciseId": 101,
                        "instructions": "Lie on your back with your grip on a fixed object overhead–the bottom rung of stall bars or a braced partner’s ankles work well. Tuck your knees to assist with entering a candlestick position supported by your grip and shoulders, with legs extended upwards, glutes and core strongly contracted. Straddle your legs wide, lock your knees, continue to press your hips strongly forward, and slowly lower your body to the floor. As you lower, keep your body straight with posterior pelvic tilt (PPT). Do not allow your hips to pike at anytime during the movement. Take a full ten seconds to descend and aim to touch down one vertebrae at a time. Tuck back up to the starting candlestick position and repeat for reps.",
                        "equipment": "Fixed Pole"
                      }
                    ],
                    "videos": [
                      {
                        "exercisesVideoId": 1220,
                        "exerciseId": 101,
                        "tag": 1,
                        "videoName": "a7RyMr8T.json?exp=1765848832908&sig=c56496b4e28a4e29bacc839f4cec910f",
                        "weekNum": 0,
                        "order": 1
                      }
                    ],
                    "technicalTips": null
                  },
                  "Mobility": {
                    "name": "Seal Rocks",
                    "setsAndReps": "3x5r",
                    "imageName": "FLPE7IM",
                    "group": "Foundation Core",
                    "focusPoints": [
                      {
                        "exerciseId": 101,
                        "description": "1) Allow the lower back to arch fully in the front.",
                        "type": 2,
                        "order": 1
                      },
                      {
                        "exerciseId": 101,
                        "description": "2) Place the chest completely flat on the thighs in the rear.",
                        "type": 2,
                        "order": 2
                      }
                    ],
                    "instructions": [
                      {
                        "type": 2,
                        "exerciseId": 101,
                        "instructions": "Begin kneeling, sitting back on your heels, with your torso folded over your thighs and arms extended long in front of you. Rock forward, straighten your legs, and press up through your arms to arch your spine. Keep your legs in contact with the floor. Keep your glutes engaged to help protect your low back and help you arch through your middle and upper spine. Straighten your elbows as much as possible and be sure to keep your hands directly under your shoulders. Push down into the floor and open your chest at the top of the stretch to keep your shoulder blades down and back (depressed and retracted). Look up. Press back to the start position and repeat for reps or time. ",
                        "equipment": "Body Only"
                      }
                    ],
                    "videos": [
                      {
                        "exercisesVideoId": 1221,
                        "exerciseId": 101,
                        "tag": 2,
                        "videoName": "M0dImtXI.json?exp=1765848832908&sig=1de7d955ec49fe2464603cd347e48379",
                        "weekNum": 0,
                        "order": 1
                      }
                    ],
                    "technicalTips": null
                  }
                }
              }
            ],
            "Side Lever": [
              {
                "exerciseId": 113,
                "name": "Straddle Reverse Leg Lift",
                "image": "SLPE7",
                "group": "Foundation Core",
                "exerciseNotation": "B7",
                "stepNo": 1,
                "masterySteps": {
                  "1": {
                    "masterySetId": 13,
                    "masteryLevel": "10r",
                    "weekNum": 1.0,
                    "sets": 3,
                    "repsOrSecs": "2r"
                  },
                  "2": {
                    "masterySetId": 14,
                    "masteryLevel": "10r",
                    "weekNum": 2.0,
                    "sets": 5,
                    "repsOrSecs": "2r"
                  },
                  "3": {
                    "masterySetId": 15,
                    "masteryLevel": "10r",
                    "weekNum": 3.0,
                    "sets": 3,
                    "repsOrSecs": "4r"
                  },
                  "4": {
                    "masterySetId": 17,
                    "masteryLevel": "10r",
                    "weekNum": 5.0,
                    "sets": 4,
                    "repsOrSecs": "4r"
                  },
                  "5": {
                    "masterySetId": 18,
                    "masteryLevel": "10r",
                    "weekNum": 6.0,
                    "sets": 4,
                    "repsOrSecs": "6r"
                  },
                  "6": {
                    "masterySetId": 19,
                    "masteryLevel": "10r",
                    "weekNum": 7.0,
                    "sets": 5,
                    "repsOrSecs": "6r"
                  },
                  "7": {
                    "masterySetId": 21,
                    "masteryLevel": "10r",
                    "weekNum": 9.0,
                    "sets": 4,
                    "repsOrSecs": "8r"
                  },
                  "8": {
                    "masterySetId": 22,
                    "masteryLevel": "10r",
                    "weekNum": 10.0,
                    "sets": 4,
                    "repsOrSecs": "10r"
                  },
                  "9": {
                    "masterySetId": 23,
                    "masteryLevel": "10r",
                    "weekNum": 11.0,
                    "sets": 5,
                    "repsOrSecs": "10r"
                  }
                },
                "selected": true,
                "usersWorkoutSettingsId": 5211180,
                "setsAndReps": "3x2r",
                "order": 7,
                "isLogged": false,
                "notes": null,
                "workoutInfo": {
                  "Strength": {
                    "name": "Straddle Reverse Leg Lift",
                    "setsAndReps": "3x2r",
                    "imageName": "SLPE7",
                    "group": "Foundation Core",
                    "focusPoints": [
                      {
                        "exerciseId": 113,
                        "description": "1) Lift the heels all the way to horizontal.",
                        "type": 1,
                        "order": 1
                      },
                      {
                        "exerciseId": 113,
                        "description": "2) Pause briefly at the top of each repetition.",
                        "type": 1,
                        "order": 2
                      }
                    ],
                    "instructions": [
                      {
                        "type": 1,
                        "exerciseId": 113,
                        "instructions": "Begin lying on your stomach on top of a box and place your hips on the edge so that your legs hang off. Straddle your legs wide, lock your knees, point your toes, and slowly lift your legs to horizontal. Continue to straddle your legs as wide as possible during the lift. Pause briefly with your legs held parallel to the floor, lower slowly, and repeat for reps.",
                        "equipment": "Plyometric Box"
                      }
                    ],
                    "videos": [
                      {
                        "exercisesVideoId": 1244,
                        "exerciseId": 113,
                        "tag": 1,
                        "videoName": "YUj1VUXX.json?exp=1765848832908&sig=4a0636d1bea9c8ef7030575d58dbfa6e",
                        "weekNum": 0,
                        "order": 1
                      }
                    ],
                    "technicalTips": null
                  },
                  "Mobility": {
                    "name": "Around the World",
                    "setsAndReps": "3x10r@",
                    "imageName": "SLPE7IM",
                    "group": "Foundation Core",
                    "focusPoints": [
                      {
                        "exerciseId": 113,
                        "description": "1) Using a 5-10lb plate should be sufficient for most people.",
                        "type": 2,
                        "order": 1
                      },
                      {
                        "exerciseId": 113,
                        "description": "2) Focus on a complete full movement with straight knees.",
                        "type": 2,
                        "order": 2
                      }
                    ],
                    "instructions": [
                      {
                        "type": 2,
                        "exerciseId": 113,
                        "instructions": "Begin standing with your feet facing directly forward just outside of hip-width. Straighten your knees and extend a weight overhead. Completely straighten your elbows and shrug your shoulders to your ears. Leading with the weight, arch sideways to your left and perform a clockwise trunk circle. During the circle, keep your shoulders completely open. If you can see the weight, it has dropped too low. After the arch portion of the circle, return to standing upright, switch directions, and continue to alternate between clockwise and counterclockwise around the world reps for the set.",
                        "equipment": "Dumbbell"
                      }
                    ],
                    "videos": [
                      {
                        "exercisesVideoId": 1245,
                        "exerciseId": 113,
                        "tag": 2,
                        "videoName": "uk03Q34U.json?exp=1765848832908&sig=8d7b96bef82de9435374cf61d2898706",
                        "weekNum": 0,
                        "order": 1
                      }
                    ],
                    "technicalTips": null
                  }
                }
              }
            ],
            "Manna": [
              {
                "exerciseId": 119,
                "name": "Hanging Leg Lift ",
                "image": "MNPE7",
                "group": "Foundation Core",
                "exerciseNotation": "C7",
                "stepNo": 1,
                "masterySteps": {
                  "1": {
                    "masterySetId": 1,
                    "masteryLevel": "5r",
                    "weekNum": 1.0,
                    "sets": 3,
                    "repsOrSecs": "1r"
                  },
                  "2": {
                    "masterySetId": 2,
                    "masteryLevel": "5r",
                    "weekNum": 2.0,
                    "sets": 5,
                    "repsOrSecs": "1r"
                  },
                  "3": {
                    "masterySetId": 3,
                    "masteryLevel": "5r",
                    "weekNum": 3.0,
                    "sets": 3,
                    "repsOrSecs": "2r"
                  },
                  "4": {
                    "masterySetId": 5,
                    "masteryLevel": "5r",
                    "weekNum": 5.0,
                    "sets": 4,
                    "repsOrSecs": "2r"
                  },
                  "5": {
                    "masterySetId": 6,
                    "masteryLevel": "5r",
                    "weekNum": 6.0,
                    "sets": 4,
                    "repsOrSecs": "3r"
                  },
                  "6": {
                    "masterySetId": 7,
                    "masteryLevel": "5r",
                    "weekNum": 7.0,
                    "sets": 5,
                    "repsOrSecs": "3r"
                  },
                  "7": {
                    "masterySetId": 9,
                    "masteryLevel": "5r",
                    "weekNum": 9.0,
                    "sets": 4,
                    "repsOrSecs": "4r"
                  },
                  "8": {
                    "masterySetId": 10,
                    "masteryLevel": "5r",
                    "weekNum": 10.0,
                    "sets": 4,
                    "repsOrSecs": "5r"
                  },
                  "9": {
                    "masterySetId": 11,
                    "masteryLevel": "5r",
                    "weekNum": 11.0,
                    "sets": 5,
                    "repsOrSecs": "5r"
                  }
                },
                "selected": true,
                "usersWorkoutSettingsId": 5211181,
                "setsAndReps": "3x1r",
                "order": 7,
                "isLogged": false,
                "notes": null,
                "workoutInfo": {
                  "Strength": {
                    "name": "Hanging Leg Lift ",
                    "setsAndReps": "3x1r",
                    "imageName": "MNPE7",
                    "group": "Foundation Core",
                    "focusPoints": [
                      {
                        "exerciseId": 119,
                        "description": "1) Do not simply raise your shins to the bar; rather focus on touching the toes to the bar for each rep.",
                        "type": 1,
                        "order": 1
                      }
                    ],
                    "instructions": [
                      {
                        "type": 1,
                        "exerciseId": 119,
                        "instructions": "Begin in a dead hang with your shoulders up by your ears (elevated). With your knees locked, toes pointed, and legs together, lift your legs up with control until your toes touch the top bar. Lower down in the same, controlled fashion. Avoid pulling down with your back and arms. Hang low, relying on your hips and core to perform the hanging leg lift. Repeat for reps.",
                        "equipment": "Stall Bars"
                      }
                    ],
                    "videos": [
                      {
                        "exercisesVideoId": 1256,
                        "exerciseId": 119,
                        "tag": 1,
                        "videoName": "hO1Vu3Gv.json?exp=1765848832908&sig=68f6d3ac3bc42a78742e2ae92f788271",
                        "weekNum": 0,
                        "order": 1
                      }
                    ],
                    "technicalTips": null
                  },
                  "Mobility": {
                    "name": "Vertical Pike Hang",
                    "setsAndReps": "3x30s",
                    "imageName": "MNPE7IM",
                    "group": "Foundation Core",
                    "focusPoints": [
                      {
                        "exerciseId": 119,
                        "description": "1) Note that the shoulder girdle as well as the entire back are all in a full, complete stretch from top to bottom.",
                        "type": 2,
                        "order": 1
                      }
                    ],
                    "instructions": [
                      {
                        "type": 2,
                        "exerciseId": 119,
                        "instructions": "Begin standing on the bottom rung of stall bars (feet together) with your hands gripping the bar nearest waist level. Lean back and drop down, with straight arms and knees. Lower down into a comfortable stretch; do not force the pike. Keep straight arms and legs as you hold for time.",
                        "equipment": "Stall Bars"
                      }
                    ],
                    "videos": [
                      {
                        "exercisesVideoId": 1257,
                        "exerciseId": 119,
                        "tag": 2,
                        "videoName": "ARfS2TXw.json?exp=1765848832908&sig=fa778d5d240cb6c4353adbf9d0ee68b9",
                        "weekNum": 0,
                        "order": 1
                      }
                    ],
                    "technicalTips": null
                  }
                }
              }
            ]
          },
          "LEVEL 3": {},
          "LEVEL 4": {}
        }
      },
      {
        "scheduleId": 517940,
        "classId": 59213,
        "type": "Program",
        "dayIndex": 2,
        "workout": {
          "LEVEL 1": {},
          "LEVEL 2": {
            "Single Leg Squat": [
              {
                "exerciseId": 125,
                "name": "Cossack Squat",
                "image": "SLSPE6",
                "group": "Foundation Lower Body",
                "exerciseNotation": "A6",
                "stepNo": 1,
                "masterySteps": {
                  "1": {
                    "masterySetId": 13,
                    "masteryLevel": "10r",
                    "weekNum": 1.0,
                    "sets": 3,
                    "repsOrSecs": "2r"
                  },
                  "2": {
                    "masterySetId": 14,
                    "masteryLevel": "10r",
                    "weekNum": 2.0,
                    "sets": 5,
                    "repsOrSecs": "2r"
                  },
                  "3": {
                    "masterySetId": 15,
                    "masteryLevel": "10r",
                    "weekNum": 3.0,
                    "sets": 3,
                    "repsOrSecs": "4r"
                  },
                  "4": {
                    "masterySetId": 17,
                    "masteryLevel": "10r",
                    "weekNum": 5.0,
                    "sets": 4,
                    "repsOrSecs": "4r"
                  },
                  "5": {
                    "masterySetId": 18,
                    "masteryLevel": "10r",
                    "weekNum": 6.0,
                    "sets": 4,
                    "repsOrSecs": "6r"
                  },
                  "6": {
                    "masterySetId": 19,
                    "masteryLevel": "10r",
                    "weekNum": 7.0,
                    "sets": 5,
                    "repsOrSecs": "6r"
                  },
                  "7": {
                    "masterySetId": 21,
                    "masteryLevel": "10r",
                    "weekNum": 9.0,
                    "sets": 4,
                    "repsOrSecs": "8r"
                  },
                  "8": {
                    "masterySetId": 22,
                    "masteryLevel": "10r",
                    "weekNum": 10.0,
                    "sets": 4,
                    "repsOrSecs": "10r"
                  },
                  "9": {
                    "masterySetId": 23,
                    "masteryLevel": "10r",
                    "weekNum": 11.0,
                    "sets": 5,
                    "repsOrSecs": "10r"
                  }
                },
                "selected": true,
                "usersWorkoutSettingsId": 5211182,
                "setsAndReps": "3x2r",
                "order": 6,
                "isLogged": false,
                "notes": null,
                "workoutInfo": {
                  "Strength": {
                    "name": "Cossack Squat",
                    "setsAndReps": "3x2r",
                    "imageName": "SLSPE6",
                    "group": "Foundation Lower Body",
                    "focusPoints": [
                      {
                        "exerciseId": 125,
                        "description": "1) The non-squatting leg remains straight.",
                        "type": 1,
                        "order": 1
                      },
                      {
                        "exerciseId": 125,
                        "description": "2) Stand up fully in between repetitions.",
                        "type": 1,
                        "order": 2
                      }
                    ],
                    "instructions": [
                      {
                        "type": 1,
                        "exerciseId": 125,
                        "instructions": "Assume a wide standing straddle stance with your toes turned out slightly. Squat down as low as possible on your right side, keeping your left leg straight. Check to make sure your right knee is tracking over the center of your foot and not drifting inward. Stand all the way up before transitioning over to your left side, extending your right knee and bending your left knee. Pause, check your knee position, and continue to repeat for reps. For help balancing and squatting lower, hold a light weight out in front of you during the squats.",
                        "equipment": "Body Only"
                      }
                    ],
                    "videos": [
                      {
                        "exercisesVideoId": 1268,
                        "exerciseId": 125,
                        "tag": 1,
                        "videoName": "bdIOs806.json?exp=1765848832912&sig=5c6e095ed3cd3519f54426032fde592d",
                        "weekNum": 0,
                        "order": 1
                      }
                    ],
                    "technicalTips": [
                      {
                        "exercisesVideoId": 1270,
                        "exerciseId": 125,
                        "tag": 4,
                        "videoName": "FHhw48P7.json?exp=1765848832912&sig=f8aee6154e440560092cdf293e993561",
                        "weekNum": 0,
                        "order": 1
                      }
                    ]
                  },
                  "Mobility": {
                    "name": "Twisting Squats",
                    "setsAndReps": "3x5r@",
                    "imageName": "SLSPE6IM",
                    "group": "Foundation Lower Body",
                    "focusPoints": [
                      {
                        "exerciseId": 125,
                        "description": "1) Use the outside edge of the ankle to begin standing.",
                        "type": 2,
                        "order": 1
                      },
                      {
                        "exerciseId": 125,
                        "description": "2) Note that each rep twists in the opposite direction.",
                        "type": 2,
                        "order": 2
                      }
                    ],
                    "instructions": [
                      {
                        "type": 2,
                        "exerciseId": 125,
                        "instructions": "Begin sitting on the floor, leg criss-crossed. Keep your ankles turned out and stand straight up. At the top, turn your feet flat on the floor and pivot 360-degrees so your legs cross the other way. Turn your ankles back out and descend back to the reverse criss-cross position on the floor. Repeat for reps.",
                        "equipment": "Body Only"
                      }
                    ],
                    "videos": [
                      {
                        "exercisesVideoId": 1269,
                        "exerciseId": 125,
                        "tag": 2,
                        "videoName": "qnXu8Mck.json?exp=1765848832912&sig=83f10b1069ad989f0bab384dca081275",
                        "weekNum": 0,
                        "order": 1
                      }
                    ],
                    "technicalTips": [
                      {
                        "exercisesVideoId": 1271,
                        "exerciseId": 125,
                        "tag": 4,
                        "videoName": "qlYP9dfk.json?exp=1765848832912&sig=2ed8411b1a2627043b03aaf654ac8c16",
                        "weekNum": 0,
                        "order": 2
                      }
                    ]
                  }
                }
              }
            ]
          },
          "LEVEL 3": {},
          "LEVEL 4": {}
        }
      }
    ],
    "WEDNESDAY,DECEMBER 17": [
      {
        "scheduleId": 517941,
        "classId": 59216,
        "type": "Class",
        "dayIndex": 3,
        "workout": {
          "className": "Front Split",
          "trainingType": "Stretch",
          "mediaId": "aH1k32u9.json?exp=1765848832912&sig=53a2cce75d73cb75b5af070258c8b8f6",
          "image": "stretch-front-split.jpg",
          "description": "A perfect 45-minute mobility routine for athletes and office workers alike! Tension in the quads, hip flexors, feet, calves, and hamstrings will rapidly disappear with continued use of this sequence. If Front Splits are your goal, start here!",
          "isLogged": false
        }
      }
    ],
    "THURSDAY,DECEMBER 18": [
      {
        "scheduleId": 517942,
        "classId": 59176,
        "type": "Class",
        "dayIndex": 4,
        "workout": {
          "className": "Extended Warmup",
          "trainingType": "Warm-Up",
          "mediaId": "UCGHRpMp.json?exp=1765848832912&sig=77d3fb3f59dd9ee18b71a21e8b51eb56",
          "image": "330x220-ExtendedWU.jpg",
          "description": "This 25-minute warm-up will create heat in your body from head to toe, while focusing on active and engaging stretches to increase your flexibility while getting you fired up!",
          "isLogged": false
        }
      },
      {
        "scheduleId": 517943,
        "classId": 59219,
        "type": "Program",
        "dayIndex": 4,
        "workout": {
          "LEVEL 1": {},
          "LEVEL 2": {
            "Hollow Back Press": [
              {
                "exerciseId": 129,
                "name": "Single Bar Dip",
                "image": "HBPPE7",
                "group": "Foundation Upper Body",
                "exerciseNotation": "A7",
                "stepNo": 1,
                "masterySteps": {
                  "1": {
                    "masterySetId": 1,
                    "masteryLevel": "5r",
                    "weekNum": 1.0,
                    "sets": 3,
                    "repsOrSecs": "1r"
                  },
                  "2": {
                    "masterySetId": 2,
                    "masteryLevel": "5r",
                    "weekNum": 2.0,
                    "sets": 5,
                    "repsOrSecs": "1r"
                  },
                  "3": {
                    "masterySetId": 3,
                    "masteryLevel": "5r",
                    "weekNum": 3.0,
                    "sets": 3,
                    "repsOrSecs": "2r"
                  },
                  "4": {
                    "masterySetId": 5,
                    "masteryLevel": "5r",
                    "weekNum": 5.0,
                    "sets": 4,
                    "repsOrSecs": "2r"
                  },
                  "5": {
                    "masterySetId": 6,
                    "masteryLevel": "5r",
                    "weekNum": 6.0,
                    "sets": 4,
                    "repsOrSecs": "3r"
                  },
                  "6": {
                    "masterySetId": 7,
                    "masteryLevel": "5r",
                    "weekNum": 7.0,
                    "sets": 5,
                    "repsOrSecs": "3r"
                  },
                  "7": {
                    "masterySetId": 9,
                    "masteryLevel": "5r",
                    "weekNum": 9.0,
                    "sets": 4,
                    "repsOrSecs": "4r"
                  },
                  "8": {
                    "masterySetId": 10,
                    "masteryLevel": "5r",
                    "weekNum": 10.0,
                    "sets": 4,
                    "repsOrSecs": "5r"
                  },
                  "9": {
                    "masterySetId": 11,
                    "masteryLevel": "5r",
                    "weekNum": 11.0,
                    "sets": 5,
                    "repsOrSecs": "5r"
                  }
                },
                "selected": true,
                "usersWorkoutSettingsId": 5211183,
                "setsAndReps": "3x1r",
                "order": 7,
                "isLogged": false,
                "notes": null,
                "workoutInfo": {
                  "Strength": {
                    "name": "Single Bar Dip",
                    "setsAndReps": "3x1r",
                    "imageName": "HBPPE7",
                    "group": "Foundation Upper Body",
                    "focusPoints": [
                      {
                        "exerciseId": 129,
                        "description": "1) Lightly slide down along the bar; do not lay on the bar.",
                        "type": 1,
                        "order": 1
                      },
                      {
                        "exerciseId": 129,
                        "description": "2) Full ROM is lowering to the bottom of the chest.",
                        "type": 1,
                        "order": 2
                      }
                    ],
                    "instructions": [
                      {
                        "type": 1,
                        "exerciseId": 129,
                        "instructions": "Start supported above a single bar with your arms extended and body straight. Be sure your hands are placed at approximately shoulder width. Begin with and maintain strong scapular depression. Initiate the dip by bending your elbows. Lightly slide down the bar until the bottom of your chest touches it. Dip back up and repeat for reps. Minimize the piking of your hips at all times during the single bar dip and avoid resting on the bar. ",
                        "equipment": "Pull-up Bar"
                      }
                    ],
                    "videos": [
                      {
                        "exercisesVideoId": 1288,
                        "exerciseId": 129,
                        "tag": 1,
                        "videoName": "M75P8tL0.json?exp=1765848832980&sig=261250c0f8b2d75289879d1532ef9e31",
                        "weekNum": 0,
                        "order": 1
                      }
                    ],
                    "technicalTips": null
                  },
                  "Mobility": {
                    "name": "Static Cat",
                    "setsAndReps": "3x30s",
                    "imageName": "HBPPE7IM",
                    "group": "Foundation Upper Body",
                    "focusPoints": [
                      {
                        "exerciseId": 129,
                        "description": "1) At the bottom, the glutes should be either on top or just in front of the knees to maintain the intensity of the stretch.",
                        "type": 2,
                        "order": 1
                      }
                    ],
                    "instructions": [
                      {
                        "type": 2,
                        "exerciseId": 129,
                        "instructions": "Begin kneeling with your hips above your knees. Slide your hands out in front of you straightening your elbows and shrugging your shoulders to your ears as your chest drops close to the floor. Keep your hips over your knees and continue to stretch your chest and arms toward the floor as you hold for time.",
                        "equipment": "Body Only"
                      }
                    ],
                    "videos": [
                      {
                        "exercisesVideoId": 1289,
                        "exerciseId": 129,
                        "tag": 2,
                        "videoName": "b9EfOeZR.json?exp=1765848832980&sig=689d8a3c4a35c57939b2120c74caf16e",
                        "weekNum": 0,
                        "order": 1
                      }
                    ],
                    "technicalTips": null
                  }
                }
              }
            ],
            "Rope Climb": [
              {
                "exerciseId": 137,
                "name": "Negative Pull-up",
                "image": "RCPE7",
                "group": "Foundation Upper Body",
                "exerciseNotation": "B7",
                "stepNo": 1,
                "masterySteps": {
                  "1": {
                    "masterySetId": 133,
                    "masteryLevel": "5rx10s",
                    "weekNum": 1.0,
                    "sets": 3,
                    "repsOrSecs": "1rx10s"
                  },
                  "2": {
                    "masterySetId": 134,
                    "masteryLevel": "5rx10s",
                    "weekNum": 2.0,
                    "sets": 5,
                    "repsOrSecs": "1rx10s"
                  },
                  "3": {
                    "masterySetId": 135,
                    "masteryLevel": "5rx10s",
                    "weekNum": 3.0,
                    "sets": 3,
                    "repsOrSecs": "2rx10s"
                  },
                  "4": {
                    "masterySetId": 137,
                    "masteryLevel": "5rx10s",
                    "weekNum": 5.0,
                    "sets": 4,
                    "repsOrSecs": "2rx10s"
                  },
                  "5": {
                    "masterySetId": 138,
                    "masteryLevel": "5rx10s",
                    "weekNum": 6.0,
                    "sets": 4,
                    "repsOrSecs": "3rx10s"
                  },
                  "6": {
                    "masterySetId": 139,
                    "masteryLevel": "5rx10s",
                    "weekNum": 7.0,
                    "sets": 5,
                    "repsOrSecs": "3rx10s"
                  },
                  "7": {
                    "masterySetId": 141,
                    "masteryLevel": "5rx10s",
                    "weekNum": 9.0,
                    "sets": 4,
                    "repsOrSecs": "4rx10s"
                  },
                  "8": {
                    "masterySetId": 142,
                    "masteryLevel": "5rx10s",
                    "weekNum": 10.0,
                    "sets": 4,
                    "repsOrSecs": "5rx10s"
                  },
                  "9": {
                    "masterySetId": 143,
                    "masteryLevel": "5rx10s",
                    "weekNum": 11.0,
                    "sets": 5,
                    "repsOrSecs": "5rx10s"
                  }
                },
                "selected": true,
                "usersWorkoutSettingsId": 5211184,
                "setsAndReps": "3x1rx10s",
                "order": 7,
                "isLogged": false,
                "notes": null,
                "workoutInfo": {
                  "Strength": {
                    "name": "Negative Pull-up",
                    "setsAndReps": "3x1rx10s",
                    "imageName": "RCPE7",
                    "group": "Foundation Upper Body",
                    "focusPoints": [
                      {
                        "exerciseId": 137,
                        "description": "1) Do not allow the chin to touch the bar at the top.",
                        "type": 1,
                        "order": 1
                      },
                      {
                        "exerciseId": 137,
                        "description": "2) Maintain an even tempo during the entire descent.",
                        "type": 1,
                        "order": 2
                      }
                    ],
                    "instructions": [
                      {
                        "type": 1,
                        "exerciseId": 137,
                        "instructions": "Grab a pull-up bar with an over grip (palms away) and jump to the top of a pull-up position. Be sure your chin is over the bar at a minimum. Lower down, performing the negative, or eccentric, portion of a pull-up. Keep a steady pace and take a full 10 seconds to descend to straight elbows. Keep your feet together and body straight throughout the descent. At the bottom, relax into a full dead hang with elevated shoulders. Jump or step back up to the top and repeat.",
                        "equipment": "Pull-up Bar"
                      }
                    ],
                    "videos": [
                      {
                        "exercisesVideoId": 1304,
                        "exerciseId": 137,
                        "tag": 1,
                        "videoName": "ob9rG2mc.json?exp=1765848832980&sig=0a8dc22082ab9c9306e063a1b981ef8e",
                        "weekNum": 0,
                        "order": 1
                      }
                    ],
                    "technicalTips": null
                  },
                  "Mobility": {
                    "name": "Undergrip Bent Lean",
                    "setsAndReps": "3x30s",
                    "imageName": "RCPE7IM",
                    "group": "Foundation Upper Body",
                    "focusPoints": [
                      {
                        "exerciseId": 137,
                        "description": "1) Grasp the rail at approximately hip height.",
                        "type": 2,
                        "order": 1
                      },
                      {
                        "exerciseId": 137,
                        "description": "2) Use the hips to pull the torso away from the hands.",
                        "type": 2,
                        "order": 2
                      }
                    ],
                    "instructions": [
                      {
                        "type": 2,
                        "exerciseId": 137,
                        "instructions": "Stand approximately 2 feet from the stall bars or other sturdy grip that is near hip-height. Grab on with both hands using an under-grip (palms up) and sit back, pulling against the bars and dropping your torso down. Lean back until your elbows straighten and your torso is roughly parallel to the floor. You should have a straight line from hands to hips. Maintain constant backward pressure to maximize the effectiveness of this stretch. Hold this stretch for time.",
                        "equipment": "Fixed Bar"
                      }
                    ],
                    "videos": [
                      {
                        "exercisesVideoId": 1305,
                        "exerciseId": 137,
                        "tag": 2,
                        "videoName": "hBDYw3XP.json?exp=1765848832980&sig=a28f13789832b76dddf9078a5e539d98",
                        "weekNum": 0,
                        "order": 1
                      }
                    ],
                    "technicalTips": null
                  }
                }
              }
            ],
            "Straddle Planche": [
              {
                "exerciseId": 109,
                "name": "Elevated Planche Bounce",
                "image": "sPLPE7",
                "group": "Foundation Upper Body",
                "exerciseNotation": "C7",
                "stepNo": 1,
                "masterySteps": {
                  "1": {
                    "masterySetId": 25,
                    "masteryLevel": "15r",
                    "weekNum": 1.0,
                    "sets": 3,
                    "repsOrSecs": "3r"
                  },
                  "2": {
                    "masterySetId": 26,
                    "masteryLevel": "15r",
                    "weekNum": 2.0,
                    "sets": 5,
                    "repsOrSecs": "3r"
                  },
                  "3": {
                    "masterySetId": 27,
                    "masteryLevel": "15r",
                    "weekNum": 3.0,
                    "sets": 3,
                    "repsOrSecs": "6r"
                  },
                  "4": {
                    "masterySetId": 29,
                    "masteryLevel": "15r",
                    "weekNum": 5.0,
                    "sets": 4,
                    "repsOrSecs": "6r"
                  },
                  "5": {
                    "masterySetId": 30,
                    "masteryLevel": "15r",
                    "weekNum": 6.0,
                    "sets": 4,
                    "repsOrSecs": "9r"
                  },
                  "6": {
                    "masterySetId": 31,
                    "masteryLevel": "15r",
                    "weekNum": 7.0,
                    "sets": 5,
                    "repsOrSecs": "9r"
                  },
                  "7": {
                    "masterySetId": 33,
                    "masteryLevel": "15r",
                    "weekNum": 9.0,
                    "sets": 4,
                    "repsOrSecs": "12r"
                  },
                  "8": {
                    "masterySetId": 34,
                    "masteryLevel": "15r",
                    "weekNum": 10.0,
                    "sets": 4,
                    "repsOrSecs": "15r"
                  },
                  "9": {
                    "masterySetId": 35,
                    "masteryLevel": "15r",
                    "weekNum": 11.0,
                    "sets": 5,
                    "repsOrSecs": "15r"
                  }
                },
                "selected": true,
                "usersWorkoutSettingsId": 5211179,
                "setsAndReps": "3x3r",
                "order": 7,
                "isLogged": false,
                "notes": null,
                "workoutInfo": {
                  "Strength": {
                    "name": "Elevated Planche Bounce",
                    "setsAndReps": "3x3r",
                    "imageName": "sPLPE7",
                    "group": "Foundation Upper Body",
                    "focusPoints": [
                      {
                        "exerciseId": 109,
                        "description": "1) As much as possible, initiate the lift from the upper back.",
                        "type": 1,
                        "order": 1
                      },
                      {
                        "exerciseId": 109,
                        "description": "2) Minimize the piking of hips during the bounces.",
                        "type": 1,
                        "order": 2
                      }
                    ],
                    "instructions": [
                      {
                        "type": 1,
                        "exerciseId": 109,
                        "instructions": "Begin from a foot-elevated straight arm plank, with your feet placed on a box at approximately shoulder height. Ensure that your shoulders are directly above your hands, your elbows are completely straight, and your feet are together. Rotate your fingers out approximately 45-degrees and begin to lean forward. As your shoulders move in front of your hands, keep constant tension in your glutes and core to maintain a posterior pelvic tilt. Lean forward until you can shift your foot position from curled to pointed toes so that you're on the tops of your feet. At this point, your hands should be roughly underneath your hips. Push your chest away from the floor to keep your shoulder blades spread apart (protracted). Also keep your shoulders pressed down, away from your ears (depressed). Scapular protraction and depression are essential for maintaining a strong elevated planche lean position. From this elevated planche lean start position, bounce your legs up and down on the box. As you bounce, keep a comfortable head position, strong forward lean, and straight body. As much as possible, initiate each bounce from your upper back and not your hips. Repeat for reps.",
                        "equipment": "Body Only"
                      }
                    ],
                    "videos": [
                      {
                        "exercisesVideoId": 1236,
                        "exerciseId": 109,
                        "tag": 1,
                        "videoName": "s4NYHkFh.json?exp=1765848832980&sig=5336d4e29b0582dcdc55c24ddbaf6fd2",
                        "weekNum": 0,
                        "order": 1
                      }
                    ],
                    "technicalTips": null
                  },
                  "Mobility": {
                    "name": "Prone Half Straddle Planche Double Leg Extension",
                    "setsAndReps": "3x5r",
                    "imageName": "sPLPE7IM",
                    "group": "Foundation Upper Body",
                    "focusPoints": [
                      {
                        "exerciseId": 109,
                        "description": "1) Do not allow the knees to drop below the hips at any time.",
                        "type": 2,
                        "order": 1
                      },
                      {
                        "exerciseId": 109,
                        "description": "2) The hips should remain completely open and flat.",
                        "type": 2,
                        "order": 2
                      }
                    ],
                    "instructions": [
                      {
                        "type": 2,
                        "exerciseId": 109,
                        "instructions": "Begin lying on your stomach on top of a box and place your hips on the edge so that your legs hang off. Bend your knees to 90-degrees and lift both legs up and as far sideways as possible. Be sure both of your thighs are parallel to the floor and you've achieved your widest half-straddle. Extend your legs until your knees completely straighten. Pause momentarily, retract your legs, and return to the prone half straddle. Repeat for reps.",
                        "equipment": "Plyometric Box"
                      }
                    ],
                    "videos": [
                      {
                        "exercisesVideoId": 1237,
                        "exerciseId": 109,
                        "tag": 2,
                        "videoName": "9j43jx5r.json?exp=1765848832980&sig=d3e4355a4dcaf68d0b60b9f7eaf202ef",
                        "weekNum": 0,
                        "order": 1
                      }
                    ],
                    "technicalTips": null
                  }
                }
              }
            ]
          },
          "LEVEL 3": {},
          "LEVEL 4": {}
        }
      }
    ],
    "FRIDAY,DECEMBER 19": [
      {
        "scheduleId": 517944,
        "classId": 59176,
        "type": "Class",
        "dayIndex": 5,
        "workout": {
          "className": "Extended Warmup",
          "trainingType": "Warm-Up",
          "mediaId": "UCGHRpMp.json?exp=1765848832980&sig=9479a50f01ebe1b8206810f1fdac6a92",
          "image": "330x220-ExtendedWU.jpg",
          "description": "This 25-minute warm-up will create heat in your body from head to toe, while focusing on active and engaging stretches to increase your flexibility while getting you fired up!",
          "isLogged": false
        }
      },
      {
        "scheduleId": 517945,
        "classId": 60033,
        "type": "Class",
        "dayIndex": 5,
        "workout": {
          "className": "Hip Prehab",
          "trainingType": "Mobility",
          "mediaId": "oYB1u4Mj.json?exp=1765848832980&sig=bc6dd634f76a0bc66d32325c728a3451",
          "image": "330x220-hip-prehab.jpg",
          "description": "Keep your hips healthy and strong while protecting against common injuries, aches, and pains. This short follow along moves your hips through their whole range of motion and creates strength through the whole range. All this is done through simple, standing leg raise variations that can be done anywhere. Use this class to prime your hips for squatting or other lower-body exercises, or as part of a longer mobility session.",
          "isLogged": false
        }
      },
      {
        "scheduleId": 517946,
        "classId": 59207,
        "type": "Program",
        "dayIndex": 5,
        "workout": {
          "LEVEL 1": {},
          "LEVEL 2": {
            "Front Lever": [
              {
                "exerciseId": 101,
                "name": "Negative Body Lever Straddle",
                "image": "FLPE7",
                "group": "Foundation Core",
                "exerciseNotation": "A7",
                "stepNo": 1,
                "masterySteps": {
                  "1": {
                    "masterySetId": 133,
                    "masteryLevel": "5rx10s",
                    "weekNum": 1.0,
                    "sets": 3,
                    "repsOrSecs": "1rx10s"
                  },
                  "2": {
                    "masterySetId": 134,
                    "masteryLevel": "5rx10s",
                    "weekNum": 2.0,
                    "sets": 5,
                    "repsOrSecs": "1rx10s"
                  },
                  "3": {
                    "masterySetId": 135,
                    "masteryLevel": "5rx10s",
                    "weekNum": 3.0,
                    "sets": 3,
                    "repsOrSecs": "2rx10s"
                  },
                  "4": {
                    "masterySetId": 137,
                    "masteryLevel": "5rx10s",
                    "weekNum": 5.0,
                    "sets": 4,
                    "repsOrSecs": "2rx10s"
                  },
                  "5": {
                    "masterySetId": 138,
                    "masteryLevel": "5rx10s",
                    "weekNum": 6.0,
                    "sets": 4,
                    "repsOrSecs": "3rx10s"
                  },
                  "6": {
                    "masterySetId": 139,
                    "masteryLevel": "5rx10s",
                    "weekNum": 7.0,
                    "sets": 5,
                    "repsOrSecs": "3rx10s"
                  },
                  "7": {
                    "masterySetId": 141,
                    "masteryLevel": "5rx10s",
                    "weekNum": 9.0,
                    "sets": 4,
                    "repsOrSecs": "4rx10s"
                  },
                  "8": {
                    "masterySetId": 142,
                    "masteryLevel": "5rx10s",
                    "weekNum": 10.0,
                    "sets": 4,
                    "repsOrSecs": "5rx10s"
                  },
                  "9": {
                    "masterySetId": 143,
                    "masteryLevel": "5rx10s",
                    "weekNum": 11.0,
                    "sets": 5,
                    "repsOrSecs": "5rx10s"
                  }
                },
                "selected": true,
                "usersWorkoutSettingsId": 5211178,
                "setsAndReps": "3x1rx10s",
                "order": 7,
                "isLogged": false,
                "notes": null,
                "workoutInfo": {
                  "Strength": {
                    "name": "Negative Body Lever Straddle",
                    "setsAndReps": "3x1rx10s",
                    "imageName": "FLPE7",
                    "group": "Foundation Core",
                    "focusPoints": [
                      {
                        "exerciseId": 101,
                        "description": "1) Do not allow the lower back to arch during the descent.",
                        "type": 1,
                        "order": 1
                      },
                      {
                        "exerciseId": 101,
                        "description": "2) The arms should be comfortably bent.",
                        "type": 1,
                        "order": 2
                      }
                    ],
                    "instructions": [
                      {
                        "type": 1,
                        "exerciseId": 101,
                        "instructions": "Lie on your back with your grip on a fixed object overhead–the bottom rung of stall bars or a braced partner’s ankles work well. Tuck your knees to assist with entering a candlestick position supported by your grip and shoulders, with legs extended upwards, glutes and core strongly contracted. Straddle your legs wide, lock your knees, continue to press your hips strongly forward, and slowly lower your body to the floor. As you lower, keep your body straight with posterior pelvic tilt (PPT). Do not allow your hips to pike at anytime during the movement. Take a full ten seconds to descend and aim to touch down one vertebrae at a time. Tuck back up to the starting candlestick position and repeat for reps.",
                        "equipment": "Fixed Pole"
                      }
                    ],
                    "videos": [
                      {
                        "exercisesVideoId": 1220,
                        "exerciseId": 101,
                        "tag": 1,
                        "videoName": "a7RyMr8T.json?exp=1765848832984&sig=886cdd510db3b486fd6396ab3830a3f2",
                        "weekNum": 0,
                        "order": 1
                      }
                    ],
                    "technicalTips": null
                  },
                  "Mobility": {
                    "name": "Seal Rocks",
                    "setsAndReps": "3x5r",
                    "imageName": "FLPE7IM",
                    "group": "Foundation Core",
                    "focusPoints": [
                      {
                        "exerciseId": 101,
                        "description": "1) Allow the lower back to arch fully in the front.",
                        "type": 2,
                        "order": 1
                      },
                      {
                        "exerciseId": 101,
                        "description": "2) Place the chest completely flat on the thighs in the rear.",
                        "type": 2,
                        "order": 2
                      }
                    ],
                    "instructions": [
                      {
                        "type": 2,
                        "exerciseId": 101,
                        "instructions": "Begin kneeling, sitting back on your heels, with your torso folded over your thighs and arms extended long in front of you. Rock forward, straighten your legs, and press up through your arms to arch your spine. Keep your legs in contact with the floor. Keep your glutes engaged to help protect your low back and help you arch through your middle and upper spine. Straighten your elbows as much as possible and be sure to keep your hands directly under your shoulders. Push down into the floor and open your chest at the top of the stretch to keep your shoulder blades down and back (depressed and retracted). Look up. Press back to the start position and repeat for reps or time. ",
                        "equipment": "Body Only"
                      }
                    ],
                    "videos": [
                      {
                        "exercisesVideoId": 1221,
                        "exerciseId": 101,
                        "tag": 2,
                        "videoName": "M0dImtXI.json?exp=1765848832984&sig=37c4214174087529735e03c4564725be",
                        "weekNum": 0,
                        "order": 1
                      }
                    ],
                    "technicalTips": null
                  }
                }
              }
            ],
            "Side Lever": [
              {
                "exerciseId": 113,
                "name": "Straddle Reverse Leg Lift",
                "image": "SLPE7",
                "group": "Foundation Core",
                "exerciseNotation": "B7",
                "stepNo": 1,
                "masterySteps": {
                  "1": {
                    "masterySetId": 13,
                    "masteryLevel": "10r",
                    "weekNum": 1.0,
                    "sets": 3,
                    "repsOrSecs": "2r"
                  },
                  "2": {
                    "masterySetId": 14,
                    "masteryLevel": "10r",
                    "weekNum": 2.0,
                    "sets": 5,
                    "repsOrSecs": "2r"
                  },
                  "3": {
                    "masterySetId": 15,
                    "masteryLevel": "10r",
                    "weekNum": 3.0,
                    "sets": 3,
                    "repsOrSecs": "4r"
                  },
                  "4": {
                    "masterySetId": 17,
                    "masteryLevel": "10r",
                    "weekNum": 5.0,
                    "sets": 4,
                    "repsOrSecs": "4r"
                  },
                  "5": {
                    "masterySetId": 18,
                    "masteryLevel": "10r",
                    "weekNum": 6.0,
                    "sets": 4,
                    "repsOrSecs": "6r"
                  },
                  "6": {
                    "masterySetId": 19,
                    "masteryLevel": "10r",
                    "weekNum": 7.0,
                    "sets": 5,
                    "repsOrSecs": "6r"
                  },
                  "7": {
                    "masterySetId": 21,
                    "masteryLevel": "10r",
                    "weekNum": 9.0,
                    "sets": 4,
                    "repsOrSecs": "8r"
                  },
                  "8": {
                    "masterySetId": 22,
                    "masteryLevel": "10r",
                    "weekNum": 10.0,
                    "sets": 4,
                    "repsOrSecs": "10r"
                  },
                  "9": {
                    "masterySetId": 23,
                    "masteryLevel": "10r",
                    "weekNum": 11.0,
                    "sets": 5,
                    "repsOrSecs": "10r"
                  }
                },
                "selected": true,
                "usersWorkoutSettingsId": 5211180,
                "setsAndReps": "3x2r",
                "order": 7,
                "isLogged": false,
                "notes": null,
                "workoutInfo": {
                  "Strength": {
                    "name": "Straddle Reverse Leg Lift",
                    "setsAndReps": "3x2r",
                    "imageName": "SLPE7",
                    "group": "Foundation Core",
                    "focusPoints": [
                      {
                        "exerciseId": 113,
                        "description": "1) Lift the heels all the way to horizontal.",
                        "type": 1,
                        "order": 1
                      },
                      {
                        "exerciseId": 113,
                        "description": "2) Pause briefly at the top of each repetition.",
                        "type": 1,
                        "order": 2
                      }
                    ],
                    "instructions": [
                      {
                        "type": 1,
                        "exerciseId": 113,
                        "instructions": "Begin lying on your stomach on top of a box and place your hips on the edge so that your legs hang off. Straddle your legs wide, lock your knees, point your toes, and slowly lift your legs to horizontal. Continue to straddle your legs as wide as possible during the lift. Pause briefly with your legs held parallel to the floor, lower slowly, and repeat for reps.",
                        "equipment": "Plyometric Box"
                      }
                    ],
                    "videos": [
                      {
                        "exercisesVideoId": 1244,
                        "exerciseId": 113,
                        "tag": 1,
                        "videoName": "YUj1VUXX.json?exp=1765848832984&sig=17f63dc9bcf65a0c496fb46a807e595f",
                        "weekNum": 0,
                        "order": 1
                      }
                    ],
                    "technicalTips": null
                  },
                  "Mobility": {
                    "name": "Around the World",
                    "setsAndReps": "3x10r@",
                    "imageName": "SLPE7IM",
                    "group": "Foundation Core",
                    "focusPoints": [
                      {
                        "exerciseId": 113,
                        "description": "1) Using a 5-10lb plate should be sufficient for most people.",
                        "type": 2,
                        "order": 1
                      },
                      {
                        "exerciseId": 113,
                        "description": "2) Focus on a complete full movement with straight knees.",
                        "type": 2,
                        "order": 2
                      }
                    ],
                    "instructions": [
                      {
                        "type": 2,
                        "exerciseId": 113,
                        "instructions": "Begin standing with your feet facing directly forward just outside of hip-width. Straighten your knees and extend a weight overhead. Completely straighten your elbows and shrug your shoulders to your ears. Leading with the weight, arch sideways to your left and perform a clockwise trunk circle. During the circle, keep your shoulders completely open. If you can see the weight, it has dropped too low. After the arch portion of the circle, return to standing upright, switch directions, and continue to alternate between clockwise and counterclockwise around the world reps for the set.",
                        "equipment": "Dumbbell"
                      }
                    ],
                    "videos": [
                      {
                        "exercisesVideoId": 1245,
                        "exerciseId": 113,
                        "tag": 2,
                        "videoName": "uk03Q34U.json?exp=1765848832984&sig=61d740f63305422b12c8695f522e1bca",
                        "weekNum": 0,
                        "order": 1
                      }
                    ],
                    "technicalTips": null
                  }
                }
              }
            ],
            "Manna": [
              {
                "exerciseId": 119,
                "name": "Hanging Leg Lift ",
                "image": "MNPE7",
                "group": "Foundation Core",
                "exerciseNotation": "C7",
                "stepNo": 1,
                "masterySteps": {
                  "1": {
                    "masterySetId": 1,
                    "masteryLevel": "5r",
                    "weekNum": 1.0,
                    "sets": 3,
                    "repsOrSecs": "1r"
                  },
                  "2": {
                    "masterySetId": 2,
                    "masteryLevel": "5r",
                    "weekNum": 2.0,
                    "sets": 5,
                    "repsOrSecs": "1r"
                  },
                  "3": {
                    "masterySetId": 3,
                    "masteryLevel": "5r",
                    "weekNum": 3.0,
                    "sets": 3,
                    "repsOrSecs": "2r"
                  },
                  "4": {
                    "masterySetId": 5,
                    "masteryLevel": "5r",
                    "weekNum": 5.0,
                    "sets": 4,
                    "repsOrSecs": "2r"
                  },
                  "5": {
                    "masterySetId": 6,
                    "masteryLevel": "5r",
                    "weekNum": 6.0,
                    "sets": 4,
                    "repsOrSecs": "3r"
                  },
                  "6": {
                    "masterySetId": 7,
                    "masteryLevel": "5r",
                    "weekNum": 7.0,
                    "sets": 5,
                    "repsOrSecs": "3r"
                  },
                  "7": {
                    "masterySetId": 9,
                    "masteryLevel": "5r",
                    "weekNum": 9.0,
                    "sets": 4,
                    "repsOrSecs": "4r"
                  },
                  "8": {
                    "masterySetId": 10,
                    "masteryLevel": "5r",
                    "weekNum": 10.0,
                    "sets": 4,
                    "repsOrSecs": "5r"
                  },
                  "9": {
                    "masterySetId": 11,
                    "masteryLevel": "5r",
                    "weekNum": 11.0,
                    "sets": 5,
                    "repsOrSecs": "5r"
                  }
                },
                "selected": true,
                "usersWorkoutSettingsId": 5211181,
                "setsAndReps": "3x1r",
                "order": 7,
                "isLogged": false,
                "notes": null,
                "workoutInfo": {
                  "Strength": {
                    "name": "Hanging Leg Lift ",
                    "setsAndReps": "3x1r",
                    "imageName": "MNPE7",
                    "group": "Foundation Core",
                    "focusPoints": [
                      {
                        "exerciseId": 119,
                        "description": "1) Do not simply raise your shins to the bar; rather focus on touching the toes to the bar for each rep.",
                        "type": 1,
                        "order": 1
                      }
                    ],
                    "instructions": [
                      {
                        "type": 1,
                        "exerciseId": 119,
                        "instructions": "Begin in a dead hang with your shoulders up by your ears (elevated). With your knees locked, toes pointed, and legs together, lift your legs up with control until your toes touch the top bar. Lower down in the same, controlled fashion. Avoid pulling down with your back and arms. Hang low, relying on your hips and core to perform the hanging leg lift. Repeat for reps.",
                        "equipment": "Stall Bars"
                      }
                    ],
                    "videos": [
                      {
                        "exercisesVideoId": 1256,
                        "exerciseId": 119,
                        "tag": 1,
                        "videoName": "hO1Vu3Gv.json?exp=1765848832984&sig=e6b3cfb9bf16a2cb372134a3c4f44049",
                        "weekNum": 0,
                        "order": 1
                      }
                    ],
                    "technicalTips": null
                  },
                  "Mobility": {
                    "name": "Vertical Pike Hang",
                    "setsAndReps": "3x30s",
                    "imageName": "MNPE7IM",
                    "group": "Foundation Core",
                    "focusPoints": [
                      {
                        "exerciseId": 119,
                        "description": "1) Note that the shoulder girdle as well as the entire back are all in a full, complete stretch from top to bottom.",
                        "type": 2,
                        "order": 1
                      }
                    ],
                    "instructions": [
                      {
                        "type": 2,
                        "exerciseId": 119,
                        "instructions": "Begin standing on the bottom rung of stall bars (feet together) with your hands gripping the bar nearest waist level. Lean back and drop down, with straight arms and knees. Lower down into a comfortable stretch; do not force the pike. Keep straight arms and legs as you hold for time.",
                        "equipment": "Stall Bars"
                      }
                    ],
                    "videos": [
                      {
                        "exercisesVideoId": 1257,
                        "exerciseId": 119,
                        "tag": 2,
                        "videoName": "ARfS2TXw.json?exp=1765848832984&sig=94321ff14baa5d78b93031e6888307f6",
                        "weekNum": 0,
                        "order": 1
                      }
                    ],
                    "technicalTips": null
                  }
                }
              }
            ]
          },
          "LEVEL 3": {},
          "LEVEL 4": {}
        }
      },
      {
        "scheduleId": 517947,
        "classId": 59213,
        "type": "Program",
        "dayIndex": 5,
        "workout": {
          "LEVEL 1": {},
          "LEVEL 2": {
            "Single Leg Squat": [
              {
                "exerciseId": 125,
                "name": "Cossack Squat",
                "image": "SLSPE6",
                "group": "Foundation Lower Body",
                "exerciseNotation": "A6",
                "stepNo": 1,
                "masterySteps": {
                  "1": {
                    "masterySetId": 13,
                    "masteryLevel": "10r",
                    "weekNum": 1.0,
                    "sets": 3,
                    "repsOrSecs": "2r"
                  },
                  "2": {
                    "masterySetId": 14,
                    "masteryLevel": "10r",
                    "weekNum": 2.0,
                    "sets": 5,
                    "repsOrSecs": "2r"
                  },
                  "3": {
                    "masterySetId": 15,
                    "masteryLevel": "10r",
                    "weekNum": 3.0,
                    "sets": 3,
                    "repsOrSecs": "4r"
                  },
                  "4": {
                    "masterySetId": 17,
                    "masteryLevel": "10r",
                    "weekNum": 5.0,
                    "sets": 4,
                    "repsOrSecs": "4r"
                  },
                  "5": {
                    "masterySetId": 18,
                    "masteryLevel": "10r",
                    "weekNum": 6.0,
                    "sets": 4,
                    "repsOrSecs": "6r"
                  },
                  "6": {
                    "masterySetId": 19,
                    "masteryLevel": "10r",
                    "weekNum": 7.0,
                    "sets": 5,
                    "repsOrSecs": "6r"
                  },
                  "7": {
                    "masterySetId": 21,
                    "masteryLevel": "10r",
                    "weekNum": 9.0,
                    "sets": 4,
                    "repsOrSecs": "8r"
                  },
                  "8": {
                    "masterySetId": 22,
                    "masteryLevel": "10r",
                    "weekNum": 10.0,
                    "sets": 4,
                    "repsOrSecs": "10r"
                  },
                  "9": {
                    "masterySetId": 23,
                    "masteryLevel": "10r",
                    "weekNum": 11.0,
                    "sets": 5,
                    "repsOrSecs": "10r"
                  }
                },
                "selected": true,
                "usersWorkoutSettingsId": 5211182,
                "setsAndReps": "3x2r",
                "order": 6,
                "isLogged": false,
                "notes": null,
                "workoutInfo": {
                  "Strength": {
                    "name": "Cossack Squat",
                    "setsAndReps": "3x2r",
                    "imageName": "SLSPE6",
                    "group": "Foundation Lower Body",
                    "focusPoints": [
                      {
                        "exerciseId": 125,
                        "description": "1) The non-squatting leg remains straight.",
                        "type": 1,
                        "order": 1
                      },
                      {
                        "exerciseId": 125,
                        "description": "2) Stand up fully in between repetitions.",
                        "type": 1,
                        "order": 2
                      }
                    ],
                    "instructions": [
                      {
                        "type": 1,
                        "exerciseId": 125,
                        "instructions": "Assume a wide standing straddle stance with your toes turned out slightly. Squat down as low as possible on your right side, keeping your left leg straight. Check to make sure your right knee is tracking over the center of your foot and not drifting inward. Stand all the way up before transitioning over to your left side, extending your right knee and bending your left knee. Pause, check your knee position, and continue to repeat for reps. For help balancing and squatting lower, hold a light weight out in front of you during the squats.",
                        "equipment": "Body Only"
                      }
                    ],
                    "videos": [
                      {
                        "exercisesVideoId": 1268,
                        "exerciseId": 125,
                        "tag": 1,
                        "videoName": "bdIOs806.json?exp=1765848832986&sig=9be2395d66c31714b2c0c7a8d62388fc",
                        "weekNum": 0,
                        "order": 1
                      }
                    ],
                    "technicalTips": [
                      {
                        "exercisesVideoId": 1270,
                        "exerciseId": 125,
                        "tag": 4,
                        "videoName": "FHhw48P7.json?exp=1765848832986&sig=ec953aec06139b6c92d28cfe19f2d18a",
                        "weekNum": 0,
                        "order": 1
                      }
                    ]
                  },
                  "Mobility": {
                    "name": "Twisting Squats",
                    "setsAndReps": "3x5r@",
                    "imageName": "SLSPE6IM",
                    "group": "Foundation Lower Body",
                    "focusPoints": [
                      {
                        "exerciseId": 125,
                        "description": "1) Use the outside edge of the ankle to begin standing.",
                        "type": 2,
                        "order": 1
                      },
                      {
                        "exerciseId": 125,
                        "description": "2) Note that each rep twists in the opposite direction.",
                        "type": 2,
                        "order": 2
                      }
                    ],
                    "instructions": [
                      {
                        "type": 2,
                        "exerciseId": 125,
                        "instructions": "Begin sitting on the floor, leg criss-crossed. Keep your ankles turned out and stand straight up. At the top, turn your feet flat on the floor and pivot 360-degrees so your legs cross the other way. Turn your ankles back out and descend back to the reverse criss-cross position on the floor. Repeat for reps.",
                        "equipment": "Body Only"
                      }
                    ],
                    "videos": [
                      {
                        "exercisesVideoId": 1269,
                        "exerciseId": 125,
                        "tag": 2,
                        "videoName": "qnXu8Mck.json?exp=1765848832986&sig=4330a2fa1304b38bf9227b27e9ceab73",
                        "weekNum": 0,
                        "order": 1
                      }
                    ],
                    "technicalTips": [
                      {
                        "exercisesVideoId": 1271,
                        "exerciseId": 125,
                        "tag": 4,
                        "videoName": "qlYP9dfk.json?exp=1765848832986&sig=997a73964f60afc69ac11cf7d1692f1d",
                        "weekNum": 0,
                        "order": 2
                      }
                    ]
                  }
                }
              }
            ]
          },
          "LEVEL 3": {},
          "LEVEL 4": {}
        }
      }
    ],
    "SATURDAY,DECEMBER 20": [
      {
        "scheduleId": 517948,
        "classId": 59210,
        "type": "Class",
        "dayIndex": 6,
        "workout": {
          "className": "Middle Split",
          "trainingType": "Stretch",
          "mediaId": "JatJjiFp.json?exp=1765848832986&sig=c339b2ee42ac41e9037cf4726d448af3",
          "image": "stretch-middle-split.jpg",
          "description": "Everyone can start building the mobility necessary for the middle splits and pancake–no matter what your flexibility level is! This 45-minute sequence will help you find relief and develop flexibility throughout your lower body.",
          "isLogged": false
        }
      }
    ],
    "SUNDAY,DECEMBER 21": null
  }
  Axios(AxiosConfig('GET', `/myschedule/levels/view/weekly/users/${UserId}/levels/${levelId}`, webToken))
    .then(res => {
      let workoutSchedule = res.data ? _.cloneDeep(res.data) : {};
      let keys = Object.keys(workoutSchedule);

      keys.forEach(k => {
        let workouts = workoutSchedule[k] ? workoutSchedule[k] : [];
        workoutSchedule[k] = workouts.map(processUserWorkout);
      })
      dispatch({
        type: actionTypes.SET_LEVELS,
        payload: { userSchedule: workoutSchedule }
      })
    }).catch(error => {
      // Sentry.captureException(error);
      console.log('getLevelPLan dispatch(getLevelPlanNew());')
      dispatch(getLevelPlanNew(type));
    });
}
export const getLevelPlanNew = (type) => (dispatch, getState) => {//userLevel: "Advanced One"
  console.log('getLevelPlanNew = () =>  `/api/user/userStatus` ',)
  const state = getState();
  const { webToken, UserId, levelId, timezone } = state.login;
  console.log("levelId:", levelId)
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  let userData = {
    userId: UserId,
    type: type ? type : "levelPath"
  }
  localStorage.setItem('userLevelID', levelId);

  let data = dispatch(getData())
  console.log("data in levels is:", data)
  Axios.get(NEWAPI + '/api/user/userStatus', {
    params: userData
  }, config)
    .then(res => {


      let logs = res.data.filter(obj => obj.logs).map(obj => obj.logs)[0];//getting only the logs from response data

      let newData = {}

      logs.map((log) => {
        newData[log.userScheduleDate] = log.data
      })

      const commonDates = Object.keys(data).filter(key => key in newData);

      //simple class update
      commonDates.forEach(date => {
        newData[date].forEach(newItem => {
          const orgItem = data[date].find(item =>
            item.scheduleId === newItem.scheduleId && item.classId === newItem.classId
          );
          if (orgItem) {//class or program type
            if (newItem.type === "Class") {
              let newLogValue = newItem?.isLogged ? newItem?.isLogged : newItem?.workout?.isLogged
              orgItem.workout.isLogged = newLogValue
            } else if (newItem.type === "Program") {
              orgItem.workout = newItem.workout;
            }
          } else {//program type with chosenprogs structure
            // console.log("newItem in else:", newItem)
            // console.log("data[date]:", data[date])
          }
        });
      });


      let workoutSchedule = data ? _.cloneDeep(data) : {};
      let keys = Object.keys(workoutSchedule);

      //keys is the date

      keys.forEach(k => {
        let workouts = workoutSchedule[k] ? workoutSchedule[k] : [];
        workoutSchedule[k] = workouts.map(processUserWorkoutNew);
      })
      //you need to update workoutSchedule to update a program.
      //update db user settings into workoutSchedule

      dispatch({
        type: actionTypes.SET_LEVELS,
        payload: { userSchedule: workoutSchedule }
      })
    }).catch(error => {
      console.log("error in getLevelPlanNew", error)
      console.error('getLevelPlanNew failure')
    });
}
export const clearOutDay = (dayIndex, isBeginner = false) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId } = state.login;
  const { userSchedule } = state.levels;

  const userScheduleKey = Object.keys(userSchedule)[dayIndex];

  let endPoint = isBeginner
    ? `/myschedule/beginner/users/${UserId}/dayIndex/${dayIndex + 1}`
    : `/myschedule/levels/users/${UserId}/dayIndex/${dayIndex + 1}`;

  Axios(AxiosConfig('DELETE', endPoint, webToken))
    .then(res => {
      let newUserSchedule = _.cloneDeep(userSchedule);
      newUserSchedule[userScheduleKey] = [];

      dispatch({
        type: actionTypes.CLEAR_DAY_LEVELS,
        payload: { userSchedule: newUserSchedule }
      })
    }).catch(error => {
      Sentry.captureException(error);
    });
}
export const clearOutDayBeginner = (dayIndex) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId } = state.login;
  const { userSchedule } = state.levels;

  const userScheduleKey = Object.keys(userSchedule)[dayIndex];

  Axios(AxiosConfig('DELETE', `/myschedule/beginner/users/${UserId}/dayIndex/${dayIndex + 1}`, webToken))
    .then(res => {
      let newUserSchedule = _.cloneDeep(userSchedule);

      newUserSchedule[userScheduleKey] = {
        ...newUserSchedule[userScheduleKey],
        classesList: null,
        scheduleId: null
      };

      dispatch({
        type: actionTypes.CLEAR_DAY_LEVELS,
        payload: { userSchedule: newUserSchedule }
      })
    }).catch(error => {
      Sentry.captureException(error);
    });
}
export const generateWorkoutLevels = (workoutId, dateIndex, dateKey) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, levelId, timezone } = state.login;
  const { userSchedule } = state.levels;
  const date = getCalanderDate(timezone)[dateIndex];

  Axios(AxiosConfig('POST', `/myschedule/levels/users/${UserId}/level/${levelId}/workout/${workoutId}?date=${date}`, webToken)).then(res => {
    let workoutSchedule = res.data ? res.data : [];
    let newUserSchedule = _.cloneDeep(userSchedule);

    newUserSchedule[dateKey] = workoutSchedule.map(processUserWorkout);

    dispatch({
      type: actionTypes.GET_WORKOUT,
      payload: {
        userSchedule: newUserSchedule
      }
    })
  }).catch(error => {
    Sentry.captureException(error);
  });
}
export const refreshWMS = (scheduleId, trainingType, dateIndex, dateKey) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, levelId, timezone } = state.login;
  const { userSchedule } = state.levels;
  const date = getCalanderDate(timezone)[dateIndex];

  const switchTrainingType = {
    "Mobility": 'mobility',
    "Warm-Up": 'warmup',
    "Stretch": 'stretch'
  };

  Axios(AxiosConfig(
    'PUT',
    `/myschedule/levels/users/${UserId}/schedule/${scheduleId}/level/${levelId}?date=${date}&trainingType=${switchTrainingType[trainingType]}`,
    webToken
  )).then(res => {
    let workout = res.data;
    workout = processUserWorkout(workout);

    let newSchedule = _.cloneDeep(userSchedule);
    let dayToUpDate = newSchedule[dateKey];

    const index = dayToUpDate.findIndex(w => w.scheduleId === scheduleId);

    dayToUpDate[index] = workout;
    newSchedule[dateKey] = dayToUpDate;

    dispatch({
      type: actionTypes.GET_WORKOUT,
      payload: {
        userSchedule: newSchedule
      }
    })
  }).catch(error => {
    Sentry.captureException(error);
  });
}
// New LegacyActions
export const ManageDificulty = (workoutIndex, dateKey, dateKeyIndex, exerciseId, type, section, step) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, timezone } = state.login;
  const { userSchedule } = state.levels;
  const date = getCalanderDate(timezone)[dateKeyIndex];
  const legacyWorkout = userSchedule[dateKey][workoutIndex];

  const courseName = legacyWorkout.category.replace('Foundation ', '');
  Axios(AxiosConfig('put', `/workout-service/users/${UserId}/difficulty/${type}/?workoutType=${courseName}&exerciseId=${exerciseId}&date=${date}`, webToken))
    .then(res => {
      console.log("res in ManageDificulty is:", res)
      dispatch(getLevelPLan())
      if (!res) {
        dispatch(ManageDificultyNew(workoutIndex, dateKey, dateKeyIndex, exerciseId, type, section, step))
      }
    }).catch(error => {
      console.log("error is:", error)
      dispatch(ManageDificultyNew(workoutIndex, dateKey, dateKeyIndex, exerciseId, type, section, step))
      // Sentry.captureException(error);
    });
}
export const ManageDificultyNew = (workoutIndex, dateKey, dateKeyIndex, exerciseId, type, section, step) => (dispatch, getState) => {
  console.log("inside ManageDificultyNew")
  const state = getState();
  const { webToken, UserId, timezone, levelId } = state.login;
  const { userSchedule } = state.levels;
  const date = getCalanderDate(timezone)[dateKeyIndex];

  const legacyWorkout = userSchedule[dateKey][workoutIndex];
  const courseName = legacyWorkout.category.replace('Foundation ', '');
  /*
  * on the date of the update
  * for type Program
  * in workout with value object present in any level
  * get the particular type in that level based on the exerciseId
  * based on the 
  * 
  * 
  * 
  * 1. from legacy workout, get the excersise using the exerciseId (legacyWorkout.chosenProgs array)
  * 2. based on the workoutIndex get the sets x repsOrSecs
  * 3. update legacy workout setsAndReps value in step 1 
  */



  dispatch(getData())
  let data = state.data.allData

  // let updatedDataDiff = dispatch(updateData(step,"manageDificulty"))
  // console.log("updatedDataDiff:", updatedDataDiff)
  const programAtLevel = data[dateKey][workoutIndex].workout[`LEVEL ${levelId}`][section][0]

  let totalSteps = Object.keys(programAtLevel.masterySteps).length

  let masterySteps = (step == totalSteps) ? programAtLevel.masterySteps[step - 1] : programAtLevel.masterySteps[step + 1]

  const workoutInfoObjectkeys = Object.keys(programAtLevel.workoutInfo);
  //loop over workoutInfoObjectkeys, update setsAndRepsfor each object

  workoutInfoObjectkeys.map(key => {

    if (key == "Strength") {
      programAtLevel.workoutInfo[key].setsAndReps = `${masterySteps?.sets}x${masterySteps?.repsOrSecs}`
    }
    if (key == "Mobility") {
      programAtLevel.workoutInfo[key].setsAndReps = `${masterySteps?.sets}x10s`
    }
    if (type == "up") {
      programAtLevel.stepNo = step + 1
    } else {
      programAtLevel.stepNo = step - 1
    }
  })

  /*set the data object to have the right date key.*/
  let newData = data ? _.cloneDeep(data) : [];

  const updatedprogramAtLevel = newData[dateKey][workoutIndex].workout[`LEVEL ${levelId}`][section][0]

  const updatedWorkoutInfoObjectkeys = Object.keys(updatedprogramAtLevel.workoutInfo);



  let dataNotUpdated = legacyWorkout?.chosenProgs?.filter(oldData => oldData?.exerciseId != updatedprogramAtLevel["exerciseId"]);

  for (const [key, value] of Object.entries(updatedprogramAtLevel)) {

    delete updatedprogramAtLevel['image']
    //currently commenting out, since causing issue in later steps (notes and step edit)
    // delete updatedprogramAtLevel['masterySteps']
    // delete updatedprogramAtLevel['setsAndReps']
    updatedWorkoutInfoObjectkeys.map(key => {
      //whatever key is strength or mobilty delete following keys in that object
      // delete updatedprogramAtLevel.workoutInfo[key]['imageName']
      // delete updatedprogramAtLevel.workoutInfo[key]['focusPoints']
      // delete updatedprogramAtLevel.workoutInfo[key]['instructions']
      // delete updatedprogramAtLevel.workoutInfo[key]['videos']
      // delete updatedprogramAtLevel.workoutInfo[key]['technicalTips']
    })
  }
  let allProgramNewData = []
  let programData = []

  userSchedule[dateKey].map((schedule) => {

    if (schedule.type == "Class") {

      allProgramNewData.push(schedule)
    } else {
      programData = newData[dateKey].filter(newdata => newdata.type === "Program");


    }

  })
  //data that was not updated add that to allProgramNewData

  programData.map(program => {
    if (program.workout) {
      for (const [key, value] of Object.entries(program.workout)) {

        if (value) {
          for (const [id, info] of Object.entries(value)) {

            let exerciseId = info[0].exerciseId

            dataNotUpdated.map((oldData) => {

              if (oldData.exerciseId == exerciseId) {//updating the data for which content was not updated currently to the all data, so that other (old) steps are also saved and not re written
                info[0] = oldData
              }
            })


          }
        }

      }
    }
  })


  allProgramNewData = [...allProgramNewData, ...programData]

  dispatch({
    type: actionTypes.GET_WORKOUT,
    payload: {
      userSchedule: userSchedule
    }
  })

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  let dataToPost = {
    userId: UserId,
    userScheduleDate: dateKey,
    updatedData: allProgramNewData
  }
  Axios.post(NEWAPI + '/api/user/log', dataToPost, config)
    .then(res => {
      dispatch(getLevelPlanNew())
    }).catch(error => {
      Sentry.captureException(error);
    });
}
export const LogLegacy = (exerciseId, mobilityStatus, autoProg, steps, logList, dateKeyIndex, dateKey, workoutIndex) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, timezone } = state.login;
  const { userSchedule } = state.levels;
  const date = getCalanderDate(timezone)[dateKeyIndex];

  const legacyWorkout = userSchedule[dateKey][workoutIndex];
  const courseName = legacyWorkout.category.replace('Foundation ', '');

  let body = {
    data: {
      userId: UserId,
      date: date,
      exerciseId: exerciseId,
      imStatus: mobilityStatus,
      autoprogress: autoProg,
      notes: null,
      masterySets: steps,
      setsAndRepsDTOList: logList
    }
  }

  Axios(AxiosConfig('post', `/workout-service/programs/users/${UserId}/logging?workoutType=${courseName}`, webToken, body))
    .then(res => {
      console.log("res is:", res)
      dispatch(getLevelPLan())
      if (!res) {
        dispatch(LogLegacyNew(exerciseId, mobilityStatus, autoProg, steps, logList, dateKeyIndex, dateKey, workoutIndex))
      }
    }).catch(error => {

      dispatch(LogLegacyNew(exerciseId, mobilityStatus, autoProg, steps, logList, dateKeyIndex, dateKey, workoutIndex))


    });
}
export const LogLegacyNew = (exerciseId, mobilityStatus, autoProg, steps, logList, dateKeyIndex, dateKey, workoutIndex) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, timezone, levelId } = state.login;
  const { userSchedule } = state.levels;
  const date = getCalanderDate(timezone)[dateKeyIndex];

  const legacyWorkout = userSchedule[dateKey][workoutIndex];

  //get excersice from legacyWorkout based on the exerciseId
  let updatedProgram = legacyWorkout?.chosenProgs?.filter(oldData => oldData?.exerciseId == exerciseId);

  let section = updatedProgram[0].section

  const courseName = legacyWorkout.category.replace('Foundation ', '');


  dispatch(getData())
  let data = state.data.allData

  data[dateKey][workoutIndex].workout[`LEVEL ${levelId}`][section][0] = updatedProgram[0]
  data[dateKey][workoutIndex].workout[`LEVEL ${levelId}`][section][0].log = logList
  data[dateKey][workoutIndex].workout[`LEVEL ${levelId}`][section][0].isLogged = true



  // let workoutSchedule = data ? _.cloneDeep(data) : {};
  // let keys = Object.keys(workoutSchedule);
  // keys.forEach(k => {
  //   let workouts = workoutSchedule[k] ? workoutSchedule[k] : [];
  //   workoutSchedule[k] = workouts.map(processUserWorkoutNew);
  // })


  let dataToPost = {
    userId: UserId,
    userScheduleDate: dateKey,
    updatedData: data[dateKey]
  }

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  Axios.post(NEWAPI + '/api/user/log', dataToPost, config)
    .then(res => {
      dispatch(getLevelPlanNew())
    }).catch(error => {
      Sentry.captureException(error);
    });

  // let body = {
  //   data: {
  //     userId: UserId,
  //     date: date,
  //     exerciseId: exerciseId,
  //     imStatus: mobilityStatus,
  //     autoprogress: autoProg,
  //     notes: null,
  //     masterySets: steps,
  //     setsAndRepsDTOList: logList
  //   }
  // }
  // console.log("body is:", body)
  // Axios(AxiosConfig('post', `/workout-service/programs/users/${UserId}/logging?workoutType=${courseName}`, webToken, body))
  //   .then(res => dispatch(getLevelPLan())).catch(error => {
  //     Sentry.captureException(error);
  //   });
}
export const SaveNotesLevels = (notes, exerciseId, masterySteps, dateKeyIndex, dateKey, workoutIndex, section) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, timezone } = state.login;
  const date = getCalanderDate(timezone)[dateKeyIndex];

  let body = {
    data: {
      userId: UserId,
      date: date,
      exerciseId: exerciseId,
      notes: notes,
      masterySets: {
        masterySetId: masterySteps.masterySetId,
        sets: masterySteps.sets,
        repsOrSecs: masterySteps.repsOrSecs
      },
      setsAndRepsDTOList: []
    }
  }

  Axios(AxiosConfig('post', `/program-log/notes/users/${UserId}`, webToken, body))
    .then(res => {
      console.log("res in notes:", res)
      dispatch(showToast('Your notes have been saved.', 'success'))
      dispatch(getLevelPLan())
    }).catch(error => {
      console.log("error in notes:", error)
      // dispatch(SaveNotesLevelsNew(notes, dateKey, workoutIndex, section))
      Sentry.captureException(error);
    });




}
export const SaveNotesLevelsNew = (notes, dateKey, workoutIndex, section) => (dispatch, getState) => {
  console.log("inside SaveNotesLevelsNew now")
  const state = getState();
  const { webToken, UserId, timezone, levelId } = state.login;
  // const date = getCalanderDate(timezone)[dateKeyIndex];

  const { userSchedule } = state.levels;



  dispatch(getData())


  let data = state.data.allData

  if (state.data) {

    let programAtLevel = data[dateKey][workoutIndex].workout[`LEVEL ${levelId}`][section][0]

    programAtLevel.notes = notes
    delete programAtLevel["dateKey"]//delete the keys we don't need in db or the original object, so that data updates too and not just its reference.
    delete programAtLevel["dateKeyIndex"]
    delete programAtLevel["handleLegacyPlayer"]
    delete programAtLevel["showDivider"]


    // /*set the data object to have the right date key.*/
    // console.log("data[dateKey]:", data[dateKey])
    let postData = {
      userId: UserId,
      userScheduleDate: dateKey,
      updatedData: data[dateKey]
    }
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    dispatch(showToast('Your notes have been saved.', 'success'))
    Axios.post(NEWAPI + '/api/user/log', postData, config)
      .then(res => {
        console.log("SaveNotesLevelsNew response:", res)

        // dispatch(getLevelPLan())
      })
      .catch(error => {
        Sentry.captureException(error);
      })
  }

}
export const GetAllWorkoutInfo = (dateKey, workoutIndex, dateKeyIndex) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, timezone } = state.login;
  const { userSchedule } = state.levels;
  const date = getCalanderDate(timezone)[dateKeyIndex];
  const legacyWorkout = userSchedule[dateKey][workoutIndex];
  const courseName = legacyWorkout.category.replace('Foundation ', '');

  Axios(AxiosConfig('get', `/workout-service/edit-workout/users/${UserId}?workoutType=${courseName}`, webToken))
    .then(res => {
      dispatch({
        type: SET_PROGRESSION,
        allProgressions: res.data.body,
        loading: false,
        name: courseName,
        showEditModal: true,
        date: date
      })
    }).catch(error => {
      Sentry.captureException(error);
    });
}