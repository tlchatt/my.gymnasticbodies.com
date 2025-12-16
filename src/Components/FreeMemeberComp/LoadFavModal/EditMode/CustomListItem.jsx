import React, { useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Grow from '@material-ui/core/Grow';
import { useDispatch } from 'react-redux';

import red from '@material-ui/core/colors/red';

import { deleteSavedWorkout } from '../../../../Store/Action/FreeMemberActions';
import { deleteFavoriteWorkoutBYO } from '../../../../Store/Action/WorkoutBuilderActions';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[600],
    },
  },
  removeButton: {
    backgroundColor: red[500],
    color: 'white',
    '&:hover': {

      backgroundColor: red[600],
    },
  },
}));

const CustomListItem = (props) => {
  const classes = useStyles();
  const [showDelete, setShowDelete] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (props.isBuildYourOwn) {
      dispatch(deleteFavoriteWorkoutBYO(props.favoriteId));
    }
    else {
      dispatch(deleteSavedWorkout(props.favoriteId));
    }
    if (props.savedWorkoutsLength === 1) {
      props.handleCloseEdit();
    }
  }


  return (
    <ListItem>
      <ListItemAvatar>
        <IconButton className={classes.removeButton} size="small" variant="contained" onClick={() => setShowDelete(!showDelete) }>
          { showDelete ? <CloseIcon fontSize='inherit'/> : <RemoveIcon fontSize='inherit' />}
        </IconButton>
      </ListItemAvatar>
      <ListItemText
        primary={props.title}
        secondary={props.description}
      />
      <ListItemSecondaryAction>
      <Grow in={showDelete}>
          <Button variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Delete
          </Button>
          </Grow>
        </ListItemSecondaryAction>
    </ListItem>
  );
}

export default CustomListItem;
