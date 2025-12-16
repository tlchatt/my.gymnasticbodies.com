import React from "react";
import { Link } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DropDownList from '../../DropDownList';
import Aux from '../../../../../HOC/aux'

import { LinkRef } from '../../../../UtilComponents/LinkOverride';

import BluePrintsListItem from '../BluePrintsListItem'
import PlanAccessList from '../PlanAccessList'

const AllAccessList = (props) => {
  return (
    <Aux>
      <BluePrintsListItem listText="Equipment List" to="/eqiupment-list" iconUrl="dumbbell.svg" alt="Dumbbell Icon" classes={props.classes} />
      <PlanAccessList classes={props.classes} />
      <DropDownList title="All Access" icon='https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/allaccess.svg' classes={props.classes}>
        <List
          aria-labelledby="nested-list-subheader"
          component="div"
          disablePadding
          style={{ paddingLeft: "32px" }}
        >
          <ListItem className={props.classes.listItem}>
            <ListItemIcon className={props.classes.iconsRoot}>
              <img
                src="https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/rehab.svg"
                className={props.classes.icon}
                alt="Calendar Icon"
              />
            </ListItemIcon>
            <ListItemText disableTypography={true}>
              <Link
                variant="h4"
                className={`${props.classes.gfListTitle} ${props.classes.titlePointer}`}
                component={LinkRef}
                to='/class-finder/rehab'
              >
                Rehab
                </Link>
            </ListItemText>
          </ListItem>
          <ListItem className={props.classes.listItem} >
            <ListItemIcon className={props.classes.iconsRoot}>
              <img
                src="https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/strengthen.svg"
                className={props.classes.icon}
                alt="Levels Icon"
              />
            </ListItemIcon>
            <ListItemText disableTypography={true}>
              <Link
                variant="h4"
                className={`${props.classes.gfListTitle} ${props.classes.titlePointer}`}
                component={LinkRef}
                to='/class-finder/strengthen'
              >
                Strengthen
                </Link>
            </ListItemText>
          </ListItem>
          <ListItem className={props.classes.listItem} >
            <ListItemIcon className={props.classes.iconsRoot}>
              <img
                src="https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/mobilize.svg"
                className={props.classes.icon}
                alt="Key icon"
              />
            </ListItemIcon>
            <ListItemText disableTypography={true}>
              <Link
                variant="h4"
                className={`${props.classes.gfListTitle} ${props.classes.titlePointer}`}
                component={LinkRef}
                to='/class-finder/mobilize'
              >
                Mobilize
                </Link>
            </ListItemText>
          </ListItem>
        </List>
      </DropDownList>

    </Aux>
  );
};

export default AllAccessList;
