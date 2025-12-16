import React from 'react';
import ReactJWPlayer from 'react-jw-player';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles, Typography, Grid, Paper } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Interweave from 'interweave';
import { useSelector } from 'react-redux';


const useSytles = makeStyles(theme => ({
  padding: {
    padding: 8,
    paddingBottom: 48,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',

  },
  title: {
    margin: '16px 0',
    padding: 8,
    fontSize: '40px',
    fontWeight: 400,
    lineHeight: '1.35',
    letterSpacing: '0.07em',
    fontFamily: '"Oswald", "Open Sans", sans-serif',
    [theme.breakpoints.down('414')]: {
      fontSize: 32
    }
  },
  bodyText: {
    padding: 4,
    letterSpacing: '0.04em',
  },
  rootOverRide: {
    padding: '24px 0',
    width: '100%',
    margin: '16px',
    maxWidth: '100%',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  modalHead: {
    margin: 0,
    padding: theme.spacing(3),
  },
  icons: {
    opacity: 0.54,
    fontSize: 14,
    letterSpacing: 0,
    textTransform: 'uppercase',
    display: 'flex',
    lineHeight: '26px'
  },
  iconGrid: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
}))

const ThriveModal = props => {
  const classes = useSytles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { mediaId, title } = props;
  const signedUrl = useSelector(state => state.login.signedUrl)

  return (
    <Dialog
      open={props.open}
      onClose={props.close}
      maxWidth='lg'
      fullWidth={true}
      fullScreen={fullScreen}
      scroll='body'
    >
      <MuiDialogTitle disableTypography className={classes.modalHead}>
        <IconButton aria-label="close" className={classes.closeButton} onClick={props.close}>
          <CloseIcon />
        </IconButton>
      </MuiDialogTitle>
      <DialogContent classes={{ root: classes.padding }}>
        <Grid container justifyContent='center'>
          <Grid item xs={12} sm={10} md={10} lg={10}>
            <Typography className={classes.title} align='center'>{title}</Typography>
          </Grid>
          <Grid item xs={12} sm={10} md={10} lg={10}>
            <Paper elevation={2}>
              {
                props.open && props.mediaId
                  ? <ReactJWPlayer
                      playerId='thrive-player'
                      playerScript={`https://content.jwplatform.com/libraries/iOa0nJDF.js${signedUrl}`}
                      playlist={`https://content.jwplatform.com/feeds/${mediaId}`}
                      onError={(err) => console.log("onError", err)}
                      onSetupError={(err) => console.log("onSetupError", err)}
                    />
                  : null
              }
            </Paper>
          </Grid>
          {
            props.subText
              ? <Grid item xs={12} sm={10} md={10} lg={10}>
                <Typography className={classes.bodyText} variant="body1" gutterBottom component='div'>
                  <Interweave content={props.subText} />
                </Typography>
              </Grid>
              : null
          }
        </Grid>
      </DialogContent>
    </Dialog>
  );
}


export default ThriveModal;
