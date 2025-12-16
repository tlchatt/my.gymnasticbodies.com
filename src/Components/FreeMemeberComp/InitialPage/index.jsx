import React, {useState} from 'react';
import { Grid, Typography, makeStyles, Button, Paper } from '@material-ui/core'
import PathSelection from './PathSelection';
import { useDispatch } from 'react-redux';

import GuidedPlans from '../GuidedPlans';
import FitnessQuiz from '../FitnessQuiz';

import { setLevelPath } from '../../../Store/Action/LevelsActions'

const useStyles = makeStyles(theme => ({
  title: {
    color: "#656464",
    padding: "24px 0 0",
  },
  container: {
    background: "url(/images/general/mountains.png) 0 25% no-repeat",
    backgroundSize: "contain",
    [theme.breakpoints.down(426)]: {
      background: "url(/images/general/mountains.png) 0 130px no-repeat",
      backgroundSize: "contain",
    }
  },
  selctionTitle: {
    color: "#656464",
  },
  chooseButton: {
    backgroundColor: "#91EEFF !important",
    color: '#656464',
    padding: '4px 30px',
    fontSize: '18px',
    marginBottom: 24,
    border: '#707070 solid 1px',
    [theme.breakpoints.up(425)]: {
      margin: '12px 0',
    }
  },
  chooseDiv: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  gridItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down(426)]: {
      padding: 4,
      margin: '0 !important'
    }
  },
  paper: {
    minHeight: "700px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    borderRadius: 8
  }
}));

const Seelctions = [
  {
    selctionTitle: 'White Board',
    description: 'White Board gives you a quick, randomized workout.',
    image: 'WhiteBoard-start.png',
  },
  {
    selctionTitle: 'Guided Plans',
    description: 'Guided Plans gives you a pre-built workout from beginner to advanced.',
    image: 'Initial-GuidedPlans.png',
    style: {
      marginBottom: '8%'
    }
  },
  {
    selctionTitle: 'Build Your Own',
    description: 'Create your own workouts using our exercise library and follow alongs.',
    image: 'Initial-BYO.png',
    style: {
      marginBottom: '8%'
    }
  },
  {
    selctionTitle: 'Placement Quiz',
    description: 'Take our quiz to know which guided plan to use.',
    image: 'Initial-Quiz.png',
  },
]

const InitialPage = (props) => {
  const classes = useStyles();

  const [selectedPath, setSelectedPath] = useState(-1);
  const [chosenPath, setChosenPath] = useState(false);

  const dispatch = useDispatch();


  const handleChoose = () => {
    if (Seelctions[selectedPath].selctionTitle === 'Guided Plans' || Seelctions[selectedPath].selctionTitle === 'Placement Quiz') {
      setChosenPath(Seelctions[selectedPath].selctionTitle);
    }
    if (Seelctions[selectedPath].selctionTitle === 'White Board') {
      // Autoilot id is 9
      dispatch( setLevelPath(9) )
    }
    if (Seelctions[selectedPath].selctionTitle === 'Build Your Own') {
      // Build Your Own id is 10
      dispatch( setLevelPath(10) )
    }
  }

  const cancleChoice = () => {
    setChosenPath(false);
  }
  const RenderPath = () => {
    switch (chosenPath) {
      case 'Guided Plans':
        return <GuidedPlans fullWidth handleClose={cancleChoice} title='Where would you like to start your journey?' />
      case 'Placement Quiz':
        return <FitnessQuiz />
      default:
        return;
    }
  }
  return (
    <Grid container justifyContent="center" className={classes.container}>
      {
        chosenPath
          ?
          <Grid item xs={12} sm={8} md={5} lg={5} style={{padding: 8}} >
            <Paper className={classes.paper}>
              <RenderPath />
            </Paper>
          </Grid>
          : <>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant='h3' gutterBottom className={classes.title} id="responsive-dialog-title" align='center'>Where would you like to start your journey?</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} style={{ marginTop: '10%' }}>
              <Grid container style={{ marginTop: '10%', alignItems: 'flex-end' }}>
                {
                  Seelctions.map((selection, index) => {
                    return (
                      <Grid item key={index} xs={6} sm={3} md={3} lg={3} className={classes.gridItem} style={selection.style}>
                        <PathSelection onClick={() => setSelectedPath(index)} {...selection} key={index} isSelected={index === selectedPath} />
                      </Grid>
                    )
                  })
                }
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} className={classes.chooseDiv} >
              <Button
                className={classes.chooseButton}
                // size="large"
                color="primary"
                onClick={handleChoose}
              >
                choose
              </Button>
              <Typography className={classes.selctionTitle} variant='h5' align='center'>
                {selectedPath < 0 ? 'We recommend Guided Plans.' : Seelctions[selectedPath].description}
              </Typography>
            </Grid>
          </>
      }

    </Grid>
  )
}
export default InitialPage;
