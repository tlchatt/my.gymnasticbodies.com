const API = process.env.REACT_APP_API_NEW;
const TOKEN = process.env.REACT_APP_LOG_TOKEN;

// Best-effort user context attached to EVERY client log so app.'s app_logs can
// segment failures by user class. `postAWS` is the key discriminator:
// 'true'  = Neon / better-auth (non-legacy) path, 'false' = AWS legacy path.
// These are written to localStorage during login (see loginActions.js). Never throws.
function userContext() {
    try {
        const ls = window.localStorage;
        const ctx = {
            email: ls.getItem('username') || undefined,
            userId: ls.getItem('userId') || undefined,
            neonUserId: ls.getItem('neonUserId') || undefined,
            postAWS: ls.getItem('postAWS') || undefined,
        };
        Object.keys(ctx).forEach((k) => ctx[k] === undefined && delete ctx[k]);
        return ctx;
    } catch (_) {
        return {};
    }
}

export function logEvent(event, data = {}) {
    if (!API || !TOKEN) return;
    // Caller-supplied `data` wins over auto-context (e.g. login passes the attempted email).
    fetch(`${API}/api/clientLog`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-log-token': TOKEN },
        body: JSON.stringify({ event, ...userContext(), ...data }),
    }).catch(() => {});
}
