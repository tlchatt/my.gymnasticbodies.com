import React from 'react';
import { Typography, makeStyles, Grid, Box, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  title: {
    color: "#FF9435",
    padding: "24px 0 0",
  },
  button: {
    background: "linear-gradient(18deg, #FF9435 0%, #f05621 100%)",
    color: 'white',
    padding: '4px 30px',
    fontSize: '18px',
    margin: '12px 32px',
    [theme.breakpoints.up(425)]: {
      margin: '12px 18px',
    }
  },
  cancel: {
    backgroundColor: 'white',
    padding: '4px 30px',
    fontSize: '18px',
    margin: '12px 32px',
    [theme.breakpoints.up(425)]: {
      margin: '12px 18px',
    }
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down(426)]: {
      flexDirection: 'column'
    }
  },
  dashed: {
    padding: '4px 12px',
    fontSize: '18px',
    border: 'dashed 1px black',
    width: '100%',
    color: 'rgb(101, 100, 100)'
  },
}));



export default function FocusPoints(props) {
  const classes = useStyles();
  const { handleClose } = props;

  const points = [
    'wrists',
    'Elbows',
    'Shoulders',
    'Knees',
    'Lumbar',
    'Upper Thoracic',
    'Neck',
    'Groin',
    'Hamstrings',
    'Ankles & Calves',
    'Core',
    'Hips'
  ]

  return (
    <Box m={1} style={{ width: '100%' }}>
      <Box mb={4} style={{ width: '100%' }}>
        <Typography variant='h4' gutterBottom className={classes.title} id="responsive-dialog-title" align='center'>Choose a Focus Cycle to address any known deficits.</Typography>
      </Box>
      <Grid container justifyContent='center'>
        <Grid item xs={12} sm={11} md={10} lg={9}>
          <Grid container>
            {
              points.map((point, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={4} style={{ padding: 12 }} key={index}>
                    <Button className={classes.dashed} variant='contained' >{point}</Button>
                  </Grid>
                )
              })
            }
          </Grid>
        </Grid>
        <Box mb={2} style={{ width: '100%' }}/>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.gridItem}>
          <Button autoFocus size='large' onClick={handleClose} variant='contained' className={classes.cancel}>
            cancel
          </Button>
          <Button size='large' onClick={handleClose} color="primary" autoFocus className={classes.button}>
            save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
