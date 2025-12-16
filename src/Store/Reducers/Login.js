import * as actionTypes from '../Action/actionTypes';
import { updateObject } from '../util';

const initailState = {
  auth: false,
  webToken: '',
  loading: false,
  fail: false,
  didTryAutoLogin: false,
}

const LoginSuccess = (state, action) => {
  return updateObject(state, {
    auth: true,
    webToken: action.webToken,
    name: `${action.userData.fname} ${action.userData.lname}`,
    firstName: action.userData.fname,
    loading: false,
    fail: false,
    integratedPlans: action.userState.integratedPlans,
    isAllAccessUser: action.userState.isAllAccessUser,
    isThriveUser: action.userState.isThriveUser,
    signedUrl: action.userState.playerScript,
    UserId: action.userData.cid,
    timezone: action.timezone,
    isAdmin: action.userState.isAdmin ? action.userState.isAdmin : null,
    detailedView: action.userState.detailedView,
    userLevel: action.userState.isFreeMember ? 'Free Member' : action.userState.userLevel,
    levelId: action.userState.isFreeMember ? 9 : action.userState.levelId,
    lastName: action.userState.lname,
    showAllAccessSite: action.userState.showAllAccessSite,
    isFreeMember: action.userState.isFreeMember,
    guidedPlanAccessLevels: action.userState.guidedPlanAccessLevels,
  });
}

const WelcomeSuccess = (state, action) => {
  return updateObject(state, {
    isAllAccessUser: action.paylod.isAllAccessUser,
    isThriveUser: action.paylod.isThriveUser,
    signedUrl: action.paylod.playerScript,
    isAdmin: action.paylod.isAdmin ? action.paylod.isAdmin : null,
    userLevel: action.paylod.isFreeMember ? 'Free Member' : action.paylod.userLevel,
    levelId: action.paylod.isFreeMember ? 9 : action.paylod.levelId,
    lastName: action.paylod.lname,
    showAllAccessSite: action.paylod.showAllAccessSite,
    isFreeMember: action.paylod.isFreeMember,
    guidedPlanAccessLevels: action.payload.guidedPlanAccessLevels,
  });
}


const LoginStart = (state) => {
  return updateObject(state, {loading: true})
}

const LoginFailed = (state) => {
  return updateObject(state, { loading: false, fail: true });
}

const LoginFailedClear = (state) => {
  return updateObject(state, { fail: false });
}

const UpdateUserPlan = (state, planData) => {
  return updateObject(state, {
    integratedPlans: {
      ...state.integratedPlans,
      level: planData.level,
      weekIndex: planData.weekIndex,
      planId: planData.planId
    }
  })
}

const UpdateUserLevelId = (state, action) => {
  return updateObject(state, {
    levelId: action.payload.levelId,
    userLevel: action.payload.userLevel
  })
}


const UpdateToken = (state, action) => {
  return updateObject(state, {webToken: action.webToken} )
}

const SetUserLevel = (state, action) => {
  return updateObject(state, {
    ...action.payload,
    userLevel: state.isFreeMember ? 'Free Member' : action.payload.userLevel,
  });
}

export const LoginReducer = (state = initailState, action) => {
  switch (action.type) {
    case actionTypes.LOGN_START: return LoginStart(state);
    case actionTypes.LOGIN_SUCESS: return LoginSuccess(state, action);
    case actionTypes.LOGIN_FAIL: return LoginFailed(state);
    case actionTypes.LOGIN_FAIL_CLEAR: return LoginFailedClear(state);
    case actionTypes.LOGOUT: return updateObject({}, {...initailState, didTryAutoLogin: true });
    case actionTypes.UPDATE_USER_PLAN: return UpdateUserPlan(state, action.planData);
    case actionTypes.SET_DID_TRY_AL: return updateObject(state, { didTryAutoLogin: true })
    case actionTypes.SET_NEW_AUTH: return UpdateToken(state, action);
    case actionTypes.SET_USER_LEVEL: return SetUserLevel(state, action)
    case actionTypes.CONTINUE_USER_LEVEL: return SetUserLevel(state, action)
    case actionTypes.GET_NEW_SIGNED_URL: return updateObject(state, action.payload);
    case actionTypes.CHECK_WELCOME_SERVICE: return WelcomeSuccess(state, action);
    case actionTypes.UPDATED_USER_LEVEL: return UpdateUserLevelId(state, action);
    default: return state;
  }
}
