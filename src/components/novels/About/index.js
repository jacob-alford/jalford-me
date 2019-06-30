import React from 'react';
import { Container , Grid , Typography , Paper , Avatar } from '@material-ui/core/';
import { Email } from '@material-ui/icons/';

import SocialIcon from '../../words/SocialIcon';

import { StyledAbout } from './style.js';

import { aboutContactImage , socialMedia } from '../../../config';

export default function About(props){
  return (
    <StyledAbout>
      <Container fixed>
        <Grid container justify="center" alignContent="center">
          <Grid item>
            <img alt="me" src={aboutContactImage} className="image"/>
          </Grid>
        </Grid>
        <Paper className="aboutText" elevation={0}>
          <Typography variant="h4" gutterBottom>
            About
          </Typography>
          <Typography variant="body1" paragraph>
              I'm currently attending New Mexico Institute of Mining and Technology, or colloquially, New Mexico Tech.
              I'm majoring in mathematics and minoring in physics.
              My primary focus is computer science, and in particular: machine learning.
              I will graduate in the Spring of 2020 with a bachelor's degree in mathematics.
          </Typography>
          <Typography variant="body1" paragraph>
              I'm a professional photographer and can take professional-grade portraits; but I can also make videos, websites, and graphics.
          </Typography>
          <Typography variant="body1" paragraph>
              I've worked at a car dealership, Tates Auto Center for many years while at community college, both in direct sales and internet sales.
              Additionally, I supported our web team by keeping the inventory updated with stunning and documentative photos for prospective buyers.
          </Typography>
          <Typography variant="body1" paragraph>
              I currently write in my blog of the many nuances of empiricst philosophy.
          </Typography>
        </Paper>
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <SocialIcon onClick={() => window.location.href = socialMedia.linkedIn.url}>
              <Avatar alt="LinkedIn" src={socialMedia.linkedIn.img} />
            </SocialIcon>
          </Grid>
          <Grid item>
            <SocialIcon onClick={() => window.location.href = `mailto:${socialMedia.email}`}>
              <Email />
            </SocialIcon>
          </Grid>
        </Grid>
      </Container>
    </StyledAbout>
  );
}
