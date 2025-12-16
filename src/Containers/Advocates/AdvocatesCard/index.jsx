import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles(theme=>({
  root: {
    maxWidth: 330,
    width: '100%',
    margin: 'auto'
  },
  grid: {
    padding: 12,
    [theme.breakpoints.down('sm')]: {
      padding: 8
    }
  }
}));

export default function Advocates(props) {
  const classes = useStyles();

  return (
    <Grid className={classes.grid} item xs={6} sm={4} md={4} lg={4}>
      <Card className={classes.root}>
        <CardActionArea component={Link} href={props.link} target='_blank' rel="noopener">
          <CardMedia
            component="img"
            height="100%"
            width='100%'
            image={`https://gymfit-images.s3.amazonaws.com/AdvocatesImages/${props.image}`}
          />
        </CardActionArea>
      </Card>
    </Grid>
  );
}
