import React, {
  useState, useEffect,
} from 'react';
import {
  makeStyles,
} from '@material-ui/core';

// Custom components
import BaseForm from '../../Components/onBoardingComponents/Forms/BaseForm';
import FormZero from '../../Components/onBoardingComponents/Forms/FormZero';
import FormOne from '../../Components/onBoardingComponents/Forms/FormOne';
import FormTwo from '../../Components/onBoardingComponents/Forms/FormTwo';
import FormThree from '../../Components/onBoardingComponents/Forms/FormThree';
import FormFour from '../../Components/onBoardingComponents/Forms/FormFour';
import FormFive from '../../Components/onBoardingComponents/Forms/FormFive';
import FormSix from '../../Components/onBoardingComponents/Forms/FormSix';
import FormSeven from '../../Components/onBoardingComponents/Forms/FormSeven';
import Loading from '../../Components/onBoardingComponents/Forms/Loading';
import Recommendation from '../../Components/onBoardingComponents/Forms/Recommendation';



const styles = makeStyles(theme => ({
  root: {
    padding: "64px 8px",
    display: 'flex',
    justifyContent: 'center',
    backgroundImage: 'url(https://www.gymnasticbodies.com/gymfit/wp-content/uploads/2019/07/shutterstock_584202787-1.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    flex: 1,
  }
}))



const OnBoarding = (props) => {
  const classes = styles();
  const [formZero, setFormZero] = useState(true);
  const [formOne, setFormOne] = useState(false);
  const [formTwo, setFormTwo] = useState(false);
  const [formThree, setFormThree] = useState(false);
  const [formFour, setFormFour] = useState(false);
  const [formFive, setFormFive] = useState(false);
  const [formSix, setFormSix] = useState(false);
  const [formSeven, setFormSeven] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reco, setReco] = useState(false);


  const [gender, setGender] = useState('');

  const [strength, setStrength] = useState(0);
  const [mobility, setMobility] = useState(0);
  const [core, setCore] = useState(0);
  const [data, setData] = useState(null);

  const handleReset = (e) => {
    e.preventDefault();
    setFormZero(true);
    setStrength(0);
    setMobility(0);
    setCore(0);
    setData(null)
    setReco(false);
  }


  var handleFormZero = e => {
    e.preventDefault();
    setFormZero(false);
    setFormOne(true);
  }
  var handleFormOne = (e, value) => {
    e.preventDefault();
    setFormOne(false);
    setGender(value);
    setFormTwo(true);
  }
  var handleFormTwo = (e) => {
    e.preventDefault();
    setFormTwo(false);
    setFormThree(true);
  }
  var handleFormThree = (e, value) => {
    e.preventDefault();
    setFormThree(false);
    setStrength(value);
    setFormFour(true);
  }
  var handleFormFour = (e, value) => {
    e.preventDefault();
    setFormFour(false);
    setStrength(strength + value);
    setFormFive(true);
  }
  var handleFormFive = (e, value) => {
    e.preventDefault();
    setFormFive(false);
    setMobility(value)
    setFormSix(true);
  }
  var handleFormSix = (e, value) => {
    e.preventDefault();
    setFormSix(false);
    setMobility(mobility+value)
    setFormSeven(true);
  }
  var handleFormSeven = (e, value) => {
    e.preventDefault();
    setFormSeven(false);
    setCore(value)
    setLoading(true);
  }

  useEffect(() => {
    if (loading) {
      var randomWaitTime = Math.floor(Math.random() * (4000 - 3000 + 1) + 3000);
      setTimeout(() => {
        setLoading(false)
        setData({
          core: core,
          mobility: mobility,
          strength: strength
        })
        setReco(true)
      }, randomWaitTime);
    }
  },[core, loading, mobility, strength])

  return (
    <div className={classes.root}>
      <BaseForm>
        <FormZero active={formZero} handleClick={handleFormZero} />
        <FormOne active={formOne} handleClick={handleFormOne} />
        <FormTwo active={formTwo} handleClick={handleFormTwo} />
        <FormThree active={formThree} handleClick={handleFormThree} />
        <FormFour active={formFour} handleClick={handleFormFour} />
        <FormFive active={formFive} handleClick={handleFormFive} />
        <FormSix active={formSix} handleClick={handleFormSix} />
        <FormSeven active={formSeven} handleClick={handleFormSeven} />
        <Loading gender={gender} active={loading} />
        <Recommendation reset={handleReset} active={reco} data={data}/>
      </BaseForm>
    </div>
  );
}

export default OnBoarding;
