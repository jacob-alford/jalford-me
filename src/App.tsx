import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import useBlogCategoryFetch from 'components/bindings/postHooks/useBlogCategoryFetch';

import NotificationsHolder from './components/sentences/NotificationsHolder';
import Header from './components/paragraphs/Header/Header';
import Footing from './components/novels/Footer';
import NoMatch from 'components/novels/NotFound';
import Loader from 'components/words/Loader';

const BlogView = React.lazy(() => import('./components/novels/BlogView/BlogView'));
const UserSettings = React.lazy(() => import('./components/novels/UserSettings'));
const About = React.lazy(() => import('./components/novels/About/About'));
const Websites = React.lazy(() => import('./components/novels/Websites'));
const Home = React.lazy(() => import('./components/novels/Home/Home'));
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
    <>
      <Router>
        <NotificationsHolder />
        <Header />
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path='/rpn' render={props => <RPN {...props} />} />
            <Route exact path='/user' component={UserSettings} />
            <Route exact path='/websites' component={Websites} />
            <Route exact path='/puzzles/19-2-22' component={Puzzle1} />
            <Route exact path='/posts/:postId' component={BlogView} />
            <Route exact path='/puzzles/19-2-26' component={Puzzle2} />
            <Route exact path='/puzzles/19-3-3' component={Puzzle3} />
            <Route exact path='/puzzles' component={Puzzles} />
            <Route exact path='/about' component={About} />
            <Route exact path='/posts' component={Blog} />
            <Route exact path='/' component={Home} />
            <Route path='*' component={NoMatch} />
          </Switch>
        </Suspense>
        <Footing />
      </Router>
    </>
  );
}
