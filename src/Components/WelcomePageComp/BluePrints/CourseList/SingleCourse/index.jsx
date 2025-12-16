import React, {useState} from "react";
import { Link, List } from "@material-ui/core";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';

import Collapse from '@material-ui/core/Collapse';
import Aux from '../../../../../HOC/aux'
import ModalRender from '../../../../UtilComponents/RenderModal'


const SingleCourse = (props) => {
  const [open, setOpen] = useState(false);
  const [courseModal, setCourseModal] = useState(false);

  const courseIds = [59616, 59310, 59255, 59460, 59257, 59315, 59661, 59857, 59983, 60088, 60210]

  const handleClick = () => {setOpen(!open);};

  return (
    <Aux>
      <ListItem className={props.classes.listItem}>
        <ListItemIcon className={props.classes.iconsRoot}>
          <img src={`https://gymfit-images.s3.amazonaws.com/CourseIcons/${props.icon}`} className={props.classes.icon} alt={props.title} />
        </ListItemIcon>
        <ListItemText disableTypography={true} onClick={handleClick}>
          <Link
            variant="h4"
            className={`${props.classes.gfListTitle} ${props.classes.titlePointer}`}
            component="h4"
          >
            {props.title}
          </Link>
        </ListItemText>
        <IconButton onClick={handleClick} style={{padding: 4}}>
          {open ? <ExpandLess style={{color: 'white'}}/> : <ExpandMore style={{color: 'white'}} />}
        </IconButton>
      </ListItem>
      <Collapse in={open} timeout="auto">
        <List
          aria-labelledby="nested-list-subheader"
          component="div"
          disablePadding
          style={{ paddingLeft: "32px" }}
        >
          <ListItem className={props.classes.listItem}>
            <ListItemIcon className={props.classes.iconsRoot}>
              <img
                src="https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/strengthen.svg"
                className={props.classes.icon}
                alt="questionmark Icon"
              />
            </ListItemIcon>
            <ListItemText disableTypography={true}>
              <Link
                variant="h4"
                className={`${props.classes.gfListTitle} ${props.classes.titlePointer}`}
                component="h4"
                onClick={()=> setCourseModal(true)}
              >
                Train Now
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
                component="h4"
                onClick={
                  !courseIds.includes(props.wpId)
                    ? () => props.handleEdit(`https://gymfit-images.s3.amazonaws.com/CourseIcons/${props.icon}`, props.title, props.wpId)
                    : ()=> setCourseModal(true)
                  }
              >
                Add To Schedule
              </Link>
            </ListItemText>
          </ListItem>
        </List>
      </Collapse>
      <ModalRender open={courseModal} close={()=>setCourseModal(false)} CourseInfo={props.CourseInfo} />
    </Aux>
  );
};

export default React.memo(SingleCourse);
