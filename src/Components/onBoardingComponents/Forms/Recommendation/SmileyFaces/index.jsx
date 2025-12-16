import React, {useEffect, useRef} from 'react';
import {
  makeStyles,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@material-ui/core';
import { obj as text } from './smileyText.jsx';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'inherit',
    padding: '0px'
  },
  inline: {
    display: 'inline',
  },
  paddingS: {
    padding: '8px'
  }
}));

export default function SmileyFaces(props) {
  const classes = useStyles();
  let dataCore = useRef();
  let dataStrength = useRef();
  let dataMobility = useRef();

  useEffect(() => {
    if (props.data) {
      let obj = props.data;

      if ( obj.core === 1 ) dataCore.current='needsWork' ;
      else if ( obj.core === 2 ) dataCore.current='average';
      else if ( obj.core === 3 ) dataCore.current='aboveAvrage';
      else if ( obj.core === 4 ) dataCore.current = 'outstanding';
      else if ( obj.core === 5 ) dataCore.current='star';

      if ( obj.strength === 1 || obj.strength === 2 ) dataStrength.current='needsWork';
      else if ( obj.strength === 3 || obj.strength === 4 ) dataStrength.current='average';
      else if ( obj.strength === 5 || obj.strength === 6 ) dataStrength.current='aboveAvrage';
      else if ( obj.strength === 7 || obj.strength === 8 ) dataStrength.current = 'outstanding';
      else if ( obj.strength === 9 || obj.strength === 10 ) dataStrength.current='star';

      if ( obj.mobility === 1 || obj.mobility === 2 ) dataMobility.current='needsWork';
      else if ( obj.mobility === 3 || obj.mobility === 4 ) dataMobility.current='average';
      else if ( obj.mobility === 5 || obj.mobility === 6 ) dataMobility.current='aboveAvrage';
      else if ( obj.mobility === 7 || obj.mobility === 8 ) dataMobility.current = 'outstanding';
      else if ( obj.mobility === 9 || obj.mobility === 10 ) dataMobility.current='star';

    }
  }, [props.data])

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start" className={classes.paddingS}>
        <ListItemAvatar style={{minWidth: '44px'}}>
          {dataStrength.current ? text.strength[dataStrength.current].component : <SentimentSatisfiedAltIcon/>}
        </ListItemAvatar>
        <ListItemText
          primary="Strength"
          secondary={
            <React.Fragment>
              {dataStrength.current ? text.strength[dataStrength.current].text : ''}
            </React.Fragment>
          }
        />
      </ListItem>
      <ListItem alignItems="flex-start" className={classes.paddingS}>
        <ListItemAvatar style={{minWidth: '44px'}}>
          {dataMobility.current ? text.mobility[dataMobility.current].component : <SentimentSatisfiedAltIcon/>}
        </ListItemAvatar>
        <ListItemText
          primary="Mobility"
          secondary={
            <React.Fragment>
              {dataMobility.current ? text.mobility[dataMobility.current].text : ''}
            </React.Fragment>
          }
        />
      </ListItem>
      <ListItem alignItems="flex-start" className={classes.paddingS}>
        <ListItemAvatar style={{minWidth: '44px'}}>
          {dataCore.current ?  text.core[dataCore.current].component  : <SentimentSatisfiedAltIcon/>}
        </ListItemAvatar>
        <ListItemText
          primary="Core"
          secondary={
            <React.Fragment>
              {dataCore.current ? text.core[dataCore.current].text : ''}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}


