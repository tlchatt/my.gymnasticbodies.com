import React from 'react';
  import {
    AppBar,
    Toolbar,
    makeStyles
  } from '@material-ui/core';


  // Icon imports
  import { LogoLink } from '../GymFitIcons/gbIcons.js'
  import FacebookIcon from '@material-ui/icons/Facebook';
  import TwitterIcon from '@material-ui/icons/Twitter';
  import InstagramIcon from '@material-ui/icons/Instagram';

  // Custom imports
  import Container from '../UtilComponents/Container'

  const useStyles = makeStyles(theme => ({
    gfAppBar: {
      backgroundColor: "#f5f5f5",
      borderTop: '1px solid #e0e0e0',
      color: 'rgba(34,34,34,0.5)',
      height: '56px',
      position: 'fixed',
      bottom: 0,
      top: 'auto',
      zIndex: '1000'
    },
    grow: {
      flexGrow: 1,
    },
    title: {
      display: 'block',
    },
    sectionDesktop: {
      display: 'flex',
    },
    menuButton: {
      padding: '6px'
    },
    gfToolBar: {
      minHeight: '56px',
      padding: 0,
      color: 'rgba(34,34,34,0.5)'
    },
    footerLinks: {
        color: 'rgba(34,34,34,0.5)',
        display: 'flex',
        marginLeft:' 1rem',
        lineHeight: '2.25rem',
        verticalAlign: 'middle',
        width: 32
    }

  }));

  export default function PrimarySearchAppBar() {
    const classes = useStyles();
    return (
      <AppBar component='footer' className={classes.gfAppBar} elevation={0} postion='absolute'>
        <Container>
          <Toolbar className={classes.gfToolBar} >
            <LogoLink footerColor/>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <a className={classes.footerLinks} href="https://www.facebook.com/GymnasticBodies/" target='_blank' rel="noopener noreferrer" ><FacebookIcon/></a>
              <a className={classes.footerLinks} href="https://twitter.com/gymnasticbodies" target='_blank' rel="noopener noreferrer" ><TwitterIcon/></a>
              <a className={classes.footerLinks} href="https://www.instagram.com/gymnasticbodies/" target='_blank' rel="noopener noreferrer" ><InstagramIcon/></a>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
