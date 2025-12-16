import React from 'react';
import { makeStyles, Card, CardHeader, Avatar, Typography, Hidden} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    padding: '0 14px',
    [theme.breakpoints.down('sm')]: {
      padding: '4px 14px',
    },
    background: 'transparent'
  },
  large: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    background: 'transparent',
    color: 'black'
  },
  headerOverRide: {
    padding: 0,
  },
  avatarOverride: {
    marginRight: 0
  },
  title: {
    letterSpacing: '.5px',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      lineHeigh: 1.2
    }
  },

}))

const StatBox = props => {
  const classes = useStyles();
  return (
    <Card className={classes.root} elevation={0}>
      <CardHeader
        classes={{
          root: classes.headerOverRide,
          avatar: classes.avatarOverride,
        }}
        avatar={
          <Hidden only={['md', 'lg', 'xl']}> <Avatar aria-label="recipe" className={classes.large}> {props.icon} </Avatar> </Hidden>
        }
        title={<Typography variant='h6' className={classes.title}>{props.info} <Hidden only={['xs', 'sm']}>{props.icon}</Hidden> </Typography>}
        subheader={<Typography variant='body2' align='center' color='textSecondary'>{props.subHead}</Typography>}
      />
      </Card>
  )
}

export default StatBox;
