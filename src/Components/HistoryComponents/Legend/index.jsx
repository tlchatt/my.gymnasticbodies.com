import React from 'react';
import './styles.scss';

const Legend = () => {
  return (
    <ul id="legend">
      <li><span>C</span> - Core</li>
      <li><span>MS</span> - Middle Split</li>
      <li><span>L</span> - Lower Body</li>
      <li><span>FS</span> - Front Split</li>
      <li><span>U</span> - Upper Body</li>
      <li><span>TB</span> - Thoracic Bridge</li>
      <li><span>H</span> - Handstand</li>
      <li><span>M</span> - Movement</li>
      <li><span>R</span> - Rings</li>
      <li><span>CL</span> - Classes</li>
      <li><span>...</span> - More workouts</li>
      <li><span className="selected">T</span> - Thrive all tasks completed</li>
    </ul>
  )
}

export default Legend;
