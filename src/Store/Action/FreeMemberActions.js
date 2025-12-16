import Axios from 'axios'
import { showToast } from './calendarActions'
import { getCalanderDate } from '../../Components/UtilComponents/GetCurrentWeek'
import _ from 'lodash';
import * as Sentry from "@sentry/react";

import * as actions from './actionTypes';

const API = process.env.REACT_APP_API;

// check if all items in array are the same
const areAllSame = (arr) => {
  const first = arr[0];
  return arr.every(item => item === first) ? first : 1;
}

// param arr of bools that will return a bool
const areAllSameBool = (arr) => {
  const first = arr[0];
  return arr.every(item => item === first) ? first : false;
}

export const fetchFreeMember = () => (dispatch, getState) => { //  "userLevel": "White Board", ??
  console.log("fetchFreeMember = () =>  /auto-pilot/view/weekly/users/${UserId}`")
  const state = getState();
  const { webToken, UserId } = state.login;
  let intermediate1 = {//userLevel: "Intermediate One"
    "firstName": "Luke",
    "lastName": "",
    "startDate": "2025-12-15",
    "endDate": "2025-12-21",
    "todaysDate": "2025-12-15",
    "dayView": {
        "MONDAY,DECEMBER 15": {
            "favoriteId": null,
            "exerciseListForDay": [
                {
                    "category": "Core",
                    "exerciseName": "Side Arch Body Hold",
                    "autoPilotExerciseId": 64,
                    "imageUrl": "SLPE12.jpg",
                    "repsOrSecs": "15s",
                    "autoPilotId": 76856,
                    "levelId": 2,
                    "rounds": 3,
                    "isLogged": false,
                    "exerciseFocusPoints": [
                        {
                            "description": "1) Lift the head/feet equally while balancing on the hip.",
                            "descOrder": 1
                        },
                        {
                            "description": "2) The hand on the floor is for maintaining balance only.",
                            "descOrder": 2
                        }
                    ],
                    "videos": [
                        {
                            "mediaId": "InUwaeNZ.json?exp=1765847470309&sig=7d932dc73863f5f015cf07d9e1d79a58",
                            "version": "a"
                        },
                        {
                            "mediaId": "9pwCK5Xn.json?exp=1765847470309&sig=f2025ca11420b3ce0b0367696b520319",
                            "version": "b"
                        }
                    ]
                },
                {
                    "category": "Pull",
                    "exerciseName": "Ground Row",
                    "autoPilotExerciseId": 127,
                    "imageUrl": "RCPE2.jpg",
                    "repsOrSecs": "5r",
                    "autoPilotId": 76872,
                    "levelId": 1,
                    "rounds": 3,
                    "isLogged": false,
                    "exerciseFocusPoints": [
                        {
                            "description": "1) At full extension of the arms, the shoulders should be just off the ground.",
                            "descOrder": 1
                        }
                    ],
                    "videos": [
                        {
                            "mediaId": "DCcwynIP.json?exp=1765847470309&sig=f2102df1584341479c4435e924f2ae27",
                            "version": "a"
                        }
                    ]
                },
                {
                    "category": "Push",
                    "exerciseName": "Incline Push-Up",
                    "autoPilotExerciseId": 78,
                    "imageUrl": "HBPPE1.jpg",
                    "repsOrSecs": "5r",
                    "autoPilotId": 76873,
                    "levelId": 1,
                    "rounds": 3,
                    "isLogged": false,
                    "exerciseFocusPoints": [
                        {
                            "description": "1) Set the bar to approximately hip height.",
                            "descOrder": 1
                        },
                        {
                            "description": "2) The bar of a smith machine is a good substitute.",
                            "descOrder": 2
                        }
                    ],
                    "videos": [
                        {
                            "mediaId": "flw85eqy.json?exp=1765847470310&sig=ce6df381aa8fe92afa46783fd74e015e",
                            "version": "a"
                        }
                    ]
                },
                {
                    "category": "Mobility",
                    "exerciseName": "Vertical Pike Walk ",
                    "autoPilotExerciseId": 231,
                    "imageUrl": "MNPE5IM.jpg",
                    "repsOrSecs": "5r",
                    "autoPilotId": 76874,
                    "levelId": 1,
                    "rounds": 3,
                    "isLogged": false,
                    "exerciseFocusPoints": [
                        {
                            "description": "1) Moderate discomfort is acceptable; do not work too hard.",
                            "descOrder": 1
                        },
                        {
                            "description": "2) Allow the body to relax and lengthen into the stretch.",
                            "descOrder": 2
                        }
                    ],
                    "videos": [
                        {
                            "mediaId": "T8cfHnfV.json?exp=1765847470310&sig=55164ccf40106ed036f9af6f1d7b25dd",
                            "version": "a"
                        }
                    ]
                },
                {
                    "category": "Legs",
                    "exerciseName": "Assisted Squat",
                    "autoPilotExerciseId": 153,
                    "imageUrl": "SLSPE1.jpg",
                    "repsOrSecs": "5r",
                    "autoPilotId": 76875,
                    "levelId": 1,
                    "rounds": 3,
                    "isLogged": false,
                    "exerciseFocusPoints": [
                        {
                            "description": "1) Sit backwards into the squat rather than allowing the knees to come forward",
                            "descOrder": 1
                        }
                    ],
                    "videos": [
                        {
                            "mediaId": "z2ypZXCX.json?exp=1765847470311&sig=b22f2c65a9aaf09c987a87adfb5b053d",
                            "version": "a"
                        }
                    ]
                }
            ],
            "rounds": 3,
            "isLogged": false
        },
        "TUESDAY,DECEMBER 16": {
            "favoriteId": null,
            "exerciseListForDay": [
                {
                    "category": "Mobility",
                    "exerciseName": "Bent Arm Half Straddle Planche Single Leg Extension",
                    "autoPilotExerciseId": 325,
                    "imageUrl": "SPLSE2IM.jpg",
                    "repsOrSecs": "5r",
                    "autoPilotId": 76857,
                    "levelId": 2,
                    "rounds": 3,
                    "isLogged": false,
                    "exerciseFocusPoints": [
                        {
                            "description": "1) Keep the hips flat and open during the entirety of this iM.",
                            "descOrder": 1
                        },
                        {
                            "description": "2) The chest should be just above the ground; not touching.",
                            "descOrder": 2
                        }
                    ],
                    "videos": [
                        {
                            "mediaId": "FTklMN6h.json?exp=1765847470315&sig=912c89228c80b9e966a284c31e919216",
                            "version": "a"
                        }
                    ]
                },
                {
                    "category": "Core",
                    "exerciseName": "Negative Single Leg Body Lever",
                    "autoPilotExerciseId": 8,
                    "imageUrl": "FLPE8.jpg",
                    "repsOrSecs": "5r",
                    "autoPilotId": 76858,
                    "levelId": 2,
                    "rounds": 3,
                    "isLogged": false,
                    "exerciseFocusPoints": [
                        {
                            "description": "1) Do not allow the hip of the extended leg to pike during the descent.",
                            "descOrder": 1
                        }
                    ],
                    "videos": [
                        {
                            "mediaId": "Uh6YTJUH.json?exp=1765847470315&sig=c8d01d5621c59bc3ab8b55d676b1d95d",
                            "version": "a"
                        }
                    ]
                },
                {
                    "category": "Push",
                    "exerciseName": "Advanced Frog Stand",
                    "autoPilotExerciseId": 116,
                    "imageUrl": "SPLSE2.jpg",
                    "repsOrSecs": "15s",
                    "autoPilotId": 76859,
                    "levelId": 2,
                    "rounds": 3,
                    "isLogged": false,
                    "exerciseFocusPoints": [
                        {
                            "description": "1) With aFrS a much larger percentage of the bodyweight must now be born directly by the upper back.",
                            "descOrder": 1
                        }
                    ],
                    "videos": [
                        {
                            "mediaId": "a3MfEvC0.json?exp=1765847470316&sig=01dbb0d8bb7a5aa9e32a4302d34404d7",
                            "version": "a"
                        }
                    ]
                },
                {
                    "category": "Pull",
                    "exerciseName": "Pull-Up",
                    "autoPilotExerciseId": 133,
                    "imageUrl": "RCPE8.jpg",
                    "repsOrSecs": "5r",
                    "autoPilotId": 76860,
                    "levelId": 2,
                    "rounds": 3,
                    "isLogged": false,
                    "exerciseFocusPoints": [
                        {
                            "description": "1) At minimum, the chin must clear the bar, not the nose.",
                            "descOrder": 1
                        },
                        {
                            "description": "2) No kipping, no bounce, no seizures; use strength only.",
                            "descOrder": 2
                        }
                    ],
                    "videos": [
                        {
                            "mediaId": "V7IqkwRK.json?exp=1765847470316&sig=9248c2a0a41497d8340e3bab951c4fbb",
                            "version": "a"
                        }
                    ]
                },
                {
                    "category": "Legs",
                    "exerciseName": "Cossack Squat",
                    "autoPilotExerciseId": 158,
                    "imageUrl": "SLSPE6.jpg",
                    "repsOrSecs": "5r",
                    "autoPilotId": 76861,
                    "levelId": 2,
                    "rounds": 3,
                    "isLogged": false,
                    "exerciseFocusPoints": [
                        {
                            "description": "1) The non-squatting leg remains straight.",
                            "descOrder": 1
                        },
                        {
                            "description": "2) Stand up fully in between repetitions.",
                            "descOrder": 2
                        }
                    ],
                    "videos": [
                        {
                            "mediaId": "kJUHJUEr.json?exp=1765847470317&sig=ef8e3b34807085316545aadcabb681dc",
                            "version": "a"
                        }
                    ]
                }
            ],
            "rounds": 3,
            "isLogged": false
        },
        "WEDNESDAY,DECEMBER 17": {
            "favoriteId": null,
            "exerciseListForDay": [
                {
                    "category": "Mobility",
                    "exerciseName": "2 Forward 2 Twist",
                    "autoPilotExerciseId": 287,
                    "imageUrl": "SLPE9IM.jpg",
                    "repsOrSecs": "5r",
                    "autoPilotId": 76862,
                    "levelId": 2,
                    "rounds": 3,
                    "isLogged": false,
                    "exerciseFocusPoints": [
                        {
                            "description": "1) Press the hips back strongly while leaning the chest forward.",
                            "descOrder": 1
                        },
                        {
                            "description": "2) The twisting movement should moderately vigorous.",
                            "descOrder": 2
                        }
                    ],
                    "videos": [
                        {
                            "mediaId": "qBi0bZlb.json?exp=1765847470321&sig=d1eab6e7eec0c699862d74fe9ea30157",
                            "version": "a"
                        }
                    ]
                },
                {
                    "category": "Core",
                    "exerciseName": "Negative Single Leg Body Lever",
                    "autoPilotExerciseId": 8,
                    "imageUrl": "FLPE8.jpg",
                    "repsOrSecs": "5r",
                    "autoPilotId": 76863,
                    "levelId": 2,
                    "rounds": 3,
                    "isLogged": false,
                    "exerciseFocusPoints": [
                        {
                            "description": "1) Do not allow the hip of the extended leg to pike during the descent.",
                            "descOrder": 1
                        }
                    ],
                    "videos": [
                        {
                            "mediaId": "Uh6YTJUH.json?exp=1765847470321&sig=2c0eb6c49571ca687cdd5737447aeda2",
                            "version": "a"
                        }
                    ]
                },
                {
                    "category": "Push",
                    "exerciseName": "Tuck Planche",
                    "autoPilotExerciseId": 117,
                    "imageUrl": "SPLSE3.jpg",
                    "repsOrSecs": "15s",
                    "autoPilotId": 76864,
                    "levelId": 2,
                    "rounds": 3,
                    "isLogged": false,
                    "exerciseFocusPoints": [
                        {
                            "description": "1) With locked elbows and strongly protracted shoulders, lean forward until the hips come up to shoulder height.",
                            "descOrder": 1
                        }
                    ],
                    "videos": [
                        {
                            "mediaId": "vUdjkVou.json?exp=1765847470321&sig=5bd607c1f508749f530df92b068216aa",
                            "version": "a"
                        }
                    ]
                },
                {
                    "category": "Pull",
                    "exerciseName": "Pull-Up",
                    "autoPilotExerciseId": 133,
                    "imageUrl": "RCPE8.jpg",
                    "repsOrSecs": "5r",
                    "autoPilotId": 76865,
                    "levelId": 2,
                    "rounds": 3,
                    "isLogged": false,
                    "exerciseFocusPoints": [
                        {
                            "description": "1) At minimum, the chin must clear the bar, not the nose.",
                            "descOrder": 1
                        },
                        {
                            "description": "2) No kipping, no bounce, no seizures; use strength only.",
                            "descOrder": 2
                        }
                    ],
                    "videos": [
                        {
                            "mediaId": "V7IqkwRK.json?exp=1765847470321&sig=7166c2c8e5ca58567b42de4440330227",
                            "version": "a"
                        }
                    ]
                },
                {
                    "category": "Legs",
                    "exerciseName": "Hawaiian Squat",
                    "autoPilotExerciseId": 161,
                    "imageUrl": "SLSSE1.jpg",
                    "repsOrSecs": "5r",
                    "autoPilotId": 76866,
                    "levelId": 2,
                    "rounds": 3,
                    "isLogged": false,
                    "exerciseFocusPoints": [
                        {
                            "description": "1) Descend until the glutes are parallel with the knees.",
                            "descOrder": 1
                        },
                        {
                            "description": "2) Raise and press the arms forward to counter balance.",
                            "descOrder": 2
                        }
                    ],
                    "videos": [
                        {
                            "mediaId": "cHm7uIsG.json?exp=1765847470321&sig=33f38f2c727b1f30ec3010d29590caf1",
                            "version": "a"
                        },
                        {
                            "mediaId": "QmlRHqpi.json?exp=1765847470321&sig=0ad814e43ad14983aab5ef5f39d224ea",
                            "version": "b"
                        }
                    ]
                }
            ],
            "rounds": 3,
            "isLogged": false
        },
        "THURSDAY,DECEMBER 18": null,
        "FRIDAY,DECEMBER 19": {
            "favoriteId": null,
            "exerciseListForDay": [
                {
                    "category": "Mobility",
                    "exerciseName": "Twisting Squat",
                    "autoPilotExerciseId": 309,
                    "imageUrl": "SLSPE6IM.jpg",
                    "repsOrSecs": "5r",
                    "autoPilotId": 76867,
                    "levelId": 2,
                    "rounds": 3,
                    "isLogged": false,
                    "exerciseFocusPoints": [
                        {
                            "description": "1) Use the outside edge of the ankle to begin standing.",
                            "descOrder": 1
                        },
                        {
                            "description": "2) Note that each rep twists in the opposite direction.",
                            "descOrder": 2
                        }
                    ],
                    "videos": [
                        {
                            "mediaId": "lD7X8lnp.json?exp=1765847470325&sig=e1d0b384f69af6def6d0f8d4e16c220d",
                            "version": "a"
                        }
                    ]
                },
                {
                    "category": "Core",
                    "exerciseName": "Single Bar Inverted Hang",
                    "autoPilotExerciseId": 13,
                    "imageUrl": "FLPE13.jpg",
                    "repsOrSecs": "15s",
                    "autoPilotId": 76868,
                    "levelId": 2,
                    "rounds": 3,
                    "isLogged": false,
                    "exerciseFocusPoints": [
                        {
                            "description": "1) Note that while inverted the body is tilted forward with protracted shoulders and is NOT completely vertical.",
                            "descOrder": 1
                        }
                    ],
                    "videos": [
                        {
                            "mediaId": "BSvROnIi.json?exp=1765847470326&sig=ba7788fdafd22b64e4b5c66f0966294d",
                            "version": "a"
                        }
                    ]
                },
                {
                    "category": "Push",
                    "exerciseName": "Tuck Planche",
                    "autoPilotExerciseId": 117,
                    "imageUrl": "SPLSE3.jpg",
                    "repsOrSecs": "15s",
                    "autoPilotId": 76869,
                    "levelId": 2,
                    "rounds": 3,
                    "isLogged": false,
                    "exerciseFocusPoints": [
                        {
                            "description": "1) With locked elbows and strongly protracted shoulders, lean forward until the hips come up to shoulder height.",
                            "descOrder": 1
                        }
                    ],
                    "videos": [
                        {
                            "mediaId": "vUdjkVou.json?exp=1765847470326&sig=e736cce532cd247e5152ed74ec7d0a8f",
                            "version": "a"
                        }
                    ]
                },
                {
                    "category": "Pull",
                    "exerciseName": "Negative Pull-Up",
                    "autoPilotExerciseId": 132,
                    "imageUrl": "RCPE7.jpg",
                    "repsOrSecs": "5r",
                    "autoPilotId": 76870,
                    "levelId": 2,
                    "rounds": 3,
                    "isLogged": false,
                    "exerciseFocusPoints": [
                        {
                            "description": "1) Do not allow the chin to touch the bar at the top.",
                            "descOrder": 1
                        },
                        {
                            "description": "2) Maintain an even tempo during the entire descent.",
                            "descOrder": 2
                        }
                    ],
                    "videos": [
                        {
                            "mediaId": "nbT37QaT.json?exp=1765847470326&sig=6cf94b9b46c68a137bb83838ece6420e",
                            "version": "a"
                        }
                    ]
                },
                {
                    "category": "Legs",
                    "exerciseName": "Speed Skater Squat",
                    "autoPilotExerciseId": 160,
                    "imageUrl": "SLSPE8.jpg",
                    "repsOrSecs": "5r",
                    "autoPilotId": 76871,
                    "levelId": 2,
                    "rounds": 3,
                    "isLogged": false,
                    "exerciseFocusPoints": [
                        {
                            "description": "1) The rear knee and foot touch simultaneously.",
                            "descOrder": 1
                        },
                        {
                            "description": "2) Gently touch the ground; do not bounce off the knee.",
                            "descOrder": 2
                        }
                    ],
                    "videos": [
                        {
                            "mediaId": "J9JHQo4h.json?exp=1765847470327&sig=5a511b9d522d5117c0386ea852ce5d6d",
                            "version": "a"
                        }
                    ]
                }
            ],
            "rounds": 3,
            "isLogged": false
        },
        "SATURDAY,DECEMBER 20": null,
        "SUNDAY,DECEMBER 21": null
    }
}
  const config = {
    method: 'get',
    url: `${API}/auto-pilot/view/weekly/users/${UserId}`,
    headers: {
      'Authorization': `Bearer ${webToken}`,
    },
  };
  Axios(config).then(response => {

    const res = response.data;
    console.log('  res', res)
    const objectKeys = Object.keys(res.dayView);
    for (let i = 0; i < objectKeys.length; i++) {

      let workoutData = res.dayView[objectKeys[i]];

      if (workoutData && workoutData.exerciseListForDay && workoutData.exerciseListForDay.length > 0) {
        let rounds = workoutData.exerciseListForDay.map(prog => prog.rounds);
        let isAllLogged = workoutData.exerciseListForDay.map(prog => prog.isLogged);
        let round = areAllSame(rounds);
        isAllLogged = areAllSameBool(isAllLogged);

        res.dayView[objectKeys[i]] = {
          ...res.dayView[objectKeys[i]],
          rounds: round,
          isLogged: isAllLogged,
        }
      }
    }

    dispatch({
      type: actions.SET_FREE_MEMBER,
      payload: {
        ...res,
      },
    })
    dispatch(getAllSavedWorkouts());
  }).catch(error => {
    console.log('Luke Data OverWrite \n export const fetchFreeMember = () => (dispatch, getState) => {')
    dispatch({
      type: actions.SET_FREE_MEMBER,
      payload: {
        ...intermediate1,
      },
    })

  });
}

export const updateProgress = (count, autoPilotId, dateKey) => (dispatch, getState) => {
  const state = getState();
  const { dayView } = state.freeMember;
  const newDayView = _.cloneDeep(dayView);
  const workoutData = newDayView[dateKey].exerciseListForDay;


  const index = workoutData.findIndex(w => w.autoPilotId === autoPilotId);
  const toUpdate = workoutData[index];

  toUpdate.repsOrSecs = count;

  workoutData[index] = toUpdate;

  newDayView[dateKey].exerciseListForDay = workoutData

  dispatch({
    type: actions.EDIT_PROG,
    payload: { dayView: newDayView },
  });
}


export const updateRounds = (rounds, dateKey) => (dispatch, getState) => {
  const state = getState();
  const { dayView } = state.freeMember;
  const newDayView = _.cloneDeep(dayView);
  const workoutData = newDayView[dateKey].exerciseListForDay;

  let newWorkoutData = workoutData.map(item => { return { ...item, rounds: rounds } });

  newDayView[dateKey].exerciseListForDay = newWorkoutData;
  newDayView[dateKey].rounds = rounds;

  dispatch({
    type: actions.EDIT_ROUNDS,
    payload: {
      dayView: newDayView,
    },
  });
}

export const resetSingleProg = (autoPilotId, dateKeyIndex, dateKey) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, timezone } = state.login;
  const { dayView } = state.freeMember;
  const weekDay = getCalanderDate(timezone)[dateKeyIndex];

  const newDayView = _.cloneDeep(dayView);
  const workoutData = newDayView[dateKey].exerciseListForDay;
  const rounds = newDayView[dateKey].rounds



  const config = {
    method: 'put',
    url: `${API}/auto-pilot/refresh/one/users/${UserId}/apId/${autoPilotId}?date=${weekDay}&rounds=${rounds}`,
    headers: {
      'Authorization': `Bearer ${webToken}`,
    },
  };

  Axios(config).then(response => {
    const index = workoutData.findIndex(w => w.autoPilotId === autoPilotId);

    workoutData[index] = response.data[0];
    newDayView[dateKey].exerciseListForDay = workoutData;

    dispatch({
      type: actions.RESET_SINGLE_PROG,
      payload: {
        dayView: newDayView
      },
    });
  }).catch(error => {
    Sentry.captureException(error);
  });
}

export const resetAllProg = (dateKeyIndex, dateKey) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, timezone } = state.login;
  const { dayView } = state.freeMember;
  const weekDay = getCalanderDate(timezone)[dateKeyIndex];
  const newDayView = _.cloneDeep(dayView);
  const workoutData = newDayView[dateKey].exerciseListForDay;
  const newWorkoutData = _.cloneDeep(workoutData);
  const rounds = newDayView[dateKey].rounds

  let catArry = workoutData.filter(item => !item.isLogged).map(item => item.autoPilotId);

  const config = {
    method: 'put',
    url: `${API}/auto-pilot/refresh/all/users/${UserId}?date=${weekDay}&rounds=${rounds}`,
    headers: {
      'Authorization': `Bearer ${webToken}`,
    },
    data: catArry
  };

  Axios(config).then(response => {

    // newDayView[dateKey].exerciseListForDay = response.data;

    response.data?.forEach(item => {
      const index = workoutData.findIndex(w => w.autoPilotId === item.autoPilotId);
      newWorkoutData[index] = item;
    });

    newDayView[dateKey].exerciseListForDay = newWorkoutData;
    dispatch({
      type: actions.RESET_ALL_PROG,
      payload: {
        dayView: newDayView
      },
    });
  }).catch(error => {
    Sentry.captureException(error);
  });
}

export const markAllDone = (dateKeyIndex, dateKey) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, timezone } = state.login;
  const { dayView } = state.freeMember;
  const weekDay = getCalanderDate(timezone)[dateKeyIndex];
  const newDayView = _.cloneDeep(dayView);
  const workoutData = newDayView[dateKey].exerciseListForDay;
  const rounds = newDayView[dateKey].rounds

  let catArry = workoutData.map(item => {
    return {
      autoPilotId: item.autoPilotId,
      secsOrReps: item.repsOrSecs,
      rounds
    }
  });

  const config = {
    method: 'put',
    url: `${API}/auto-pilot/mark-alldone/users/${UserId}?date=${weekDay}`,
    headers: {
      'Authorization': `Bearer ${webToken}`,
    },
    data: catArry
  };

  Axios(config).then(response => {
    let newWorkoutData = workoutData.map(item => { return { ...item, isLogged: true } });
    newDayView[dateKey].exerciseListForDay = newWorkoutData;

    dispatch({
      type: actions.MARK_ALL_PROG,
      payload: {
        dayView: newDayView
      },
    })
  }
  ).catch(error => {
    Sentry.captureException(error);
  });
}

export const logIndivdualDays = (autopilotId, dateKey, repsOrSec) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId } = state.login;
  const { dayView } = state.freeMember;
  const newDayView = _.cloneDeep(dayView);
  const workoutData = newDayView[dateKey].exerciseListForDay;
  const rounds = newDayView[dateKey].rounds

  const config = {
    method: 'put',
    url: `${API}/auto-pilot/log/users/${UserId}/apId/${autopilotId}?rounds=${rounds}&secsOrReps=${repsOrSec}`,
    headers: {
      'Authorization': `Bearer ${webToken}`,
    }
  };

  Axios(config).then(response => {
    const index = workoutData.findIndex(w => w.autoPilotId === autopilotId);
    workoutData[index].isLogged = true;
    newDayView[dateKey].exerciseListForDay = workoutData;

    // checks if all are now loagged
    const first = workoutData[0].isLogged;
    const allComplete = workoutData.every(item => item.isLogged === first) ? true : false;

    newDayView[dateKey].isLogged = allComplete;

    dispatch({
      type: actions.LOG_INDIVIDUAL_DAYS,
      payload: {
        dayView: newDayView
      },
    });
  }).catch(error => {
    Sentry.captureException(error);
  });

}

export const deleteCategory = (autoPilotId, currentDateIndex, currentDate) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, timezone } = state.login;
  const { dayView } = state.freeMember;
  const weekDay = getCalanderDate(timezone)[currentDateIndex]
  const workoutData = dayView[currentDate].exerciseListForDay;

  if (workoutData.length <= 1) {
    dispatch({ type: actions.SHOW_TOAST, message: 'Minimum of one is category required.', variation: 'success' })
    setTimeout(() => {
      dispatch({ type: actions.HIDE_TOAST });
    }, 2500)
  }
  else {
    //  http://api-test.gymnasticbodies.com/auto-pilot/category/users/348441/id/11?date=2021-08-12
    const config = {
      method: 'delete',
      url: `${API}/auto-pilot/category/users/${UserId}/id/${autoPilotId}?date=${weekDay}`,
      headers: {
        'Authorization': `Bearer ${webToken}`,
      },
    };

    Axios(config).then(response => {
      const newArray = workoutData.filter(w => w.autoPilotId !== autoPilotId);
      let newDayView = _.cloneDeep(dayView);
      newDayView[currentDate].exerciseListForDay = newArray;
      dispatch({
        type: actions.REMOVE_SINGLE_PROG,
        payload: {
          dayView: newDayView
        },
      });
      dispatch(showToast('Category Deleted', 'success'));
    }).catch(error => {
      Sentry.captureException(error);
    });
  }
}

export const addNewCategory = (name, currentDateIndex, currentDate) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, timezone } = state.login;
  const { dayView } = state.freeMember;
  const weekDay = getCalanderDate(timezone)[currentDateIndex]
  const rounds = dayView[currentDate].rounds
  let workoutData = dayView[currentDate].exerciseListForDay;

  // http://api-test.gymnasticbodies.com/auto-pilot/category/users/348441?category=Mobile&rounds=3&date=2021-08-12

  const config = {
    method: 'post',
    url: `${API}/auto-pilot/category/users/${UserId}?category=${name}&rounds=${rounds}&date=${weekDay}`,
    headers: {
      'Authorization': `Bearer ${webToken}`,
    },
  };


  Axios(config).then(response => {
    let newDayView = _.cloneDeep(dayView);
    let newWorkoutData = [...workoutData, response.data[0]];
    newDayView[currentDate].exerciseListForDay = newWorkoutData;


    dispatch({
      type: actions.ADD_SINGLE_PROG,
      payload: {
        dayView: newDayView
      },
    });

    // dispatch(showToast('New Category Added!', 'success'));

  }).catch(error => {
    Sentry.captureException(error);
  });
}

export const generateWorkout = (genDateIndex, genDate) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, timezone } = state.login;
  const { dayView } = state.freeMember;

  const weekDays = getCalanderDate(timezone, 'YYYY-MM-DD');


  const config = {
    method: 'post',
    url: `${API}/auto-pilot/generate/users/${UserId}?date=${weekDays[genDateIndex]}`,
    headers: {
      'Authorization': `Bearer ${webToken}`,
    },
  };

  Axios(config).then(response => {
    const { data } = response;
    let newDayView = _.cloneDeep(dayView);
    let rounds = data.map(prog => prog.rounds);

    newDayView[genDate] = {
      exerciseListForDay: data,
      isLogged: false,
      favoriteId: null,
      rounds: areAllSame(rounds),
    };

    dispatch({
      type: actions.ADD_SINGLE_PROG,
      payload: {
        dayView: newDayView
      },
    });
  }).catch(error => {
    Sentry.captureException(error);
  });
}

export const loadPreviousDay = (genDateIndex, genDate) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, timezone } = state.login;
  const { dayView } = state.freeMember;

  const weekDays = getCalanderDate(timezone, 'YYYY-MM-DD')[genDateIndex];


  const config = {
    method: 'post',
    url: `${API}/auto-pilot/copy-previous/users/${UserId}?date=${weekDays}`,
    headers: {
      'Authorization': `Bearer ${webToken}`,
    },
  };

  Axios(config).then(response => {
    const { data } = response;
    if (data === "There is no previous day's workout") {
      dispatch(showToast('There is no previous day\'s workout', 'error'));
    }
    else {
      let newDayView = _.cloneDeep(dayView);
      let rounds = data.map(prog => prog.rounds);

      newDayView[genDate] = {
        exerciseListForDay: data,
        isLogged: false,
        favoriteId: null,
        rounds: areAllSame(rounds),
      };
      dispatch({
        type: actions.ADD_SINGLE_PROG,
        payload: {
          dayView: newDayView
        },
      });
      dispatch(showToast('Previous Day Loaded!', 'success'));
    }
  }).catch(error => {
    Sentry.captureException(error);
  });
}

export const saveWorkout = (currentDateIndex, title, description) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, timezone } = state.login;
  const weekDay = getCalanderDate(timezone)[currentDateIndex];

  const config = {
    method: 'post',
    url: `${API}/auto-pilot/favorites/users/${UserId}?date=${weekDay}`,
    headers: {
      'Authorization': `Bearer ${webToken}`,
    },
    data: {
      userId: UserId,
      title: title,
      description: description,
      dateCreated: weekDay
    }
  }
  Axios(config).then(response => {
    dispatch(fetchFreeMember());
    // dispatch(showToast('Workout Saved!', 'success'));
  }).catch(error => {
    Sentry.captureException(error);
  });
}

export const getAllSavedWorkouts = () => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId } = state.login;

  const config = {
    method: 'get',
    url: `${API}/auto-pilot/favorites/all/users/${UserId}`,
    headers: {
      'Authorization': `Bearer ${webToken}`,
    },
  }
  Axios(config).then(response => {
    dispatch({
      type: actions.GET_ALL_SAVED_WORKOUTS,
      payload: { savedWrokout: response.data },
    })
  }).catch(error => {
    Sentry.captureException(error);
  });
}

export const deleteSavedWorkout = (id) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId } = state.login;

  const config = {
    method: 'delete',
    url: `${API}/auto-pilot/users/${UserId}/favorites/${id}`,
    headers: {
      'Authorization': `Bearer ${webToken}`,
    },
  }
  Axios(config).then(response => {
    dispatch(fetchFreeMember());
    dispatch(showToast('Workout Deleted!', 'success'));
  }).catch(error => {
    Sentry.captureException(error);
  });
}

export const loadSavedWorkout = (id, currentDateIndex, currentDate) => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId, timezone } = state.login;
  const { dayView } = state.freeMember;
  const weekDay = getCalanderDate(timezone)[currentDateIndex]

  const config = {
    method: 'post',
    url: `${API}/auto-pilot/favorites/${id}/users/${UserId}?date=${weekDay}`,
    headers: {
      'Authorization': `Bearer ${webToken}`,
    },
  }
  Axios(config).then(response => {
    const { data } = response;
    let newDayView = _.cloneDeep(dayView);
    let rounds = data.map(prog => prog.rounds);

    newDayView[currentDate] = {
      exerciseListForDay: data,
      isLogged: false,
      favoriteId: null,
      rounds: areAllSame(rounds),
    };

    dispatch({
      type: actions.ADD_SINGLE_PROG,
      payload: {
        dayView: newDayView
      },
    });
    // dispatch(showToast('Workout Loaded!', 'success'));
  }).catch(error => {
    Sentry.captureException(error);
  });
}
