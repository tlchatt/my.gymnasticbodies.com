import React,{useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import Box from '@material-ui/core/Box'
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';

import { deleteCategory, addNewCategory, fetchFreeMember } from '../../../Store/Action/FreeMemberActions'
import { AxiosConfig } from '../../../Store/util';

import GymfitSlider from './GymfitSlider';

import ProgButton from './ProgButtons'

const useStyles = makeStyles((theme) => ({
  buttonsContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontFamily: 'Helvetica Neue, "Open Sans", Arial, sans-serif',
    color: '#FF9435',
    textTransform: 'uppercase',
    fontWeight: 400,
  },
  button: {
    padding: '4px 30px',
    fontSize: '18px',
    margin: '12px 32px',
    border: 'dashed 1px black',
    [theme.breakpoints.up(425)]: {
      margin: '12px 18px',
    }
  },
  disabled: {
    border: 'none',
  },
  sliderContainer: {
    overflow: 'initial',
    maxWidth: '80%',
    margin: '24px auto 0',
    width: '100%'
  }
}));


const categoryNames = [
  {
    name: 'Pull',
  },
  {
    name: 'Push',
  },
  {
    name: 'Core',
  },
  {
    name: 'Legs',
  },
  {
    name: 'Mobility',
  }
];



export default function ResponsiveDialog(props) {
  const classes = useStyles();
  const {
    open,
    handleClose,
    dayOfWeek,
    currentDateIndex
  } = props;

  // Redux
  const dispatch = useDispatch();
  const dayView = useSelector(state => state.freeMember.dayView);
  const webToken = useSelector(state => state.login.webToken);
  const UserId = useSelector(state => state.login.UserId)

  // State
  const [addMode, setAddMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLevel, setCurrentLevel] = useState('');
  const [isFreeMember, setIsFreeMember] = useState(false);
  const [showFreeMemberMessage, setShowFreeMemberMessage] = useState(false);

  // Constants
  const categories = dayOfWeek && dayView[dayOfWeek].exerciseListForDay ? dayView[dayOfWeek].exerciseListForDay.map(item => {
    return { category: item.category, samplerId: item.autoPilotId }
  }) : [];

  // useEffect
  useEffect(() => {
    if (open) {
      Axios(AxiosConfig('get', `/auto-pilot/level/users/${UserId}`, webToken)).then(res => {
        setIsFreeMember((res.data.isFreeMember === 'true'));
        setCurrentLevel(res.data.apUserLevel);
      }).then(() => setIsLoading(false))
        .catch(err => console.log(err));
    }
  }, [open, UserId, webToken])

  // Handlers
  const handleDelete = (samplerId) => {
    dispatch(deleteCategory(samplerId, currentDateIndex, dayOfWeek));
  }

  const hanldeAdd = (name) => {
    dispatch(addNewCategory(name, currentDateIndex, dayOfWeek));
    setAddMode(false);
  }

  const handleCloseModal = () => {
    setShowFreeMemberMessage(false);
    setAddMode(false);
    setCurrentLevel('')
    handleClose();
  }

  const onChangeCommitted = (e, value) => {
    console.log(value);
    if (isFreeMember && 2 <= value) {
      setShowFreeMemberMessage(true);
      setCurrentLevel(value);
    } else {
      if (showFreeMemberMessage) {
        setShowFreeMemberMessage(false);
      }
      Axios(AxiosConfig('post', `/auto-pilot/level/${value}/users/${UserId}`, webToken)).then(res => {
        dispatch(fetchFreeMember());
        setCurrentLevel(value);
      }).catch(err => console.log(err));
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleCloseModal}
      fullWidth={true}
      maxWidth='sm'
      aria-labelledby="responsive-dialog-title"
    >
      {
        isLoading
          ? <CircularProgress />
          : <>
            <Box mt={2} />
            <DialogTitle id="responsive-dialog-title" disableTypography className={classes.title}>
              <Typography align='center' variant='h6' className={classes.title}>
                {
                  addMode ? 'Add a new exercise Category' : 'Edit exercise categories'
                }
              </Typography>
            </DialogTitle>

            {
              addMode
                ? null
                : <DialogContent className={classes.sliderContainer}>
                  <GymfitSlider currentLevel={currentLevel} onChangeCommitted={onChangeCommitted} isFreeMember={isFreeMember} />
                  {
                    showFreeMemberMessage
                      ? <>
                        <Box mt={2} />
                        <Typography variant='h6' align='center' style={{ color: '#656464' }}>{currentLevel === 5 ? 'All Levels are' : `Level ${currentLevel} and higher is`}  available to Premium Subscribers.</Typography>
                      </>
                      : null
                  }
                </DialogContent>
            }

            <DialogContent className={classes.buttonsContent}>
              {
                addMode
                  ? categoryNames.map(({ name }, index) => (<ProgButton buttonText={name} key={index} handleAction={() => hanldeAdd(name)} icon={<AddIcon style={{ fontSize: 28 }} />} />))
                  : categories.map(({ category, samplerId }, index) => (<ProgButton buttonText={category} key={index} handleAction={() => handleDelete(samplerId)} />))
              }
              {
                !addMode
                  ? <Button disabled={(categories.length >= 5)} onClick={() => setAddMode(true)} classes={{ disabled: classes.disabled }} className={classes.button} startIcon={!categories.length >= 5 && <AddIcon style={{ fontSize: 28 }} />}>
                    {categories.length >= 5 ? 'Max of 5, Delete a category to add another' : 'Add Category'}
                  </Button>
                  : <Button onClick={() => setAddMode(false)} className={classes.button} startIcon={<ClearIcon style={{ fontSize: 28 }} />}>
                    Cancel
                  </Button>
              }
            </DialogContent>
          </>
      }
      <Box mt={2} />
    </Dialog>
  );
}
