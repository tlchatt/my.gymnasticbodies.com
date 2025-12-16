import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';


const styles = makeStyles(theme => ({
  card: {
    minWidth: 414,
    maxWidth: 414,
    minHeight: 710,
    margin: 'auto',
    backgroundColor: '#f5f5f5',
    [theme.breakpoints.down('sm')]: {
      minWidth: 365,
      minHeight: 600,
    },
  },
  media: {
    height: 140,
  },
}))

export default function BaseForm(props) {
  const classes = styles();

  return (
    <Card className={classes.card} elevation={2}>
      {props.children}
    </Card>
  );
}
