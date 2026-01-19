import React, { useEffect } from 'react';
import {
  makeStyles,
  Card,
} from '@material-ui/core'

import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import SettingsIcon from '@material-ui/icons/Settings';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { useDispatch, useSelector } from 'react-redux';
import { handleDeleteProgression, handleAddProgression } from '../../../Store/Action/LegacyAction'
import { OpenModal } from '../../../Store/Action/DemoModalActions'

import StepsList from './StepsList'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  paper: {
    width: '100%',
    display: 'flex',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0px 2px 4px -1px rgba(30,136,229,0.2), 0px 4px 5px 0px rgba(30,136,229,0.14), 0px 1px 10px 0px rgba(30,136,229,0.12)'
    },
    position: 'relative'
  },
  checkMark: {
    position: "absolute",
    bottom: 8,
    right: 8,
    color: '#bdbdbd',
    fontSize: 33
  },
  selected: {
    color: '#4caf50',
  },
  avatar: {
    backgroundColor: red[500]
  },
  media: {
    height: 0,
    paddingTop: '65.25%', // 16:9
  },
  cardHead: {
    padding: 8,
    height: '100%'
  },
  actionOverride: {
    margin: 0
  },
  avatarOverride: {
    marginRight: 8
  },
  content: {
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  title: {
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  }
}))
// onClick={() => props.handleDrawer(`${props.groupName}${props.index + 1} - SomeName`)
const EditCard = props => {
  const classes = useStyles();
  const theme = useTheme();

  const phoneScreen = useMediaQuery(theme.breakpoints.down(415));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const disptach = useDispatch();
  const { progression } = props;
  const [progId, setProgId] = React.useState();
  const postAWS = useSelector(state => state.login.postAWS)
  useEffect(() => {
    if (progression.stepNo) {
      setProgId(progression.masterySteps[progression.stepNo].masterySetId);
    }
    else {
      setProgId(progression.masterySteps[1].masterySetId);
    }
  }, [progression])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    disptach(handleDeleteProgression(progression.exerciseId, props.isLevels));
    setAnchorEl(null);
  }

  const handleDropDown = (e) => {
    setProgId(parseInt(e.target.value))
  }

  const handleAdd = () => {
    console.log("progression.exerciseId", progression.exerciseId)
    console.log("progId", progId)
    console.log("props.date", props.date)
    console.log("props.isLevels", props.isLevels)
    disptach(handleAddProgression(progression.exerciseId, progId, props.date, props.isLevels));
    setAnchorEl(null);
  }

  return (
    <Card className={classes.root} elevation={3}>
      <CardHeader
        className={classes.cardHead}
        classes={{
          action: classes.actionOverride,
          avatar: classes.avatarOverride,
          content: classes.content,
          title: classes.title
        }}
        avatar={
          <Avatar aria-label={props.groupName} className={classes.avatar}>
            {progression.exerciseNotation}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" style={{ padding: phoneScreen ? 4 : 12 }} onClick={handleClick} color='primary'>
            <SettingsIcon />
          </IconButton>
        }
        title={progression.name}
        subheader={`${props.index + 1} of ${props.outOf}`}
      />
      <CardMedia
        className={classes.media}
        image={`https://gymfit-images.s3.amazonaws.com/exercises/${progression.image.split('.').join('').toUpperCase()}.jpg`}
      />
      <CheckCircleIcon className={`${classes.checkMark} ${progression.selected ? classes.selected : null}`} />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {
          progression.selected
            ? [
              !postAWS ? <MenuItem onClick={handleDelete} key='Remove'>Remove</MenuItem> : null,
              <MenuItem onClick={() => disptach(OpenModal(progression.exerciseId))} key='See Demo'>See Demo</MenuItem>,
              !postAWS ? 
              <MenuItem onClick={handleAdd} key='Update'>Update Step</MenuItem> : null,
              !postAWS ?  <MenuItem key='Add DropDown'>
                <FormControl>
                  <InputLabel id="step-native-simple">Steps</InputLabel>
                  <Select
                    inputProps={{
                      name: 'step',
                      id: 'step-native-simple',
                    }}
                    native={true}
                    value={progId}
                    onChange={handleDropDown}
                  >
                    <StepsList steps={progression.masterySteps} />
                  </Select>
                </FormControl>
              </MenuItem> : null,
            ]
            : [
              !postAWS ?
                <MenuItem onClick={handleAdd} key='Add Button'>Add</MenuItem>
                : null,
              <MenuItem onClick={() => disptach(OpenModal(progression.exerciseId))} key='See Demo'>See Demo</MenuItem>,
              !postAWS ? 
              <MenuItem key='Add DropDown'>
                <FormControl>
                  <InputLabel id="step-native-simple">Steps</InputLabel>
                  <Select
                    inputProps={{
                      name: 'step',
                      id: 'step-native-simple',
                    }}
                    native={true}
                    value={progId}
                    onChange={handleDropDown}
                  >
                    <StepsList steps={progression.masterySteps} />
                  </Select>
                </FormControl>
              </MenuItem> : null
            ]
        }
      </Menu>
    </Card>
  )
}

export default React.memo(EditCard);
