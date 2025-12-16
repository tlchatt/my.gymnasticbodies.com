import React from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  Divider
} from '@material-ui/core';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme=>({
  detial: {
    padding: '10px 20px 10px 0px'
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 20,
    margin: 10,
  },
  link: {
    display: 'flex',
    color: 'inherit',
    cursor: 'pointer'
  },
  span: {
    textDecoration: 'line-through',
    color: '#aaaaaa'
  }
}))

const ThriveLessonsRow = props => {
  const classes = useStyles();
  let row;

  if (props.description) {
    row = (
      <>
        <Grid container>
          <Grid item xs={12} sm={12} md={5} lg={5}>
            <Typography style={{ padding: '10px 20px' }}>Task {props.taskNo}: {props.description}</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <Link className={classes.link} onClick={() => props.handleOpenModal(props.description, props.detailedDesc,props.detailsVideo)}>
              <img
                src={`https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/book.svg`}
                className={classes.icon}
                alt='Book'
              />
              <Typography className={classes.detial}>{props.description}</Typography>
            </Link>
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <Link className={classes.link} onClick={() => props.handleOpenModal(props.lessonName, props.lesson,props.lessonVideo)}>
              <img
                src={`https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/note-book.svg`}
                className={classes.icon}
                alt='Note Book'
              />
              <Typography className={classes.detial}>{props.lessonName}</Typography>
            </Link>
          </Grid>
        </Grid>
        {
          props.taskNo !== '10' ? <Divider/> : null
        }
      </>
    )
  }

  else {
    row = (
      <>
        <Grid container>
          <Grid item xs={12} sm={12} md={12 / 3} lg={12 / 3}>
            <Typography style={{ padding: '10px 20px' }}>Task {props.taskNo}: <span className={classes.span}>Unlock to find out</span></Typography>
          </Grid>
        </Grid>
        {
          props.taskNo !== 10 ? <Divider/> : null
        }
      </>
    )
  }

  return row;

}


export default ThriveLessonsRow;
