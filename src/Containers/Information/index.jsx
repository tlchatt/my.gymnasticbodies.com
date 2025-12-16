import React from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  Box,
  Card,
  Link
} from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';

import Wrapper from '../../Components/UtilComponents/Wrapper'
import {LinkRef} from '../../Components/UtilComponents/LinkOverride'

const infoLinks = [
  {
    title: 'Advocates',
    imageUrl: 'https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/GFAdv-functional.jpg',
    link: '/advocates',
    isExternalLink: false
  },
  {
    title: 'Blogs',
    imageUrl: 'https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/rear_delts2.jpg',
    link: "https://www.gymnasticbodies.com/blog",
    isExternalLink: true
  },
  {
    title: 'Equipment Lists',
    imageUrl: 'https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/rings.jpg',
    link: "/eqiupment-list",
    isExternalLink: false
  },
  {
    title: 'Podcasts',
    imageUrl: 'https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/coachcast.jpg',
    link: "https://www.gymnasticbodies.com/podcasts/",
    isExternalLink: true
  },
  {
    title: 'Exercises',
    imageUrl: 'https://www.gymnasticbodies.com/gymfit/wp-content/uploads/2022/01/info-icons-3.jpg',
    link: "https://www.gymnasticbodies.com/exercises/",
    isExternalLink: true
  }
]

const useStyles = makeStyles(theme=>({
  background: { background: '#eeeeee', marginBottom: 12 },
  image: {
    width: '128px',
    verticalAlign: 'middle'
  },
  title: {
    marginTop: 0,
    marginBottom: '24px',
    fontSize: '40px',
    fontWeight: 400,
    [theme.breakpoints.down(415)]: {
      fontSize: '28px',
    },
    [theme.breakpoints.up(766)]: {
      fontSize: '32px',
    },
    [theme.breakpoints.up(1024)]: {
      fontSize: '40px',
    }
  },
  cardRoot: {
    maxWidth: 330,
    width: '100%',
    margin: 'auto',
    cursor: 'pointer'
  },
  cardMedia: {
    paddingBottom: '80%',
    aspectRatio: 20/16
  }
}))

const Advocates = (props) => {
  const classes = useStyles();
  const gfImage = 'https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/GF-orangelogo.svg';
  return (
    <Wrapper {...props}>
      <Box m={1} style={{ width: '100%' }}>
        <Grid item xs={12} sm={12} md={12} lg={12} style={{ margin: 'auto', textAlign: 'center' }} >
          <img className={classes.image} src={gfImage} alt="GymFit Logo" />
          <Typography variant='h3' className={classes.title}>
            Follow the links below to learn more <span role='img' aria-labelledby='finger-down'>👇</span>
          </Typography>
        </Grid>
      </Box>
      <Grid item xs={12} sm={12} md={10} lg={10}>
        <Grid container justifyContent='center'>
          {
            infoLinks.map((info, index) => <Grid item xs={12} sm={6} md={4} lg={4} style={{ padding: 8 }} key={ info.title + index }>
              <Link
                component={info.isExternalLink ? Link : LinkRef}
                to={info.isExternalLink ? null : info.link}
                href={info.isExternalLink ? info.link : null}
                color="inherit"
                target={info.isExternalLink ? '_blank': null}
                style={{ color: 'black' }}
              >
                <Card className={classes.cardRoot} elevation={2}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={info.imageUrl}
                    title={ info.title + index }
                  />
                </Card>
                <Typography variant='h4' align='center'>{info.title}</Typography>
              </Link>
            </Grid>
            )
          }
        </Grid>
      </Grid>
    </Wrapper>
  );
}


export default Advocates;



