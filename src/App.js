import React, { useState , Suspense } from 'react';
import { BrowserRouter as Router , Switch , Route } from "react-router-dom";
import { Spring } from 'react-spring/renderprops';

import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';

import NotificationsHolder from './components/sentences/NotificationsHolder';
import Heading from './components/novels/Heading';
import Footing from './components/novels/Footer';
import BlogBar from './components/paragraphs/BlogBar';
import NoMatch from 'components/novels/NotFound';
import Loader from 'components/words/Loader';

const UserSettings = React.lazy(() => import('./components/novels/UserSettings'));
const UsersTable = React.lazy(() => import('./components/novels/UsersTable'));
const UserPosts = React.lazy(() => import('./components/novels/UserPosts'));
const BlogEdit = React.lazy(() => import('./components/novels/BlogEdit'));
const BlogView = React.lazy(() => import('./components/novels/BlogView'));
const Websites = React.lazy(() => import('./components/novels/Websites'));
const Puzzles = React.lazy(() => import('./components/novels/Puzzles'));
const About = React.lazy(() => import('./components/novels/About'));
const Media = React.lazy(() => import('./components/novels/Media'));
const Blog = React.lazy(() => import('./components/novels/Blog'));
const Home = React.lazy(() => import('./components/novels/Home'));
const RPN = React.lazy(() => import('./components/novels/Projects/RPN'));

/* Puzzles */
const Puzzle1 = React.lazy(() => import('./components/novels/Puzzles/PuzzlePages/Puzzle1'));
const Puzzle2 = React.lazy(() => import('./components/novels/Puzzles/PuzzlePages/Puzzle2'));
const Puzzle3 = React.lazy(() => import('./components/novels/Puzzles/PuzzlePages/Puzzle3'));

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
          color:(headerIsOpen) ? '#000000' : "#5433FF"
        }}>
        {newStyles => (
          <IconButton
            onClick={toggleHeader}
            style={styles.button}
            aria-expanded={headerIsOpen}
            aria-label="Toggle Header">
              <KeyboardArrowUp style={{transform:newStyles.transform,color:newStyles.color}}/>
          </IconButton>
        )}
      </Spring>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path='/projects/rpn' render={props => (<RPN headerIsOpen={headerIsOpen} {...props} />)} />
          <Route exact path="/websites" component={Websites}/>
          <Route exact path="/admin/users">
            <UsersTable />
            <BlogBar breadcrumb={{link:'/admin/users',label:'Users'}}/>
          </Route>
          <Route exact path="/user/posts">
            <UserPosts />
            <BlogBar context="inBlog" breadcrumb={{link:'/user/posts',label:'Posts'}}/>
          </Route>
          <Route exact path="/user">
            <UserSettings />
            <BlogBar context="inUser" breadcrumb={{link:'/user',label:'User'}}/>
          </Route>
          <Route exact path="/puzzles/19-2-22">
            <Puzzle1 />
            <BlogBar context="inPuzzles" breadcrumb={{link:'/puzzles',label:'Puzzle'}}/>
          </Route>
          <Route exact path="/puzzles/19-2-26">
            <Puzzle2 headerIsOpen={headerIsOpen}/>
            <BlogBar context="inPuzzles" breadcrumb={{link:'/puzzles',label:'Puzzle'}}/>
          </Route>
          <Route exact path="/puzzles/19-3-3">
            <Puzzle3 />
            <BlogBar context="inPuzzles" breadcrumb={{link:'/puzzles',label:'Puzzle'}}/>
          </Route>
          <Route exact path="/puzzles">
            <Puzzles />
            <BlogBar context="inPuzzles" breadcrumb={{link:'/puzzles',label:'Puzzles'}}/>
          </Route>
          <Route exact path="/about" component={About} />
          <Route exact path="/media" component={Media} />
          <Route exact path="/posts/view/:postId" children={props => {
            const { match , history } = props;
            return (
              <React.Fragment>
                <BlogView match={match} {...props}/>
                <BlogBar match={match} history={history} context="inPostView" breadcrumb={{link:'/posts',label:'Posts'}}/>
              </React.Fragment>
            );
          }} />
          <Route exact path="/posts/edit/:postId" children={props => {
            const { match } = props;
            return (
              <React.Fragment>
                <BlogEdit match={match} {...props}/>
                <BlogBar context="inPostEdit" breadcrumb={{link:'/posts',label:'Posts'}}/>
              </React.Fragment>
            );
          }} />
          <Route exact path="/posts">
            <Blog headerIsOpen={headerIsOpen} />
            <BlogBar breadcrumb={{link:'/posts',label:'Posts'}}/>
          </Route>
          <Route exact path="/" component={Home} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </Suspense>
      <Footing />
    </Router>
  );
}
