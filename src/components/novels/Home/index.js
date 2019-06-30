import React, { useState , useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Button } from '@material-ui/core/';
import { Email } from '@material-ui/icons/';

import { StyledHome } from './style.js';

import { homePageImageArray } from '../../../config';

export default function Home(props){
  const [currentImage,setCurrentImage] = useState(0);
  return (
    <StyledHome>
      <Container fixed className="heading">
        <Typography variant="h2">
          Featured Photo
        </Typography>
      </Container>
      <Grid container justify="center" className="cardContainer">
        <Grid item>
          <Card className="imageContainer">
            <CardMedia
              component="img"
              alt="The Beautiful IceCave"
              image={homePageImageArray[currentImage].img}
              className="image" />
            <CardContent>
              <Typography variant="h4">
                {homePageImageArray[currentImage].caption}
              </Typography>
              <Typography variant="body1">
                {homePageImageArray[currentImage].body}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="outlined" size="small" color="primary" onClick={() => window.location.href = "https://www.icecaves.com/"}>
                Check it out!
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </StyledHome>
  );
}
