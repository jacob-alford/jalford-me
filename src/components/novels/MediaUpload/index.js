import React , { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputBase from '@material-ui/core/InputBase';

import LightDarkToggler from 'components/words/LightDarkToggler';
import Holder from 'components/words/Holder';

import useTLD from 'components/bindings/hooks/useTLD';
import useTitleSize from 'components/bindings/hooks/useTitleSize';
import { themeHook } from 'theme';

const useClasses = themeHook(
  [
    'getDarkBackground',
    'getLightBackground',
    'getMajorSpacing',
    'getBorderRadius',
    'getMinorSpacing'
  ],
  ([darkBg,lightBg,majorSpacing,borderRadius,minorSpacing]) => ({
    photoUploadHolder:{
      background: ({tldState}) => (tldState === 'light') ? lightBg : darkBg,
      textAlign:'center',
      transition: 'background .5s, color .5s',
      width:'100vw',
      overflowX:'hidden',
      paddingBottom:majorSpacing
    },
    title:{
      color:({tldState}) => (tldState === 'light') ? "rgba(0,0,0,.87)" : 'rgba(255,255,255,1)'
    },
    togglerHolder:{
      width:'100%',
      paddingTop:'12px'
    },
    textBox:{
      color:({tldState}) => (tldState === 'light') ? "rgba(0,0,0,.87)" : 'rgba(255,255,255,1)',
      transition: 'background .5s, color .5s',
      backgroundColor:({tldState}) => (tldState !== 'light') ? "rgba(0,0,0,.95)" : 'rgba(255,255,255,.95)',
      borderRadius,
      padding:minorSpacing,
      borderColor:({tldState}) => (tldState === 'light') ? "rgba(0,0,0,.87)" : 'rgba(255,255,255,1)',
      marginTop:majorSpacing
    }
  })
);

export default function MediaUpload(){
  const [tldState,toggleTld] = useTLD();
  const classes = useClasses({tldState});
  const {h2:fontSize} = useTitleSize();
  const [category,setCategory] = useState("");
  const handleType = evt => setCategory(evt.target.value);
  return (
    <Container className={classes.photoUploadHolder}>
      <Holder className={classes.togglerHolder} justify='flex-end' direction='row'>
        <LightDarkToggler mode={tldState} toggle={toggleTld} />
      </Holder>
      <Typography variant="h2" style={{fontSize}} className={classes.title}>
        Image Upload
      </Typography>
      <InputBase
        variant="outlined"
        label="Category"
        className={classes.textBox}
        value={category}
        onChange={handleType}/>
    </Container>
  );
}
