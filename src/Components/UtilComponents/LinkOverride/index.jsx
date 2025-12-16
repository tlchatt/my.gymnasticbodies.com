import React from 'react';
import {NavLink} from 'react-router-dom'

export const LinkRef = React.forwardRef((props, ref) => <div style={{ display: 'contents' }} ref={ref}><NavLink {...props} /></div>);
