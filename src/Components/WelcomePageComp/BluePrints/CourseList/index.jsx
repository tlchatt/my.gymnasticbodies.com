import React from "react";
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core";

import List from "@material-ui/core/List";
import AllAccessList from './AllAccessList';
import Thrive from './Thrive'
import BluePrintsListItem from './BluePrintsListItem'


const useStyles = makeStyles((theme) => ({
  icon: {
    width: "24px",
    height: "24px",
  },
  iconsRoot: {
    minWidth: "24px",
    marginRight: "8px",
  },
  list: {
    marginLeft: "24px",
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0
    }
  },
  gfListTitle: {
    color: "white",
    fontWeight: 300,
  },
  titlePointer: {
    cursor: 'pointer'
  },
  sup: {
    fontSize: "1rem",
    bottom: "0.375rem",
    left: "0.125rem",
    position: "relative",
  },
  listItem: {
    alignItems: "baseline",
  },
  subList: {
    paddingLeft: 0
  },
  paddingBottomZero: {
    paddingBottom: 0
  }
}));

const CourseList = (props) => {
  const classes = useStyles();
  return (
    <List aria-labelledby="nested-list-subheader" className={classes.list}>
      {
        props.hasTasks
          ? <BluePrintsListItem
              listText="Your Workout Schedule"
              to="/dashboard" iconUrl="calendar.svg"
              alt="Calendar Icon"
              classes={classes}
            />
          : null
      }
      <AllAccessList classes={classes} />
      <Thrive classes={classes} />
    </List>
  );
};

const mapStateToProps = state => {
  return {
    hasTasks: Object.keys(state.calendar.tasks).length
  }
}

export default connect(mapStateToProps)(React.memo(CourseList));

