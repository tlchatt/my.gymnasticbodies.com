import React, {useState} from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';

import GridContainer from '../../Components/UtilComponents/Mui-GridContainer'
import Container from '../../Components/UtilComponents/Container'

import WelcomeHead from '../../Components/WelcomePageComp/Head'
import BluePrints from '../../Components/WelcomePageComp/BluePrints'
import NutsAndBolts from '../../Components/WelcomePageComp/NutsAndBolts'
import Articles from '../../Components/WelcomePageComp/Articles'
import Ad from '../../Components/WelcomePageComp/AllAccessAd';
import NonLegacyModal from '../../Components/NonLegacyModal'

const useStyles = makeStyles({
  background: {background: '#eeeeee'}
})

const WelcomePage = (props) => {
  const classes = useStyles();
  const [modalInfo, setModalInfo] = useState({
    isOPen: false,
    mediaId: '',
    title: '',
    subText: ''
  });

  const handleModal = (mediaId, title, subText) => {
    setModalInfo({
      isOPen: true,
      mediaId: mediaId,
      title: title,
      subText: subText
    })
  }

  const handleClose = () => {
    setModalInfo({
      isOPen: false,
      mediaId: '',
      title: '',
      subText: ''
    })
  }

  return (
    <Container addedClasses={classes.background}>
      <GridContainer elevation={2} addbackground={true}>
        <Grid item container xs={12} sm={12} md={12} lg={10} style={{ margin:'auto'}}>
          <WelcomeHead name={props.name} />
          {
            props.isMaintenance && props.isMaintenance.showHeadsUp && !props.isMaintenance.maintenance
              ? <Grid item xs={12} sm={12} md={12} lg={10} style={{ margin:'auto'}}><Typography variant='body2' align='center' style={{ marginBottom: 8, letterSpacing: '0.2px', color: 'red' }} >{props.isMaintenance.headsUp}</Typography></Grid>
              : null
          }
          <BluePrints/>
          <NutsAndBolts handleModal={handleModal}/>
          {
            props.isAllAccessUser ? <Articles /> : <Ad/>
          }
        </Grid>
        <NonLegacyModal open={modalInfo.isOPen} close={handleClose} courseTitle={modalInfo.title} mediaId={modalInfo.mediaId} subText={modalInfo.subText} />
      </GridContainer>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    name: state.login.name,
    isAllAccessUser: state.login.isAllAccessUser
  }
}

export default connect(mapStateToProps)(WelcomePage);
