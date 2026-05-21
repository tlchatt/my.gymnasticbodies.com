const API = process.env.REACT_APP_API_NEW;
const TOKEN = process.env.REACT_APP_LOG_TOKEN;

export function logEvent(event, data = {}) {
    if (!API || !TOKEN) return;
    fetch(`${API}/api/clientLog`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-log-token': TOKEN },
        body: JSON.stringify({ event, ...data }),
    }).catch(() => {});
}
