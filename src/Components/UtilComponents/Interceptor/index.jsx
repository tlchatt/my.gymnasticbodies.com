import { useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { useDispatch, useSelector } from 'react-redux';

import { setNewAuthToken, fourceLogoutFail, checkWelcomeService } from '../../../Store/Action/loginActions';
const API = process.env.REACT_APP_API;

const Interceptor = props => {
  const isLoggedIn = useSelector(state => state.login.auth);
  const webToken = useSelector(state => state.login.webToken);
  const dispatch = useDispatch();

  useEffect(() => {
    let intercept;
    const setIntercept = () => {
      if (isLoggedIn) {
        intercept = axios.interceptors.response.use(response => {
          return response;
        }, err => {
          return new Promise((resolve, reject) => {
            const originalReq = err.config;
            if (err.response.status === 403 && err.config && !err.config.__isRetryRequest && (err.config.url.includes("/myschedule/") || err.config.url.includes("/auto-pilot/")  || err.config.url.includes("/byo/") )) {
              let config = {
                method: 'GET',
                headers: {
                  'Authorization': 'Bearer ' + webToken
                }
              }
              fetch(API + '/welcome/v1/users', config).then(res => {
                dispatch(checkWelcomeService(res.data));
              }).catch(() => {
                dispatch(fourceLogoutFail());
              })
            }
            if (err.response.status === 401 && err.config && !err.config.__isRetryRequest && err.config.url !== `'"${API}/auth"'`) {
              let config = {
                method: 'GET',
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('refreshToken')
                }
              }
              let res = fetch(API + '/auth/refreshToken', config)
                .then(res => res.json()).then(res => {
                  originalReq.headers['Authorization'] = 'Bearer ' + res.authorizationToken;

                  const decoded = jwt.decode(res.authorizationToken)
                  const expirationDate = new Date(new Date().getTime() + (decoded.exp - decoded.iat) * 1000);

                  localStorage.setItem('authToken', res.authorizationToken)
                  localStorage.setItem('AuthExpirationDate', expirationDate)

                  dispatch(setNewAuthToken(res.authorizationToken))

                  return axios(originalReq);
                }).catch(err => {
                  // in the event there is an error getting a new token from backend then log user out entierly.
                  // This also covers possibility for expired refresh token
                  // dispatch(fourceLogoutFail());
                });

              resolve(res);
            }
          });
        });
      }
    }

    setIntercept();

    return () => axios.interceptors.response.eject(intercept)

  }, [isLoggedIn, dispatch, webToken])

  return props.children;
}


export default Interceptor;
