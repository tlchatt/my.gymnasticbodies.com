import React from 'react';
import {
  Grid,
  makeStyles,
} from '@material-ui/core';

import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const useStyles = makeStyles(theme=>({
  root: {
    backgroundColor: '#1E88E5',
    color: 'white',
    padding: '8px 16px'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    position: 'relative',
    top: 4,
    color:'white'
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },

}))

const EqiupmentDropdown = (props) => {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { title, equipment } = props;

  return (
    <Grid item xs={12} sm={12} md={10} lg={8} style={{padding: 8}}>
      <Card>
        <CardHeader
          className={classes.root}
          action={
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          }
          title={title}
        />
        <CardContent style={{padding: 0}}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent style={{ padding: 8 }}>
              <ul>
                {
                  equipment.multiCourse ?
                    equipment.multiCourse.map((item, key) => (
                        <li key={key}>{item.title}
                          <ul>
                            {item.equipment.map((innerList, key) => <li key={key}>{innerList}</li>)}
                          </ul>
                        </li>
                      )
                     ):
                  equipment.equipment.map((item, index) => <li key={index}>{item}</li>)
                }
              </ul>
            </CardContent>
          </Collapse>
        </CardContent>
      </Card>
    </Grid>
  );
}


export default EqiupmentDropdown;

