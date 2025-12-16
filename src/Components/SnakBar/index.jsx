import React from "react";
import clsx from "clsx";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from '@material-ui/icons/Error';
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import { SnackbarContent } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { useSelector } from 'react-redux';

const variantIcons = {
  success: CheckCircleIcon,
  error: ErrorIcon
};

const useStyles = makeStyles((theme) => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  success: {
    backgroundColor: green[600],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: "flex",
    alignItems: "center",
    fontSize: '1rem',
    letterSpacing: '1px',
    fontWeight: '400'
  },
  action: {
    padding: 0
  }
}));

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const CustomSnackBar = (props) => {
  const classes = useStyles();
  const showToast = useSelector(state => state.calendar.showToast);
  const variation = useSelector(state => state.calendar.variation);
  const message = useSelector(state => state.calendar.message);

  const IconType = variantIcons[props.variation ? props.variation : variation];


  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      ContentProps={{
        "aria-describedby": "message-id",
      }}
      open={ showToast || props.open }
      TransitionComponent={SlideTransition}
    >
      <SnackbarContent
        className={classes[props.variation ? props.variation : variation]}
        message={
          <span id="message-id" className={classes.message}>
            <IconType className={clsx(classes.icon, classes.iconVariant)} />
            {message || props.message ? message || props.message  : 'Failed to Login, please try again.' }
          </span>
        }
      />
    </Snackbar>
  );
}

export default CustomSnackBar;
