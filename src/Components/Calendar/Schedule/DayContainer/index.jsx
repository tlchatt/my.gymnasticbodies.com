import React from 'react';
import { connect } from 'react-redux';

import Aux from '../../../../HOC/aux';
import DayModal from '../SingleDayModal';

const DayContainer = props => {
  const [open, setOpen] = React.useState(false);


  const handleClickOpen = (event) => {
    // console.log(event.currentTarget)
    // console.log(event.currentTarget.getBoundingClientRect().y + event.target.getBoundingClientRect().height)
    // console.log(event.target.getBoundingClientRect())
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dayArray = ['MONDAY', 'TUESDAY', "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
  const dayArrayText = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

  const column = props.data.columns[dayArray[props.day]];
  const tasks = column.taskIds.map(taskId => {
    return { taskData: props.data.tasks[taskId], taskId }
  });

  const handleColors = (taskID) => {
    if (props.data.tasks[taskID].workoutData.completed >= props.data.tasks[taskID].workoutData.total) {
      return '#00c853';
    }
    if (props.data.tasks[taskID].workoutData.completed > 0 && props.data.tasks[taskID].workoutData.total > props.data.tasks[taskID].workoutData.completed && props.data.tasks[taskID].type === 'Programs') {
      return '#ffa000'
    }
    return '#9e9e9e'
  }

  return (
    <Aux>
      <li className="gf-day-container" day={props.day + 1} key={props.day + 1} onClick={!props.isDetailView ? (event) => handleClickOpen(event) : null}>
        <h6 className="gf-day-text">{dayArrayText[props.day]}</h6>
        <div className="gf-date-section">
          <div className="gf-date">
            {props.weekDay}
          </div>
          <div className="gf-classes">
            {
              // data-complete={props.data.tasks[taskID].amount}
              props.data.columns[dayArray[props.day]].taskIds.map((taskID, index) => <span key={index} task={taskID} style={{color: handleColors(taskID)}}>•</span>)
            }
          </div>
        </div>
      </li>
      <DayModal open={open} close={handleClose} tasks={tasks} day={dayArray[props.day]} currentDayIndex={props.day} weekDay={props.weekDay}/>
    </Aux>
  )
}

const mapStateToProps = state => {
  return {
    data: state.calendar
  }
}

export default connect(mapStateToProps)(DayContainer);
