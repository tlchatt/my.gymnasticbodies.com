import Axios from 'axios'
import _ from "lodash"

import { SetCaladner, showToast } from './calendarActions';
import { getLevelPLan, getLevelPlanNew } from './LevelsActions';
import * as Sentry from "@sentry/react";
import { AxiosConfig } from '../util'

import { getLegacyDataBYO, openEditLegacyModalBYO, handleLegacyLogCheck } from './WorkoutBuilderActions'
import { useSelector } from 'react-redux';
import { getData } from './dataManipulation';
import * as actionTypes from '../Action/actionTypes';

export const SET_PROGRESSION = 'SET_PROGRESSION';
export const UPDATE_PROGRESSIONS = 'UPDATE_PROGRESSIONS'
export const RESET_LEGACY_PAGE = 'RESET_LEGACY_PAGE';
export const CLOSE_EDIT_MODAL = 'CLOSE_EDIT_MODAL';

const API = process.env.REACT_APP_API;
const NEWAPI = process.env.REACT_APP_API_NEW

export const GetUserPorgressions = (courseName, todaysDate, exerciseId) => async (dispatch, getState) => {
  const state = getState();
  const userData = state.login;
  console.log("state is:", state)
  console.log("state.legacyCourse.allProgressions:", state.legacyCourse.allProgressions)
  console.log("courseName is:", courseName)
  let config = {
    method: 'get',
    url: `${API}/workout-service/programs/users/${userData.UserId}/date/${todaysDate}?workoutType=${courseName}`,
    headers: {
      'Authorization': `Bearer ${userData.webToken}`
    }
  };


  Axios(config)
    .then(function (response) {
      let orderedData = response.data.body;
      console.log("orderedData in GetUserPorgressions is:", orderedData)
      let userChosenProgressions = _.cloneDeep(orderedData);
      console.log("userChosenProgressions in GetUserPorgressions is:", userChosenProgressions)
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
      console.log("newArray in GetUserPorgressions:", newArray)
      console.log("orderedData later in GetUserPorgressions is:", orderedData)
      dispatch({
        type: SET_PROGRESSION,
        selectedProgression: newArray,
        allProgressions: orderedData,
        loading: false,
        name: courseName
      })
    })
    .catch(function (error) {
      //all progressions - PC: 
      let allOrderedData = state.legacyCourse.allProgressions
      console.log("orderedData else:", allOrderedData)
      let userChosenProgressions = _.cloneDeep(allOrderedData);
      console.log("userChosenProgressions else is:", userChosenProgressions)
      //update the data in userChosenProgressions with the new program that was added
      // const level = "LEVEL 1";
      // const type = "Hollow Back Press";
      // console.log("???", allOrderedData[level][type])


      /*let levelClicked, typeClicked
      for (const level in allOrderedData) {
        for (const type in allOrderedData[level]) {
          const exercise = allOrderedData[level][type].find((exercise) => exercise.exerciseId === exerciseId);
          if (exercise) {
            levelClicked = level
            typeClicked = type
            // console.log(`Level: ${level}, Type: ${type}`);
            // Level: LEVEL 1, Type: Hollow Back Press
            break;
          }
        }
      }
      console.log("levelClicked:", levelClicked)
      console.log("typeClicked:", typeClicked)*/



      let LevelKeys = Object.keys(allOrderedData);
      console.log("LevelKeys:", LevelKeys)
      let newArray = [];
      let index = 0;
      LevelKeys.forEach(lvlKey => {
        const section = allOrderedData[lvlKey];
        console.log("section:", section)
        let sectionKeys = Object.keys(section);
        console.log("sectionKeys:", sectionKeys)
        sectionKeys.forEach(sctKey => {
          console.log("sctKey:", sctKey)
          userChosenProgressions[lvlKey][sctKey] = section[sctKey].filter(progression => progression.selected);

          if (userChosenProgressions[lvlKey][sctKey].length) {

            userChosenProgressions[lvlKey][sctKey].forEach(item => {
              newArray = [...newArray, { ...item, section: sctKey, levelKey: lvlKey, index: index }];
              index++;
            })
          }
        })
      })
      // newArray.push(exerciseClicked)
      console.log("newArray else:", newArray)
      dispatch({
        type: SET_PROGRESSION,
        selectedProgression: newArray,
        allProgressions: allOrderedData,
        loading: false,
        name: courseName
      })

      // Sentry.captureException(error);
    });
}

export const Reset = () => {
  return {
    type: RESET_LEGACY_PAGE
  }
}

export const ManageDiffculty = (type, exerciseId, date) => (dispatch, getState) => {
  const state = getState();
  const userData = state.login;
  const legacyPage = state.legacyCourse;
  const allProgressions = _.cloneDeep(legacyPage.allProgressions);
  const isBuildYourOwn = state.legacyCourse.isBuildYourOwn;

  let selectedProgessions = _.cloneDeep(legacyPage.selectedProgessions);

  let config;
  if (isBuildYourOwn) {
    config = {
      method: 'put',
      url: `${API}/byo/settings/users/${userData.UserId}/difficulty/${type}/?workoutType=${legacyPage.courseId}&exerciseId=${exerciseId}&date=${legacyPage.byoDate}`,
      headers: {
        'Authorization': `Bearer ${userData.webToken}`
      }
    };
  }
  else {
    console.log("in LegacyAction/ManageDiffculty")
    config = {
      method: 'put',
      url: `${API}/workout-service/users/${userData.UserId}/difficulty/${type}/?workoutType=${legacyPage.name}&exerciseId=${exerciseId}&date=${date}`,
      headers: {
        'Authorization': `Bearer ${userData.webToken}`
      }
    };
  }
  Axios(config)
    .then(function (response) {
      let res = response.data.body;
      let LevelKeys = Object.keys(res);
      let updatedProgression = {};


      LevelKeys.forEach(lvlKey => {
        const section = res[lvlKey];

        let sectionKeys = Object.keys(section);

        sectionKeys.forEach(sctKey => {
          if (res[lvlKey][sctKey][0]) {
            if (isBuildYourOwn) {
              updatedProgression = { ...res[lvlKey][sctKey][0], section: sctKey, levelKey: lvlKey };
            }
            else {
              let foundIndex = allProgressions[lvlKey][sctKey].findIndex(item => res[lvlKey][sctKey][0].exerciseId === item.exerciseId);
              updatedProgression = { ...res[lvlKey][sctKey][0], section: sctKey, levelKey: lvlKey, index: foundIndex };
              allProgressions[lvlKey][sctKey][foundIndex] = updatedProgression;
            }
          }
        })
      })

      let selectedIndex = selectedProgessions.findIndex(item => updatedProgression.exerciseId === item.exerciseId);
      selectedProgessions[selectedIndex] = updatedProgression;

      // selectedProgessions = orderProgressionArray(selectedProgessions);

      dispatch({
        type: UPDATE_PROGRESSIONS,
        selectedProgression: selectedProgessions,
        allProgressions: allProgressions,
      })

      dispatch(showToast(response.data.message, 'success'))
    })
    .catch(function (error) {
      dispatch(showToast('Something went wrong.', 'error'))
      Sentry.captureException(error);
    });
}

export const handleNotes = (notes, progressionId, masterySteps, date, sectionKey, levelKey) => (dispatch, getState) => {
  const state = getState();
  const userData = state.login;
  const legacyPage = state.legacyCourse;
  const allProgressions = _.cloneDeep(legacyPage.allProgressions);
  const isBuildYourOwn = state.legacyCourse.isBuildYourOwn;
  const selectedProgessions = _.cloneDeep(legacyPage.selectedProgessions);

  let config;
  let body = {
    userId: userData.UserId,
    date: date,
    exerciseId: progressionId,
    notes: notes,
    masterySets: {
      masterySetId: masterySteps.masterySetId,
      sets: masterySteps.sets,
      repsOrSecs: masterySteps.repsOrSecs
    },
    setsAndRepsDTOList: []
  }

  if (isBuildYourOwn) {
    config = AxiosConfig('PUT', `/byo/log/notes/users/${userData.UserId}?workoutType=${legacyPage.courseId}`, userData.webToken, { data: body })
  }
  else {
    config = AxiosConfig('POST', `/program-log/notes/users/${userData.UserId}`, userData.webToken, { data: body })
  }

  Axios(config)
    .then(res => {
      if (!isBuildYourOwn) {
        let foundIndex = allProgressions[levelKey][sectionKey].findIndex(item => progressionId === item.exerciseId);
        allProgressions[levelKey][sectionKey][foundIndex].notes = notes;
      }

      let selectedIndex = selectedProgessions.findIndex(item => progressionId === item.exerciseId);
      selectedProgessions[selectedIndex].notes = notes;

      dispatch({
        type: UPDATE_PROGRESSIONS,
        selectedProgression: selectedProgessions,
        allProgressions: allProgressions,
      })
      dispatch(showToast('Your notes have been saved.', 'success'))
    })
    .catch(err => {
      dispatch(showToast('Something went wrong.', 'error'))
      Sentry.captureException(err);
    })
}

export const handleLegacyLog = (date, exerciseId, mobilityStatus, autoProg, steps, logList) => (dispatch, getState) => {
  const state = getState();
  const userData = state.login;
  const legacyPage = state.legacyCourse;
  const allProgressions = _.cloneDeep(legacyPage.allProgressions);
  const isBuildYourOwn = legacyPage.isBuildYourOwn ? legacyPage.isBuildYourOwn : false;
  let selectedProgessions = _.cloneDeep(legacyPage.selectedProgessions);

  if (isBuildYourOwn) {
    let body = {
      userId: userData.UserId,
      date: date,
      exerciseId: exerciseId,
      imStatus: mobilityStatus,
      autoProgress: autoProg,
      notes: null,
      masterySets: steps,
      setsAndRepsDTOList: logList
    }
    Axios(AxiosConfig('post', `/byo/log/program/users/${userData.UserId}?workoutType=${legacyPage.courseId}`, userData.webToken, { data: body }))
      .then(res => {
        dispatch(handleLegacyLogCheck());
        dispatch(getLegacyDataBYO(legacyPage.name, legacyPage.dateIndex));
      }
      ).catch(err => {
        Sentry.captureException(err);
      })
  }
  else {
    let config = {
      method: 'post',
      url: `${API}/workout-service/programs/users/${userData.UserId}/logging?workoutType=${legacyPage.name}`,
      headers: {
        'Authorization': `Bearer ${userData.webToken}`
      },
      data: {
        userId: userData.UserId,
        date: date,
        exerciseId: exerciseId,
        imStatus: mobilityStatus,
        autoprogress: autoProg,
        notes: '',
        masterySets: steps,
        setsAndRepsDTOList: logList
      }
    };

    Axios(config)
      .then(response => {
        let res = response.data.body;
        let LevelKeys = Object.keys(res);
        let updatedProgression = {};

        // NOTE: Bellow code is built to account for most progression logging that stays within the same level. Loggiging A1-A6, B1-b6, C1-C6 (level one of core).
        // if user loggs the final progression and stays in the same step this code will fire off. If not then see next block.\
        // This block also takes into account moving from step to step within a level, A1->A2. Object return will at most be 2 within the level section. Meaning Level 1
        // section A will have either one object or two. If one then staying on the same progression. If 2 then moving up a progression A1->A2.
        if (LevelKeys.length === 1) {
          LevelKeys.forEach(lvlKey => {
            const section = res[lvlKey];
            let sectionKeys = Object.keys(section);

            sectionKeys.forEach(sctKey => {
              if (res[lvlKey][sctKey].length === 1) {
                let foundIndex = allProgressions[lvlKey][sctKey].findIndex(item => res[lvlKey][sctKey][0].exerciseId === item.exerciseId);
                updatedProgression = { ...res[lvlKey][sctKey][0], section: sctKey, levelKey: lvlKey, index: foundIndex };
                allProgressions[lvlKey][sctKey][foundIndex] = updatedProgression;

                // In the event there are no progressions after 100% completion of final progression. Meaning A6 logged 100% but nothing comes after that the this will fire off.
                if (!updatedProgression.selected) {
                  selectedProgessions = selectedProgessions.filter(item => item.exerciseId !== updatedProgression.exerciseId);
                }
                else {
                  let selectedIndex = selectedProgessions.findIndex(item => updatedProgression.exerciseId === item.exerciseId);
                  selectedProgessions[selectedIndex] = updatedProgression;
                }

              }

              if (res[lvlKey][sctKey].length === 2) {
                let foundIndexOrignal = allProgressions[lvlKey][sctKey].findIndex(item => res[lvlKey][sctKey][0].exerciseId === item.exerciseId);
                let foundIndexNew = allProgressions[lvlKey][sctKey].findIndex(item => res[lvlKey][sctKey][1].exerciseId === item.exerciseId);

                let updatedProgressionOrignal = {
                  ...res[lvlKey][sctKey][0],
                  section: sctKey,
                  levelKey: lvlKey,
                  index: foundIndexOrignal
                };

                let updatedProgressionNew = {
                  ...res[lvlKey][sctKey][1],
                  section: sctKey,
                  levelKey: lvlKey,
                  index: foundIndexOrignal
                };

                allProgressions[lvlKey][sctKey][foundIndexOrignal] = updatedProgressionOrignal;
                allProgressions[lvlKey][sctKey][foundIndexNew] = updatedProgressionNew;

                let selectedIndex = selectedProgessions.findIndex(item => updatedProgressionOrignal.exerciseId === item.exerciseId);
                selectedProgessions[selectedIndex] = updatedProgressionNew;
              }
            });
          });
        }
        // Note: Block from moving level level. A6(level one) -> A7 (level two). See AWS doc for all scenarios and explanations.

        if (LevelKeys.length === 2) {
          const oldLevel = LevelKeys[0];
          const newLevel = LevelKeys[1];

          const oldLvlSection = Object.keys(res[oldLevel])[0];
          const newLvlSection = Object.keys(res[newLevel])[0];

          let oldIndexInAll = allProgressions[oldLevel][oldLvlSection].findIndex(item => res[oldLevel][oldLvlSection][0].exerciseId === item.exerciseId);
          let newIndexInAll = allProgressions[newLevel][newLvlSection].findIndex(item => res[newLevel][newLvlSection][0].exerciseId === item.exerciseId);

          allProgressions[oldLevel][oldLvlSection][oldIndexInAll] = { ...res[oldLevel][oldLvlSection][0], section: oldLvlSection, levelKey: oldLevel, index: oldIndexInAll };
          allProgressions[newLevel][newLvlSection][newIndexInAll] = { ...res[newLevel][newLvlSection][0], section: newLvlSection, levelKey: newLevel, index: newIndexInAll };

          let selectedIndexOld = selectedProgessions.findIndex(item => allProgressions[oldLevel][oldLvlSection][oldIndexInAll].exerciseId === item.exerciseId);
          selectedProgessions[selectedIndexOld] = allProgressions[newLevel][newLvlSection][newIndexInAll];

        }

        // selectedProgessions = orderProgressionArray(selectedProgessions);

        dispatch({
          type: UPDATE_PROGRESSIONS,
          selectedProgression: selectedProgessions,
          allProgressions: allProgressions,
        })

        dispatch(showToast(response.data.message, 'success'))

        dispatch(getUpdatedUserSchedule());
      }).catch(err => {
        dispatch(showToast('Something went wrong.', 'error'))
        Sentry.captureException(err);
      })
  }
}

export const handleDeleteProgression = (exerciseId, isLevels = false, masterySet, date) => (dispatch, getState) => {
  const state = getState();
  const postAWS = state.login.postAWS
  const userData = state.login;
  const legacyPage = state.legacyCourse;
  const allProgressions = _.cloneDeep(legacyPage.allProgressions);
  let selectedProgessions = _.cloneDeep(legacyPage.selectedProgessions);
  const isBuildYourOwn = state.legacyCourse.isBuildYourOwn;

  let config;
  let purpose = "Delete"
  if (postAWS) {

    dispatch(handleProgression(exerciseId, masterySet, date, isLevels, purpose))
    dispatch(showToast('Successfully updated ' + legacyPage.name, 'success'))

  } else {
    if (isBuildYourOwn) {
      config = AxiosConfig(
        'DELETE',
        `/byo/settings/users/${userData.UserId}/exercises/${exerciseId}?workoutType=${legacyPage.courseId}`,
        userData.webToken
      )
    }
    else {
      config = AxiosConfig(
        'DELETE',
        `/workout-service/users/${userData.UserId}/exercises/${exerciseId}?workoutType=${legacyPage.name}`,
        userData.webToken
      )
    }
    Axios(config)
      .then(response => {
        if (isLevels) {
          dispatch(getLevelPLan());
          dispatch(GetUserPorgressions(legacyPage.name, legacyPage.date))
        }
        else if (isBuildYourOwn) {
          dispatch(getLegacyDataBYO(legacyPage.name, legacyPage.dateIndex));
          dispatch(openEditLegacyModalBYO());
          dispatch(handleLegacyLogCheck());
        }
        else {
          let res = response.data.body;
          let LevelKeys = Object.keys(res);
          let updatedProgression = {};

          LevelKeys.forEach(lvlKey => {
            const section = res[lvlKey];

            let sectionKeys = Object.keys(section);

            sectionKeys.forEach(sctKey => {
              if (res[lvlKey][sctKey][0]) {
                let foundIndex = allProgressions[lvlKey][sctKey].findIndex(item => res[lvlKey][sctKey][0].exerciseId === item.exerciseId);
                updatedProgression = { ...res[lvlKey][sctKey][0], section: sctKey, levelKey: lvlKey, index: foundIndex };
                allProgressions[lvlKey][sctKey][foundIndex] = updatedProgression;
              }
            })
          })

          selectedProgessions = selectedProgessions.filter(item => updatedProgression.exerciseId !== item.exerciseId);

          dispatch({
            type: UPDATE_PROGRESSIONS,
            selectedProgression: selectedProgessions,
            allProgressions: allProgressions,
          })
          dispatch(getUpdatedUserSchedule());
        }
        dispatch(showToast('Removed progression.', 'success'))
      }).catch(err => {
        dispatch(showToast('Something went wrong.', 'error'))
        Sentry.captureException(err);
      })
  }
}

export const handleAddProgression = (exerciseId, masterySetId, date, isLevels = false, progression, masterySet) => (dispatch, getState) => {
  console.log("export const handleAddProgression = (exerciseId, masterySetId, date, isLevels = false) => (dispatch, getState) => {")
  const state = getState();
  let data = state.data.allData
  let dateKey = new Date(date);
  dateKey = dateKey.toLocaleString('en-US', {
    weekday: 'long',
    month: 'long',
    day: '2-digit',
  });
  let newData = data ? _.cloneDeep(data) : {};

  const postAWS = state.login.postAWS
  const userData = state.login;
  const { userSchedule } = state.levels;
  let UserId = userData?.UserId
  const legacyPage = state.legacyCourse;
  const isBuildYourOwn = state.legacyCourse.isBuildYourOwn;
  console.log("date:", date)
  let config;
  let purpose = "Add"
  //all data: legacyPage?.allProgressions
  if (postAWS) {

    dispatch(handleProgression(exerciseId, masterySet, date, isLevels, purpose))

    /*let allOrderedData = state.legacyCourse.allProgressions
    let levelClicked, typeClicked
    let userChosenProgressions = _.cloneDeep(allOrderedData);

    for (const level in allOrderedData) {
      for (const type in allOrderedData[level]) {
        //to update the selected at that index for the clicked program

        const exerciseIndex = allOrderedData[level][type].findIndex((exercise) => exercise.exerciseId === exerciseId);
        console.log("exerciseIndex,", exerciseIndex)
        if (exerciseIndex !== -1) {//FOUND MATCHING EXERCISEiD
          allOrderedData[level][type][exerciseIndex].selected = true;
        }
        const exercise = allOrderedData[level][type].find((exercise) => exercise.exerciseId === exerciseId);
        if (exercise) {
          levelClicked = level
          typeClicked = type
          // console.log(`Level: ${level}, Type: ${type}`);
          // Level: LEVEL 1, Type: Hollow Back Press
          break;
        }
      }
    }
    console.log("allOrderedData:", allOrderedData)
    console.log("dateKey:", dateKey)

    const exerciseClicked = allOrderedData[levelClicked][typeClicked].find((exercise) => exercise.exerciseId === exerciseId);

    for (const key in exerciseClicked.workoutInfo) {
      console.log("key:", key)

      if (key == "Strength") {
        exerciseClicked.workoutInfo[key].setsAndReps = `${masterySet?.sets}x${masterySet?.repsOrSecs}`
      }
      if (key == "Mobility") {
        exerciseClicked.workoutInfo[key].setsAndReps = `${masterySet?.sets}x10s`
      }
      console.log("masterySet?.step:", masterySet?.step)
      exerciseClicked.stepNo = masterySet?.step
    }

    let exerciseGroup = exerciseClicked.group
    let courseName = exerciseGroup.includes("Core") ? "Core" : exerciseGroup.includes("Upper Body") ? "Upper Body" : "Lower Body"
    let programId = exerciseGroup.includes("Core") ? "59207" : exerciseGroup.includes("Upper Body") ? "59219" : "59213"

    let allOrderedDataCopy = _.cloneDeep(allOrderedData);
    let progressionsData = {
      progressions: allOrderedDataCopy,
      courseName: courseName
    }

    // dispatch({
    //   type: actionTypes.SET_ALL_PROGRAMSDATA,
    //   progressions: { progressionData: test, courseName: courseName }
    // })


    console.log("exerciseClicked:", exerciseClicked)
    console.log("programId:", programId)
    console.log("levelClicked:", levelClicked)
    console.log("typeClicked:", typeClicked)

    exerciseClicked.selected = true

    // update original data here
    newData[dateKey].forEach(item => {
      if (item?.type == "Program" && item?.classId == programId) {
        console.log("Program item is:", item)
        console.log("item.workout Level 1??", item.workout)
        const levelKey = Object.keys(item.workout).find(key => key.includes("LEVEL 1"));
        console.log("levelKey:", levelKey)
        if (levelKey) {
          const levelValue = item.workout[levelKey];
          console.log("levelValue:", levelValue)
        }
        console.log("item.workout LEVEL1", item.workout[" LEVEL 1"])
        console.log("item.workout LEVEL2", item.workout["LEVEL 2"])
        console.log("item.workout LEVEL3", item.workout["LEVEL 3"])
        console.log("item.workout LEVEL4", item.workout["LEVEL 4"])
        // console.log("item.workout[levelClicked]:", item.workout[levelClicked])
        // console.log("levelClicked:", levelClicked, "\ntypeClicked:", typeClicked)
        console.log("item.workout[levelClicked][typeClicked]:", item.workout[levelClicked][typeClicked])
        // console.log("userChosenProgressions[levelClicked]", userChosenProgressions[levelClicked])
        // console.log("exerciseClicked:", exerciseClicked)
        if (!item.workout[levelClicked][typeClicked]) {
          item.workout[levelClicked][typeClicked] = [];
        }
        item.workout[levelClicked][typeClicked].push(exerciseClicked);

      }
    })
    console.log("newData later:", newData)//all the days data



    let LevelKeys = Object.keys(allOrderedData);

    let newArray = [];
    let index = 0;
    LevelKeys.forEach(lvlKey => {

      const section = allOrderedData[lvlKey];

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
    // newArray.push(exerciseClicked)
    console.log("newArray else:", newArray)//only program data

    // update userSchedule data here
    let programData
    console.log("userSchedule top:", userSchedule)
    userSchedule[dateKey].map((schedule) => {

      if (schedule.type != "Class") {
        schedule.chosenProgs = newArray
        // programData = userSchedule[dateKey].filter(newData => newData.type === "Program");
      }

    })

    console.log("userSchedule later:", userSchedule)
    console.log("newData[dateKey] later:", newData[dateKey])

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
      updatedData: newData[dateKey],
      progressions: progressionsData
    }
    localStorage.setItem('progressions', JSON.stringify(progressionsData.progressions))//store in localstorage and db
    Axios.post(NEWAPI + '/api/user/log', dataToPost, config)
      .then(res => {
        if (isLevels) {
          dispatch(getLevelPlanNew())
          dispatch(GetUserPorgressions(legacyPage.name, date, exerciseId))
        } else {
          dispatch(getUpdatedUserSchedule());
          dispatch(GetUserPorgressions(legacyPage.name, date))
        }

      }).catch(error => {
        Sentry.captureException(error);
      });*/

    dispatch(showToast('Successfully updated ' + legacyPage.name, 'success'))
  } else {
    if (isBuildYourOwn) {
      config = AxiosConfig(
        'PUT',
        `/byo/settings/users/${userData.UserId}/exercises/${exerciseId}/masterySets/${masterySetId}?workoutType=${legacyPage.courseId}&date=${legacyPage.byoDate}`,
        userData.webToken
      )
    }
    else {
      config = AxiosConfig(
        'PUT',
        `/workout-service/users/${userData.UserId}/exercises/${exerciseId}/masterySets/${masterySetId}?workoutType=${legacyPage.name}&date=${date}`,
        userData.webToken
      )
    }
    Axios(config)
      .then(res => {
        // console.log("res is:", res)
        // console.log("isLevels:", isLevels)
        // console.log("isBuildYourOwn:", isBuildYourOwn)
        // console.log("legacyPage.name:", legacyPage.name)
        // console.log("state.legacyCourse.allProgressions before:", state.legacyCourse.allProgressions)
        if (isLevels) {
          dispatch(getLevelPLan())
          dispatch(GetUserPorgressions(legacyPage.name, date))
        }
        else if (isBuildYourOwn) {
          dispatch(getLegacyDataBYO(legacyPage.name, legacyPage.dateIndex));
          dispatch(openEditLegacyModalBYO());
          dispatch(handleLegacyLogCheck());
        }
        else {
          dispatch(getUpdatedUserSchedule());
          dispatch(GetUserPorgressions(legacyPage.name, date))
        }
        dispatch(showToast('Successfully updated ' + legacyPage.name, 'success'))
      }).catch(err => {
        dispatch(showToast('Something went wrong.', 'error'))
        Sentry.captureException(err)
      })
  }

}

export const getUpdatedUserSchedule = () => (dispatch, getState) => {
  const state = getState();
  const userData = state.login;

  let config = {
    method: 'GET',
    url: `${API}/myschedule/detailed-view/users/${userData.UserId}`,
    headers: {
      'Authorization': `Bearer ${userData.webToken}`
    }
  };

  Axios(config)
    .then(res => {
      dispatch(SetCaladner(res.data))
    }).catch(err => Sentry.captureException(err))
}

export const CloseModal = () => {
  return {
    type: CLOSE_EDIT_MODAL,
    payload: {
      showEditModal: false,
      allProgressions: {},
    }
  }
}

export const handleProgression = (exerciseId, masterySet, date, isLevels, purpose) => (dispatch, getState) => {//PC
  let dateKey = new Date(date);
  dateKey = dateKey.toLocaleString('en-US', {
    weekday: 'long',
    month: 'long',
    day: '2-digit',
  });
  console.log("purpose:", purpose)
  const state = getState();
  const { userSchedule } = state.levels;
  const userData = state.login;
  let UserId = userData?.UserId
  const legacyPage = state.legacyCourse;
  let data = state.data.allData
  let newData = data ? _.cloneDeep(data) : {};

  let allOrderedData = state.legacyCourse.allProgressions
  let levelClicked, typeClicked
  let userChosenProgressions = _.cloneDeep(allOrderedData);
  let progressionsData
  for (const level in allOrderedData) {
    for (const type in allOrderedData[level]) {
      //to update the selected at that index for the clicked program

      const exerciseIndex = allOrderedData[level][type].findIndex((exercise) => exercise.exerciseId === exerciseId);
      // console.log("exerciseIndex,", exerciseIndex)
      if (exerciseIndex !== -1) {//FOUND MATCHING EXERCISEiD
        if (purpose == "Add") {
          allOrderedData[level][type][exerciseIndex].selected = true;
        } else {
          allOrderedData[level][type][exerciseIndex].selected = false;
        }

      }
      const exercise = allOrderedData[level][type].find((exercise) => exercise.exerciseId === exerciseId);
      if (exercise) {
        levelClicked = level
        typeClicked = type
        // console.log(`Level: ${level}, Type: ${type}`);
        // Level: LEVEL 1, Type: Hollow Back Press
        break;
      }
    }
  }
  const exerciseClicked = allOrderedData[levelClicked][typeClicked].find((exercise) => exercise.exerciseId === exerciseId);
  let exerciseGroup = exerciseClicked.group
  let courseName = exerciseGroup.includes("Core") ? "Core" : exerciseGroup.includes("Upper Body") ? "Upper Body" : "Lower Body"
  let programId = exerciseGroup.includes("Core") ? "59207" : exerciseGroup.includes("Upper Body") ? "59219" : "59213"
  console.log("exerciseClicked Delete:", exerciseClicked)
  if (purpose == "Add") {
    for (const key in exerciseClicked.workoutInfo) {
      console.log("key:", key)

      if (key == "Strength") {
        exerciseClicked.workoutInfo[key].setsAndReps = `${masterySet?.sets}x${masterySet?.repsOrSecs}`
      }
      if (key == "Mobility") {
        exerciseClicked.workoutInfo[key].setsAndReps = `${masterySet?.sets}x10s`
      }
      console.log("masterySet?.step:", masterySet?.step)
      exerciseClicked.stepNo = masterySet?.step
      // exerciseClicked.selected = true
    }

    console.log("allOrderedData Add:", allOrderedData)

    // update original data here
    newData[dateKey].forEach(item => {
      if (item?.type == "Program" && item?.classId == programId) {

        if (!item.workout[levelClicked][typeClicked]) {
          item.workout[levelClicked][typeClicked] = [];
        }
        item.workout[levelClicked][typeClicked].push(exerciseClicked);

      }
    })
  } else {
    //delete the clicked exercise from allOrderedData
    //doesn't add to new Array which is an array of objects where programs has selected true as value
    //delete the exercise that was clicked from 
    console.log("allOrderedData Delete:", allOrderedData)

  }

  let allOrderedDataCopy = _.cloneDeep(allOrderedData);
  progressionsData = {
    progressions: allOrderedDataCopy,
    courseName: courseName
  }

  let LevelKeys = Object.keys(allOrderedData);
  let newArray = [];
  let index = 0;

  LevelKeys.forEach(lvlKey => {

    const section = allOrderedData[lvlKey];

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

  console.log("newArray:", newArray)
  userSchedule[dateKey].map((schedule) => {

    if (schedule.type != "Class") {
      schedule.chosenProgs = newArray
      // programData = userSchedule[dateKey].filter(newData => newData.type === "Program");
    }

  })
  console.log("userSchedule:", userSchedule)
  dispatch({
    type: actionTypes.GET_WORKOUT,
    payload: {
      userSchedule: userSchedule
    }
  })
  /* create a exportted function for the following */
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  let dataToPost = {
    userId: UserId,
    userScheduleDate: dateKey,
    updatedData: newData[dateKey],
    progressions: progressionsData
  }

  localStorage.setItem('progressions', JSON.stringify(progressionsData.progressions))//store in localstorage and db

  Axios.post(NEWAPI + '/api/user/log', dataToPost, config)
    .then(res => {
      if (isLevels) {
        dispatch(getLevelPlanNew())
        dispatch(GetUserPorgressions(legacyPage.name, date, exerciseId))
      } else {
        dispatch(getUpdatedUserSchedule());
        dispatch(GetUserPorgressions(legacyPage.name, date))
      }

    }).catch(error => {
      Sentry.captureException(error);
    });

}