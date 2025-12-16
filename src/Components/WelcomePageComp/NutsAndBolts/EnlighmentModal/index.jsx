import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles, Typography, Grid, Card, Link } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import {LinkRef} from '../../../UtilComponents/LinkOverride'

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

function EnlighmentModal(props) {
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
            <Typography className={classes.title}>Enlightenment</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={10} lg={10}>
            <Grid container justifyContent='center'>
              <Grid item xs={12} sm={6} md={4} lg={4} style={{ padding: 8 }}>
                <Link href="https://www.gymnasticbodies.com/blog" color="inherit" target='_blank'>
                  <Card className={classes.root} square={true} elevation={0}>
                    <img src='https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/rear_delts2.jpg' className={classes.media} alt="" />
                  </Card>
                  <Typography variant='h4' align='center'>BLOGS</Typography>
                </Link>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4} style={{ padding: 8 }}>
                <Link component={LinkRef} to='/advocates' color="inherit" target='_blank'>
                  <Card className={classes.root} square={true} elevation={0}>
                    <img src='https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/GFAdv-functional.jpg' className={classes.media} alt="" />
                  </Card>
                  <Typography variant='h4' align='center'>ADVOCATES</Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default EnlighmentModal;
