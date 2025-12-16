import React from 'react';
import { Typography, makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
  title: {
    color: "#FF9435",
    padding: "24px 0 0",
  },
  selctionTitle: {
    color: "#656464",
  },
  media: {
    maxWidth: 75,
    [theme.breakpoints.down(426)]: {
      maxWidth: 50,
    }
  },
  card: {
    background: "transparent",
    borderRadius: '50%',
    [theme.breakpoints.down(426)]: {
      maxWidth: 140,
      maxHeight: 140,
    },
    [theme.breakpoints.up(426)]: {
      maxWidth: (props) => props.maxDiameter ? props.maxDiameter : 180,
      maxHeight:  (props) => props.maxDiameter ? props.maxDiameter : 180,
    },
    display: "flex",
    width: "100%",
    height: "100%",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    [theme.breakpoints.up(426)]: {
      height: (props) => props.maxDiameter ? props.maxDiameter : 180,
    },
    [theme.breakpoints.down(426)]: {
      height: 140,
    },
    borderRadius: '50%',
  },
  autoPilot: {
    maxWidth: 160,
    marginBottom: 10,
    marginTop: 10,
    [theme.breakpoints.down(426)]: {
      maxWidth: 110,
      marginBottom: 8,
      marginTop: 4,
    }
  },
  isSelected: {
    background: (props) => props.highlightColor === 'grey' ? '#E3E3E3' : 'white',
    boxShadow: '0 0 0.75rem #00ADEF'
  },
  cardContent: {
    [theme.breakpoints.down(426)]: {
      padding: 8
    }
  }
}))


const PathSelection = (props) => {
  const classes = useStyles(props)
  return (
    <Card elevation={0} className={clsx(classes.card, { [classes.isSelected]: props.isSelected })}>
      <CardActionArea className={classes.actions} onClick={props.onClick} disabled={props.disabled} >
        <CardMedia
          component="img"
          alt={props.selctionTitle}
          image={`https://gymfit-images.s3.amazonaws.com/General/${props.image}`}
          title={props.selctionTitle}
          className={clsx(classes.media, { [classes.autoPilot]: props.selctionTitle === "Autopilot" })}
        />
        {
          props.selctionTitle
            ? <CardContent className={classes.cardContent} >
              <Typography className={classes.selctionTitle} variant='h5' align='center'>
                {props.selctionTitle}
              </Typography>
            </CardContent>
            : null
        }
      </CardActionArea>
    </Card>
  )
}
export default PathSelection;
