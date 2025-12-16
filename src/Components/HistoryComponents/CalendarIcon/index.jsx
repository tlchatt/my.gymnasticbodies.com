import React from 'react'
const icon = ({ text }) => <span className={`gf-legend-icon ${ text === 'T' ? 'gf-thrive-completed' : '' }`}>{text}</span>
export default icon;
