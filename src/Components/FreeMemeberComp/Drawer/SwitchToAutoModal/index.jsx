import React from 'react';
import Button from '@material-ui/core/Button';
import { Typography, makeStyles, Grid, Box, Link } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { LinkRef } from '../../../UtilComponents/LinkOverride';

import { setLevelPath } from '../../../../Store/Action/LevelsActions';

const useStyles = makeStyles(theme => ({
  title: {
    color: "#656464",
    padding: "24px 0 0",
  },
  button: {
    background: "linear-gradient(18deg, #FF9435 0%, #f05621 100%)",
    color: 'white',
    padding: '4px 30px',
    fontSize: '18px',
    margin: '12px 32px',
    [theme.breakpoints.up(425)]: {
      margin: '12px 18px',
    }
  },
  cancel: {
    backgroundColor: 'white',
    padding: '4px 30px',
    fontSize: '18px',
    margin: '12px 32px',
    [theme.breakpoints.up(425)]: {
      margin: '12px 18px',
    }
  },
  root: {
    padding: 24
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down(426)]: {
      flexDirection: 'column'
    }
  },
  media: {
    maxWidth: 170
  }
}));


export default function SwitchToAutoModal(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { handleClose } = props;

  const location = useLocation();
  const history = useHistory();

  const handleChangeToAutoPilot = () => {
    dispatch(setLevelPath(9, handleClose))
    if (location.pathname !== '/') {
      history.push("/")
    }
  }

  return (
    <Box>
      <Box m={1} mt={2}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.gridItem} style={{alignItems: 'center'}}>
            <img src="https://gymfit-images.s3.amazonaws.com/General/WhiteBoard-start.png" alt="White Board Logo" className={classes.media} />
          </Grid>
        </Grid>
      </Box>
      <Typography variant='h4' gutterBottom className={classes.title} id="responsive-dialog-title" align='center'>Do you want to switch to White Board?</Typography>
      <Box m={1} mt={4}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.gridItem}>
            <Button autoFocus size='large' onClick={handleClose} variant='contained' className={classes.cancel}>
              cancel
            </Button>
            <Button size='large' onClick={handleChangeToAutoPilot} color="primary" autoFocus className={classes.button}>
              Select White Board
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.gridItem}>
            <Link variant="h6" to="/learn-more/white-board" component={LinkRef} onClick={handleClose} align='center' > Learn How to use White Board </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>

  );
}
