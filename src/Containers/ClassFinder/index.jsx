import React, {useState} from 'react';
import { Grid, makeStyles, Divider, Hidden } from '@material-ui/core';

// Util Components
import GridContainer from '../../Components/UtilComponents/Mui-GridContainer';
import Container from '../../Components/UtilComponents/Container';

// Custom Compnents
import Calendar from '../../Components/Calendar';
import ClassFinderGrid from '../../Components/ClassFinderComponents/ClassFinderGrid';
import Filters from '../../Components/ClassFinderComponents/Filter'
import MobileFilter from '../../Components/ClassFinderComponents/Filter/FilterDrawer'


const useStyles = makeStyles(theme => ({
  divider: {
    width: '100%',
  },
  padding: {
    padding: '0 8px 8px 8px '
  },
  background: {
    background: '#eeeeee'
  }
}));

const ClassFinder = props => {
  const classes = useStyles();
  const initialState = {
    difficulty: {
      Beginner: false,
      Moderate: false,
      Intermediate: false,
      Advanced: false,
    },
    type: {
      Warmup: false,
      Strength: false,
      Mobility: false,
      Movement: false,
    },
    duration: {
      Short: false,
      Medium: false,
      Long: false
    },
    MySchedule: {
      MySchedule: false
    }
  };

  const [Checked, setChecked] = useState(initialState)
  const [filterArray, setFilterArray] = useState([]);

  const handleChange = (event, name) => {
    let newObj = {};

    for (let key in Checked[event.target.dataset.filtertype]) {
      newObj[key] = key === name ? event.target.checked : false;
    }

    setChecked({
      ...Checked,
      [event.target.dataset.filtertype]: {...newObj}
    });

    if (event.target.checked) {
      let temp = [...filterArray, event.target.dataset.filtertype];
      setFilterArray(temp.filter((item, pos) => temp.indexOf(item) === pos ))
    }
    else {
      let temp = filterArray.filter(i => i !== event.target.dataset.filtertype);
      setFilterArray(temp);
    }
  };


  const handleReset = () => {
    setChecked(initialState);
    setFilterArray([]);
  }

  return (
    <Container addedClasses={classes.background}>
      <GridContainer elevation={2} addbackground={true}>
        <Calendar/>
        <Divider className={classes.divider} />
        <Grid container>
          <Hidden only={['xs', 'sm']}>
            <Grid item className={classes.padding} xs={false} sm={false} md={3} lg={3} xl={3}>
              <Filters hideType={props.match.params.category ? true : false} handleFilters={handleChange} checked={Checked} reset={handleReset}/>
            </Grid>
          </Hidden>
          <Hidden only={['md', 'lg', 'xl']}>
            <MobileFilter hideType={props.match.params.category ? true : false} handleFilters={handleChange} checked={Checked} reset={handleReset}/>
          </Hidden>
          <Grid item className={classes.padding} xs={12} sm={12} md={9} lg={9} xl={9}>
            <ClassFinderGrid filterArray={filterArray} paramFilter={props.match.params.category ? props.match.params.category : false} Checked={Checked}/>
          </Grid>
        </Grid>
      </GridContainer>
    </Container>
  )
}

export default ClassFinder;
