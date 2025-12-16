import React, { useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles, Typography, Button, CircularProgress } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';

import ExceriseCard from './ExceriseCard'
import EditModal from '../LegacyEditModal';
import LegacyWorkoutPLayer from './LegacyVideoPlayer'
import NoProgNotice from './NoProgNotice'

import { GetUserPorgressions, Reset, CloseModal as CloseEditModal } from '../../Store/Action/LegacyAction';
import { getLegacyDataBYO, openEditLegacyModalBYO } from '../../Store/Action/WorkoutBuilderActions';

const FOUNDATION = ['Core', 'Upper Body', 'Lower Body'];

const useSytles = makeStyles(theme => ({
  padding: {
    padding: 0,
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
  rootOverRide: {
    padding: '24px 0',
    width: '100%',
    margin: '16px',
    maxWidth: '100%',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(0.5),
    top: theme.spacing(0.5),
    color: 'white',
  },
  modalHead: {
    margin: 0,
    padding: '12px 16px',
    color: 'white',
    background: blue[600]
  },
  editButton: {
    position: 'absolute',
    right: '60px',
    top: '10px',
  },
  followAlong: {
    position: 'absolute',
    right: '179px',
    top: '10px',
    [theme.breakpoints.down('769')]: {
      right: '130px',
    }
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    padding: 40
  }
}))

const LegacyWorkoutModal = props => {
  const dispatch = useDispatch();
  const legacyCourseData = useSelector(state => state.legacyCourse.selectedProgessions);
  const loading = useSelector(state => state.legacyCourse.loading);
  const userTimeZone = useSelector(state => state.login.timezone);

  const showEditModal = useSelector(state => state.legacyCourse.showEditModal);

  const [playerOpen, setPlayerOpen] = React.useState(false);
  const [playerData, setplayerData] = React.useState({});
  const [openEdit, setOpenEdit] = React.useState(false);
  const [followAlongArray, setFollowAlongArray] = React.useState([]);
  const [isFollowAlong, setIsFollowAlong] = React.useState(false);

  const classes = useSytles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { courseName, open, date, isBuildYourOwn, dateIndex } = props;

  useEffect(() => {
    if (courseName && open) {
      let fixedCourseName = courseName.replace('Foundation ', '');
      if (isBuildYourOwn) {
        dispatch(getLegacyDataBYO(fixedCourseName, dateIndex));
      }
      else {
        let DayOfmonth = date ? date : moment().tz(userTimeZone).format('YYYY-MM-DD');
        dispatch(GetUserPorgressions(fixedCourseName, DayOfmonth));
      }
    }
  }, [courseName, open, date, dispatch, userTimeZone, isBuildYourOwn, dateIndex]);

  useEffect(() => {
    // This makes sure that the follow along is only for level one and foundation.
    async function createFollowAlongPlaylist() {
      if (FOUNDATION.includes(courseName.replace('Foundation ', ''))) {
        let filteredVideos = legacyCourseData.filter(item => item.levelKey === 'LEVEL 1');

        let followAlongArrayPromise = [];
        filteredVideos.forEach(prog => {
          if (prog.workoutInfo.Strength) {
            followAlongArrayPromise = [...followAlongArrayPromise, { file: `https://content.jwplatform.com/feeds/${prog.workoutInfo.Strength.videos[0].videoName}` }]
          }
        });

        try {
          var data = await Promise.all(
            followAlongArrayPromise.map(({ file }) => fetch(file).then(async res => {
              let data = await res.json();
              let arrayOfSources = data.playlist[0].sources.filter(({ type }) => type === "video/mp4");
              return {
                sources: arrayOfSources.reverse(),
                image: data.playlist[0].image
              }
            }))
          )
          return data;
        } catch (err) {
          console.log(err);
        }
      } else {
        return [];
      }
    }
    if (open) {
      async function getData() {
        let data = await createFollowAlongPlaylist();
        setFollowAlongArray(data ? data : []);
      }
      getData()
    }
  }, [legacyCourseData, courseName, open])

  const handleClickOpen = () => {
    if (isBuildYourOwn) {
      dispatch(openEditLegacyModalBYO())
    }
    else {
      setOpenEdit(true);
    }
  };
  const handleEditClose = () => {
    if (isBuildYourOwn) {
      dispatch(CloseEditModal())
    }
    setOpenEdit(false);
  };

  const handlePlayer = (videoData) => {
    setPlayerOpen(true);
    setplayerData(videoData);
  };
  const playerHandleClose = () => {
    setPlayerOpen(false);
    setplayerData({});
    setIsFollowAlong(false);
  };

  const legacyModalClose = () => {
    if (!isBuildYourOwn) {
      props.close();
    }
    dispatch(Reset());
  }

  const openFollowALong = () => {
    setIsFollowAlong(true);
    setPlayerOpen(true)
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={legacyModalClose}
        maxWidth='md'
        fullWidth={true}
        fullScreen={fullScreen}
        scroll='body'
      >
        <MuiDialogTitle disableTypography className={classes.modalHead}>
          <Typography variant="h6">{courseName}</Typography>
          {
            loading
              ? null
              : <>
                {
                  followAlongArray.length
                    ? <Button variant="contained" className={classes.followAlong} onClick={openFollowALong}>{fullScreen ? 'Play' : 'Follow Along'}</Button>
                    : null
                }
                  <Button variant="contained" className={classes.editButton} onClick={handleClickOpen}>
                    {fullScreen ? 'Edit' : 'Edit Workout'}
                  </Button>
                </>

          }
          <IconButton aria-label="close" className={classes.closeButton} onClick={legacyModalClose}>
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        {
          loading
          ? <div className={classes.loading}>
              <CircularProgress color='primary' />
            </div>
            : <DialogContent classes={{ root: classes.padding }}>
              {
                legacyCourseData?.length
                  ? legacyCourseData.map((prog, index) =>
                    <ExceriseCard
                      key={index}
                      handlePlayer={handlePlayer}
                      date={date ? date : moment().tz(userTimeZone).format('YYYY-MM-DD')}
                      handleEditOpen={handleClickOpen}
                      courseName={courseName}
                      {...prog}
                    />
                  )
                  : <NoProgNotice/>
              }
            </DialogContent>
        }
      </Dialog>
      {
        (openEdit || showEditModal) && <EditModal open={openEdit || showEditModal} handleClose={handleEditClose} date={date ? date : moment().tz(userTimeZone).format('YYYY-MM-DD')} />
      }
      <LegacyWorkoutPLayer followAlong={followAlongArray} isFollowAlong={isFollowAlong} playerData={playerData} open={playerOpen} handleClose={playerHandleClose} />
    </React.Fragment>
  );
}

export default LegacyWorkoutModal;
