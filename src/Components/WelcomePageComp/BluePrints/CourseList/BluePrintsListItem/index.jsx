import React from "react";
import { Link } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { LinkRef } from '../../../../UtilComponents/LinkOverride';

const BluePrintsListItem = (props) => {
  return (
    <ListItem className={props.classes.listItem}>
        <ListItemIcon className={props.classes.iconsRoot}>
          <img
            src={`https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/${props.iconUrl}`}
            className={props.classes.icon}
            alt={props.alt}
          />
        </ListItemIcon>
        <ListItemText disableTypography={true}>
          <Link
            variant="h4"
            className={`${props.classes.gfListTitle} ${props.classes.titlePointer}`}
            component={LinkRef}
            to={props.to}
          >
            {props.listText}
          </Link>
        </ListItemText>
      </ListItem>
  );
};

export default BluePrintsListItem;
