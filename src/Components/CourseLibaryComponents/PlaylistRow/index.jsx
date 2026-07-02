import React from 'react';
import { Box, Divider, Typography } from '@material-ui/core';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

export default function PlaylistRow({ name, videoName, openVideoModal }) {
  return (
    <>
      <Divider style={{ width: '100%' }} />
      <Box
        m={1}
        mb={2}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '8px 0' }}
        onClick={() => openVideoModal(videoName, name)}
      >
        <PlayCircleOutlineIcon style={{ marginRight: 8, color: '#f47c2a' }} />
        <Typography variant='h5'>{name}</Typography>
      </Box>
    </>
  );
}
