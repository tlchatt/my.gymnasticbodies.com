import Axios from 'axios'
import _ from "lodash"

import { SetCaladner, showToast } from './calendarActions';
import { getLevelPLan } from './LevelsActions';
import * as Sentry from "@sentry/react";
import { AxiosConfig } from '../util'

import { getLegacyDataBYO, openEditLegacyModalBYO, handleLegacyLogCheck} from './WorkoutBuilderActions'


export const SET_PROGRESSION = 'SET_PROGRESSION';
export const UPDATE_PROGRESSIONS = 'UPDATE_PROGRESSIONS'
export const RESET_LEGACY_PAGE = 'RESET_LEGACY_PAGE';
export const CLOSE_EDIT_MODAL = 'CLOSE_EDIT_MODAL';

const API = process.env.REACT_APP_API;


export const GetUserPorgressions = (courseName, todaysDate) => async (dispatch, getState) => {
  const state = getState();
  const userData = state.login;

  let config= {
    method: 'get',
    url: `${API}/workout-service/programs/users/${userData.UserId}/date/${todaysDate}?workoutType=${courseName}`,
    headers: {
      'Authorization': `Bearer ${userData.webToken}`
    }
  };


  Axios(config)
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
        type: SET_PROGRESSION,
        selectedProgression: newArray,
        allProgressions: orderedData,
        loading: false,
        name: courseName
      })
    })
    .catch(function (error) {
      Sentry.captureException(error);
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
    Axios(AxiosConfig('post', `/byo/log/program/users/${userData.UserId}?workoutType=${legacyPage.courseId}`, userData.webToken, {data: body}))
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

export const handleDeleteProgression = (exerciseId, isLevels = false) => (dispatch, getState) => {
  const state = getState();
  const userData = state.login;
  const legacyPage = state.legacyCourse;
  const allProgressions = _.cloneDeep(legacyPage.allProgressions);
  let selectedProgessions = _.cloneDeep(legacyPage.selectedProgessions);
  const isBuildYourOwn = state.legacyCourse.isBuildYourOwn;

  let config;

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

export const handleAddProgression = (exerciseId, masterySetId, date, isLevels = false) => (dispatch, getState) => {
  const state = getState();
  const userData = state.login;
  const legacyPage = state.legacyCourse;
  const isBuildYourOwn = state.legacyCourse.isBuildYourOwn;

  let config;

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

export const getUpdatedUserSchedule = () => (dispatch, getState) => {
  const state = getState();
  const userData = state.login;

  let config= {
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

