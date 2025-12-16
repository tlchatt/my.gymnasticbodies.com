import React, {useState, useEffect} from 'react';
import { Grid, makeStyles, Divider, Typography } from '@material-ui/core';
import { connect } from 'react-redux';

// Custom Compnents
import CourseCards from '../ClassFinderCards'
import Aux from '../../../HOC/aux';

import { allIds } from './tempUtils';

const useStyles = makeStyles(theme => ({
  padding: {
    padding: 8
  },
  divider: {
    marginBottom: 8,
    marginTop: 8
  },
  total: {
    fontFamily: '"Oswald", "Open Sans", sans-serif',
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 1,
    margin: '24px 0',
    letterSpacing: 0.4
  }

}));

const ClassFinderGrid = props => {
  const classes = useStyles();
  // eslint-disable-next-line
  const [children, setChildren] = useState([]);

  const { filterArray, Checked } = props;

  const filterCourses = (courseList = props.courseList) => {
    let itemsArray;
    if (filterArray.length) {
      itemsArray = courseList.map(a => ({ ...a, MySchedule: a.mySchedule }));

      itemsArray.forEach(course => {
        course.show = filterArray.every(type => {
          if (Array.isArray(course[type])) {
            let checkedKeys = Object.keys(Checked[type]);

            checkedKeys = checkedKeys.filter(key => Checked[type][key])

            return course[type].some(attr => checkedKeys.indexOf(attr) >= 0)
          }
          else {
            return Checked[type][course[type]]
          }
        })
      });

      itemsArray = itemsArray.filter(i => i.show === true)
    }
    else {
      if (props.paramFilter && ['rehab', 'strengthen', 'mobilize' ].includes(props.paramFilter)) {
        let arr = props.courseList.filter(({ wp_postid }) => allIds[props.paramFilter].includes(wp_postid));
        return arr
      }
      return props.courseList;
    }
    return itemsArray;
  }

  useEffect(() => {
    if (props.paramFilter && ['rehab', 'strengthen', 'mobilize' ].includes(props.paramFilter) ) {
      let arr = props.courseList.filter(({ wp_postid }) => allIds[props.paramFilter].includes(wp_postid));
      setChildren(filterCourses(arr));
    }
    else {
      setChildren(filterCourses());
    }
    // eslint-disable-next-line
  }, [filterArray, props.courseList]);

  useEffect(() => {
    if (props.paramFilter && ['rehab', 'strengthen', 'mobilize' ].includes(props.paramFilter)) {
      let arr = props.courseList.filter(({ wp_postid }) => allIds[props.paramFilter].includes(wp_postid));

      if (filterArray.length) {
        setChildren(filterCourses(arr))
      }
      else setChildren(arr);
    }
    else {
      if (filterArray.length) {
        setChildren(filterCourses())
      }
      else setChildren(props.courseList);
    }
    // eslint-disable-next-line
  }, [props.courseList, props.paramFilter])


  return (
    <Aux>
      <Grid container justifyContent='center'>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant='h4' className={classes.total}>
            Showing {children.length} Results
          </Typography>
          <Divider className={classes.divider}/>
        </Grid>
        {
          children.map((courseInfo, index) => <CourseCards
            courseInfo={courseInfo}
            key={index}
            img={courseInfo.image_url}
            addClass={courseInfo.show ? 'fadeIn' : 'fadeOut'}
          />)
        }
      </Grid>
    </Aux>
  )
}

const mapStateToProps = state => {
  return {
    courseList: state.classes
  }
}

export default connect(mapStateToProps)(ClassFinderGrid);
