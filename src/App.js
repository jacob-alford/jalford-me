import React, { useState , Suspense } from 'react';
import { BrowserRouter as Router , Switch , Route } from "react-router-dom";
import { Spring } from 'react-spring/renderprops';

import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';

import NotificationsHolder from './components/sentences/NotificationsHolder';
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
import Puzzles from './components/novels/Puzzles';

import RPN from 'components/novels/Projects/RPN';

import Loader from 'components/words/Loader';

const Websites = React.lazy(() => import('./components/novels/Websites'));

const styles = {
  button:{
    color:"rgba(255,255,255,1)",
    position:'absolute',
    left:'calc(50% - 24px)',
    top:'6px',
    zIndex:1
  }
}

export default function App() {
  const [headerIsOpen,setHeaderIsOpen] = useState(true);
  const toggleHeader = () => setHeaderIsOpen(!headerIsOpen);
  return (
    <Router>
      <NotificationsHolder />
      <Heading headerIsOpen={headerIsOpen}/>
      <Spring
        to={{
          transform:`rotateZ(${(headerIsOpen) ? 0 : 180}deg)`,
          color:(headerIsOpen) ? '#FFFFFF' : "#5433FF"
        }}>
        {newStyles => (
          <IconButton
            onClick={toggleHeader}
            style={styles.button}>
              <KeyboardArrowUp style={{transform:newStyles.transform,color:newStyles.color}}/>
          </IconButton>
        )}
      </Spring>
      <Switch>
        <Route path='/projects/rpn' render={props => (<RPN headerIsOpen={headerIsOpen} {...props} />)} />
        <Route
          path="/websites"
          render={
            () => (
              <Suspense fallback={<Loader />}>
                <Websites />
              </Suspense>
            )
          }/>
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
        <Route path="/puzzles" component={Puzzles} />
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
  );
}
