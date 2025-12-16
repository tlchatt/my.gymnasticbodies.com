import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Button,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';

const imageStyles = makeStyles({
  root: {
    maxWidth: 300,
    width: '100%',
    borderRadius: 8
  },
  media: {
    height: 210,
  },
  action: {
    margin: 0
  },
  cardAction: {
    justifyContent: 'center'
  },
  headerRoot: {
    padding: '8px 12px'
  }
})

const ImageUpload = props => {
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()
  const [userImage, setUserImage] = useState('')
  const classes = imageStyles();

  const { img, setObj } = props;

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  useEffect(() => {
    if (img) {
      if (process.env.REACT_APP_IS_PRODUCTION === 'production') {
        setUserImage(`https://gymfit-user-images.s3.amazonaws.com/photos/${img}`);
      }
      else {
        setUserImage(`https://gymfit-user-images.s3.amazonaws.com/test-env-photos/${img}`);
      }
    }
  },[img])

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      setObj(undefined)
      return
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0])
    setObj(e.target.files[0])
  }

  return (
    <Card className={classes.root} elevation={4}>
      <CardHeader
        title={props.title}
        classes={{
          action: classes.action,
          root: classes.headerRoot,
        }}
        action={
          <Button
            component="label"
            color="primary"
          >
            Upload Image
            <input
              type='file'
              accept="image/*"
              multiple={false}
              onChange={onSelectFile}
              hidden
            />
          </Button>
        }
      />
      <CardMedia
        className={classes.media}
        image={selectedFile ? preview : userImage ? userImage : "https://gymfit-images.s3.amazonaws.com/nutrition/uploadPhoto.svg"}
        alt='Upload Image'
      />
    </Card>
  )
}

export default ImageUpload;
