import React from 'react';
import { Typography, makeStyles, Grid, Box } from '@material-ui/core';
import ImageButtons from '../ImageButtons'

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
    padding: 8
  },
  cancel: {
    backgroundColor: 'white',
    padding: '4px 30px',
    fontSize: '18px',
    margin: '12px 32px',
    [theme.breakpoints.up(425)]: {
      margin: '12px 18px',
    },
    color: '#656464',
    border: '#707070 solid 1px',
    borderRadius: 8,
  },
}));


const FitnessQuiz = (props) => {
  const classes = useStyles();

  const {
    options,
    title,
    SubHeader,
    setSectionId,
    handleUserInput
  } = props;

  return (
    <Box m={1}>
      <Box mb={2} style={{ width: '100%' }}>
        <Typography variant='h4' gutterBottom className={classes.title} id="responsive-dialog-title" align='center'>{title}</Typography>
        {<SubHeader/>}
      </Box>
      <Box mb={2} style={{ width: '100%' }}>
        <Grid container justifyContent='center'>
          {options.map((option, index) => <Grid item xs={12} sm={8} md={8} lg={8} className={classes.gridItem} key={index}> <ImageButtons handleUserInput={ () => handleUserInput(props.name, option.value, setSectionId ) } {...option}/> </Grid> ) }
        </Grid>
      </Box>
    </Box>
  );
}

export default FitnessQuiz;
