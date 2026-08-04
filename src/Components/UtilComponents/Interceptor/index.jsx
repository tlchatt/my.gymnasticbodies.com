import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { fourceLogoutFail } from '../../../Store/Action/loginActions';
import { logEvent } from '../../../util/clientLogger';

const NEWAPI = process.env.REACT_APP_API_NEW;

/**
 * Global response interceptor.
 *
 * This used to exist solely to recover AWS sessions: a 403 on /myschedule|/auto-pilot|/byo
 * re-fetched /welcome/v1/users, and a 401 refreshed the token via /auth/refreshToken and
 * replayed the request. Both paths are gone with AWS.
 *
 * Neon sessions are not refreshed client-side, so a 401 means the session is genuinely no
 * longer valid and the only correct response is to end it. Previously such a 401 was
 * swallowed and the original request resolved with `undefined`, which surfaced to users as
 * a blank screen rather than a logout.
 *
 * Two bugs died with the old code, recorded here so they are not reintroduced:
 *   - the 401 branch compared err.config.url against `'"${API}/auth"'` — a string with
 *     literal quote characters embedded, so the exclusion never matched anything;
 *   - the 403 branch read `res.data` off a raw fetch() Response, which is always undefined,
 *     so checkWelcomeService was invariably dispatched with undefined.
 */
const Interceptor = props => {
  const isLoggedIn = useSelector(state => state.login.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) return undefined;

    const intercept = axios.interceptors.response.use(
      response => response,
      err => {
        const url = typeof err?.config?.url === 'string' ? err.config.url : '';
        const status = err?.response?.status;

        // Only our own API can invalidate a session. Third-party 401s (analytics, media
        // hosts) must not log anybody out.
        const isOurApi = NEWAPI && url.startsWith(NEWAPI);

        if (isOurApi && status === 401) {
          logEvent('my.auth.session_expired', { data: { url, status } });
          dispatch(fourceLogoutFail());
        }

        return Promise.reject(err);
      },
    );

    return () => axios.interceptors.response.eject(intercept);
  }, [isLoggedIn, dispatch]);

  return props.children;
}

export default Interceptor;
