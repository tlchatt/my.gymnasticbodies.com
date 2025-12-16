import React from 'react';
import { IconButton, Box } from '@material-ui/core';
import { CompleteIcon, GreenComplete } from '../../../Drawer/SvgIcons';
import AutorenewIcon from '@material-ui/icons/Autorenew';


export default function CompleteButton(props) {
  const { showRefresh } = props;
  return (
    <Box className="gf-icon gf-icon-jc-center">
      {
        showRefresh && <IconButton component="span" style={{ padding: 10, marginBottom: 4 }} onClick={props.handleRefreshLevels}>
          <AutorenewIcon style={{fontSize: 26}} />
        </IconButton>
      }
      <IconButton disabled={props.isPreviousDay || props.disabled} aria-label="upload picture" component="span" onClick={props.handleLog} >
        {props.isLogged ? <GreenComplete /> : <CompleteIcon />}
      </IconButton>
    </Box>
  );
}
