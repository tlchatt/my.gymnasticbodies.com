import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
  root: {
    maxWidth: 330,
    width: '100%',
    borderRadius: 8,
    border: '1px solid #707070',
  },
  button: {
    alignItems: 'center',
    display: 'flex',
    padding: 4,
    height: 75
  }
});

const ImageButtons = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={4}>
      <CardActionArea className={classes.button} onClick={props.handleUserInput}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          image={'https://gymfit-images.s3.amazonaws.com/General/' + props.image}
          title="Contemplative Reptile"
        />
      </CardActionArea>
    </Card>
  );
}

export default ImageButtons;
