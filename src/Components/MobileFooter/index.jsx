import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import { LinkRef } from '../UtilComponents/LinkOverride'
import {withRouter} from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    borderTop: '1px solid #dddd'
  }
});

function SimpleBottomNavigation(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    switch (props.location.pathname) {
      case '/':
        setValue(0);
        break;
      case '/class-finder':
        setValue(1);
        break;
      case '/history':
        setValue(2);
        break
      default:
        setValue(0);
        break
    }
  },[props.location.pathname])

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Home" icon={<HomeIcon />} component={LinkRef} to='/' />
      <BottomNavigationAction label="Class Finder" icon={<CalendarTodayIcon/>} component={LinkRef} to='/class-finder'/>
      <BottomNavigationAction label="History" icon={<FindInPageIcon />} component={LinkRef} to='/history' />
    </BottomNavigation>
  );
}

export default withRouter(SimpleBottomNavigation);
