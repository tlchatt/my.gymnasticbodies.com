import React, {useState} from 'react';
import { makeStyles, Grid, Typography, Paper, Link } from '@material-ui/core';

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";


import EnlighmentModal from './EnlighmentModal'
import FirstStepts from './FirstStepsModal'
import CentralControl from './CentralControl'

import './styles.scss'

const useStyles = makeStyles(theme => ({
  NutsAndbolts: {
    width: '100%',
    maxWidth: '580px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    background: 'transparent'
  },
  paddingS: {
    padding: '8px',
    [theme.breakpoints.down('sm')]: {
      padding: 4
    }
  },
  gfTitle: {
    marginTop: 12,
    fontWeight: 300,
    textTransform: 'uppercase',
    display: 'flex',
  },
  icon: {
    width: "24px",
    height: "24px",
  },
  iconsRoot: {
    minWidth: "24px",
    marginRight: "8px",
  },
  list: {
    margin: "0 auto",
    columns: 2
  },
  gfListTitle: {
    color: 'Black',
    fontWeight: 300,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.4rem'
    }
  },
  titlePointer: {
    cursor: 'pointer'
  },
  listItem: {
    alignItems: "baseline",
    [theme.breakpoints.down('sm')]: {
      padding: '8px 0'
    }
  },
  subList: {
    paddingLeft: 0
  },
  paddingBottomZero: {
    paddingBottom: 0
  }
}));

const NutsAndbolts = (props) => {
  const classes = useStyles();

  const [modal, setModal] = useState(false);
  const handleModal = () => setModal(true)
  const handleClose = () => setModal(false)

  const [modalTwo, setModalTwo] = useState(false);
  const handleModalTwo = () => setModalTwo(true)
  const handleCloseTwo = () => setModalTwo(false)

  const [modalThree, setModalThree] = useState(false);
  const handleModalThree = () => setModalThree(true)
  const handleCloseThree = () => setModalThree(false)

  return (
    <Grid className={classes.paddingS} item xs={12} sm={6} md={6} lg={6}>
      <Paper elevation={0} className={classes.NutsAndbolts}>
        <Typography variant='h4' align="center" className={` gf-nuts-and-bolts ${classes.gfTitle}`}>
          <span></span>
        </Typography>
        <List aria-labelledby="nested-list-subheader" className={classes.list}>
          <ListItem className={classes.listItem}>
            <ListItemIcon className={classes.iconsRoot}>
              <img
                src="https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/controlcenter.svg"
                className={classes.icon}
                alt="Calendar Icon"
              />
            </ListItemIcon>
            <ListItemText disableTypography={true}>
              <Link variant="h4" className={`${classes.gfListTitle} ${classes.titlePointer}`} onClick={handleModalThree}>
                Central Control
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemIcon className={classes.iconsRoot}>
              <img
                src="https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/firststeps.svg"
                className={classes.icon}
                alt="Key icon"
              />
            </ListItemIcon>
            <ListItemText disableTypography={true}>
              <Link variant="h4" className={`${classes.gfListTitle} ${classes.titlePointer}`} onClick={handleModalTwo}>
                First Steps
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemIcon className={classes.iconsRoot}>
              <img
                src="https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/customize.svg"
                className={classes.icon}
                alt="Key icon"
              />
            </ListItemIcon>
            <ListItemText disableTypography={true}>
              <Link variant="h4" className={`${classes.gfListTitle} ${classes.titlePointer}`} onClick={()=> props.handleModal('osf4FUue.json', 'Customize', 'The Foundation, Handstand, and Movement interface is not a video follow-along, but it was designed to move you forward at your pace. This video will guide you to your starting point.')}>
                Customize
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemIcon className={classes.iconsRoot}>
              <img
                src="https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/intensity.svg"
                className={classes.icon}
                alt="Key icon"
              />
            </ListItemIcon>
            <ListItemText disableTypography={true}>
              <Link variant="h4" className={`${classes.gfListTitle} ${classes.titlePointer}`} onClick={()=> props.handleModal('Z112qms6.json', 'Intensity', 'Sometimes we want a new routine. When you’re at that point, check out the additional workouts in our library. We have several fun follow-alongs for handstand, mobility, cardio, and strength.')}>
                Intensity
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemIcon className={classes.iconsRoot}>
              <img
                src="https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/pacing.svg"
                className={classes.icon}
                alt="Calendar Icon"
              />
            </ListItemIcon>
            <ListItemText disableTypography={true}>
              <Link variant="h4" className={`${classes.gfListTitle} ${classes.titlePointer}`} onClick={()=>props.handleModal('nODmLyI4.json', 'Pacing', 'Our program paces you to get stronger without injury. Check out how our Foundation interface paces you according to your feedback.')}>
                Pacing
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemIcon className={classes.iconsRoot}>
              <img
                src="https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/Footprints.svg"
                className={classes.icon}
                alt="Key icon"
              />
            </ListItemIcon>
            <ListItemText disableTypography={true}>
              <Link variant="h4" className={`${classes.gfListTitle} ${classes.titlePointer}`} onClick={()=>props.handleModal('N4DBEO8v.json', 'Footprints', 'When you log your workouts, it’s automatically recorded in your history. You can go back to prior months and see what workouts you were doing and where you were strength-wise. It’s not easy to see improvement day to day, but stepping back and looking over a period of months will encourage you.')}>
                Footprints
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemIcon className={classes.iconsRoot}>
              <img
                src="https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/learn.svg"
                className={classes.icon}
                alt="Key icon"
              />
            </ListItemIcon>
            <ListItemText disableTypography={true}>
              <Link variant="h4" className={`${classes.gfListTitle} ${classes.titlePointer}`} onClick={handleModal}>
                Enlightenment
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemIcon className={classes.iconsRoot}>
              <img
                src="https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/spiceitup.svg"
                className={classes.icon}
                alt="Key icon"
              />
            </ListItemIcon>
            <ListItemText disableTypography={true}>
              <Link variant="h4" className={`${classes.gfListTitle} ${classes.titlePointer}`} onClick={()=>props.handleModal('xQfK0tVc.json', 'Spice It up', 'Sometimes we want a new routine. When you’re at that point, check out the additional workouts in our library. We have several fun follow-alongs for handstand, mobility, cardio, and strength.')}>
                Spice It Up
              </Link>
            </ListItemText>
          </ListItem>
        </List>
      </Paper>
      <EnlighmentModal close={handleClose} open={modal}/>
      <FirstStepts close={handleCloseTwo} open={modalTwo} />
      <CentralControl close={handleCloseThree} open={modalThree}/>
    </Grid>
  );
}

export default NutsAndbolts;
