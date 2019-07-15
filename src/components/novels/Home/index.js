import React from 'react';
import { withRouter } from "react-router";
import { Grid , Container , Typography , Button } from '@material-ui/core/';
import { FeaturedPhoto } from '../../paragraphs/Home';
import { ProjectCard } from '../../words/ProjectListing';

import { StyledHome } from './style.js';

import withPageFade from '../../bindings/wrappers/withPageFade';

import withLogin from '../../bindings/wrappers/withLogin';

import { projectList } from '../../../config';

function Home(props){
  return (
    <StyledHome>
      <Container maxWidth="xl" className="heading">
        <Typography variant="h2">
          Featured Photo
        </Typography>
      </Container>
      <FeaturedPhoto />
      <Container maxWidth="xl" className="heading">
        <Typography variant="h2">
          Featured Projects
        </Typography>
      </Container>
      <Grid className="projectDisplay" container justify="center" spacing={3}>
        {projectList.filter(project => project.featured).map((project,index) => (
          <Grid item key={`project${index}`}>
            <ProjectCard projectDetails={project} />
          </Grid>
        ))}
      </Grid>
    </StyledHome>
  );
}

export default withPageFade(Home);
