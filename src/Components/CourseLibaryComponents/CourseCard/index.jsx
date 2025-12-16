import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 180,
    width: '100%',
    marginRight: 24,
    marginTop: 12,
    borderRadius: 8,
    [theme.breakpoints.down(426)]: {
      maxWidth: '100%',
      margin: '12px 8px'
    }
  },
  media: {
    height: 140,
    backgroundSize: 'contain',
    [theme.breakpoints.down(426)]: {
      display: 'none'
    }
  },
  cardActions: {
    padding: 12,
    height: '100%'
  },
}));
const imageUrl = 'https://gymfit-images.s3.amazonaws.com/CourseLibraryImages/'


// contains sub string
function contains(string, subString) {
  return string.indexOf(subString) !== -1;
}



export default function CourseCard(props) {
  const classes = useStyles();

  const handleImageName = (title, image) => {

    if (contains(title, 'Middle Split')) {
      return 'https://gymfit-images.s3.amazonaws.com/CourseLibraryImages/stretchseriesmiddlesplit.jpg';
    }

    if (contains(title, 'Front Split')) {
      return 'https://gymfit-images.s3.amazonaws.com/CourseLibraryImages/stretchseriesfrontsplit.jpg';
    }

    if (contains(title, 'Thoracic Bridge')) {
      return 'https://gymfit-images.s3.amazonaws.com/CourseLibraryImages/stretchseriesthoracicbridge.jpg';
    }

    if (contains(title, 'Wrist stretches #1-4')) {
      return 'https://gymfit-images.s3.amazonaws.com/CourseLibraryImages/handstand1-wriststretches14.jpg';
    }

    return imageUrl + image;

  }

  return (
    <Card className={classes.root} elevation={4}>
      <CardActionArea className={classes.cardActions} onClick={props.handleClick}>
        <CardMedia
          className={classes.media}
          image={handleImageName(props.title, props.imageUrl)}
          title="Contemplative Reptile"
        />
        <CardContent style={{padding: 8}}>
          <Typography variant="h5" component="h2">
            { props.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
