import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 330,
    width: '100%',
  },
  cardContent: {
    padding: '8px !important',
  }
});

export default function ProgCard(props) {
  const classes = useStyles();

  const handleImage = (title = props.title) => {
    if (title === 'WRS #1-4') return 'WRS';
    if (title === 'Quadrupedal Warm Up') return 'QUADRUPEDALWARMUP';
    if (title === 'R1>iM1 to 8') return 'R1IM1';

    return props.imageName;
  }

  return (
    <Card className={classes.root} elevation={4}>
      <CardMedia
        component="img"
        image={`https://gymfit-images.s3.amazonaws.com/exercises/${handleImage().split('.').join('').toUpperCase()}.jpg`}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h5" component="h2" align='center'>
          {props.title} { props.hideReps? '' : '- ' + props.setsReps }
        </Typography>
        <Typography variant="body2" align='center'>
          { props.isMobility ? 'Mobility' : 'Strength'}
        </Typography>
      </CardContent>
    </Card>
  );
}
