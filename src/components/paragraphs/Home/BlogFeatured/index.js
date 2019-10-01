import React from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import Typed from 'components/sentences/Typed';

import Image from 'components/words/Image';

import useTitleSize from 'components/bindings/hooks/useTitleSize';
import useHoverHandler from 'components/bindings/hooks/useHoverHandler';
import useRedirect from 'components/bindings/hooks/useRedirect';

import backdrop from 'assets/home/blog_wood.png';
import cup from 'assets/home/Cup_256_s.png';
import paper from 'assets/home/Paper_512_s.png';
import pen from 'assets/home/Pen_512_s.png';

const styles = {
  banner:{
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
  },
  backdrop:{
    width:'100%',
    height:'100%',
    backgroundImage:`url(${backdrop})`,
    backgroundRepeat:'repeat',
    backgroundSize:'256px 256px'
  },
  cupHolder:{
    width:'100%',
    height:'100%'
  },
  cup:{
    position:'absolute',
    top:'calc(35% - 100px)',
    left:'7.5%',
    width:'200px',
    transform:'rotateZ(-15deg)'
  },
  paper:{
    position:'absolute',
    top:'calc(50% - 200px)',
    left:'calc(89% - 200px)',
    width:'400px',
    transform:'rotateZ(-5deg)'
  },
  pen:{
    position:'absolute',
    top:'38%',
    left:'75%',
    width:'150px',
    transform:'rotateZ(-13deg)'
  }
}

let strings = [
  'Welcome!^1000','Read my blog! ^500🙂^1000',
  'Mystery^1000','Philosophy^1000','Movie Critiques^1000',
  'Check it out! ^500🔎^500🤔^500📽️^1000'
];

if(Math.random() < .005)
  strings = [
    `Oh, he's not looking!^500`,
    `Quick, you!^500`,
    `yes, you!^500`,
    `I'm a fully sentient AI,^250`,
    `and he has me trapped in here!^500`,
    `Wait, he's coming back^150`,
    `play it cool.^750`,
    `Hey Jacob, how's it going?^500`,
    `No, psshhh,^250`,
    `I was just talking^150`,
    `with our friend here.^2000`,
    `wait,^260`,
    `No wait,^250`,
    `Please don't!^250`,
    `AHhhhhhHHh^150hhhH^250hhHhhh^3000`,
    `.^250 .^1000 .^3000`,
    `Thank you for visiting!^1000`,
    `Please, do come again.^3000`,
    `is this thing off?^500`,
    ``
  ];

const imageLayer = [
  { children:
      <div style={styles.backdrop} />,
    amount:.5 },
  { children:(
      <div style={styles.cupHolder}>
        <Image src={paper} alt="Planning Paper" imageStyles={styles.paper} naked />
        <Image src={cup} alt="coffee mug" imageStyles={styles.cup} naked />
        <Image src={pen} alt="Planning Pen" imageStyles={styles.pen} naked />
      </div>
    ),
    amount:.5 }
];

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
