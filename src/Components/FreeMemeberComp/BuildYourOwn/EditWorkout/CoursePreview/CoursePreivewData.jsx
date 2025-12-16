import React from 'react';
import { Typography, makeStyles, Grid, Card, Button } from '@material-ui/core';
import ReactJWPlayer from 'react-jw-player';
import { useSelector } from 'react-redux';
import Interweave from 'interweave';

const useStyles = makeStyles(theme => ({
  title: {
    padding: '12px 18px',
    color: '#FF9435',
    [theme.breakpoints.down('xs')]: {
      padding: '12px 0px',
    },
  },
  videoGrid: {
    [theme.breakpoints.down(1200)]: {
      padding: '0 12px'
    },
    margin: 'auto'
  },
  button: {
    backgroundColor: "#91EEFF !important",
    color: '#656464',
    padding: '4px 30px',
    fontSize: '18px',
    margin: '12px 32px',
    border: '#707070 solid 1px',
    [theme.breakpoints.up(425)]: {
      margin: '12px 18px',
    }
  },
}))

const CoursePreivewData = (props) => {
  const classes = useStyles();
  const playerSignedUrl = useSelector(state => state.login.signedUrl);
  return (
    <>
      {
        !props.isSubCoursePreview ? <Grid item xs={12} sm={10} md={10} lg={12} className={classes.videoGrid} >
          <Card elevation={6} style={{ margin: '12px auto', maxWidth: 710 }}>
            <ReactJWPlayer
              playerId='my-CoursePreivewData'
              playerScript={`https://content.jwplatform.com/libraries/iOa0nJDF.js${playerSignedUrl}`}
              playlist={`https://content.jwplatform.com/feeds/${props.mediaId}`}
              customProps={{ nextUpDisplay: false }}
              onError={(err) => console.log("onError", err)}
              onSetupError={(err) => console.log("onSetupError", err)}
            />
          </Card>
        </Grid>
          : null
      }
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography variant='h4' align='center' gutterBottom className={classes.title}>
          {props.classOrExerciseName}
        </Typography>
        <Typography variant='body1' gutterBottom>
          <Interweave content={props.description} />
        </Typography>
      </Grid>
      {
        props.returnToCourses
          ? <Grid item xs={12} sm={12} md={12} lg={12} style={{justifyContent: 'center', display: 'flex'}}>
            <Button className={classes.button} color="primary" onClick={props.returnToCourses}>
              {props.returnToText ? props.returnToText : 'Return To Courses'}
            </Button>
          </Grid>
          : null
      }

    </>
  )
}


export default CoursePreivewData
