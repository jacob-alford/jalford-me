import React , { useEffect , useState } from 'react';

import { Grid, IconButton , Typography } from '@material-ui/core/';
import { ArrowForwardIos , ArrowBackIos } from '@material-ui/icons';

import { ParallaxBanner } from 'react-scroll-parallax';

import useSeriesConnect from '../../../bindings/hooks/useSeriesConnect';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import BlogCard from '../../../words/BlogListing/BlogCard';

const toRGB = (...hexes) => hexes.map(hex => [
  parseInt(`${hex[1]}${hex[2]}`,16),
  parseInt(`${hex[3]}${hex[4]}`,16),
  parseInt(`${hex[5]}${hex[6]}`,16)
]);

const colorList = [
  '#5DE8E5','#F44D9B','#E9275B',
  '#01FFC3','#00A9FE','#28CF75',
  '#F89899','#5AFFFF','#FC6B68'
];
const neonColors = [...toRGB(...colorList)];
const randomColor = () => neonColors[Math.floor(Math.random() * neonColors.length)];
const colorString = (arr,alpha) => `rgba(${arr[0]},${arr[1]},${arr[2]},${alpha})`;
class randomBokehBall{
  constructor(width,height,index){
    this.index = index;
    this.radius = Math.random() * (Math.min(width,1000) / 15) + (Math.min(width,1000) / 20);
    this.x = Math.random() * width * .5;
    this.y = Math.random() * height / 2 + height / 4;
    this.fadeRate = .01;
    this.color = randomColor();
    this.lingerDuration = Math.floor(Math.random() * 950) + 90;
    this.currentLinger = 0;
    this.maxOpacity = Math.random() * .5 + .25;
    this.currentFade = 0;
    this.containerHeight = height;
    this.containerWidth = width;
    this.direction = (Math.random() < .009) ? -1 : 1;
    this.doesGrow = (Math.random() < .009) ? 0 : 1;
    this.doesMove = (Math.random() < .009) ? 0 : 1;
    this.moveRate = (Math.random() * .35 + .35) * this.direction * this.doesMove * this.doesGrow;
    this.growRate = .00045 * this.direction * this.doesMove * this.doesGrow;
    this.currentGrow = 1;
  }
}

const progressBall = (ball,bokeh) => {
  /* Life cycle has ended, begin anew */
  ball.currentGrow += ball.growRate;
  ball.x += ball.moveRate;
  if(ball.currentFade === 0 && ball.currentLinger >= ball.lingerDuration){
    bokeh.splice(ball.index,1,new randomBokehBall(ball.containerWidth,ball.containerHeight,ball.index));
    ball = null;
  }else{
    /* Fade / Grow In */
    if(ball.currentFade < ball.maxOpacity && ball.currentLinger < ball.lingerDuration){
      if(ball.currentFade + ball.fadeRate < ball.maxOpacity)
        ball.currentFade += ball.fadeRate;
      else ball.currentFade = ball.maxOpacity;
    }else{
      /* Persist for fixed time */
      if(ball.currentLinger < ball.lingerDuration){
        ball.currentLinger++;
      /* Fade Out */
      }else{
        if(ball.currentFade - ball.fadeRate > 0)
          ball.currentFade -= ball.fadeRate;
        else ball.currentFade = 0;
      }
    }
  }
}

export default function Philosophy(props){
  const data = useSeriesConnect("Philosophy");
  const screenTooSmall = useMediaQuery('(max-width:400px)');
  const [selectedPhi,setSelectedPhi] = useState(0);
  const { minHeight = 1000 , widthStr = '100vw' , heightStr = '75vh' } = props;
  const styles = {
    canvas:{
      position:"absolute",
      left:"0px",
      top:"0px",
      width:'100%',
      height:'100%',
      background: 'rgba(21,24,37,1)'
    },
    parallaxContainer:{
      width:widthStr,
      minHeight:`${minHeight}px`,
      height:heightStr
    },
    container:{
      position:'absolute',
      top:'0',
      left:'0',
      right:'0',
      bottom:'0',
      boxShadow:'inset 0px 0px 70px 0px rgba(0,0,0,.8)'
    },
    navButton:{
      color:"white"
    },
    header:{
      textAlign:'center',
      background:'linear-gradient(to right, #12c2e9, #c471ed, #f64f59)',
      WebkitBackgroundClip:'text',
      WebkitTextFillColor:'transparent'
    }
  }

  const navRight = () => {
    if(data.postData && data.postData.length > 0)
      setSelectedPhi((selectedPhi + 1) % data.postData.length);
  }
  const navLeft = () => {
    if(data.postData && data.postData.length > 0)
      setSelectedPhi((selectedPhi - 1 >= 0) ? selectedPhi - 1 : data.postData.length - 1);
  }

  const bgCanvas = React.useRef();
  const imageLayer = [
    { children: <canvas ref={bgCanvas} style={styles.canvas}/> , amount:.1 }
  ];

  useEffect(() => {
    const context = bgCanvas.current.getContext("2d");
    bgCanvas.current.width = window.innerWidth;
    bgCanvas.current.height = Math.max(minHeight,window.innerHeight * (parseInt(heightStr,10)/100));
    let width = bgCanvas.current.width;
    let height = bgCanvas.current.height;
    let w2h = (height > width) ? height/width : (height === width) ? 1 : width/height;
    let h2w = (width > height) ? width/height : (height === width) ? 1 : height/width;
    const updateWidthHeight = () => {
      if(bgCanvas.current.width !== window.innerWidth || bgCanvas.current.height !== window.innerHeight * (parseInt(heightStr,10)/100)){
        bgCanvas.current.width = window.innerWidth;
        bgCanvas.current.height = Math.max(minHeight,window.innerHeight * .75);
        width = bgCanvas.current.width;
        height = bgCanvas.current.height;
        w2h = (height > width) ? height/width : (height === width) ? 1 : width/height;
        h2w = (width > height) ? width/height : (height === width) ? 1 : height/width;
      }
    }

    const bokeh = [new randomBokehBall(width,height,0)];
    let counter = 0;
    let breakpointStagger = 125;
    const maxBokeh = 25;

    let request;
    const draw = () => {
      request = requestAnimationFrame(draw);
      updateWidthHeight();
      if(counter > breakpointStagger && bokeh.length <= maxBokeh){
        bokeh.push(new randomBokehBall(width,height,bokeh.length));
        breakpointStagger = Math.random() * 475 + 36;
        counter = 0;
      }
      context.clearRect(0,0,width,height);
      // eslint-disable-next-line
      for(let ball of bokeh){
        context.fillStyle = colorString(ball.color,ball.currentFade);
        context.beginPath();
        context.ellipse(
          ball.x,ball.y,
          ball.radius * h2w * ball.currentGrow, ball.radius * w2h * ball.currentGrow,
          0, 0, 2 * Math.PI
        );
        context.fill();
        progressBall(ball,bokeh);
      }
      if(counter <= breakpointStagger)
        counter++;
    }
    requestAnimationFrame(draw);
    return () => cancelAnimationFrame(request);
  },[heightStr,minHeight]);
  return (
    <ParallaxBanner layers={imageLayer} style={styles.parallaxContainer}>
      <Grid wrap="nowrap" spacing={8} justify="center" style={styles.container} container direction="column">
        <Grid item>
          <Typography variant="h2" style={styles.header}>
            Philosophy
          </Typography>
        </Grid>
        <Grid item>
          <Grid container direction="row" justify="space-around" alignItems="center">
            {(!screenTooSmall && data.postData && data.postData.length > 1) ? (
              <Grid item>
                <IconButton onClick={navLeft}>
                  <ArrowBackIos style={styles.navButton}/>
                </IconButton>
              </Grid>
            ) : null}
            <Grid item>
              <BlogCard selectedPost={selectedPhi} data={data} />
            </Grid>
            {(!screenTooSmall && data.postData && data.postData.length > 1) ? (
              <Grid item>
                <IconButton onClick={navRight}>
                  <ArrowForwardIos style={styles.navButton}/>
                </IconButton>
              </Grid>
            ) : null}
            {(screenTooSmall && data.postData && data.postData.length > 1) ? (
              <Grid item>
                <Grid container justify="center" alignItems="center">
                  <Grid item>
                    <IconButton onClick={navLeft}>
                      <ArrowBackIos style={styles.navButton}/>
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={navRight}>
                      <ArrowForwardIos style={styles.navButton}/>
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </ParallaxBanner>
  );
}
