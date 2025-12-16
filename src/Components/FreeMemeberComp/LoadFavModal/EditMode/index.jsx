import React from 'react';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';

import CustomListItem from './CustomListItem';

const EditMode = (props) => {
  const { savedWorkouts, handleCloseEdit} = props;
  return (
    <Grid>
      <List>
        {
          savedWorkouts.map((workout, index) => <CustomListItem savedWorkoutsLength={savedWorkouts.length} handleCloseEdit={handleCloseEdit} isBuildYourOwn={props.isBuildYourOwn} {...workout} key={index}/>)
        }
      </List>
    </Grid>
  );
}

export default EditMode;
