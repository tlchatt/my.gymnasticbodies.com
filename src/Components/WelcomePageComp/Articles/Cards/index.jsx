import React from 'react';
import { makeStyles, Link } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    maxWidth: 330,
    background: 'transparent'
  },
  media: {
    maxHeight: 220,
    maxWidth: 330,
    width: '100%'
  },
  fixPadding: {
    padding: '4px'
  }
});

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Link href={props.link} target="_blank" rel="noopener">
      <Card className={classes.root} elevation={0}>
        <CardActionArea>
          <img
            className={classes.media}
            src={props.img}
            alt=''
          />
          <CardContent className={classes.fixPadding}>
            <Typography variant="body1" color="textSecondary" component="p" style={{lineHeight: '18px'}}>
              {props.snippet}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
