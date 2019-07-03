import React, { useState } from 'react';
import { BrowserRouter as Router , Switch , Route } from "react-router-dom";
import { Button } from '@material-ui/core/';


import AdminLogin from './components/paragraphs/AdminLogin';
import Heading from './components/novels/Heading';
import Footing from './components/novels/Footer';
import About from './components/novels/About';
import Home from './components/novels/Home';
import Blog from './components/novels/Blog';

import { StyledApp } from './theme';

import { projectList } from './config';

require('typeface-roboto');

function App() {
  const [adminLoginIsOpen,setAdminLoginIsOpen] = useState(false);
  const [headerIsOpen,setHeaderIsOpen] = useState(true);
  const toggleHeader = () => setHeaderIsOpen(!headerIsOpen);
  const openAdminLogin = () => setAdminLoginIsOpen(true);
  const closeAdminLogin = () => setAdminLoginIsOpen(false);
  return (
    <StyledApp>
      <Router>
        <Heading headerIsOpen={headerIsOpen} setHeaderState={toggleHeader}/>
        <Switch>
          {projectList.filter(project => !project.disabled).map((project,index) => (
            <Route key={`projectRoute${index}`} path={project.url} component={() => project.component({headerIsOpen:headerIsOpen})}/>
          ))}
          <Route path="/about" component={About} />
          <Route path="/blog" component={Blog} />
          <Route path="/" component={Home} />
        </Switch>
        <Footing />
      </Router>
    </StyledApp>
  );
}

export default App;
