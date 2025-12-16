import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Custom imports
import DayRow from './DayRow'

// Redux Util Imports
import * as actions from '../../../Store/Action/index';


const DetailedView = props => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  const handleEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const start = props.data.columns[source.droppableId];
    const end = props.data.columns[destination.droppableId];

    if (start === end) {
      const newTaskId = [...start.taskIds];
      newTaskId.splice(source.index, 1);
      newTaskId.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskId
      }

      props.setCalendar({
        ...props.data,
        columns: {
          ...props.data.columns,
          [newColumn.id]: newColumn
        }
      });
    }
    else {
      // check to make sure that there arent 2 of the same item in a row if destination and start are differnt
      for (let i = 0; i < end.taskIds.length ; i++){
        if (props.data.tasks[draggableId].id === props.data.tasks[end.taskIds[i]].id) return;
      }

      const allClasses = props.data.tasks[draggableId].parentId ? [...props.subCourses] : [...props.courseList];

      const DtoDIndex = {
        'MONDAY': 1,
        'TUESDAY': 2,
        'WEDNESDAY': 3,
        'THURSDAY': 4,
        'FRIDAY': 5,
        'SATURDAY': 6,
        'SUNDAY' : 7,
      }


      for (let i = 0; i < allClasses.length; i++){
        if ( allClasses[i].classInfo && allClasses[i].wp_postid === props.data.tasks[draggableId].id) {
          let newDayIndexes = [...allClasses[i].classInfo.dayIndexes];

          newDayIndexes = newDayIndexes.filter((item) => item !== DtoDIndex[source.droppableId]);
          newDayIndexes = [...newDayIndexes, DtoDIndex[destination.droppableId]]

          allClasses[i] = {
            ...allClasses[i],
            classInfo: {
              ...allClasses[i].classInfo,
              dayIndexes: newDayIndexes
            }
          }

          props.data.tasks[draggableId].parentId ? props.setSubCourses(allClasses) : props.setClasses(allClasses);
        }
      }

      const startTaskId = [...start.taskIds];
      startTaskId.splice(source.index, 1);
      const newColumn = {
        ...start,
        taskIds: startTaskId
      }

      const endTaskIds = [...end.taskIds];
      endTaskIds.splice(destination.index, 0, draggableId);

      const newFinish = {
        ...end,
        taskIds: endTaskIds
      }


      const axiosData = {
        postId: props.data.tasks[draggableId].id,
        oldDay: start.id,
        newDay: end.id
      }
      const updatedData = {
        ...props.data,
        columns: {
          ...props.data.columns,
          [newColumn.id]: newColumn,
          [newFinish.id]: newFinish
        }
      }

      props.setAxiosCalendar(axiosData, updatedData );
    }
  }

  return (
    <DragDropContext
    onDragEnd={handleEnd}
    >
      {
        props.data.columnOrder.map((columnId, index) => {
          const column = props.data.columns[columnId];
          const tasks = column.taskIds.map(taskId => props.data.tasks[taskId]);

          return <DayRow day={column} index={index} myClasses={tasks} key={columnId} taskId={column.taskIds} isMobile={isMobile}/>
        })
      }
    </DragDropContext>
  )
}


const mapDispatchToProps = dispatch => {
  return {
    setCalendar: (updatedData) => dispatch(actions.SetCaladner(updatedData)),
    setAxiosCalendar: (axiosData, updatedData) => dispatch(actions.DragAndDrop(axiosData, updatedData)),
    setClasses: (classes) => dispatch(actions.SetAllClasses(classes)),
    setSubCourses: (subCourses) => dispatch(actions.SetAllSubClasses(subCourses))
  }
}

const mapStateToProps = state => {
  return {
    data: state.calendar,
    courseList: state.classes,
    subCourses: state.subClasses
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailedView);
