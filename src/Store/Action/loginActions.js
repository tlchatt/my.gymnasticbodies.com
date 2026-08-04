import * as actionTypes from './actionTypes'
import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as Sentry from "@sentry/react";
import moment from 'moment-timezone'
import { showToast } from './calendarActions'
import { AxiosConfig } from '../util'
import { logEvent } from '../../util/clientLogger'

const API = process.env.REACT_APP_API;
const NEWAPI = process.env.REACT_APP_API_NEW
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

export const setNeonUserId = (neonUserId) => {
  return {
    type: actionTypes.SET_NEON_USER_ID,
    neonUserId
  }
}

// Real workout standing from Neon (seeded from AWS): replaces the hardcoded
// 'Advanced One'/levelId 3 and isThriveUser:true defaults in the LoginNew/authCheckState
// paths. Precedence: server value -> existing state; free members stay pinned in the reducer.
export const fetchUserStanding = () => async (dispatch, getState) => {
  const neonUserId = await dispatch(ensureNeonUserId());
  if (!neonUserId) return;
  try {
    const res = await fetch(`${NEWAPI}/api/user/workout/standing?userId=${encodeURIComponent(neonUserId)}`);
    if (!res.ok) return;
    const s = await res.json();
    const payload = { isThriveUser: !!s.isThriveUser };
    if (s.levelId !== null && s.levelId !== undefined) {
      payload.levelId = parseInt(s.levelId, 10);
      payload.userLevel = s.userLevel || levelObj[payload.levelId]?.userLevel;
      localStorage.setItem('userLevelID', String(payload.levelId));
    }
    dispatch({ type: actionTypes.SET_USER_STANDING, payload });
  } catch (_) {}
}

// Ensures Redux holds the Neon UUID needed by the ${NEWAPI} workout routes.
// Chain: Redux -> localStorage -> /api/user/id email resolver (covers legacy users
// whose registerWPass call failed silently at login).
export const ensureNeonUserId = () => async (dispatch, getState) => {
  const current = getState().login.neonUserId;
  if (current) return current;

  const stored = localStorage.getItem('neonUserId');
  if (stored && stored !== 'null' && stored !== 'undefined') {
    dispatch(setNeonUserId(stored));
    return stored;
  }

  const email = localStorage.getItem('username');
  if (!email) return null;
  try {
    const res = await fetch(`${NEWAPI}/api/user/id?email=${encodeURIComponent(email)}`);
    if (res.ok) {
      const { id } = await res.json();
      if (id) {
        localStorage.setItem('neonUserId', id);
        dispatch(setNeonUserId(id));
        return id;
      }
    }
  } catch (_) {}
  return null;
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

// Entry point. Neon is tried FIRST and AWS is the fallback — the reverse of the original
// order. Anyone who could sign in before still can, because both rails are still tried;
// the difference is that AWS is no longer required for a normal login, which is what makes
// switching it off safe.
export const Login = (username, password) => dispatch => {
  logEvent('my.login.attempt', { email: username });
  dispatch(LoginNew(username, password));
};

// Legacy AWS sign-in. Now only reached when Neon rejects the credentials — e.g. one of the
// ~300 accounts with no Neon password. Sets postAWS = false.
export const LoginLegacy = (username, password) => dispatch => {
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
      const expirationDate = new Date(new Date().getTime() + (decoded.exp - decoded.iat) * 1000);
      const refreshExpireTime = new Date(new Date().getTime() + (decodeRefresh.exp - decodeRefresh.iat) * 1000);

      const { timezone } = res.data;
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('AuthExpirationDate', expirationDate);

      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('refreshExpireTime', refreshExpireTime);

      localStorage.setItem('timezone', timezone);
      localStorage.setItem('postAWS', false);


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
        res.data.postAWS = false
        console.log("res.data later is:", res.data)
        axios(userConfig)
          .then(async res => {
            localStorage.setItem('name', res.data.fname);
            localStorage.setItem('username', username);
            localStorage.setItem('userId', res.data.contactId);
            // Awaited so the Neon UUID is in Redux before the app renders — the
            // ${NEWAPI} workout routes are keyed on it. Failure is non-fatal:
            // ensureNeonUserId() resolves it later via /api/user/id.
            let neonUserId = null;
            try {
              const subRes = await axios.post(`${NEWAPI}/api/user/subscription`, {
                password,
                email: username,
                name: res.data.fname,
                postAWS: false,
                reason: "registerWPass",
                awsCustomerId: res?.data?.contactId
              }, { headers: { "Content-Type": "application/json" } });
              neonUserId = subRes?.data?.data?.id || null;
              if (neonUserId) {
                localStorage.setItem('userId', neonUserId);
                localStorage.setItem('neonUserId', neonUserId);
              }
            } catch (_) {}

            try {
              const renewalRes = await fetch(`${NEWAPI}/api/user/renewalStatus?email=${encodeURIComponent(username)}`);
              if (renewalRes.ok) {
                const { needsRenewal } = await renewalRes.json();
                if (needsRenewal) {
                  logEvent('my.login.renewal_redirect', { email: username });
                  window.location.href = `https://app.gymnasticbodies.com/renew?email=${encodeURIComponent(username)}&token=${encodeURIComponent(localStorage.getItem('authToken') || '')}&userId=${encodeURIComponent(localStorage.getItem('userId') || '')}`;
                  return;
                }
              }
            } catch (_) {}

            logEvent('my.login.success', { email: username, data: { rail: 'aws' } });
            decoded.neonUserId = neonUserId
            decoded.awsUserId = decoded.cid
            dispatch(LoginAsync(
              authToken,
              decoded,
              {
                ...res.data,
                showAllAccessSite: true,
                isFreeMember: true
              },
              timezone))
          })
          .catch(err => {
            console.log('err login isFreeMember && IF', err)
            dispatch(loginFail())
            Sentry.captureException(err);
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
          .then(async res => {
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
            localStorage.setItem('name', res.data.fname);
            localStorage.setItem('username', username);
            localStorage.setItem('userId', res.data.contactId);
            console.log("decoded:", decoded)

            console.log("c", res.data)
            res.data.postAWS = false

            // registerWPass — awaited so the Neon UUID lands in Redux before render
            // (the ${NEWAPI} workout routes key on it). Non-fatal on failure:
            // ensureNeonUserId() resolves it later via /api/user/id.
            let neonUserId = null
            const config = {
              headers: {
                "Content-Type": "application/json"
              }
            }
            let data = {
              password: password,
              email: username,
              name: res.data.fname,
              postAWS: false,
              reason: "registerWPass",
              awsCustomerId:res?.data?.contactId
            }
            try {
              const subRes = await axios.post(`${NEWAPI}/api/user/subscription`, data, config)
              neonUserId = subRes?.data?.data?.id || null
              console.log("neonUserId from res is:", neonUserId)
              if (neonUserId) {
                localStorage.setItem('userId', neonUserId);
                localStorage.setItem('neonUserId', neonUserId);
              }
            } catch (error) {
              // Sentry.captureException(error);
            }


            try {
              const renewalRes = await fetch(`${NEWAPI}/api/user/renewalStatus?email=${encodeURIComponent(username)}`);
              if (renewalRes.ok) {
                const { needsRenewal } = await renewalRes.json();
                if (needsRenewal) {
                  logEvent('my.login.renewal_redirect', { email: username });
                  window.location.href = `https://app.gymnasticbodies.com/renew?email=${encodeURIComponent(username)}&token=${encodeURIComponent(localStorage.getItem('authToken') || '')}&userId=${encodeURIComponent(localStorage.getItem('userId') || '')}`;
                  return;
                }
              }
            } catch (_) {}

            logEvent('my.login.success', { email: username, data: { rail: 'aws' } });
            decoded.neonUserId = neonUserId
            decoded.awsUserId = decoded.cid
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
      // End of the line: Neon rejected them and so did AWS.
      logEvent('my.login.failed', { email: username, data: { rail: 'aws' } });
      dispatch(loginFail());
      Sentry.captureException(err);
    });
}//legacy AWS login, postAWS = false

export const LoginNew = (username, password) => dispatch => {
  console.log(" inside export const LoginNew = (username, password) => dispatch => {")
  dispatch(LoginStart());

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  // axios.post(API + '/auth', { username, password, timezone: moment.tz.guess() }, config)
  axios.post(NEWAPI + '/api/authentication', { username, password, timezone: moment.tz.guess() }, config)
    .then(async res => {
      console.log("res in LoginNew", res.data)
      let resGoal = {//auth Luke
        "jwtAuthorizationToken": "eyJhbGciOiJIUzUxMiJ9.eyJmbmFtZSI6Ikx1a2UiLCJzdWIiOiJsdWtlc2VhcnJhQGljbG91ZC5jb20iLCJsbmFtZSI6IiIsInR6IjoiQW1lcmljYS9Ub3JvbnRvIiwidGFnaWRzIjpbMTAyLDEyMiwyMjQsMjI2LDIyOCwzMzAsNDQ2LDYxMiw2MTYsNjIwLDYzMiw2OTgsNzg4LDEwMzYsMTMwMV0sImV4cCI6MTc2NTkxMjAxNiwiaWF0IjoxNzY1ODI1NjE2LCJjaWQiOjQxMTg0N30.JLW9ezWmdkQX71VFGT2WOw5Eu1ucx1YSn6ePiRy84oTUhIpdVLJ27d37fBwtBZeKaHyR5LHOvcb7MEqPRDGoNw",
        "jwtRefreshToken": "eyJhbGciOiJIUzUxMiJ9.eyJhbGxhY2Nlc3MiOnRydWUsInN1YiI6Imx1a2VzZWFycmFAaWNsb3VkLmNvbSIsInR6IjoiQW1lcmljYS9Ub3JvbnRvIiwiZnJlZW1lbSI6dHJ1ZSwidHlwZSI6InJlZnJlc2giLCJleHAiOjE3ODEzNzc2MTYsInNwIjp0cnVlLCJpYXQiOjE3NjU4MjU2MTYsImNpZCI6NDExODQ3fQ.Lpdq06b0wowjiV4WeYV9s0TCgtrPMGYn7hRgbxQKil4oh_P2MxSDk80hchDJEaUo6bUNQaVY928u-ntNeUcapQ",
        "timezone": "America/Toronto",
        "isAllAccessUser": true,
        "isFreeMember": true,
        "hasCourseProduct": true
      }
      console.log("res.data '/api/authentication' in LoginNew", res.data)
      const authToken = res.data.token;
      const refreshToken = res.data.token;

      // const decoded = jwt.decode(authToken);
      // // console.log('decoded', decoded)
      let decodedGoal = {
        "fname": res.data.user.name,
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
      // Neon-authed: the UUID IS the Neon user id (no legacy AWS id exists).
      decodedGoal.neonUserId = res.data.user.id
      localStorage.setItem('neonUserId', res.data.user.id);

      const today = new Date();
      const expirationDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      const refreshExpireTime = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

      const timezone = moment.tz.guess();

      localStorage.setItem('name', res.data.user.name);
      localStorage.setItem('userId', res.data.user.id);
      localStorage.setItem('username', username);
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('AuthExpirationDate', expirationDate);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('refreshExpireTime', refreshExpireTime);
      localStorage.setItem('timezone', timezone);
      localStorage.setItem('postAWS', true);
      const userLevelID = localStorage.getItem('userLevelID');
      let userConfig = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${authToken}`
        }
      }
      let freeMember = (res.data.isFreeMember && (!res.data.isAllAccessUser && !res.data.hasCourseProduct))

      let resGoal2 = { ///welcome/v1/users luke
        "fname": res?.data?.user?.name ? res?.data?.user?.name : "User",
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
        "userLevel": levelObj[userLevelID]?.userLevel ? levelObj[userLevelID]?.userLevel : "Advanced One",
        "levelId": userLevelID ? userLevelID : 3
      }
      resGoal2.postAWS = true

      try {
        const renewalRes = await fetch(`${NEWAPI}/api/user/renewalStatus?email=${encodeURIComponent(username)}`);
        if (renewalRes.ok) {
          const { needsRenewal } = await renewalRes.json();
          if (needsRenewal) {
            logEvent('my.login.renewal_redirect', { email: username });
            window.location.href = `https://app.gymnasticbodies.com/renew?email=${encodeURIComponent(username)}&token=${encodeURIComponent(localStorage.getItem('authToken') || '')}&userId=${encodeURIComponent(localStorage.getItem('userId') || '')}`;
            return;
          }
        }
      } catch (_) {}

      // Record WHICH rail authenticated — previously this event only carried the email, so
      // there was no way to see how many members still depend on AWS.
      logEvent('my.login.success', { email: username, data: { rail: 'neon' } });
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
      // Replace the hardcoded resGoal2 defaults with real seeded standing.
      dispatch(fetchUserStanding())

    })
    .catch(err => {
      // Neon rejected the credentials — fall back to AWS, which still covers the accounts
      // whose password never made it into Neon. Not an error yet, so it is not sent to
      // Sentry; LoginLegacy reports the real failure if AWS rejects them too.
      logEvent('my.login.neon_miss', { email: username });
      dispatch(LoginLegacy(username, password));
    });
}//primary Neon login, postAWS = true

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
  // console.log('LoginAsync userData', data)


  //console.log('LoginAsync lukeState', lukeState)
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


export const authCheckState = (props) => (dispatch, getState) => {
  const state = getState();
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  const urlParams = new URLSearchParams(window.location.search);
  console.log("window.location length:", urlParams)
  console.log("urlParams:",urlParams)
  let authToken, refreshToken, refreshExpireTime, authExpireTime, timezone, postAWS, userId, userName, name
  let source = null
  if (urlParams.size > 0) {
    authToken = urlParams.get('authToken');
    refreshToken = urlParams.get('refreshToken');
    refreshExpireTime = urlParams.get('refreshExpireTime');
    authExpireTime = urlParams.get('AuthExpirationDate');
    timezone = urlParams.get('timezone');
    postAWS = urlParams.get('postAWS');
    userId = urlParams.get('userId');
    userName = urlParams.get('username');
    name = urlParams.get('name');
    source = urlParams.get('source');

    // Renewal redirect only carries authToken + identity — fill in safe defaults
    // for missing legacy JWT fields so the null-check below doesn't fire Logout
    if (source === 'renewal') {
      if (!refreshToken) refreshToken = authToken;
      if (!refreshExpireTime) refreshExpireTime = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
      if (!authExpireTime) authExpireTime = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      if (!timezone) timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (!postAWS) postAWS = 'true';
      logEvent('my.renewal.landed', { email: userName });
    }

    localStorage.setItem('authToken', authToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('refreshExpireTime', refreshExpireTime);
    localStorage.setItem('AuthExpirationDate', authExpireTime);
    localStorage.setItem('timezone', timezone);
    localStorage.setItem('postAWS', postAWS);
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', userName);
    localStorage.setItem('name', name);
  } else {
    authToken = localStorage.getItem('authToken');
    refreshToken = localStorage.getItem('refreshToken');
    refreshExpireTime = localStorage.getItem('refreshExpireTime');
    authExpireTime = localStorage.getItem('AuthExpirationDate');
    timezone = localStorage.getItem('timezone');
    postAWS = localStorage.getItem('postAWS');
    userId = localStorage.getItem('userId');
    userName = localStorage.getItem('username');
    name = localStorage.getItem('name');
  }

  console.log("inside authCheckState:", state)
  const userLevelID = localStorage.getItem('userLevelID');

  console.log("values in authCheckState:", { authToken, refreshToken, userLevelID, refreshExpireTime, authExpireTime, timezone, userId, userName, name })
  console.log("postAWS:", postAWS)

  if (!authToken || !refreshToken || !refreshExpireTime || !authExpireTime || !timezone) {
    if (source === 'renewal') {
      logEvent('my.renewal.auth_failed', { email: userName, reason: 'missing_session_fields' });
    }
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
    console.log("oneDay:", OneDay)
    console.log("refreshExpireDate:", refreshExpireDate)
    console.log("currentDate:", currentDate)

    /*if (OneDay > refreshExpireDate && !(refreshExpireDate <= currentDate)) {
      dispatch(checkAuthTimeout(refreshExpireDate.getTime() - new Date().getTime()))
    }*/

    if (refreshExpireDate <= currentDate) {
      dispatch(setDidTryAL());
      dispatch(Logout());
    } else {
      console.log("authToken exists postAWS:", postAWS)

      let decodedGoal = {
        "fname": name ? name : "User",
        "sub": userName,
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
        "cid": 411847,
        "new": true
      }
      decodedGoal.cid = userId
      if (postAWS == "true") {
        decodedGoal.postAWS = true
        // Neon-authed: whatever id we stored IS the Neon UUID.
        decodedGoal.neonUserId = localStorage.getItem('neonUserId') || userId
      } else {
        // Legacy reload: localStorage.userId may hold the Neon UUID (registerWPass
        // overwrote it), which AWS endpoints reject. Recover the AWS integer id from
        // the stored AWS JWT itself — fixes the broken-after-reload legacy sessions.
        const decodedTok = jwt.decode(authToken)
        if (decodedTok?.cid) {
          decodedGoal.cid = decodedTok.cid
          decodedGoal.awsUserId = decodedTok.cid
        }
        const storedNeon = localStorage.getItem('neonUserId')
        // A non-numeric stored userId is a Neon UUID — usable as neonUserId fallback.
        decodedGoal.neonUserId = storedNeon || (/\D/.test(String(userId)) ? userId : null)
      }

      let resGoal2 = { ///welcome/v1/users luke
        "fname": "",
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
        "userLevel": levelObj[userLevelID]?.userLevel ? levelObj[userLevelID]?.userLevel : "Advanced One",
        "levelId": userLevelID ? userLevelID : 3
      }
      resGoal2.fname = name
      let freeMember = false
      console.log("resGoal2:", resGoal2)
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
      // Replace the hardcoded resGoal2 defaults with real seeded standing (both auth
      // paths benefit on reload — legacy users get their seeded level back too).
      dispatch(fetchUserStanding())
      if (source === 'renewal') {
        logEvent('my.renewal.auth_success', { email: userName, userId });
      }


      /*if (authExpirationDate <= currentDate) {
        console.log('hello')
        dispatch(getNewAuthToken(refreshToken));
      }
      else {

        let userDataConfig = {
          method: 'get',
          url: `http://gymfit-membersite-test-lb-645626039.us-east-1.elb.amazonaws.com/welcome/users`,
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        };

        axios(userDataConfig).then(userData => {
          dispatch(SetCaladner(userData.data.usersSchedule));
          dispatch(SetAllSubClassesInitial(userData.data.myCourses));
          dispatch(SetAllClasses(userData.data.myCourses));
          dispatch(LoginAsync(authToken, decoded, userData.data));
          dispatch(setDidTryAL());
        }).catch(err => {
          dispatch(loginFail())
        });
      }*/
      // dispatch(getNewAuthToken(refreshToken));


    }
  }
};


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

export const UpdateUserLevelId = (levelData) => {
  return {
    type: actionTypes.UPDATED_USER_LEVEL,
    payload: {
      ...levelData
    }
  }
}


