import React from 'react';
import { Container , Grid , Typography , Paper } from '@material-ui/core/';

import { StyledAbout } from './style.js';

import { aboutContactImage } from '../../../config';

export default function About(props){
  return (
    <StyledAbout>
      <Paper>
        <Grid container justify="center" alignContent="center">
          <Grid item>
            <img alt="me" src={aboutContactImage} className="image"/>
          </Grid>
        </Grid>
        <Container>
          <Typography variant="h4" gutterBottom>
            About
          </Typography>
          <Typography variant="body1" paragraph>
              I'm currently attending New Mexico Institute of Mining and Technology, or colloquially, New Mexico Tech. I'm majoring in mathematics and minoring in physics. My primary focus is computer science, and in particular: machine learning. I will graduate in the Spring of 2020 with a bachelor's degree in mathematics.
          </Typography>
          <Typography variant="body1" paragraph>
              I'm a professional photographer and can take professional-grade portraits; but I can also make videos, websites, and graphics.
          </Typography>
          <Typography variant="body1" paragraph>
              I've worked at a car dealership, Tates Auto Center for many years while at community college, both in direct sales and internet sales. Additionally, I supported our web team by keeping the inventory updated with stunning and documentative photos for prospective buyers.
          </Typography>
          <Typography variant="body1" paragraph>
              I currently write in my blog of the many nuances of empiricst philosophy.
          </Typography>
        </Container>
      </Paper>
    </StyledAbout>
  );
}
