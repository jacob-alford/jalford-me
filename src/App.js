import React, { useState } from 'react';
import { BrowserRouter as Router , Switch , Route } from "react-router-dom";

import UserSettings from './components/novels/UserSettings';
import Heading from './components/novels/Heading';
import Footing from './components/novels/Footer';
import About from './components/novels/About';
import Home from './components/novels/Home';
import Blog from './components/novels/Blog';

import { StyledApp } from './theme';

import { projectList } from './config';

import { getActiveNavItem } from './functions';

require('typeface-roboto');

function App() {
  const path = window.location.pathname;
  const [headerIsOpen,setHeaderIsOpen] = useState(true);
  const [activeNavItem, setActiveNavItem] = useState(getActiveNavItem(path));
  const toggleHeader = () => setHeaderIsOpen(!headerIsOpen);
  return (
    <StyledApp>
      <Router>
        <Heading activeNavItem={activeNavItem} setActiveNavItem={setActiveNavItem} headerIsOpen={headerIsOpen} setHeaderState={toggleHeader}/>
        <Switch>
          {projectList.filter(project => !project.disabled).map((project,index) => {
            const { component:Component } = project;
            return (
              <Route key={`projectRoute${index}`} path={project.url} render={props => (<Component headerIsOpen={headerIsOpen} {...props} />)} />
            );
          })}
          <Route path="/user" component={UserSettings} />
          <Route path="/about" component={About} />
          <Route path="/blog" render={props => (<Blog headerIsOpen={headerIsOpen} {...props} />)}/>
          <Route path="/" component={Home} />
        </Switch>
        <Footing />
      </Router>
    </StyledApp>
  );
}

export default App;
