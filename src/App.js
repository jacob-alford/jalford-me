import React, { useState } from 'react';
import { BrowserRouter as Router , Switch , Route } from "react-router-dom";

import UserSettings from './components/novels/UserSettings';
import Heading from './components/novels/Heading';
import Footing from './components/novels/Footer';
import About from './components/novels/About';
import Home from './components/novels/Home';
import Blog from './components/novels/Blog';
import BlogBar from './components/paragraphs/BlogBar';
import BlogView from './components/novels/BlogView';
import BlogEdit from './components/novels/BlogEdit';

import { StyledApp } from './theme';

import { projectList } from './config';

import { getActiveNavItem } from './functions';

require('typeface-roboto');

const defaultBreadcrumbs = [
  {label:"Posts",url:"/posts"},
  {label:"Philosophy",url:"/view/philosophy"},
  {label:"0",url:"/view/philosophy/0"}
];

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
          <Route path="/user">
            <UserSettings />
            <BlogBar title="User" context="inUser"/>
          </Route>
          <Route path="/about" component={About} />
          <Route path="/blog/view/:postId" children={props => {
            const { match } = props;
            return (
              <React.Fragment>
                <BlogView match={match} {...props}/>
                <BlogBar breadcrumbs={defaultBreadcrumbs}/>
              </React.Fragment>
            );
          }} />
          <Route path="/blog/edit/:postId" children={props => {
            const { match } = props;
            return (
              <React.Fragment>
                <BlogEdit match={match} {...props}/>
                <BlogBar breadcrumbs={defaultBreadcrumbs}/>
              </React.Fragment>
            );
          }} />
          <Route path="/blog">
            <Blog headerIsOpen={headerIsOpen} />
            <BlogBar breadcrumbs={defaultBreadcrumbs}/>
          </Route>
          <Route path="/" component={Home} />
        </Switch>
        <Footing />
      </Router>
    </StyledApp>
  );
}

export default App;
