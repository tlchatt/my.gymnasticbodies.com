import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { validId } from '../../Store/util';

const NEWAPI = process.env.REACT_APP_API_NEW;

// Records the user's current place in the app (route path, plus which home-screen section
// when on '/') and restores it on the next login. One typed user_setting: 'current_location'
// = { path, section }, where section is 'guided' | 'whiteboard' | 'byo'. section is a
// section name, NOT a level — see the Login reducer. The home-section landing itself is
// restored by fetchUserStanding (single authority for the '/' section, so it can't race the
// standing fetch); this component restores only non-'/' routes (Course Library, History,
// Thrive, ...) and records every move. Reuses /api/user/userStatus — no new endpoint.
export default function CurrentLocationTracker() {
  const location = useLocation();
  const history = useHistory();

  const auth = useSelector((s) => s.login.auth);
  const reduxNeonId = useSelector((s) => s.login.neonUserId);
  const section = useSelector((s) => s.login.section);

  const neonUserId = validId(reduxNeonId)
    || (typeof localStorage !== 'undefined' ? validId(localStorage.getItem('neonUserId')) : null)
    || null;

  const restoreStartedRef = useRef(false);
  const [restoreDone, setRestoreDone] = useState(false);
  const timerRef = useRef(null);

  // Restore exactly once, after auth + neonUserId are ready. Only override the landing
  // when the app opened at '/'; a deep link (any other path) is respected as-is. The
  // home-section case ('/' with a section) is handled by fetchUserStanding, so here we
  // only navigate to a saved non-'/' route. Recording is held off until this read
  // finishes (restoreDone) so it can never overwrite the saved value before we read it.
  useEffect(() => {
    if (restoreStartedRef.current) return;
    if (!auth || !neonUserId) return;
    restoreStartedRef.current = true;
    if (location.pathname !== '/') { setRestoreDone(true); return; }

    fetch(`${NEWAPI}/api/user/userStatus?userId=${encodeURIComponent(neonUserId)}&type=current_location`)
      .then((r) => (r.ok ? r.json() : null))
      .then((res) => {
        const data = res && res[0] && res[0].settings && res[0].settings.data;
        if (data && data.path && data.path !== '/') {
          history.replace(data.path);
        }
      })
      .catch(() => {})
      .finally(() => setRestoreDone(true));
  }, [auth, neonUserId, location.pathname, history]);

  // Record the current location whenever it changes (after the initial restore), debounced
  // so rapid navigation coalesces into a single write.
  useEffect(() => {
    if (!restoreDone || !auth || !neonUserId) return;

    const path = location.pathname;
    const savedSection = path === '/' ? (section || 'guided') : null;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      fetch(`${NEWAPI}/api/user/userStatus`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: neonUserId, type: 'current_location', data: { path, section: savedSection } }),
      }).catch(() => {});
    }, 600);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [restoreDone, location.pathname, section, auth, neonUserId]);

  return null;
}
