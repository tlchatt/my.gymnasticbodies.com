import React from 'react';
import { makeStyles } from '@material-ui/core'
// import { useSelector } from 'react-redux';

// Util Components
import GridContainer from '../../Components/UtilComponents/Mui-GridContainer';
import Container from '../../Components/UtilComponents/Container'

// Custom Compnents
import Calendar from '../../Components/Calendar';

const useStyles = makeStyles(theme => ({
  containerColor: {
    background: '#eeeeee'
  }
}))

const Dashboard = () => {
  const classes = useStyles();
  // using redux because thie value is strored on back end and by doing this gives option to update on back end
  // const detailedView = useSelector(state => state.login.detailedView);

  return (
    <Container addedClasses={classes.containerColor}>
      <GridContainer elevation={2} addbackground={true}>
        <Calendar isOpen={true} />
      </GridContainer>
    </Container>
  )
}



export default Dashboard;
