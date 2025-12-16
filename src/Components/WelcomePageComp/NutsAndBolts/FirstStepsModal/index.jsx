import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles, Typography, Grid, Card, Link } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';


import { LinkRef } from '../../../UtilComponents/LinkOverride'

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
  root: {
    maxWidth: 330,
    width: '100%',
    margin: 'auto',
    cursor: 'pointer'
  },
  media: {
    width: '100%',
    height: '100%'
  },
}))

function FirstStepsModal(props) {
  const classes = useSytles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
          <Grid item xs={12} sm={12} md={10} lg={10}>
            <Typography className={classes.title}>First Steps</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={10} lg={10}>
            <Grid container justifyContent='center'>
              <Grid item xs={12} sm={6} md={4} lg={4} style={{ padding: 8 }}>
                <Link component={LinkRef} to='/get-started' color="inherit">
                  <Card className={classes.root} square={true} elevation={0}>
                    <img src='https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/prog-select.jpg' className={classes.media} alt="" />
                  </Card>
                  <Typography variant='h4' align='center'>PROGRAM SELECTOR</Typography>
                </Link>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4} style={{ padding: 8 }}>
                <Link component={LinkRef} to='/eqiupment-list' color="inherit">
                  <Card className={classes.root} square={true} elevation={0}>
                    <img src='https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/rings.jpg' className={classes.media} alt="" />
                  </Card>
                  <Typography variant='h4' align='center'>EQUIPMENT LISTS</Typography>
                </Link>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4} style={{ padding: 8 }}>
                <Link href="https://www.gymnasticbodies.com/media/where-to-begin.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                  <Card className={classes.root} square={true} elevation={0}>
                    <img src='https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/where-to-begin.jpg' className={classes.media} alt="" />
                  </Card>
                  <Typography variant='h4' align='center'>WHERE TO BEGIN</Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default FirstStepsModal;
