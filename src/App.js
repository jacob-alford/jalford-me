import React from 'react';

import { BlogFeatured } from './components/words/BlogListing';
import { ProjectCard } from './components/words/ProjectListing';

import projectImage from './assets/projects/modeling-craps-header.jpg';

import { StyledApp } from './theme';

require('typeface-roboto');
const testBlogPost = {
  header:"[Ch. 0] A Shadow at Dawn - The Duncan Strauss Mysteries",
  author:"Jacob Alford",
  body:`"It's a terrible business I'm afraid," he said standing. "But I'm not sure you've much to say." The victim groaned. "There's not a terrible lot you've done to earn this, you could say you've won a lottery - of sorts. I'm sure you want to speak, for I'm the last you'll ever see. But I'm just not very interested in anything you have to say. It's nothing personal. Even with all of the technology I can possibly want, there's nothing as elegant as a simple gag; oh the silence, the magnificent silence."`,
  date:new Date("May 13, 2019"),
  url:""
}
const testProjectDetails = {
  title:"Modeling Craps",
  body:"I create a brand new betting strategy as a final project!",
  image:projectImage,
  actions:[{type:"contained",color:"secondary",text:"Simulate"}]
}
function App() {
  return (
    <StyledApp className="app">
      
    </StyledApp>
  );
}

export default App;
