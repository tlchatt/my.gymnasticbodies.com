import React, {useEffect} from "react";
import Drawer from "react-drag-drawer";
import clsx from "clsx";
import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import GuidedPlans from '../../GuidedPlans';
import SwitchToAutoModal from '../SwitchToAutoModal';
import FocusCycles from '../../FocusCycles';
import FitnessQuiz from "../../FitnessQuiz";
import Thrive from '../../Thrive'
import History from '../../History'
import BuildYourOwn from '../BuildYourOwn'

import "./index.scss";

const TestingDrawer = props => {
  const { open, toggle, isDrawerOpen, componentId } = props;

  const HandleCompnentId = () => {
    switch (componentId) {
      case "GuidedPlans":
        return <GuidedPlans isInDrawer fullWidth handleClose={toggle} open={open} />;
      case "SwitchToAuto":
        return <SwitchToAutoModal handleClose={toggle} />;
      case "FocusCycles":
        return <FocusCycles />;
      case "FitnessQuiz":
        return <FitnessQuiz handleClose={toggle} />;
      case "Thrive":
        return <Thrive open={open} />;
      case "History":
        return <History />;
      case 'BuildYourOwn':
        return <BuildYourOwn handleClose={toggle} />;
      default:
        return null;
    }
  };
  const handleClose = () => {
    toggle();
    document.body.style.overflow = "";
  }
  useEffect(() => {
    return () =>  document.body.style.overflow = ""
  }, []);
  return (
    <Drawer
      open={open}
      onRequestClose={handleClose}
      modalElementClass={clsx("modal", {
        'thive-drawer': componentId === 'Thrive',
        "history-drawer": componentId === 'History',
        "open-padding": isDrawerOpen,
        "closed-padding": !isDrawerOpen
      })}
      containerElementClass="container-div"
      parentElement={document.body} // element to be appended to
      direction="left"
      onOpen={() => document.body.style.overflow = "hidden"}
    >
      <IconButton className='close-button' aria-label="close" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
      <HandleCompnentId />
    </Drawer>
  );
}


export default TestingDrawer;
