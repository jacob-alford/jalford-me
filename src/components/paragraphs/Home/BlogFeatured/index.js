import React from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import Typed from 'components/sentences/Typed';

import useTitleSize from 'components/bindings/hooks/useTitleSize';
import useHoverHandler from 'components/bindings/hooks/useHoverHandler';
import useRedirect from 'components/bindings/hooks/useRedirect';

import flowerImage from 'assets/photos/Posts_Flower.jpg';

const styles = {
  banner:{
    marginTop:"8px",
    height:"100vh",
    maxHeight:"500px"
  },
  container:{
    position:'absolute',
    top:'0',
    left:'0',
    right:'0',
    bottom:'0',
    display:'flex',
    flexDirection:'row',
    flexWrap:'nowrap',
    justifyContent:'space-evenly',
    alignItems:'center',
    transition:'box-shadow .25s',
    boxShadow:'inset 0px 0px 70px 0px rgba(0,0,0,.8)'
  },
  containerHover:{
    boxShadow:'inset 0px 0px 95px 0px rgba(0,0,0,.8)'
  },
  canvas:{
    position:"absolute",
    top:'0px',
    left:'0px',
    width:'100%',
    height:'100%'
  },
  title:{
    color:'white'
  },
  button:{
    color:'#EB1F25',
    backgroundColor:'rgba(0,0,0,.5)',
    borderColor:'white',
    transition:'background-color .4s'
  },
  buttonHover:{
    backgroundColor:'rgba(0,0,0,.2)'
  },
  divider:{
    backgroundColor:"white",
    width:"50vw",
    marginTop:'9px',
    marginBottom:'25px'
  }
}

export default function BlogFeatured(props){
  const { h2:titleSize } = useTitleSize();
  const hoverHandlers = useHoverHandler({
    base:styles.container,
    over:styles.containerHover
  });
  const btnHoverHandlers = useHoverHandler({
    base:styles.button,
    over:styles.buttonHover
  });
  const btnClick = useRedirect('/posts');

  const strings = [
    'Welcome!^1000','Read my blog! ^500🙂^1000',
    'Mystery^1000','Philosophy^1000','Movie Critiques^1000',
    'Check it out! ^500🔎^500🤔^500📽️^1000'
  ];
  const imageLayer = [
    { image:flowerImage, amount:.1 }
  ];

  return (
    <ParallaxBanner style={styles.banner} layers={imageLayer}>
      <div {...hoverHandlers}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <Typography variant="h1" paragraph style={{...styles.title,fontSize:titleSize}}>
              <Typed backDelay={0} strings={strings} />
            </Typography>
          </Grid>
          <Grid item>
            <Divider style={styles.divider} light component="div"/>
          </Grid>
          <Grid item>
            <Button
              {...btnHoverHandlers}
              variant="outlined"
              onClick={btnClick}>
              Read
            </Button>
          </Grid>
        </Grid>
      </div>
    </ParallaxBanner>
  );
}
