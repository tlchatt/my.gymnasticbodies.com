import React, {useState} from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

// Util Imports
import Aux from '../../HOC/aux';

// Custom Components
import TitleSection from './TitleSeciton'
import Schedule from './Schedule'
import DetailedView from './DetailedView'
// import UserStats from './UserStats'

const useSytles = makeStyles(theme => ({
  root: {
    padding: 8,
  },
  start: {
    fontSize: '1.125rem',
    height: '48px',
    lineHeight: '48px',
    padding: '0 16px',
    letterSpacing: 1
  },
  textCenter: {
    textAlign: 'center'
  }
}))

const Calendar = (props) => {
  const classes = useSytles();
  const [deatiledView, setDetailedView] = useState( props.isOpen ? props.isOpen : false);


  const handleDetailedView = () => {
    setDetailedView(!deatiledView);
  }

  return (
    <Aux>
      <TitleSection handleDetailed={handleDetailedView} isOpen={deatiledView} />
      {/* <UserStats/> */}
      <Grid item xs={12} sm={12} md={12} lg={12} className={`${classes.root} ${classes.textCenter}`}>
        <Schedule isDetailView={deatiledView}/>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.root}>
        <Collapse timeout={200} in={deatiledView} >
          <DetailedView/>
        </Collapse>
      </Grid>
    </Aux>
  )
}

export default React.memo(Calendar);
