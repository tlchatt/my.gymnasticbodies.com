import React, {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, Grid, Typography} from '@material-ui/core';
// import WidgetBot from '@widgetbot/react-embed'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

// import discordChatIds from '../../UtilComponents/discordIds.json'

const useSytles = makeStyles(theme => ({
  discord: {
    padding: '8px',
    margin: 'auto',
    position: 'relative'
  },
  dropDownButton: {
    position: 'absolute',
    right: 14,
    top: 28,
    color: 'rgb(114, 137, 218)'
  }
}))

const DiscordChat = ({ courseTitle }) => {
  const classes = useSytles();
  const [open, setOpen] = useState(false);

  return (
    <Grid item xs={12} sm={10} md={8} lg={8} className={classes.discord}>
      <Typography align='center' variant='body1' >Chat With Other Atheletes below <span role='img' aria-labelledby='finger-down'>👇🏼</span></Typography>
      {/* <WidgetBot
        server="718570145684914241"
        channel={discordChatIds[courseTitle]}
        height={open ? '400px' : '43px'}
        width='100%'
        shard="https://e.widgetbot.io"
      /> */}
      <IconButton className={classes.dropDownButton} onClick={() => setOpen(!open)}>
        {open ?  <ExpandLessIcon/> : <ExpandMoreIcon/> }
      </IconButton>
    </Grid>
  );
}

export default DiscordChat;
