import React from 'react';
import { withRouter } from "react-router";
import { Grid , Container , Typography } from '@material-ui/core/';
import { FeaturedPhoto } from '../../paragraphs/Home';
import { ProjectCard } from '../../words/ProjectListing';

import { StyledHome } from './style.js';

import withPageFade from '../../bindings/wrappers/withPageFade';

import { projectList } from '../../../config';

function Home(props){
  const { history , setActiveNavItem } = props;
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
        {projectList.filter(project => project.featured).map(project => (
          <Grid item>
            <ProjectCard setActiveNavItem={setActiveNavItem} history={history} projectDetails={project} />
          </Grid>
        ))}
      </Grid>
    </StyledHome>
  );
}

export default withRouter(withPageFade(Home));
