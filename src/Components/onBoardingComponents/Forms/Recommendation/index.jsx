import React, {useEffect, useRef} from 'react';
import {
  makeStyles,
  Grid,
  Paper,
  Link,
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import SmileyFaces from './SmileyFaces';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
// eslint-disable-next-line
import ReactJWPlayer from 'react-jw-player';
import Recommendations from './recommendations.json'
import { NavLink } from "react-router-dom";

// Custom components
import * as actions from '../../../../Store/Action';

const styles = makeStyles(theme => ({
  gfTitle: {
    fontFamily: '"Oswald", "Open Sans", sans-serif',
    fontSize: '28px',
    fontWeight: 400,
    lineHeight: '32px',
    margin: '8px 0',
    [theme.breakpoints.down('sm')]: {
      marginTop: '4px'
    }
  },
  container:{
    display: props => props.active === true ? 'flex' : 'none',
    flexDirection: 'column',
    padding: '8px'

  },
  margin8: {
    margin: '8px'
  },
  paddingLeft: {
    paddingLeft: 8
  },
  gfSubText: {
    fontFamily: '"Open Sans", Helvetica, Arial, sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '22px',
    letterSpacing: '0.04em',
    margin: '0 0 8px',
    opacity: '0.52'
  },
  gfParaText: {
    fontFamily: '"Open Sans", Helvetica, Arial, sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '28px',
    letterSpacing: '0.04em',
    margin: '0 0 8px',
  },
  gfButtonLarge: {
    width: '75%',
    height: '48px',
    fontSize: '1.125rem',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
  },
  padding: {
    padding: '8px'
  },
  flex: {
    display: 'flex',
    justifyContent: 'center'
  },
  alignCenter: {
    textAlign: 'center'
  },
  resetLink:{
    width: 'fit-content',
    margin: 'auto',
    cursor: 'pointer'
  }
}))



const Recommendation = (props) => {
  const classes = styles(props);
  let myReco = useRef();
  const LinkRef = React.forwardRef((props, ref) => <div style={{ display: 'contents' }} ref={ref}><NavLink {...props} /></div>);

  useEffect(() => {
    if (props.data) {
      let counterArray = [0, 0, 0, 0, 0]
      let obj = props.data;

      if (obj.core === 1) counterArray[0]++;
      else if (obj.core === 2) counterArray[1]++;
      else if (obj.core === 3) counterArray[2]++;
      else if (obj.core === 4) counterArray[3]++;
      else if (obj.core === 5) counterArray[4]++;

      if (obj.strength === 1 || obj.strength === 2) counterArray[0]++;
      else if (obj.strength === 3 || obj.strength === 4) counterArray[1]++;
      else if (obj.strength === 5 || obj.strength === 6) counterArray[2]++;
      else if (obj.strength === 7 || obj.strength === 8) counterArray[3]++;
      else if (obj.strength === 9 || obj.strength === 10) counterArray[4]++;

      if (obj.mobility === 1 || obj.mobility === 2) counterArray[0]++;
      else if (obj.mobility === 3 || obj.mobility === 4) counterArray[1]++;
      else if (obj.mobility === 5 || obj.mobility === 6) counterArray[2]++;
      else if (obj.mobility === 7 || obj.mobility === 8) counterArray[3]++;
      else if (obj.mobility === 9 || obj.mobility === 10) counterArray[3]++;

      if (counterArray[0] >= 2) myReco.current = 'intro';
      else if (counterArray[1] >= 2) myReco.current = 'levelOne';
      else if (counterArray[2] >= 2) myReco.current = 'levelTwo';
      else if (counterArray[3] >= 2) myReco.current = 'levelThree';
      else if (counterArray[4] >= 2) myReco.current = 'levelFour';

      if (counterArray[0] <= 1 && counterArray[1] <= 1 && counterArray[2] <= 1 && counterArray[3] <= 1 && counterArray[4] <= 1) myReco.current = 'levelOne';

    }
  }, [props.data]);

  const history = useHistory();
  const handleSubmit = () => {
    if (myReco.current) {
      props.ChooseLevel({
        planId: Recommendations[myReco.current].planId,
        weekIndex: 1
      })
      history.push("/dashboard")
    }
  }

  return (
    <div className={classes.container}>
      <Grid item xs={12} sm={12} md={12} lg={12} className={[classes.margin8].join(' ')}>
          <h2 className={classes.gfTitle}>Your Results</h2>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} className={[classes.flex].join(' ')}>
        <SmileyFaces data={props.data ?props.data:{} }/>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} className={[classes.margin8].join(' ')}>
        <h2 className={classes.gfTitle}>Our Recomndations</h2>
        <h3 className={classes.gfSubText}>The ideal workout plan based on your results.</h3>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.padding}>
        <Paper elevation={2} style={{minHeight: 215}}>
          {
            myReco.current ?
              <ReactJWPlayer
                playerId='quiz-player'
                playerScript='https://cdn.jwplayer.com/libraries/j8x5Xcgh.js'
                playlist={`https://cdn.jwplayer.com/feeds/${Recommendations[myReco.current].mediaId}.json`}
                onError={(err) => console.log("onError", err)}
                onSetupError={(err) => console.log("onSetupError", err)}
              />
              : ''
          }

        </Paper>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} className={[classes.margin8].join(' ')}>
        <h2 className={classes.gfTitle} style={{margin: 0}}>{myReco.current ? Recommendations[myReco.current].title : '' }</h2>
        <h3 className={classes.gfParaText}>{myReco.current ? Recommendations[myReco.current].summary : '' }</h3>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} className={[classes.margin8, classes.alignCenter].join(' ')}>
        <Button
          variant='contained'
          color='primary'
          className={classes.gfButtonLarge}
          onClick={
            myReco.current && props.userAccessLevels.includes(Recommendations[myReco.current].levelAccesTag)
              ? handleSubmit
              : (e) => {}
          }
          component={myReco.current && props.userAccessLevels.includes(Recommendations[myReco.current].levelAccesTag) ? 'button' : 'a'}
          href={myReco.current && props.userAccessLevels.includes(Recommendations[myReco.current].levelAccesTag) ? null : 'https://www.gymnasticbodies.com/class-finder/'}
          target={myReco.current && props.userAccessLevels.includes(Recommendations[myReco.current].levelAccesTag) ? null : '_blank'}
        >
          {
            myReco.current && props.userAccessLevels.includes(Recommendations[myReco.current].levelAccesTag) ?
              `Add ${myReco.current ? Recommendations[myReco.current].title : ''} To Schedule`
              : 'Update Plan'
          }



        </Button>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} className={[ classes.alignCenter].join(' ')}>
        <h2 className={classes.gfTitle} style={{margin: 0, fontSize: '20px'}}> - Or - </h2>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} className={[classes.margin8, classes.alignCenter].join(' ')}>
        <Button component={LinkRef} to='/' variant='contained' color='primary' className={classes.gfButtonLarge}>
          Home
        </Button>
      </Grid>
      <Link onClick={ e => props.reset(e)} underline="always" color='inherit' className={`${classes.resetLink} ${classes.alignCenter}`}>Reset</Link>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    userAccessLevels: state.login.integratedPlans ? state.login.integratedPlans.userAccessLevels : [],
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ChooseLevel: (data) => dispatch(actions.ChooseLevel(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recommendation);



Recommendation.propTypes = {
  active: PropTypes.bool.isRequired
}
