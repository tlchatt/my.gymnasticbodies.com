import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const APP_URL = 'https://app.gymnasticbodies.com';
const NEWAPI = process.env.REACT_APP_API_NEW || 'https://gymnasticbodies-com.vercel.app';

const useStyles = makeStyles((theme) => ({
    page: {
        maxWidth: 640,
        margin: '0 auto',
        padding: theme.spacing(4, 2),
    },
    title: {
        fontWeight: 700,
        marginBottom: theme.spacing(3),
    },
    card: {
        background: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: 12,
        padding: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(1, 0),
        borderBottom: '1px solid #f0f0f0',
        '&:last-child': { borderBottom: 'none' },
    },
    label: {
        color: '#666',
        fontSize: '0.875rem',
    },
    value: {
        fontWeight: 500,
        fontSize: '0.875rem',
    },
    statusActive: {
        display: 'inline-block',
        padding: '3px 10px',
        borderRadius: 20,
        background: '#e8f5e9',
        color: '#2e7d32',
        fontSize: '0.8rem',
        fontWeight: 600,
    },
    statusInactive: {
        display: 'inline-block',
        padding: '3px 10px',
        borderRadius: 20,
        background: '#fce4ec',
        color: '#c62828',
        fontSize: '0.8rem',
        fontWeight: 600,
    },
    renewBtn: {
        display: 'inline-block',
        marginTop: 16,
        padding: '12px 28px',
        borderRadius: 8,
        background: 'linear-gradient(135deg, #fcb14e 0%, #f05621 100%)',
        color: '#fff',
        fontWeight: 700,
        fontSize: '0.95rem',
        textDecoration: 'none',
        textAlign: 'center',
    },
    manageLink: {
        display: 'inline-block',
        marginTop: 16,
        padding: '10px 24px',
        borderRadius: 8,
        border: '1px solid #e0e0e0',
        color: '#333',
        fontWeight: 500,
        fontSize: '0.875rem',
        textDecoration: 'none',
    },
    error: {
        color: '#c62828',
        marginTop: 16,
    },
}));

export default function AccountPage() {
    const classes = useStyles();
    const userId = useSelector(state => state.login.UserId);
    const webToken = useSelector(state => state.login.webToken);
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const email = localStorage.getItem('username') || '';
    const authToken = localStorage.getItem('authToken') || '';

    useEffect(() => {
        if (!userId) { setLoading(false); return; }
        fetch(`${NEWAPI}/api/user/accountInformation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, token: webToken, type: 'subscription' }),
        })
            .then(r => r.json())
            .then(data => {
                setInfo(data);
                setLoading(false);
            })
            .catch(() => {
                setError('Could not load account information.');
                setLoading(false);
            });
    }, [userId, webToken]);

    if (loading) return (
        <div className={classes.page} style={{ textAlign: 'center', paddingTop: 80 }}>
            <CircularProgress />
        </div>
    );

    if (!userId) return (
        <div className={classes.page}>
            <Typography variant="h5" className={classes.title}>My Account</Typography>
            <Typography>Please log in to view your account.</Typography>
        </div>
    );

    const imp = info?.impInfo;
    const isActive = imp?.status === 'Active' || imp?.status === 'active';
    const renewUrl = `${APP_URL}/renew?email=${encodeURIComponent(email)}&token=${encodeURIComponent(authToken)}&userId=${encodeURIComponent(userId)}`;
    const manageUrl = `${APP_URL}/accountDetails?token=${encodeURIComponent(authToken)}&userId=${encodeURIComponent(userId)}`;

    return (
        <div className={classes.page}>
            <Typography variant="h5" className={classes.title}>My Account</Typography>

            {error && <Typography className={classes.error}>{error}</Typography>}

            {imp && (
                <div className={classes.card}>
                    <Typography variant="subtitle1" style={{ fontWeight: 600, marginBottom: 12 }}>
                        Subscription
                    </Typography>

                    <div className={classes.row}>
                        <span className={classes.label}>Status</span>
                        <span className={isActive ? classes.statusActive : classes.statusInactive}>
                            {imp.status || 'Unknown'}
                        </span>
                    </div>

                    {imp.subscriptionName && (
                        <div className={classes.row}>
                            <span className={classes.label}>Plan</span>
                            <span className={classes.value}>{imp.subscriptionName}</span>
                        </div>
                    )}

                    {imp.price && (
                        <div className={classes.row}>
                            <span className={classes.label}>Amount</span>
                            <span className={classes.value}>${imp.price} / {imp.matchedTerm || 'month'}</span>
                        </div>
                    )}

                    {imp.redableNextPaymentDate && (
                        <div className={classes.row}>
                            <span className={classes.label}>Next Payment</span>
                            <span className={classes.value}>{imp.redableNextPaymentDate}</span>
                        </div>
                    )}

                    {info?.cardType && info.cardType !== 'N/A' && (
                        <div className={classes.row}>
                            <span className={classes.label}>Payment Method</span>
                            <span className={classes.value}>{info.cardType} ···· {info.cardNumber}</span>
                        </div>
                    )}

                    {isActive ? (
                        <a href={manageUrl} className={classes.manageLink}>
                            Manage Account →
                        </a>
                    ) : (
                        <a href={renewUrl} className={classes.renewBtn}>
                            Renew Subscription
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}
