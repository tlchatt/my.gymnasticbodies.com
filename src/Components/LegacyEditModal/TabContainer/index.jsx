import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider } from '@material-ui/core';

import Aux from '../../../HOC/aux';

import EditCardRow from '../EditCardRow'
import { filterWarmUps } from '../../../Store/util'


const useSytles = makeStyles(theme => ({
  title: {
    padding: '8px 12px'
  }
}))

const TabContainer = props => {
  const classes = useSytles();
  const { value, index, data } = props;
  const sectionsKeys = filterWarmUps(Object.keys(data));

  let tabView = (
    sectionsKeys.map((key, index) =>
      <Aux key={index}>
        <Typography variant="h6" className={classes.title}>{key}</Typography>
        <EditCardRow groupName={key.slice(-1)[0]} data={data[key]} date={props.date} isLevels={props.isLevels}/>
        <Divider />
      </Aux>
    )
  );

  return (
    value === index ? tabView : null
  );
}

export default TabContainer;
