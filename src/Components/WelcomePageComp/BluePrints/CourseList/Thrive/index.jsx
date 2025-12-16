import React, { useState } from "react";
import { Link } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux'
import * as Sentry from "@sentry/react";

import DropDownList from '../../DropDownList';
import { LinkRef } from '../../../../UtilComponents/LinkOverride';
import ResetThrive from '../../../../Thrive/ResetThrive.jsx';

import { showToast } from '../../../../../Store/Action/calendarActions';

const API = process.env.REACT_APP_API;

const Thrive = (props) => {
  const [open, setOpen] = useState(false);
  const webToken = useSelector(state => state.login.webToken);
  const userId = useSelector(state => state.login.UserId);
  const dispatch = useDispatch();

  const handleReset = () => {
    var config = {
      method: 'delete',
      url: `${API}/thrive/reset/users/${userId}`,
      headers: {
        'Authorization': `Bearer ${webToken}`,
      },
    };
    axios(config)
      .then(res => {
        setOpen(false);
        secondCall();
      }).catch(err => {
        setOpen(false);
        Sentry.captureException(err);
        dispatch(showToast('Something went wrong. No worried we\'ve been notified!', 'error'))
      });
  }

  const secondCall = () => {
    var config = {
      method: 'post',
      url: `${API}/thrive/reset/permissions/users/${userId}`,
      headers: {
        'Authorization': `Bearer ${webToken}`,
      },
    };
    axios(config)
      .then(res => dispatch(showToast('Successful reset Thrive.', 'success')))
      .catch(err => {
        Sentry.captureException(err);
        dispatch(showToast('Something went wrong. No worried we\'ve been notified!', 'error'))
      });
  }
  return (
    <>
      <ResetThrive open={open} handleClose={() => setOpen(false)} handleReset={handleReset}/>
      <DropDownList
        title="Thrive"
        icon="https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/330x220-thrive.jpg"
        classes={props.classes}
      >
        <List
          aria-labelledby="nested-list-subheader"
          disablePadding
          style={{ paddingLeft: "32px" }}
        >
          <ListItem className={props.classes.listItem}>
            <ListItemIcon className={props.classes.iconsRoot}>
              <img
                src="https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/Directions.svg"
                className={props.classes.icon}
                alt="questionmark Icon"
              />
            </ListItemIcon>
            <ListItemText disableTypography={true}>
              <Link
                variant="h4"
                className={`${props.classes.gfListTitle} ${props.classes.titlePointer}`}
                target="_blank"
                rel="noopener"
                href="https://www.gymnasticbodies.com/media/ThriveInstructions.pdf"
              >
                Directions
            </Link>
            </ListItemText>
          </ListItem>
          <ListItem className={props.classes.listItem}>
            <ListItemIcon className={props.classes.iconsRoot}>
              <img
                src="https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/myprofile.svg"
                className={props.classes.icon}
                alt="questionmark Icon"
              />
            </ListItemIcon>
            <ListItemText disableTypography={true}>
              <Link
                variant="h4"
                className={`${props.classes.gfListTitle} ${props.classes.titlePointer}`}
                component={LinkRef}
                to='/thrive-profile'
              >
                My Profile
            </Link>
            </ListItemText>
          </ListItem>
          <ListItem className={props.classes.listItem}>
            <ListItemIcon className={props.classes.iconsRoot}>
              <img
                src="https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/nutrition-white.svg"
                className={props.classes.icon}
                alt="questionmark Icon"
              />
            </ListItemIcon>
            <ListItemText disableTypography={true}>
              <Link
                variant="h4"
                className={`${props.classes.gfListTitle} ${props.classes.titlePointer}`}
                component={LinkRef}
                to='/thrive-lessons'
              >
                Thrive Lessons
            </Link>
            </ListItemText>
          </ListItem>
          <ListItem className={props.classes.listItem}>
            <ListItemIcon className={props.classes.iconsRoot}>
              <img
                src="https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/add.svg"
                className={props.classes.icon}
                alt="add Icon"
              />
            </ListItemIcon>
            <ListItemText disableTypography={true}>
              <Link
                variant="h4"
                className={`${props.classes.gfListTitle} ${props.classes.titlePointer}`}
                component={LinkRef}
                to='/thrive-tasks'
              >
                Thrive Tasks
            </Link>
            </ListItemText>
          </ListItem>
          <ListItem className={props.classes.listItem}>
            <ListItemIcon className={props.classes.iconsRoot}>
              <img
                src="https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/Refresh-1.svg"
                className={props.classes.icon}
                alt="add Icon"
              />
            </ListItemIcon>
            <ListItemText disableTypography={true}>
              <Link
                variant="h4"
                className={`${props.classes.gfListTitle} ${props.classes.titlePointer}`}
                onClick={() => setOpen(true)}
              >
                Reset Thrive
            </Link>
            </ListItemText>
          </ListItem>
        </List>
      </DropDownList>
    </>
  );
};

export default Thrive;
