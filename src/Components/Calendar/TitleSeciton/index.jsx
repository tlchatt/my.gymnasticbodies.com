import React from 'react';
import { Grid, makeStyles, Typography, Switch, FormControlLabel, Button } from '@material-ui/core';

// Util Imports

// Custom Components
import LevelModal from '../ChoodeLevelModal';

const useSytles = makeStyles(theme => ({
  root: {
    padding: 8,
    display: 'flex',
    [theme.breakpoints.down(415)]: {
      display: 'block',
      padding: 4,
    },
  },
  title: {
    marginTop: 0,
    // marginBottom: '24px',
    fontSize: '40px',
    fontWeight: 400,
    lineHeight: '1.35',
    letterSpacing: '0.07em',
    [theme.breakpoints.down(415)]: {
      fontSize: '28px',
    },
    [theme.breakpoints.up(766)]: {
      fontSize: '32px',
    },
    [theme.breakpoints.up(1024)]: {
      fontSize: '40px',
    }
  },
  flexEnd: {
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  mySchedule: {
    alignItems: 'baseline',
  },
  detailedView: {
    [theme.breakpoints.down(415)]: {
      marginLeft: 7,
      marginTop: 44
    },
  },
  container: {
    padding: '32px 0 0px'
  },
  plan: {
    height: 36,
    margin: 'auto 4px 4px',
    letterSpacing: '0.125rem',
    padding: '0 16px',
    [theme.breakpoints.down(769)]: {
      margin: 'auto 4px 0 4px',
    },
    [theme.breakpoints.down(415)]: {
      margin: '8px 0',
      letterSpacing: '0.75px'
    },
  },
}))

const TitleSection = (props) => {
  const classes = useSytles();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container className={classes.container}>
      <Grid item xs={6} sm={8} md={8} lg={8} className={`${classes.root} ${classes.mySchedule}`}>
        <Typography variant='h3' className={classes.title}>
          My schedule
        </Typography>
        <Button variant="contained" color="primary" className={classes.plan} onClick={handleClickOpen}>
          Choose Your Plan
        </Button>
        <LevelModal handleClose={handleClose} open={open}/>
      </Grid>
      <Grid item xs={6} sm={4} md={4} lg={4} className={`${classes.flexEnd} ${classes.root}`}>
        <FormControlLabel
          value="start"
          control={<Switch color="primary" />}
          label="Detailed View"
          labelPlacement="start"
          className={classes.detailedView}
          onChange={props.handleDetailed}
          checked={props.isOpen}
        />
      </Grid>
    </Grid>
  )
}

export default TitleSection;
