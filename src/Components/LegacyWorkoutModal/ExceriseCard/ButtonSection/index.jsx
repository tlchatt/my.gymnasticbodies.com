import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { green, red } from '@material-ui/core/colors';
import { ManageDiffculty } from '../../../../Store/Action/LegacyAction';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
  buttons: {
    justifyContent: 'space-evenly'
  },
  upIcon: {
    color: green[600]
  },
  downIcon: {
    color: red[500]
  },
  disabled: {
    color: '#4caf50 !important'
  }
});

const ButtonSection = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, SetLoading] = React.useState(false);

  const { date, exerciseId } = props

  const handleDifficulty = async (type) => {
    SetLoading(true)
    await dispatch(ManageDiffculty(type, exerciseId, date));
  }

  React.useEffect(() => {
    if (loading) {
      SetLoading(false)
    }
    // eslint-disable-next-line
  } , [props.stepNo])

  const difficultyButtons = (
    props.workoutInfo.WarmUp || props.isStretchFollow
      ? null
      : <>
        <Button disabled={props.stepNo === 9 || props.isLogged || loading} onClick={() => handleDifficulty('up')}>
          Difficulty
        <ExpandLessIcon className={classes.upIcon} />
        </Button>
        <Button disabled={props.stepNo === 1 || props.isLogged || loading} onClick={() => handleDifficulty('down')}>
          Difficulty
        <ExpandMoreIcon className={classes.downIcon} />
        </Button>
      </>
  )

  return (
    <CardActions className={classes.buttons}>
      { difficultyButtons }
      <Button onClick={() => props.hanldleDropDown('notes')}>
        { props.notes ? <EditOutlinedIcon />: <NoteAddOutlinedIcon /> }
        Notes
      </Button>
      <Button disabled={props.isLogged} onClick={() => props.hanldleDropDown('log')} classes={{disabled: classes.disabled}}>
        <ListAltIcon />
        {props.isLogged ? 'Logged' : 'Log'}
      </Button>
    </CardActions>
  );
}

export default ButtonSection;
