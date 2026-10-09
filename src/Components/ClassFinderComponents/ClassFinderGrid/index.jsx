import React from 'react';
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
  const { filterArray, Checked, paramFilter, courseList } = props;

  // Derived during render: category page (rehab / strengthen / mobilize) first, then
  // every active filter group must match. Array fields match any checked key.
  const categoryList = paramFilter && ['rehab', 'strengthen', 'mobilize'].includes(paramFilter)
    ? courseList.filter(({ wp_postid }) => allIds[paramFilter].includes(wp_postid))
    : courseList;

  const children = categoryList.filter(course => filterArray.every(type => {
    const value = type === 'MySchedule' ? course.mySchedule : course[type];
    if (Array.isArray(value)) {
      const checkedKeys = Object.keys(Checked[type]).filter(key => Checked[type][key]);
      return value.some(attr => checkedKeys.indexOf(attr) >= 0);
    }
    return !!Checked[type][value];
  }));

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
          children.map(courseInfo => <CourseCards
            courseInfo={courseInfo}
            key={courseInfo.wp_postid}
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
