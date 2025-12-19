import * as actionTypes from './actionTypes'
import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as Sentry from "@sentry/react";
import moment from 'moment-timezone'

// import { SetCaladner } from './calendarActions';
// import { SetAllClassesInitial } from './actionsSetAllClasses';
// import { SetAllSubClassesInitial } from './actionsSetAllSubClasses';
import LogRocket from 'logrocket';

import { showToast } from './calendarActions'
import { AxiosConfig } from '../util'

const API = process.env.REACT_APP_API;
const NEWAPI = process.env.REACT_APP_API_NEW

const LoginStart = () => {
  return {
    type: actionTypes.LOGN_START
  }
}
// TODO: Once back end is done this will need to be used
const StartFailLogin = () => {
  return {
    type: actionTypes.LOGIN_FAIL
  }
}

const clearLoginFail = () => {
  return {
    type: actionTypes.LOGIN_FAIL_CLEAR
  }
}

export const setNewAuthToken = (token) => {
  return {
    type: actionTypes.SET_NEW_AUTH,
    webToken: token
  }
}

export const checkWelcomeService = (userData) => {
  return {
    type: actionTypes.CHECK_WELCOME_SERVICE,
    payload: userData
  }
}

export const loginFail = () => dispatch => {
  dispatch(StartFailLogin())
  dispatch(Logout());
  dispatch(showToast('Something went wrong please try again.', 'error'))
  setTimeout(() => {
    dispatch(clearLoginFail());
  }, 2500)
}

export const fourceLogoutFail = () => dispatch => {
  dispatch(StartFailLogin())
  dispatch(Logout());
  dispatch(showToast('You have been logged out for your security.', 'success'))
  setTimeout(() => {
    dispatch(clearLoginFail());
  }, 2500)
}

const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    // console.log('Setting Auto Loggout', expirationTime)
    setTimeout(() => {
      dispatch(Logout());
      dispatch(showToast('You have been logged out for your security.', 'success'))
    }, expirationTime);
  };
};



const LoginAsync = (webToken, data, userState, timezone) => {
  /*
    if (process.env.REACT_APP_TESTING === 'true') {
      LogRocket.identify(data.cid, {
        name: `${data.fname} ${data.lname}`,
        email: data.sub,
      });
    }
    if (process.env.REACT_APP_IS_PRODUCTION === 'production') {
      Sentry.setUser({
        name: `${data.fname} ${data.lname}`,
        email: data.sub,
        userId: data.cid,
      });
    }
  */

  console.log('LoginAsync webToken timezone', webToken, timezone)

  let lukeState = {
    //"fname": "Luke",
    // "lname": "",
    // "contactId": 411847,
    // "emailId": "lukesearra@icloud.com",
    // "isAllAccessUser": true,
    //"isThriveUser": true,
    //  "isAdmin": false,
    // "playerScript": "?exp=1764614684895&sig=767de1c799f2130f3515fe5a0e55da12",
    /*
    "guidedPlanAccessLevels": [
      0,
      1,
      2,
      3,
      4
    ],*/
    "userLevel": "White Board",
    "userLevel": "Intermediate Two",
    "levelId": 2
    //"levelId": 9,
    // "userLevel": "Beginner",
    // "levelId": 0,
    //  "showAllAccessSite": true,
    //"isFreeMember": false
  }
  let lukeData = {
    //"fname": "Luke", // Name on top left
    //  "sub": "lukesearra@icloud.com",
    // "lname": "",
    //"tz": "America/Toronto",
    "tagids": [
      102,
      122,
      224,
      226,
      228,
      330,
      446,
      612,
      616,
      620,
      632,
      698,
      788,
      1036,
      1301
    ],
    // "exp": 1764701081,
    //"iat": 1764614681,
    //"cid": 411847
  }
  console.log('LoginAsync userState', userState)
  //console.log('LoginAsync lukeState', lukeState)


  console.log('LoginAsync userData', data)
  //console.log('LoginAsync lukeData', lukeData)
  // userState.userLevel = lukeState.userLevel
  //userState.contactId = lukeState.contactId
  // data.cid = lukeData.cid
  // data = { ...data, ...lukeData }
  //userState = { ...userState, ...lukeState }

  return {
    type: actionTypes.LOGIN_SUCESS,
    webToken: webToken,
    userData: data,
    userState,
    timezone
  }
}

export const LoginNew = (username, password) => dispatch => {
  dispatch(LoginStart());
  console.log("LoginNew NEWAPI", NEWAPI)

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  // axios.post(API + '/auth', { username, password, timezone: moment.tz.guess() }, config)
  axios.post(NEWAPI + '/api/authentication', { username, password, timezone: moment.tz.guess() }, config)
    .then(res => {
      let resGoal = {//auth Luke
        "jwtAuthorizationToken": "eyJhbGciOiJIUzUxMiJ9.eyJmbmFtZSI6Ikx1a2UiLCJzdWIiOiJsdWtlc2VhcnJhQGljbG91ZC5jb20iLCJsbmFtZSI6IiIsInR6IjoiQW1lcmljYS9Ub3JvbnRvIiwidGFnaWRzIjpbMTAyLDEyMiwyMjQsMjI2LDIyOCwzMzAsNDQ2LDYxMiw2MTYsNjIwLDYzMiw2OTgsNzg4LDEwMzYsMTMwMV0sImV4cCI6MTc2NTkxMjAxNiwiaWF0IjoxNzY1ODI1NjE2LCJjaWQiOjQxMTg0N30.JLW9ezWmdkQX71VFGT2WOw5Eu1ucx1YSn6ePiRy84oTUhIpdVLJ27d37fBwtBZeKaHyR5LHOvcb7MEqPRDGoNw",
        "jwtRefreshToken": "eyJhbGciOiJIUzUxMiJ9.eyJhbGxhY2Nlc3MiOnRydWUsInN1YiI6Imx1a2VzZWFycmFAaWNsb3VkLmNvbSIsInR6IjoiQW1lcmljYS9Ub3JvbnRvIiwiZnJlZW1lbSI6dHJ1ZSwidHlwZSI6InJlZnJlc2giLCJleHAiOjE3ODEzNzc2MTYsInNwIjp0cnVlLCJpYXQiOjE3NjU4MjU2MTYsImNpZCI6NDExODQ3fQ.Lpdq06b0wowjiV4WeYV9s0TCgtrPMGYn7hRgbxQKil4oh_P2MxSDk80hchDJEaUo6bUNQaVY928u-ntNeUcapQ",
        "timezone": "America/Toronto",
        "isAllAccessUser": true,
        "isFreeMember": true,
        "hasCourseProduct": true
      }
      console.log("res.data '/api/authentication'", res.data)
      const authToken = res.data.token;
      const refreshToken = res.data.token;
      const decoded = jwt.decode(authToken);
      console.log('decoded', decoded)
      let decodedGoal = {
        "fname": "Gregg Wiley",
        "sub": username,
        "lname": "",
        "tz": moment.tz.guess(),
        "tagids": [
          102,
          122,
          224,
          226,
          228,
          330,
          446,
          612,
          616,
          620,
          632,
          698,
          788,
          1036,
          1301
        ],
        "exp": 1765920038,
        "iat": 1765833638,
        "cid": 411847
      }
      decodedGoal.cid = res.data.user.id
      decodedGoal.postAWS = true
      const expirationDate = new Date(new Date().getTime() + 60 * 60 * 24 * 7);
      const refreshExpireTime = new Date(new Date().getTime() + 60 * 60 * 24 * 7);

      const timezone = moment.tz.guess();

      localStorage.setItem('authToken', authToken);
      localStorage.setItem('AuthExpirationDate', expirationDate);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('refreshExpireTime', refreshExpireTime);
      localStorage.setItem('timezone', timezone);

      let userConfig = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${authToken}`
        }
      }
      let freeMember = (res.data.isFreeMember && (!res.data.isAllAccessUser && !res.data.hasCourseProduct))


      console.log('login else')
      let resGoal2 = { ///welcome/v1/users luke
        "fname": "Gregg Wiley",
        "lname": "",
        "contactId": 411847,
        "emailId": moment.tz.guess(),
        "isAllAccessUser": true,
        "isThriveUser": true,
        "isAdmin": false,
        "playerScript": "?exp=1765831927306&sig=2a54c1144b98adaf46b0fc66a0b5a5a5",
        "guidedPlanAccessLevels": [
          0,
          1,
          2,
          3,
          4
        ],
        "userLevel": "Advanced One",
        "levelId": 3
      }
      resGoal2.postAWS = true
      dispatch(
        LoginAsync(
          authToken,
          decodedGoal,
          {
            ...resGoal2,
            showAllAccessSite: true,
            isFreeMember: freeMember
          },
          timezone)
      )

    })
    .catch(err => {
      dispatch(loginFail())
      Sentry.captureException(err);
    });
}
export const authCheckState = () => dispatch => {
  const authToken = localStorage.getItem('authToken');
  const refreshToken = localStorage.getItem('refreshToken');

  const refreshExpireTime = localStorage.getItem('refreshExpireTime');
  const authExpireTime = localStorage.getItem('AuthExpirationDate');
  const timezone = localStorage.getItem('timezone');

  if (!authToken || !refreshToken || !refreshExpireTime || !authExpireTime || !timezone) {
    dispatch(setDidTryAL());
    dispatch(Logout());
  }
  else {
    // const authExpirationDate = new Date(authExpireTime);
    const refreshExpireDate = new Date(refreshExpireTime);
    const currentDate = new Date();

    // console.log('3 days from initial login is:', refreshExpireDate);
    // console.log('24 hours from now:', authExpirationDate);
    // console.log('Today is:', currentDate);
    // console.log('Your Time zone:', timezone);

    let OneDay = currentDate.getTime() + (24 * 60 * 60 * 1000)

    if (OneDay > refreshExpireDate && !(refreshExpireDate <= currentDate)) {
      dispatch(checkAuthTimeout(refreshExpireDate.getTime() - new Date().getTime()))
    }



    if (refreshExpireDate <= currentDate) {
      dispatch(setDidTryAL());
      dispatch(Logout());
    } else {
      // if (authExpirationDate <= currentDate) {
      //   console.log('hello')
      //   dispatch(getNewAuthToken(refreshToken));
      // }
      // else {

      //   let userDataConfig = {
      //     method: 'get',
      //     url: `http://gymfit-membersite-test-lb-645626039.us-east-1.elb.amazonaws.com/welcome/users`,
      //     headers: {
      //       'Authorization': `Bearer ${authToken}`,
      //     },
      //   };

      //   axios(userDataConfig).then(userData => {
      //     dispatch(SetCaladner(userData.data.usersSchedule));
      //     dispatch(SetAllSubClassesInitial(userData.data.myCourses));
      //     dispatch(SetAllClasses(userData.data.myCourses));
      //     dispatch(LoginAsync(authToken, decoded, userData.data));
      //     dispatch(setDidTryAL());
      //   }).catch(err => {
      //     dispatch(loginFail())
      //   });
      // }
      dispatch(getNewAuthToken(refreshToken));
    }
  }
};

const getNewAuthToken = (refreshToken) => dispatch => {
  let newAuthConfig = {
    method: 'get',
    url: `${API}/auth/refreshToken`,
    headers: {
      'Authorization': `Bearer ${refreshToken}`,
    },
  };

  axios(newAuthConfig).then(res => {
    const newAuthToken = res.data.authorizationToken;
    const decoded = jwt.decode(newAuthToken)


    const expirationDate = new Date(new Date().getTime() + (decoded.exp - decoded.iat) * 1000);
    const { timezone } = res.data;

    localStorage.setItem('authToken', newAuthToken);
    localStorage.setItem('AuthExpirationDate', expirationDate);
    localStorage.setItem('timezone', timezone);

    let userDataConfig = {
      method: 'get',
      url: `${API}/welcome/users`,
      headers: {
        'Authorization': `Bearer ${newAuthToken}`,
      },
    };

    if (res.data.isFreeMember && (!res.data.isAllAccessUser && !res.data.hasCourseProduct)) {
      userDataConfig = {
        ...userDataConfig,
        method: 'GET',
        url: `${API}/welcome/v1/users`,
      }

      axios(userDataConfig)
        .then(res => dispatch(
          LoginAsync(
            newAuthToken,
            decoded,
            {
              ...res.data,
              showAllAccessSite: true,
              isFreeMember: true
            },
            timezone)
        ))
        .catch(err => {
          dispatch(
            LoginAsync(
              newAuthToken,
              decoded,
              {
                ...res.data,
                showAllAccessSite: true,
                isFreeMember: true
              },
              timezone)
          )
          //dispatch(loginFail())
          // Sentry.captureException(err);
        });
    }
    else {
      userDataConfig = {
        ...userDataConfig,
        method: 'GET',
        url: `${API}/welcome/v1/users`,
      }

      axios(userDataConfig)
        .then(res => dispatch(
          LoginAsync(
            newAuthToken,
            decoded,
            {
              ...res.data,
              showAllAccessSite: true,
              isFreeMember: false
            },
            timezone)
        ))
        .catch(err => {
          dispatch(
            LoginAsync(
              newAuthToken,
              decoded,
              {
                ...res.data,
                showAllAccessSite: true,
                isFreeMember: false
              },
              timezone)
          )
          //dispatch(loginFail())
          //Sentry.captureException(err);
        });
    }
  }).catch(err => {
    dispatch(loginFail())
    Sentry.captureException(err);
  })

}
const getNewAuthTokenNew = (refreshToken) => dispatch => {
  let newAuthConfig = {
    method: 'get',
    url: `${API}/auth/refreshToken`,
    headers: {
      'Authorization': `Bearer ${refreshToken}`,
    },
  };

  axios(newAuthConfig).then(res => {
    const newAuthToken = res.data.authorizationToken;
    const decoded = jwt.decode(newAuthToken)


    const expirationDate = new Date(new Date().getTime() + (decoded.exp - decoded.iat) * 1000);
    const { timezone } = res.data;

    localStorage.setItem('authToken', newAuthToken);
    localStorage.setItem('AuthExpirationDate', expirationDate);
    localStorage.setItem('timezone', timezone);

    let userDataConfig = {
      method: 'get',
      url: `${API}/welcome/users`,
      headers: {
        'Authorization': `Bearer ${newAuthToken}`,
      },
    };

    if (res.data.isFreeMember && (!res.data.isAllAccessUser && !res.data.hasCourseProduct)) {
      userDataConfig = {
        ...userDataConfig,
        method: 'GET',
        url: `${API}/welcome/v1/users`,
      }

      axios(userDataConfig)
        .then(res => dispatch(
          LoginAsync(
            newAuthToken,
            decoded,
            {
              ...res.data,
              showAllAccessSite: true,
              isFreeMember: true
            },
            timezone)
        ))
        .catch(err => {
          dispatch(
            LoginAsync(
              newAuthToken,
              decoded,
              {
                ...res.data,
                showAllAccessSite: true,
                isFreeMember: true
              },
              timezone)
          )
          //dispatch(loginFail())
          // Sentry.captureException(err);
        });
    }
    else {
      userDataConfig = {
        ...userDataConfig,
        method: 'GET',
        url: `${API}/welcome/v1/users`,
      }

      axios(userDataConfig)
        .then(res => dispatch(
          LoginAsync(
            newAuthToken,
            decoded,
            {
              ...res.data,
              showAllAccessSite: true,
              isFreeMember: false
            },
            timezone)
        ))
        .catch(err => {
          dispatch(
            LoginAsync(
              newAuthToken,
              decoded,
              {
                ...res.data,
                showAllAccessSite: true,
                isFreeMember: false
              },
              timezone)
          )
          //dispatch(loginFail())
          //Sentry.captureException(err);
        });
    }
  }).catch(err => {
    dispatch(loginFail())
    Sentry.captureException(err);
  })

}

export const Logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('refreshExpireTime');
  localStorage.removeItem('AuthExpirationDate');
  localStorage.removeItem('timezone');
  Sentry.configureScope(scope => scope.setUser(null));
  return {
    type: actionTypes.LOGOUT
  }
}

export const setDidTryAL = () => {
  return { type: actionTypes.SET_DID_TRY_AL };
};

export const getNewSignedUrl = () => (dispatch, getState) => {
  const state = getState();
  const { webToken, UserId } = state.login;

  const config = AxiosConfig('get', `/welcome/v1/users/${UserId}/refresh/player/signed-url`, webToken)

  axios(config).then(res => {
    dispatch({
      type: actionTypes.GET_NEW_SIGNED_URL,
      payload: {
        signedUrl: res.data.playerScript
      }
    })
  }).catch(err => {
    Sentry.captureException(err);
  })
}

export const UpdateUserLevelId = (levelData) => {
  return {
    type: actionTypes.UPDATED_USER_LEVEL,
    payload: {
      ...levelData
    }
  }
}


export const Login = (username, password) => dispatch => {
  dispatch(LoginStart());

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }
  }

  axios.post(API + '/auth', { username, password, timezone: moment.tz.guess() }, config)
    .then(res => {
      console.log("/auth res.data", res.data)

      const authToken = res.data.jwtAuthorizationToken;
      const refreshToken = res.data.jwtRefreshToken;

      const decodeRefresh = jwt.decode(refreshToken);
      const decoded = jwt.decode(authToken);
      console.log('decoded', decoded)
      const expirationDate = new Date(new Date().getTime() + (decoded.exp - decoded.iat) * 1000);
      const refreshExpireTime = new Date(new Date().getTime() + (decodeRefresh.exp - decodeRefresh.iat) * 1000);

      const { timezone } = res.data;

      localStorage.setItem('authToken', authToken);
      localStorage.setItem('AuthExpirationDate', expirationDate);

      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('refreshExpireTime', refreshExpireTime);

      localStorage.setItem('timezone', timezone);

      let userConfig = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${authToken}`
        }
      }
      // res.data.isAllAccessUser = true
      // res.data.isFreeMember = true
      // res.data.hasCourseProduct = true

      if (res.data.isFreeMember && (!res.data.isAllAccessUser && !res.data.hasCourseProduct)) {
        console.log('login isFreeMember && IF')
        userConfig = {
          ...userConfig,
          method: 'GET',
          url: `${API}/welcome/v1/users`,
        }

        axios(userConfig)
          .then(res => dispatch(
            LoginAsync(
              authToken,
              decoded,
              {
                ...res.data,
                showAllAccessSite: true,
                isFreeMember: true
              },
              timezone)
          ))
          .catch(err => {
            console.log('err login isFreeMember && IF', err)
            dispatch(loginFail())
            Sentry.captureException(err);
            //dispatch(loginFail())
            //Sentry.captureException(err);

          });
      }

      else {
        console.log('login else')
        userConfig = {
          ...userConfig,
          method: 'GET',
          url: `${API}/welcome/v1/users`,
        }

        axios(userConfig)
          .then(res => {
            console.log("/welcome/v1/users res.data", res.data)
            let resGoal = {
              "fname": "Luke",
              "lname": "",
              "contactId": 411847,
              "emailId": "lukesearra@icloud.com",
              "isAllAccessUser": true,
              "isThriveUser": true,
              "isAdmin": false,
              "playerScript": "?exp=1765836948935&sig=ab9dfa7b1177b34f5db031964d6bd4a7",
              "guidedPlanAccessLevels": [
                0,
                1,
                2,
                3,
                4
              ],
              "userLevel": "Beginner",
              "levelId": 0
            }
            dispatch(
              LoginAsync(
                authToken,
                decoded,
                {
                  ...res.data,
                  showAllAccessSite: true,
                  isFreeMember: false
                },
                timezone)
            )
          })
          .catch(err => {
            console.log('err login else', err)
            dispatch(loginFail())
            Sentry.captureException(err);
          });
      }
    })
    .catch(err => {
      dispatch(LoginNew(username, password))
    });
}