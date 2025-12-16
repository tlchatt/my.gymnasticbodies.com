import React from 'react';
import Button from '@material-ui/core/Button';
import { Typography, makeStyles, Grid, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  title: {
    color: "#656464",
    padding: "24px 0 0",
  },
  root: {
    padding: 24
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
  },
  cancel: {
    backgroundColor: "#91EEFF !important",
    color: '#656464',
    padding: '4px 30px',
    fontSize: '18px',
    marginBottom: 24,
    border: '#707070 solid 1px',
    [theme.breakpoints.up(425)]: {
      margin: '12px 0',
    },
    borderRadius: 8,
  },
}));



const FitnessQuiz = (props) => {
  const classes = useStyles();

  const {
    setSectionId,
  } = props;

  return (
    <Box m={1}>
      <Box mb={2} mt={4} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <img src="https://gymfit-images.s3.amazonaws.com/General/Initial-GuidedPlans.png" alt="" />
      </Box>
      <Box mb={2} style={{ width: '100%' }}>
        <Typography variant='h4' className={classes.title} id="responsive-dialog-title" align='center'>Let’s see which guided workout is best for you.</Typography>
      </Box>
      <Grid container justifyContent='center'>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.gridItem}>
          <Button size='large' autoFocus onClick={ setSectionId } variant='contained' className={classes.cancel}>
            Let’s begin
          </Button>
        </Grid>
        <Grid item xs={12} sm={8} md={8} lg={8}>
          <Box mt={2} mb={4}>
            <Typography variant='body1' align='center'>
              This quiz is just meant to place you at a starting point. You can adjust your plan later if you feel it is too difficult or too easy.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FitnessQuiz;
