import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { handleNotes } from '../../../../../Store/Action/LegacyAction'
import { SaveNotesLevels, SaveNotesLevelsNew } from '../../../../../Store/Action/LevelsActions'

const useStyles = makeStyles({
  textArea: {
    width: '-webkit-fill-available',
    margin: '12px 12px 8px 12px'
  },
  buttonsSection: {
    padding: '0 12px',
    justifyContent: 'flex-end',
    display: 'flex'
  },
  cancleButton: {
    marginRight: 4
  }
});

const Notes = props => {
  const classes = useStyles();
  const [note, setNote] = useState('');
  const { notes } = props.data;
  const dispatch = useDispatch();

  useEffect(() => {
    if (notes) {
      setNote(notes)
    }
  }, [notes]);

  const handleSaveNotes = () => {
    if (props.isLevels) {
      if(props?.data?.masterySteps){
        dispatch(SaveNotesLevels(note, props?.data?.exerciseId, props?.data?.masterySteps[props?.data?.stepNo], props?.dateKeyIndex))
      } 
      
      dispatch(SaveNotesLevelsNew(note, props))
    }
    else {
      dispatch(
        handleNotes(
          note,
          props.data.exerciseId,
          props.data.masterySteps[props.data.stepNo],
          props.data.date,
          props.data.section,
          props.data.levelKey
        )
      );
    }
    props.handleClose();
  }

  return (
    <Grid container>
      <TextField
        className={classes.textArea}
        label="Notes"
        multiline
        rows={3}
        variant="outlined"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <div className={classes.buttonsSection}>
          <Button onClick={props.handleClose} className={classes.cancleButton}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSaveNotes}>Save</Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default Notes;
