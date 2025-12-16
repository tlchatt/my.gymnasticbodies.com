import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Card, CardHeader, CardContent, Divider, IconButton, CardActions, Button } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';

import BYOGenWorkout from './BuildYourOwn/BYOGenWorkout'
import EditBuildYourOwn from './BuildYourOwn/EditWorkout'
import { clearAll ,saveWorkout } from '../../Store/Action/WorkoutBuilderActions'

const useStyles = makeStyles((theme) => ({
  title: {
    color: '#6C6C6C',
  },
  cardHeader: {
    padding: '18px 16px'
  },
  cardAction: {
    justifyContent: 'center',
  },
  divider: {
    margin: '0 18px',
    backgroundColor: '#D0D0D0'
  },
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: 12,
    [theme.breakpoints.down('xs')]: {
      padding: '12px 8px',
    }
  },
  rootCard: {
    display: 'flex',
    flexDirection: 'column',
  },
  watermark: {
    '&:before': {
      content: '""',
      background: "url(/images/log_in/Gymfit-byGB.png) top center no-repeat",
      backgroundPosition: "50% 80%",
      backgroundSize: "50%",
      position: "absolute",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
      opacity: 0.2,
    },
  },
  card: {
    width: 480,
    borderRadius: 8,
    minHeight: 800,
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      minHeight: 710,
    }
  },
  saveButton: {
    backgroundColor: 'white',
    padding: '4px 30px',
    fontSize: '18px',
    color: '#656464',
    border: '#707070 solid 1px',
  }
}));

export default function DailyViewEmptyCard(props) {
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  const {
    currentCard,
    openLoadFavModal
  } = props;

  useEffect(() => {
    if (editMode) {
      setEditMode(false);
      dispatch(clearAll());
    }
     // eslint-disable-next-line
   }, [dispatch, currentCard])

  const RenderCardActions = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleEditMode = () => {
      setEditMode(!editMode);
      dispatch(clearAll())
      handleClose();
    }



    let component = null;
    if (props.isBuildYourOwn) {
      component = (
        <>
          <IconButton color="primary" component="span" onClick={handleClick}>
            <SettingsIcon style={{ fontSize: 24 }} />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            style={{ top: '25px' }}
          >
            <MenuItem key='close edit' onClick={handleEditMode}>Cancel</MenuItem>
            <MenuItem key='clear all' onClick={handleClose}>Clear All</MenuItem>
          </Menu>
        </>
      )
    }
    return component;
  }

  const handleSaveWorkout = () => {
    dispatch(saveWorkout(props.dateKeyIndex, props.dateKey))
    setEditMode(!editMode);
  }

  return (
    <div className={classes.root}>
      <Card className={clsx(classes.card, {[classes.watermark]: props.showWatermark && !editMode})} elevation={4}>
        <CardHeader
          title={
            <Typography variant='h5' className={classes.title}>
              {props.day}
            </Typography>
          }
          action={editMode ? <RenderCardActions /> : null}
          className={classes.cardHeader}
        />
        <Divider variant='fullWidth' className={classes.divider} />
        <CardContent className={classes.rootCard}>
          {
            props.isBuildYourOwn
              ? editMode
                ? <EditBuildYourOwn isMobileMode />
                : <BYOGenWorkout openLoadFavModal={openLoadFavModal} dateKeyIndex={props.dateKeyIndex} dateKey={props.dateKey} isDailyView={props.isDailyView} showEdit={() => setEditMode(true)} />
              : props.children
          }
        </CardContent>
        {
          editMode && <CardActions style={{ display: 'flex', justifyContent: 'center', padding: 32, paddingTop: 12 }}>
            <Button size='large' className={classes.saveButton} onClick={ handleSaveWorkout } >
              Save
            </Button>
          </CardActions>
        }
      </Card>
    </div>
  );
}
