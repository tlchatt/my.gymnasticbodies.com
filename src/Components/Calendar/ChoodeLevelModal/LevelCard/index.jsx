import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardActionArea } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 330,
    maxHeight: 220,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  selected: {
    boxShadow: (props) => props.color === 'orange' ? '0 0 0.75rem #f05621' : '0 0 0.75rem #1E88E5'
  },
  hover: {
    cursor: 'pointer',
    // eslint-disable-next-line
    ['&:hover']: {
      boxShadow: (props) => props.color === 'orange' ? '0 0 0.75rem #f05621' : '0 0 0.75rem #1E88E5'
    }
  }
});

export default function SimpleCard(props) {
  const classes = useStyles(props);

  return (
    <Card
      className={`${classes.root} ${props.selected ? classes.selected : null} ${classes.hover}`}
      elevation={4}
      onClick={props.onClick}
    >
      <CardActionArea>
        <img src={props.imageURL} alt="" width='100%' />
      </CardActionArea>
    </Card>
  );
}
