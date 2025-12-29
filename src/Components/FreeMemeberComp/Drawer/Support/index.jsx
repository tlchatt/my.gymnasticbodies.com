import React, { useState } from 'react';
import InitialQuiz from './QuizSections/Initial';
import QuizLayout from './QuizSections/QuizLayout';
import Suggestion from './QuizSections/Suggestion'
import { Typography } from '@material-ui/core';

const quizText = {
  UpperBodyOne: {
    title: 'Upper Body Strength 1 of 2',
    SubHeader: () => <Typography variant='body1' style={{ color: '#656464'}}  id="responsive-dialog-title" align='center'>Choose which best describes your pushing strength <i><strong>in good form.</strong></i></Typography>,
    options: [
      {
        image: '1-button-1.png',
        value: 1
      },
      {
        image: '1-button-2.png',
        value: 2
      },
      {
        image: '1-button-3.png',
        value: 3
      },
      {
        image: '1-button-4.png',
        value: 4
      },
      {
        image: '1-button-5.png',
        value: 5
      },
    ],
    nextSection: 'UpperBodyTwo',
    name: 'UpperBody'
  },
  UpperBodyTwo: {
    title: 'Upper Body Strength 2 of 2',
    SubHeader: () => <Typography variant='body1' style={{ color: '#656464'}}  id="responsive-dialog-title" align='center'>Choose which best describes your pulling strength <i><strong>in good form.</strong></i></Typography>,
    options: [
      {
        image: '2-button-1.png',
        value: 1
      },
      {
        image: '2-button-2.png',
        value: 2
      },
      {
        image: '2-button-3.png',
        value: 3
      },
      {
        image: '2-button-4.png',
        value: 4
      },
      {
        image: '2-button-5.png',
        value: 5
      },
    ],
    nextSection: 'CoreOne',
    name: 'UpperBody'
  },
  CoreOne: {
    title: 'Core Strength 1 of 3',
    SubHeader: () => <Typography variant='body1' style={{ color: '#656464'}}  id="responsive-dialog-title" align='center'>Choose which best describes your lever strength <i><strong>in good form.</strong></i></Typography>,
    options: [
      {
        image: '3-button-1.png',
        value: 1
      },
      {
        image: '3-button-2.png',
        value: 2
      },
      {
        image: '3-button-3.png',
        value: 3
      },
      {
        image: '3-button-4.png',
        value: 4
      },
      {
        image: '3-button-5.png',
        value: 5
      },
    ],
    nextSection: 'CoreTwo',
    name: 'Core'
  },
  CoreTwo: {
    title: 'Core Strength 2 of 3',
    SubHeader: () => <Typography variant='body1' style={{ color: '#656464'}}  id="responsive-dialog-title" align='center'>Choose which best describes your side lever strength <i><strong>in good form.</strong></i></Typography>,
    options: [
      {
        image: '4-button-1.png',
        value: 1
      },
      {
        image: '4-button-2.png',
        value: 2
      },
      {
        image: '4-button-3.png',
        value: 3
      },
      {
        image: '4-button-4.png',
        value: 4
      },
      {
        image: '4-button-5.png',
        value: 5
      },
    ],
    nextSection: 'CoreThree',
    name: 'Core'
  },
  CoreThree: {
    title: 'Core Strength 3 of 3',
    SubHeader: () => <Typography variant='body1' style={{ color: '#656464'}}  id="responsive-dialog-title" align='center'>Choose which best describes your compression strength <i><strong>in good form.</strong></i></Typography>,
    options: [
      {
        image: '5-button-1.png',
        value: 1
      },
      {
        image: '5-button-2.png',
        value: 2
      },
      {
        image: '5-button-3.png',
        value: 3
      },
      {
        image: '5-button-4.png',
        value: 4
      },
      {
        image: '5-button-5.png',
        value: 5
      },
    ],
    nextSection: 'MobilityOne',
    name: 'Core'
  },
  MobilityOne: {
    title: 'Mobility 1 of 2',
    SubHeader: () => <Typography variant='body1' style={{ color: '#656464'}}  id="responsive-dialog-title" align='center'>Choose which best describes your pike mobility <i><strong>with straight legs</strong></i></Typography>,
    options: [
      {
        image: '6-button-1.png',
        value: 1
      },
      {
        image: '6-button-2.png',
        value: 2
      },
      {
        image: '6-button-3.png',
        value: 3
      },
      {
        image: '6-button-4.png',
        value: 5
      },
    ],
    nextSection: 'MobilityTwo',
    name: 'Mobility'
  },
  MobilityTwo: {
    title: 'Mobility 2 of 2',
    SubHeader: () => <Typography variant='body1' style={{ color: '#656464'}}  id="responsive-dialog-title" align='center'>Choose which best describes your bridge mobility.</Typography>,
    options: [
      {
        image: '7-button-1.png',
        value: 1
      },
      {
        image: '7-button-2.png',
        value: 2
      },
      {
        image: '7-button-3.png',
        value: 3
      },
      {
        image: '7-button-4.png',
        value: 5
      },
    ],
    nextSection: 'Suggestion',
    name: 'Mobility'
  },
}

const FitnessQuiz = (props) => {

  const [sectionId, setSectionId] = useState('initial');

  const [userInputs, setUserInputs] = useState({
    Core: 0,
    Mobility: 0,
    UpperBody: 0
  });

  const [lowestScore, setLowestScore] = useState(0);

  const handleUserInput = (name, value, cb) => {
    // initial lowest score
    if (lowestScore === 0) setLowestScore(value);

    if (value < lowestScore) {
      setLowestScore(value);
    }

    setUserInputs({
      ...userInputs,
      [name]: userInputs[name] + value
    });

    // callback for going to next part of quiz, setSectionId
    cb();
  }

  if (sectionId === 'Suggestion') return <Suggestion userInputs={userInputs} lowestScore={lowestScore} handleClose={props.handleClose} />


  return sectionId === 'initial'
    ? <InitialQuiz setSectionId={() => setSectionId("UpperBodyOne")} />
    : <QuizLayout {...quizText[sectionId]} setSectionId={() => setSectionId(quizText[sectionId].nextSection)} handleUserInput={handleUserInput} />;
}

export default FitnessQuiz;
