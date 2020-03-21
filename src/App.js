import React, { useState, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NotificationsHolder from './components/sentences/NotificationsHolder';
import Background from 'components/paragraphs/Background/Background';
import Header from './components/paragraphs/Header/Header';
import Footing from './components/novels/Footer';
import BlogBar from './components/paragraphs/BlogBar';
import NoMatch from 'components/novels/NotFound';
import Loader from 'components/words/Loader';

const UserSettings = React.lazy(() =>
	import('./components/novels/UserSettings')
);
const UsersTable = React.lazy(() => import('./components/novels/UsersTable'));
const UserPosts = React.lazy(() => import('./components/novels/UserPosts'));
const BlogEdit = React.lazy(() => import('./components/novels/BlogEdit'));
const BlogView = React.lazy(() => import('./components/novels/BlogView'));
const Websites = React.lazy(() => import('./components/novels/Websites'));
const Home2 = React.lazy(() => import('./components/novels/Home2/Home2'));
const Puzzles = React.lazy(() => import('./components/novels/Puzzles'));
const About = React.lazy(() => import('./components/novels/About/About'));
const Blog = React.lazy(() => import('./components/novels/Blog'));
const Home = React.lazy(() => import('./components/novels/Home'));
const RPN = React.lazy(() => import('./components/novels/Projects/RPN2/RPN2'));

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
	const [headerIsOpen, setHeaderIsOpen] = useState(true);
	return (
		<Background>
			<Router>
				<NotificationsHolder />
				<Header headerIsOpen={headerIsOpen} setHeaderIsOpen={setHeaderIsOpen} />
				<Suspense fallback={<Loader />}>
					<Switch>
						<Route
							exact
							path='/rpn'
							render={props => (
								<RPN setHeaderIsOpen={setHeaderIsOpen} {...props} />
							)}
						/>
						<Route exact path='/websites' component={Websites} />
						<Route exact path='/admin/users'>
							<UsersTable />
							<BlogBar breadcrumb={{ link: '/admin/users', label: 'Users' }} />
						</Route>
						<Route exact path='/user/posts'>
							<UserPosts />
							<BlogBar
								context='inBlog'
								breadcrumb={{ link: '/user/posts', label: 'Posts' }}
							/>
						</Route>
						<Route exact path='/user'>
							<UserSettings />
							<BlogBar
								context='inUser'
								breadcrumb={{ link: '/user', label: 'User' }}
							/>
						</Route>
						<Route exact path='/puzzles/19-2-22'>
							<Puzzle1 />
							<BlogBar
								context='inPuzzles'
								breadcrumb={{ link: '/puzzles', label: 'Puzzle' }}
							/>
						</Route>
						<Route exact path='/puzzles/19-2-26'>
							<Puzzle2 headerIsOpen={headerIsOpen} />
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
						<Route
							exact
							path='/posts/edit/:postId'
							children={props => {
								const { match } = props;
								return (
									<React.Fragment>
										<BlogEdit match={match} {...props} />
										<BlogBar
											context='inPostEdit'
											breadcrumb={{ link: '/posts', label: 'Posts' }}
										/>
									</React.Fragment>
								);
							}}
						/>
						<Route exact path='/posts'>
							<Blog headerIsOpen={headerIsOpen} />
							<BlogBar breadcrumb={{ link: '/posts', label: 'Posts' }} />
						</Route>
						<Route exact path='/oldHome' component={Home} />
						<Route exact path='/' component={Home2} />
						<Route path='*' component={NoMatch} />
					</Switch>
				</Suspense>
				<Footing />
			</Router>
		</Background>
	);
}
