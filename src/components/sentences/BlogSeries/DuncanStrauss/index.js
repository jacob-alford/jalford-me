import React, { useEffect, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';

import { ParallaxBanner } from 'react-scroll-parallax';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import useSeriesConnect from 'components/bindings/hooks/useSeriesConnect';

import BlogCard from 'components/words/BlogListing/BlogCard';

import { themeHook } from 'theme';

const useClasses = themeHook({
  canvas: {
    position: 'absolute',
    left: '0px',
    top: '0px',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)'
  },
  parallaxContainer: {
    width: '100vw',
    height: '100vh'
  },
  container: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    boxShadow: 'inset 0px 0px 70px 0px rgba(0,0,0,.8)'
  },
  navButton: {
    color: 'white'
  },
  header: {
    textAlign: 'center',
    background: 'linear-gradient(#FF416C,#FF4B2B)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  }
});

// 94892796

export default function DuncanStrauss(props) {
  const screenTooSmall = useMediaQuery('(max-width:400px)');
  const classes = useClasses();
  const data = useSeriesConnect('Duncan');
  const [selectedDuncan, setSelectedDuncan] = useState(0);
  const navRight = () => {
    if (data.postData && data.postData.length > 0)
      setSelectedDuncan((selectedDuncan + 1) % data.postData.length);
  };
  const navLeft = () => {
    if (data.postData && data.postData.length > 0)
      setSelectedDuncan(
        selectedDuncan - 1 >= 0 ? selectedDuncan - 1 : data.postData.length - 1
      );
  };

  const bgCanvas = React.useRef();
  const imageLayer = [
    {
      children: <canvas ref={bgCanvas} className={classes.canvas} />,
      amount: 0.1
    }
  ];

  useEffect(() => {
    const context = bgCanvas.current.getContext('2d');
    bgCanvas.current.width = bgCanvas.current.clientWidth;
    bgCanvas.current.height = bgCanvas.current.clientHeight;
    const width = bgCanvas.current.clientWidth;
    const height = bgCanvas.current.clientHeight;

    context.strokeStyle = 'rgba(174,194,224,.25)';
    context.lineWidth = 2.25;
    context.lineCap = 'round';

    const particles = [];
    for (let i = 0; i < 222; i++)
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        dx: Math.random() * 0.4 - 0.05,
        dy: Math.random() * 20 + 4,
        length: Math.random() * (height / 550) + 5,
        opacity: Math.random() * 0.25 + 0.025
      });
    const fall = particle => {
      particle.x += particle.dx;
      particle.y += particle.dy;
      if (particle.x > width || particle.y > height) {
        particle.x = Math.random() * width;
        particle.y = -20;
      }
    };
    let request;
    let lightning = 0;
    const draw = () => {
      request = requestAnimationFrame(draw);
      context.clearRect(0, 0, width, height);
      const testValue = Math.random();
      if (testValue < 0.00069) lightning = 1;
      if (lightning > 0) {
        const testValue2 = Math.random();
        if (testValue2 < 0.01) lightning = 1;
        const interpVal = lightning - Math.exp(-1.9 - lightning);
        if (interpVal > 0) lightning = interpVal;
        else lightning = 0;
        context.fillStyle = `rgba(225,225,255,${lightning * 0.85})`;
        context.fillRect(0, 0, width, height);
      }
      // eslint-disable-next-line
      for (let particle of particles) {
        const change = [
          particle.x + particle.length * particle.dx,
          particle.y + particle.length * particle.dy
        ];
        context.strokeStyle = `rgba(174,194,224,${particle.opacity})`;
        context.beginPath();
        context.moveTo(particle.x, particle.y);
        context.lineTo(change[0], change[1]);
        context.stroke();
      }
      particles.forEach(fall);
    };
    requestAnimationFrame(draw);
    return () => cancelAnimationFrame(request);
  }, []);
  return (
    <ParallaxBanner
      layers={imageLayer}
      className={classes.parallaxContainer}
      style={{ height: '100vh', width: '100vw' }}>
      <Grid
        wrap='nowrap'
        spacing={8}
        justify='center'
        className={classes.container}
        container
        direction='column'>
        <Grid item>
          <Typography variant='h2' className={classes.header}>
            The Duncan Strauss Mysteries
          </Typography>
        </Grid>
        <Grid item>
          <Grid
            container
            direction={!screenTooSmall ? 'row' : 'column'}
            justify='space-around'
            alignItems='center'>
            {!screenTooSmall && data.postData && data.postData.length > 1 ? (
              <Grid item>
                <IconButton onClick={navLeft}>
                  <ArrowBackIos className={classes.navButton} />
                </IconButton>
              </Grid>
            ) : null}
            <Grid item>
              <BlogCard selectedPost={selectedDuncan} data={data} />
            </Grid>
            {!screenTooSmall && data.postData && data.postData.length > 1 ? (
              <Grid item>
                <IconButton onClick={navRight}>
                  <ArrowForwardIos className={classes.navButton} />
                </IconButton>
              </Grid>
            ) : null}
            {screenTooSmall && data.postData && data.postData.length > 1 ? (
              <Grid item>
                <Grid container justify='center' alignItems='center'>
                  <Grid item>
                    <IconButton onClick={navLeft}>
                      <ArrowBackIos className={classes.navButton} />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={navRight}>
                      <ArrowForwardIos className={classes.navButton} />
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
