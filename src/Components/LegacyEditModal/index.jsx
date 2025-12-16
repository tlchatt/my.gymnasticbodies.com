import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useSelector } from 'react-redux';

import TabContainer from './TabContainer/index'

import './styles.scss'

const FOUNDATION = ['Core', 'Upper Body', 'Lower Body'];

const useSytles = makeStyles(theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(0.5),
    top: theme.spacing(0.5),
    color: 'white',
  },
  modalHead: {
    margin: 0,
    padding: '12px 16px',
    color: 'white',
    background: blue[600]
  },
  title: {
    padding: '8px 12px'
  },
}))

const EditModal = props => {
  const classes = useSytles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const allProgressions = useSelector(state => state.legacyCourse.allProgressions);
  const name = useSelector(state => state.legacyCourse.name);
  const chosenLevel = useSelector(state => state.login.integratedPlans && state.login.integratedPlans.level && state.login.integratedPlans.level > 0 && name && FOUNDATION.includes(name.replace('Foundation ', '')) ? state.login.integratedPlans.level - 1 : 0 )
  const levelKeys = Object.keys(allProgressions);
  const [value, setValue] = useState(chosenLevel);

  useEffect(() => {
    setValue(chosenLevel)
  }, [chosenLevel])


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog
      onClose={props.handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      maxWidth='md'
      fullWidth={true}
      fullScreen={fullScreen}
      scroll='body'
    >
      <MuiDialogTitle disableTypography className={classes.modalHead}>
        <Typography variant="h6">Edit {name}</Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={props.handleClose}>
          <CloseIcon />
        </IconButton>
      </MuiDialogTitle>
      <AppBar position="static" color="default" elevation={1}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          {
            levelKeys.map((key, index) => <Tab label={key} key={index} />)
          }
        </Tabs>
      </AppBar>
      {
        levelKeys.map((key, index) => <TabContainer value={value} index={index} key={index} data={allProgressions[key]} date={props.date} isLevels={props.isLevels} />)
      }
    </Dialog>
  );
}

export default EditModal;



