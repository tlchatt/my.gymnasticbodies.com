import React from 'react';
import { Grid, Divider, makeStyles } from '@material-ui/core';
import { Droppable } from 'react-beautiful-dnd';

// Custom Imports
import Card from '../DetailedViewCard';
import './styles.scss';

// Util Imports
import Aux from '../../../../HOC/aux';

const useStyles = makeStyles(theme => ({
  titleContrast: {
    margin: 0,
    fontSize: '16px',
    lineHeight: '24px',
    opacity: '0.54',
    fontWeight: 500,
    fontFamily: '"Oswald", "Open Sans", sans-serif',
    letterSpacing: "0.64px"
  },
  root: {
    padding: 8,
  },
  detailedRow: {
    display: 'flex',
    minHeight: 64,
    overflowX: 'scroll'
  },
  restDay: {
    fontFamily: '"Open Sans", Helvetica, Arial, sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '0.65px',
    opacity: 1,
    transition: 'opacity .25s ease-in-out'
  },
  hidden: {
    opacity: 0
  },
  centerAlign: {
    display: 'flex',
    alignItems: 'center'
  }
}))

const DayRow = props => {
  const dayArray = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
  const classes = useStyles();

  const { myClasses } = props;

  // let finalArray = [];
  // let warmUps = [];
  // let Classes = [];
  // let programs = [];

  // if (props.myClasses.length) {
  //   warmUps = myClasses.filter(item => item.workoutOrderType === "WarmUp");
  //   Classes = myClasses.filter(item => item.workoutOrderType === "Classes");
  //   programs = myClasses.filter(item => item.workoutOrderType === "Programs");
  //   finalArray = [...warmUps, ...Classes, ...programs]
  // }



  return (
    <Aux>
      <Divider/>
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={12} md={12} lg={1} className={`${classes.root} ${classes.centerAlign}`}>
          <h4 className={classes.titleContrast}>{dayArray[props.index]}</h4>
        </Grid>
        <Droppable droppableId={props.day.id } direction="horizontal">
          {(provided, snapshot) => (
            <Grid item xs={12} sm={12} md={12} lg={11} className={` gf-hide-scrollbar ${classes.detailedRow} ${classes.root}`} ref={provided.innerRef} {...provided.droppableProps}>
              {
                myClasses.length
                  ? myClasses.map((task, index) =>
                      task !== undefined
                        ? <Card
                            title={task.title}
                            amount={task.workoutData}
                            id={props.taskId[index]}
                            index={index}
                            wpId={task.id}
                            key={task.id}
                            dayIndex={props.index}
                            imgUrl={task.imageId}
                            parentId={task.parentId}
                            type={task.type}
                            isMobile={props.isMobile}
                          />
                        : null
                    )
                  : <h3 className={`${classes.restDay} ${snapshot.isDraggingOver ? classes.hidden: ''}`}>Rest Day</h3>
              }
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </Grid>
    </Aux>
  )
}

export default DayRow;
