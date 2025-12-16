import axios from 'axios'

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

const API = process.env.REACT_APP_API;

const legacyNameToId = {
  'Core': 59207,
  'Upper Body': 59219,
  'Lower Body': 59213,
  'Handstand': 59225,
  'Movement': 59228,
  'Rings': 60099
}

export const OpenModal = (exerciseId) => (dispatch, getState) => {
  const state = getState();
  const userData = state.login;
  const workoutType = state.legacyCourse.name;
  const isBuildYourOwn = state.legacyCourse.isBuildYourOwn;
  const workoutName = state.legacyCourse.name;
  let config;

  if (isBuildYourOwn) {
    config = {
      method: 'get',
      url: `${API}/byo/settings/videos/exercise/${exerciseId}/users/${userData.UserId}?workoutType=${legacyNameToId[workoutName]}`,
      headers: {
        'Authorization': `Bearer ${userData.webToken}`
      }
    };
  }
  else {
    config = {
      method: 'get',
      url: `${API}/workout-service/videos/exercise/${exerciseId}/users/${userData.UserId}?workoutType=${workoutType}`,
      headers: {
        'Authorization': `Bearer ${userData.webToken}`
      }
    };
  }


  axios(config).then(res =>  dispatch({ type: OPEN_MODAL, data: res.data.body}) )

}

export const CloseModal = () => {
  return {
    type: CLOSE_MODAL,
  }
}
