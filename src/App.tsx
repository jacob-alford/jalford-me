import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import useBlogCategoryFetch from 'components/bindings/postHooks/useBlogCategoryFetch';

import NotificationsHolder from './components/sentences/NotificationsHolder';
import Background from 'components/paragraphs/Background/Background';
import Header from './components/paragraphs/Header/Header';
import Footing from './components/novels/Footer';
import BlogBar from './components/paragraphs/BlogBar';
import NoMatch from 'components/novels/NotFound';
import Loader from 'components/words/Loader';

const BlogView = React.lazy(() => import('./components/novels/BlogView/BlogView'));
const UserSettings = React.lazy(() => import('./components/novels/UserSettings'));
const About = React.lazy(() => import('./components/novels/About/About'));
const Home2 = React.lazy(() => import('./components/novels/Home2/Home2'));
const Websites = React.lazy(() => import('./components/novels/Websites'));
const Puzzles = React.lazy(() => import('./components/novels/Puzzles'));
const RPN = React.lazy(() => import('./components/novels/RPN/RPN'));
const Blog = React.lazy(() => import('./components/novels/Blog'));

/* Puzzles */
const Puzzle1 = React.lazy(() =>
  import('./components/novels/Puzzles/PuzzlePages/Puzzle1')
);
const Puzzle2 = React.lazy(() =>
  import('./components/novels/Puzzles/PuzzlePages/Puzzle2')
);
const Puzzle3 = React.lazy(() =>
  import('./components/novels/Puzzles/PuzzlePages/Puzzle3')
);

export default function App() {
  useBlogCategoryFetch(
    'the-duncan-strauss-mysteries',
    'chapters',
    'the-duncan-strauss-mysteries'
  );
  useBlogCategoryFetch('posts', 'philosophy', 'philosophy');
  return (
    <Background>
      <Router>
        <NotificationsHolder />
        <Header />
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path='/rpn' render={props => <RPN {...props} />} />
            <Route exact path='/websites' component={Websites} />
            <Route exact path='/user'>
              <UserSettings />
              <BlogBar context='inUser' breadcrumb={{ link: '/user', label: 'User' }} />
            </Route>
            <Route exact path='/puzzles/19-2-22'>
              <Puzzle1 />
              <BlogBar
                context='inPuzzles'
                breadcrumb={{ link: '/puzzles', label: 'Puzzle' }}
              />
            </Route>
            <Route exact path='/puzzles/19-2-26'>
              <Puzzle2 />
              <BlogBar
                context='inPuzzles'
                breadcrumb={{ link: '/puzzles', label: 'Puzzle' }}
              />
            </Route>
            <Route exact path='/puzzles/19-3-3'>
              <Puzzle3 />
              <BlogBar
                context='inPuzzles'
                breadcrumb={{ link: '/puzzles', label: 'Puzzle' }}
              />
            </Route>
            <Route exact path='/puzzles'>
              <Puzzles />
              <BlogBar
                context='inPuzzles'
                breadcrumb={{ link: '/puzzles', label: 'Puzzles' }}
              />
            </Route>
            <Route exact path='/about' component={About} />
            <Route
              exact
              path='/posts/view/:postId'
              children={props => {
                const { match, history } = props;
                return (
                  <React.Fragment>
                    <BlogView match={match} {...props} />
                    <BlogBar
                      match={match}
                      history={history}
                      context='inPostView'
                      breadcrumb={{ link: '/posts', label: 'Posts' }}
                    />
                  </React.Fragment>
                );
              }}
            />
            <Route exact path='/posts'>
              <Blog />
              <BlogBar breadcrumb={{ link: '/posts', label: 'Posts' }} />
            </Route>
            <Route exact path='/' component={Home2} />
            <Route path='*' component={NoMatch} />
          </Switch>
        </Suspense>
        <Footing />
      </Router>
    </Background>
  );
}
