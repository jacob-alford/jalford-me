import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button } from '@material-ui/core/';

import { StyledFeaturedPhoto } from './style.js';

import { homePageImage } from '../../../../config';

export default function FeaturedHome(props){
  return (
    <StyledFeaturedPhoto>
      <Grid container justify="center" className="cardContainer">
        <Grid item>
          <Card className="imageContainer">
            <CardMedia component="img" className="image" image={homePageImage.img} alt={homePageImage.caption} />
            <CardContent>
              <Typography variant="h4">
                {homePageImage.caption}
              </Typography>
              <Typography variant="body1">
                {homePageImage.body}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" size="small" color="primary" onClick={() => window.location.href = "https://www.icecaves.com/"}>
                Check it out!
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </StyledFeaturedPhoto>
  );
}
