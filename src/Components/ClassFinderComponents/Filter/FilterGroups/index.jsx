import React from 'react';
import {
  makeStyles,
  Grid,
  Typography,
  Divider
} from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Aux from '../../../../HOC/aux'

const useStyles = makeStyles(theme => ({
  title: {
    fontFamily: '"Oswald", "Open Sans", sans-serif',
    fontSize: '20px',
    lineHeight: '24px',
    opacity: '0.54',
    fontWeight: 400,
    letterSpacing: '0.01em',
    margin: '8px 0'
  },
  label: {
    fontFamily: '"Open Sans", Helvetica, Arial, sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1,
  },
  formGroup: {
    paddingBottom: 12
  },
  subtext: {
    fontSize: 12,
    fontWeight: 300,
    lineHeight: 1,
    letterSpacing: 0,
    opacity: 0.54,
    fontFamily: '"Open Sans", Helvetica, Arial, sans-serif',
    marginLeft: 4
  },
  root: {
    marginLeft: 0
  }
}))

const FilterGroups = (props) => {
  const classes = useStyles()
  let title;
  let { handleFilters } = props;
  if (props.title) {
    title = (
      <Typography variant='h4' className={classes.title}>
        {props.title}
      </Typography>
    );
  }
  return (
    <Grid item xs={12} sm={12} md={12} lg={12}>
      {title}
      <FormGroup className={`${classes.formGroup} ${props.fixPadding ? props.fixPadding: '' }`}>
        {
          props.filters.map((item, index) => {
            let label;
            if (props.subtext) {
              label = (
                <Aux>
                  {item}
                  <span className={classes.subtext}>
                    {props.subtext[index]}
                  </span>
                </Aux>
              )
            }
            else label = item;
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    color="primary"
                    onChange={ e => handleFilters(e, item.split(' ').join(''))}
                    checked={props.checked[item.split(' ').join('')]}
                    value={item}
                    inputProps={{
                      'data-filtertype': props.data
                    }}
                  />
                }
                label={label}
                classes={{
                  label: classes.label,
                  root: classes.root
                }}
              />
            )
          })
        }
      </FormGroup>
      <Divider />
    </Grid>
  )
}

export default FilterGroups;

