import React, {useState} from "react";
import { Link } from "@material-ui/core";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';

import Collapse from '@material-ui/core/Collapse';
import Aux from '../../../../HOC/aux'

const AllAccessList = (props) => {

  const [open, setOpen] = useState(false);

  const handleClick = () => {setOpen(!open);};

  return (
    <Aux>
        <ListItem className={props.classes.listItem}>
          <ListItemIcon className={props.classes.iconsRoot}>
            <img
              src={props.icon}
              className={props.classes.icon}
              alt={props.title}
            />
          </ListItemIcon>
          <ListItemText disableTypography={true} onClick={handleClick}>
            <Link variant="h4" className={`${props.classes.gfListTitle} ${props.classes.titlePointer}`}>
              {props.title}
            </Link>
          </ListItemText>
          <IconButton onClick={handleClick} style={{padding: 4}}>
            {open ? <ExpandLess style={{color: 'white'}}/> : <ExpandMore style={{color: 'white'}} />}
          </IconButton>
        </ListItem>
        <Collapse in={open} timeout="auto">
          {props.children}
      </Collapse>
    </Aux>
  );
};

export default AllAccessList;
