import React from 'react';

const StepList = (props) => Object.values(props.steps).map((step, index) => <option key={index} value={step.masterySetId}> { index+1 }. { step.sets }x{ step.repsOrSecs }</option>);

export default StepList;
