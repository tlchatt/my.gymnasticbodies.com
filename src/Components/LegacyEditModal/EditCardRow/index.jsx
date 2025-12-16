import React, {useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Hidden } from '@material-ui/core';

import EditCard from '../EditCard'
import Aux from '../../../HOC/aux'

const useSytles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    paddingBottom: 8,
    [theme.breakpoints.down('sm')]: {
      padding: 8
    }
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    scrollBehavior: 'smooth',
    width: '100%'
  },
  scrollButtons: {
    alignItems: 'center',
    background: 'rgba(245,245,245,0.7)',
    color: "rgba(34,34,34,0.7)",
    cursor: 'pointer',
    display: 'flex',
    fontSize: '2rem',
    padding: 8
  },
  tile: {
    padding: 4
  }
}))

const GroupRow = props => {
  const classes = useSytles();
  const theme = useTheme();
  const phoneScreen = useMediaQuery(theme.breakpoints.down(415));
  const scrollRef = useRef();

  const handleRightClick = () => {
    if (scrollRef.current) scrollRef.current.scrollLeft += 250;
  }
  const handleLeftClick = () => {
    if (scrollRef.current) scrollRef.current.scrollLeft -= 250;
  }

  let prorgressionData = props.data;
  prorgressionData = prorgressionData.filter(prog => prog.exerciseNotation !== 'A0')

  let progAmount = prorgressionData.length;


  return (
    <Aux>
      <div className={classes.root}>
        <Hidden only={['xs', 'sm']}>
          <div className={classes.scrollButtons} onClick={handleLeftClick}>
            <ChevronLeftIcon/>
          </div>
        </Hidden>
        <GridList className={`no-scroll ${classes.gridList} `} cols={phoneScreen ? 1.65 : 3.25 } cellHeight='auto' ref={scrollRef}>
          {prorgressionData.map((prog, key) => prog.exerciseNotation !== 'A0' ? <GridListTile classes={{ tile: classes.tile }} key={key}> <EditCard index={key} progression={prog} outOf={progAmount} date={props.date} isLevels={props.isLevels} /> </GridListTile> :null)}
        </GridList>
        <Hidden only={['xs', 'sm']}>
          <div className={classes.scrollButtons} onClick={handleRightClick}>
            <ChevronRightIcon/>
          </div>
        </Hidden>
      </div>
    </Aux>
  );
}

export default React.memo(GroupRow);
