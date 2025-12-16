import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
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
  startIcon: {
    position: 'absolute',
    left: '5%'
  }
}));

export default function ProgButtons(props) {
  const classes = useStyles();

  const { handleAction } = props;

  return (
    <Button
      variant="contained"
      classes={{
        startIcon: classes.startIcon,
      }}
      startIcon={
        props.icon ? props.icon : <ClearIcon style={{ fontSize: 28 }} />
      }
      className={classes.button}
      onClick={handleAction}
    >
      {props.buttonText}
    </Button>
  );
}
