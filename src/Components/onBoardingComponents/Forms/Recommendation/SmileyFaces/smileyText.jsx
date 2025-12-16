import React from 'react';

import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import StarBorderIcon from '@material-ui/icons/StarBorder';

export const obj = {
  core: {
    needsWork: {
      text: 'Your core is a bit behind but we can help with that.',
      component: <SentimentDissatisfiedIcon/>
    },
    average: {
      text: 'Your core is similar to where most people start.',
      component: <SentimentSatisfiedIcon/>
    },
    aboveAvrage: {
      text: 'Good core strength but to progress to harder exercises you’ll need more mobility.',
      component: <SentimentSatisfiedAltIcon/>
    },
    outstanding: {
      text: 'Nice work, core conqueror! Your focus on full-body strength is opening doors to some cool tricks.',
      component: <SentimentVerySatisfiedIcon/>
    },
    star: {
      text: 'Great job, we’ll give you the most challenging core work.',
      component: <StarBorderIcon/>
    }
  },
  strength: {
    needsWork: {
      text: 'We’ve added some gentle strength work so you can work at your own pace.',
      component: <SentimentDissatisfiedIcon/>
    },
    average: {
      text: 'Good start, we’ll add volume and progression to your plan.',
      component: <SentimentSatisfiedIcon/>
    },
    aboveAvrage: {
      text: 'You have a good base of strength.',
      component: <SentimentSatisfiedAltIcon/>
    },
    outstanding: {
      text: 'You’ve already developed a great foundation of strength. Our program will guide you to more.',
      component: <SentimentVerySatisfiedIcon/>
    },
    star: {
      text: 'You have an excellent base of strength but we’ve got plenty of work to keep you busy.',
      component: <StarBorderIcon/>
    }
  },
  mobility: {
    needsWork: {
      text: 'We won’t sugar coat it, mobility should be your main training priority right now.',
      component: <SentimentDissatisfiedIcon/>
    },
    average: {
      text: 'Your mobility has room to improve, we’ll include that in your recommendations.',
      component: <SentimentSatisfiedIcon/>
    },
    aboveAvrage: {
      text: 'Great start on your mobility, we’ll accelerate you.',
      component: <SentimentSatisfiedAltIcon/>
    },
    outstanding: {
      text: 'You’ve not neglected your mobility. You’re a prime candidate for what is possible with GymFit.',
      component: <SentimentVerySatisfiedIcon/>
    },
    star: {
      text: 'Outstanding mobility, you’re ready for advanced work.',
      component: <StarBorderIcon/>
    }
  }
}
