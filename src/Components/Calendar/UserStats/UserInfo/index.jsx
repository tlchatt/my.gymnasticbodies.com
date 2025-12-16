import React from 'react';
import { makeStyles, Card, CardHeader, Avatar, Typography} from '@material-ui/core';
import { connect } from 'react-redux';

import PlaceHolder from './1.jpg'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    padding: '0 14px 0 0',
    [theme.breakpoints.down('sm')]: {
      padding: '0 10px',
    },
    background: 'transparent'
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  headerOverRide: {
    padding: 0,
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      lineHeigh: 1.2
    }
  }
}))

const StatBox = props => {
  const classes = useStyles();
  return (
    <Card className={classes.root} elevation={0}>
      <CardHeader
        classes={{
          root: classes.headerOverRide
        }}
        avatar={
          <Avatar aria-label="recipe" className={classes.large} src={PlaceHolder}/>
        }
        title={<Typography variant='h6' className={classes.title}>{props.firstName}</Typography>}
        subheader='More Details?'
      />
      </Card>
  )
}

const mapStateToProps = state => {
  return {
    firstName: state.login.firstName,
  }
}

export default connect(mapStateToProps)(StatBox);
