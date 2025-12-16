import React from "react";
import { Link, Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Aux from '../../../../../HOC/aux'

import { LinkRef } from '../../../../UtilComponents/LinkOverride';
import ChooseYourLevel from '../../../../Calendar/ChoodeLevelModal'

const PlanAccessList = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Aux>
      <ChooseYourLevel open={open} handleClose={handleClose} redirect />
      <ListItem className={props.classes.listItem}>
        <ListItemIcon className={props.classes.iconsRoot}>
          <img
            src="https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/levels.svg"
            className={props.classes.icon}
            alt="Key icon"
          />
        </ListItemIcon>
        <ListItemText disableTypography={true}>
          <Typography variant="h4" className={props.classes.gfListTitle}>
            Integrated Plans
          </Typography>
          <List
            aria-labelledby="nested-list-subheader"
            className={`${props.classes.paddingBottomZero}`}
          >
            <ListItem className={`${props.classes.subList} ${props.classes.listItem}`}>
              <ListItemIcon className={props.classes.iconsRoot}>
                <img
                  src="https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/questionmark.svg"
                  className={props.classes.icon}
                  alt="questionmark Icon"
                />
              </ListItemIcon>
              <ListItemText disableTypography={true}>
                <Link
                  variant="h4"
                  className={`${props.classes.gfListTitle} ${props.classes.titlePointer}`}
                  component={LinkRef}
                  to='/get-started'
                >
                  Where should I start
                  </Link>
              </ListItemText>
            </ListItem>
            <ListItem className={`${props.classes.subList} ${props.classes.listItem}`}>
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
                  component="h4"
                  onClick={handleClickOpen}
                >
                  Choose A Plan
                  </Link>
              </ListItemText>
            </ListItem>
            <ListItem className={`${props.classes.subList} ${props.classes.listItem}`}>
              <ListItemIcon className={props.classes.iconsRoot}>
                <img
                  src="https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/info-whitesquare.svg"
                  className={props.classes.icon}
                  alt="questionmark Icon"
                />
              </ListItemIcon>
              <ListItemText disableTypography={true}>
                <Link
                  variant="h4"
                  className={`${props.classes.gfListTitle} ${props.classes.titlePointer}`}
                  component={LinkRef}
                  to='/learn-more'
                >
                  Learn More
                  </Link>
              </ListItemText>
            </ListItem>
          </List>
        </ListItemText>
      </ListItem>
    </Aux>
  );
};

export default PlanAccessList;
