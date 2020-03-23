import React, { useState } from 'react';
import { useTrail, useSpring } from 'react-spring';
import Katex from 'components/words/Katex/Katex';
import Typed from 'components/sentences/Typed';
import useDropSlide from './useDropSlide';
import {
	AboutMe,
	Stack,
	Me,
	MeText,
	MeHolder,
	Block,
	Header,
	Image,
	IconList,
	Centerer,
	Design,
	HTML
} from './style';
import meImg from 'assets/me/CUMP_jalford-me.jpg';
import Logos from './logos';

const {
	FrontEnd: { reactLogo, tsLogo, reduxLogo, jestLogo, webglLogo, muiLogo },
	BackEnd: { awsLogo, firebaseLogo, nodeLogo }
} = Logos;

const descriptionStrings = [
	'A philosophy focused mathematician who likes^333',
	'A philosophy focused mathematician who loves web stuff.'
];

const About2 = () => {
	const [straight, setStraight] = useState(false);
	const [shouldType, setShouldType] = useState(false);

	const [meImgStyles, setMeImgStyles] = useSpring(() => ({
		opacity: 0,
		transform: `translate3d(-100px, 0, 0) rotateZ(-30deg)`,
		from: {
			opacity: 0,
			transform: `translate3d(-100px, 0, 0) rotateZ(-30deg)`
		},
		config: {
			tension: 69,
			friction: 42,
			precision: 0.00001
		}
	}));
	const [[aUx, aBook, aCamera], setCreativeIcons] = useTrail(3, () => ({
		from: {
			opacity: 0
		}
	}));
	const [[aLinAlg, aPhys, aPhil, aPsy, aTechWr], setScienceIcons] = useTrail(
		5,
		() => ({
			from: {
				opacity: 0
			},
			onRest: () => setCreativeIcons({ opacity: 1 })
		})
	);
	const [[aAws, aFirebase, aNode], setBackEndIcons] = useTrail(3, () => ({
		from: {
			opacity: 0
		},
		onRest: () => setScienceIcons({ opacity: 1 })
	}));
	const [
		[aReact, aRedux, aTs, aJest, aWebgl, aMui],
		setFrontEndIcons
	] = useTrail(6, () => ({
		from: {
			opacity: 0
		},
		onRest: () => setBackEndIcons({ opacity: 1 })
	}));
	const [textFade, setTextFade] = useSpring(() => ({
		opacity: 0,
		from: { opacity: 0 }
	}));

	const frontEndFall = useDropSlide(999, straight, () => {
		setMeImgStyles({
			opacity: 1,
			transform: `translate3d(0px, 0, 0) rotateZ(0deg)`
		});
		setFrontEndIcons({
			opacity: 1
		});
		setTextFade({ opacity: 1 });
		setShouldType(true);
	});
	const backEndFall = useDropSlide(666, straight);
	const mathFall = useDropSlide(333, straight);
	const creativeFall = useDropSlide(0, straight);

	return (
		<Centerer>
			<AboutMe>
				<MeHolder>
					<Me
						style={meImgStyles}
						onDragStart={evt => evt.preventDefault()}
						src={meImg}
						onClick={() => setStraight(!straight)}
					/>
					<MeText style={textFade}>
						<HTML str='&#8220;' />
						<Typed
							shouldStart={shouldType}
							strings={descriptionStrings}
							backDelay={0}
						/>
						<HTML str='&#8221;' />
					</MeText>
				</MeHolder>
				<Stack>
					<Block style={frontEndFall} color='#62F8De'>
						<Header color='#62F8De'>Front End</Header>
						<IconList>
							<Image
								url='https://reactjs.org/'
								style={aReact}
								title='React'
								src={reactLogo}
							/>
							<Image
								url='https://redux.js.org/'
								style={aRedux}
								title='Redux'
								src={reduxLogo}
							/>
							<Image
								url='https://www.typescriptlang.org/'
								style={aTs}
								title='Typescript'
								src={tsLogo}
							/>
							<Image
								url='https://jestjs.io/en/'
								style={aJest}
								title='Jest'
								src={jestLogo}
							/>
							<Image
								url='https://webglfundamentals.org/'
								style={aWebgl}
								title='WebGL'
								src={webglLogo}
							/>
							<Image
								url='https://material-ui.com/'
								style={aMui}
								title='Material UI'
								src={muiLogo}
							/>
						</IconList>
					</Block>
					<Block style={backEndFall} color='#55CBD9'>
						<Header color='#55CBD9'>Back End</Header>
						<IconList>
							<Image
								url='https://aws.amazon.com/'
								style={aAws}
								title='Amazon Web Services'
								src={awsLogo}
							/>
							<Image
								url='https://firebase.google.com/'
								style={aFirebase}
								title='Firebase'
								src={firebaseLogo}
							/>
							<Image
								url='https://nodejs.org/en/'
								style={aNode}
								title='Node.js'
								src={nodeLogo}
							/>
						</IconList>
					</Block>
					<Block style={mathFall} color='#69beef'>
						<Header color='#69beef'>Science</Header>
						<IconList>
							<Image
								url='https://en.wikipedia.org/wiki/Numerical_linear_algebra'
								style={aLinAlg}
								title='Numerical Mathematics'
								Render={() => (
									<Katex
										str={String.raw`\bold{A} = \bold{Q}\bold{\Lambda}\bold{Q}^{-1}`}
										inline
										style={{
											color: 'white',
											fontSize: '2rem',
											border: '1px solid rgba(255,255,255,.5)',
											borderRadius: '12px',
											padding: '8px'
										}}
									/>
								)}
							/>
							<Image
								url='https://en.wikipedia.org/wiki/Physics'
								style={aPhys}
								title='Physics'
								Render={() => (
									<Katex
										str={String.raw`\frac{\partial^2 u}{\partial t^2}=k \bold{\nabla^2}u`}
										inline
										style={{
											color: 'white',
											fontSize: '2rem',
											border: '1px solid rgba(255,255,255,.5)',
											borderRadius: '12px',
											padding: '8px'
										}}
									/>
								)}
							/>
							<Image
								url='https://en.wikipedia.org/wiki/Philosophy'
								style={aPhil}
								title='Philosophy'
								Render={() => (
									<Katex
										str={String.raw`\Phi`}
										inline
										style={{
											color: 'white',
											fontSize: '2rem',
											border: '1px solid rgba(255,255,255,.5)',
											borderRadius: '12px',
											padding: '8px'
										}}
									/>
								)}
							/>
							<Image
								url='https://en.wikipedia.org/wiki/Psychology'
								style={aPsy}
								title='Psychology'
								Render={() => (
									<Katex
										str={String.raw`\Psi`}
										inline
										style={{
											color: 'white',
											fontSize: '2rem',
											border: '1px solid rgba(255,255,255,.5)',
											borderRadius: '12px',
											padding: '8px'
										}}
									/>
								)}
							/>
							<Image
								url='https://en.wikipedia.org/wiki/Technical_writing'
								style={aTechWr}
								title='Technical Writing'
								Render={() => (
									<Katex
										str={String.raw`\text{click my face}`}
										inline
										style={{
											color: 'white',
											fontSize: '2rem',
											border: '1px solid rgba(255,255,255,.5)',
											borderRadius: '12px',
											padding: '8px'
										}}
									/>
								)}
							/>
						</IconList>
					</Block>
					<Block style={creativeFall} color='#6171F8'>
						<Header color='#6171F8'>Creative</Header>
						<IconList>
							<Image
								url='https://developer.apple.com/design/human-interface-guidelines/'
								style={aUx}
								title='design'
								Render={() => <Design color='rgba(0,0,0,0)'>UX</Design>}
							/>
							<Image
								url='/posts'
								style={aBook}
								title='creative writing'
								Render={() => (
									<Design color='black'>
										<span aria-label='books' role='img'>
											📚
										</span>
									</Design>
								)}
							/>
							<Image
								url='https://northrup.photo/product/stunning-digital-photography/'
								style={aCamera}
								title='photography'
								Render={() => (
									<Design color='black'>
										<span aria-label='camera' role='img'>
											📷
										</span>
									</Design>
								)}
							/>
						</IconList>
					</Block>
				</Stack>
			</AboutMe>
		</Centerer>
	);
};

export default About2;
