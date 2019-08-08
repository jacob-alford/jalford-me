import React , { useState , useEffect } from 'react';
import { withRouter } from 'react-router';
import { ParallaxBanner } from 'react-scroll-parallax';
import { Typography , Button , Grid , Divider } from '@material-ui/core/';

import Typed from '../../../sentences/Typed';

import useTitleSize from '../../../bindings/hooks/useTitleSize';

import flowerImage from '../../../../assets/photos/Posts_Flower.jpg';

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

function BlogFeatured(props){
  const { history } = props;
  const { h2:titleSize } = useTitleSize();
  const [containerHover,setContainerHover] = useState(false);
  const [buttonHovered,setButtonHovered] = useState(false);

  const handleOnClick = () => history.push('/posts');
  const constructOnOver = setter => {
    return () => setter(true);
  }
  const constructOnOut = setter => {
    return () => setter(false);
  }

  const strings = [
    'Welcome!^1000','Read my blog! ^500🙂^1000',
    'Mystery^1000','Philosophy^1000','Movie Critiques^1000',
    'Check it out! ^500🔎^500🤔^500📽️^1000'
  ];
  const imageLayer = [
    { image:flowerImage, amount:.2 }
  ];

  return (
    <ParallaxBanner style={styles.banner} layers={imageLayer}>
      <div style={(containerHover) ? {...styles.container,...styles.containerHover} : styles.container} onMouseOver={constructOnOver(setContainerHover)} onMouseOut={constructOnOut(setContainerHover)}>
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
              style={(buttonHovered) ?
                    {...styles.button,...styles.buttonHover}
                  : {...styles.button}}
              variant="outlined"
              onClick={handleOnClick}
              onMouseOver={constructOnOver(setButtonHovered)}
              onMouseOut={constructOnOut(setContainerHover)}>
              Read
            </Button>
          </Grid>
        </Grid>
      </div>
    </ParallaxBanner>
  );
}

export default withRouter(BlogFeatured);
