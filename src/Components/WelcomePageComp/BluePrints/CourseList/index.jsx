import React, { useState } from "react";
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core";

import List from "@material-ui/core/List";
import AllAccessList from './AllAccessList';
import SingleCourse from './SingleCourse'
import Thrive from './Thrive'
import AddToScheduleModal from '../../../Calendar/DetailedView/AddToScheduleModal'
import BluePrintsListItem from './BluePrintsListItem'
import PlanAccessList from './PlanAccessList'


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
  const [modalInfo, setModalInfo] = useState({
    isOPen: false,
    img: '',
    title: '',
    wpId: ''
  });

  const { allClasses, isAllAccessUser, isThriveUser } = props;

  const handleModal = (img, title, wpId) => {
    setModalInfo({
      isOPen: true,
      img,
      title,
      wpId
    })
  }

  const handleClose = () => {
    setModalInfo({
      isOPen: false,
      img: '',
      title: '',
      wpId: ''
    })
  }

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
      {
        !isAllAccessUser
          ? <BluePrintsListItem
              listText="Equipment List"
              to="/eqiupment-list"
              iconUrl="dumbbell.svg"
              alt="Dumbbell Icon"
              classes={classes}
            />
          : null
      }
      {
        !isAllAccessUser && props.hasPlansAccess
          ? <PlanAccessList classes={classes} />
          : null
      }
      {
        isThriveUser && !isAllAccessUser
          ? <Thrive classes={classes} />
          : null
      }
      {
        isAllAccessUser
          ? <AllAccessList classes={classes} />
          : allClasses.map(
            (course, index) => course.classInfo
              ? <SingleCourse
                  wpId={course.wp_postid}
                  classes={classes}
                  title={course.classInfo.title}
                  icon={course.image_url}
                  key={index}
                  classIndex={index}
                  handleEdit={handleModal}
                  CourseInfo={course}
                />
              : null
          )
      }
      {
        isThriveUser && isAllAccessUser
          ? <Thrive classes={classes} />
          : null
      }
      {
        isAllAccessUser
          ? null
          : <AddToScheduleModal
              img={modalInfo.img}
              title={modalInfo.title}
              open={modalInfo.isOPen}
              wpId={modalInfo.wpId}
              handleClose={handleClose}
            />
      }
    </List>
  );
};

const mapStateToProps = state => {
  return {
    allClasses: state.classes,
    isAllAccessUser: state.login.isAllAccessUser,
    isThriveUser: state.login.isThriveUser,
    hasPlansAccess: state.login.integratedPlans ? state.login.integratedPlans.userAccessLevels.length : false ,
    hasTasks: Object.keys(state.calendar.tasks).length
  }
}

export default connect(mapStateToProps)(React.memo(CourseList));

