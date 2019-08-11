import React, { useState } from 'react';
import { BrowserRouter as Router , Switch , Route } from "react-router-dom";

import UserSettings from './components/novels/UserSettings';
import UsersTable from './components/novels/UsersTable';
import UserPosts from './components/novels/UserPosts';
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
          <Route path="/admin/users">
            <UsersTable />
            <BlogBar breadcrumb={{link:'/admin/users',label:'Users'}}/>
          </Route>
          <Route path="/user/posts">
            <UserPosts />
            <BlogBar context="inBlog" breadcrumb={{link:'/user/posts',label:'Posts'}}/>
          </Route>
          <Route path="/user">
            <UserSettings />
            <BlogBar context="inUser" breadcrumb={{link:'/user',label:'User'}}/>
          </Route>
          <Route path="/about" component={About} />
          <Route path="/posts/view/:postId" children={props => {
            const { match , history } = props;
            return (
              <React.Fragment>
                <BlogView match={match} {...props}/>
                <BlogBar match={match} history={history} context="inPostView" breadcrumb={{link:'/posts',label:'Posts'}}/>
              </React.Fragment>
            );
          }} />
          <Route path="/posts/edit/:postId" children={props => {
            const { match } = props;
            return (
              <React.Fragment>
                <BlogEdit match={match} {...props}/>
                <BlogBar context="inPostEdit" breadcrumb={{link:'/posts',label:'Posts'}}/>
              </React.Fragment>
            );
          }} />
          <Route path="/posts">
            <Blog headerIsOpen={headerIsOpen} />
            <BlogBar breadcrumb={{link:'/posts',label:'Posts'}}/>
          </Route>
          <Route path="/" component={Home} />
        </Switch>
        <Footing />
      </Router>
    </StyledApp>
  );
}

export default App;
