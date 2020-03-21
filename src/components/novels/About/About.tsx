import React, { useState } from 'react';
import { useTrail, useSpring } from 'react-spring';
import useDropSlide from './useDropSlide';
import {
	AboutMe,
	Stack,
	Me,
	Block,
	Header,
	Image,
	IconList,
	Centerer
} from './style';
import meImg from 'assets/me/CUMP_jalford-me.jpg';
import {
	reactLogo,
	tsLogo,
	reduxLogo,
	jestLogo,
	webglLogo,
	muiLogo
} from './logos';

const About2 = () => {
	const [straight, setStraight] = useState(false);
	const [imgLoaded, setImgLoaded] = useState(false);

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

	const [
		[aReact, aRedux, aTs, aJest, aWebgl, aMui],
		setFrontEndIcons
	] = useTrail(6, () => ({
		from: {
			opacity: 0
		}
	}));

	const frontEndFall = useDropSlide(999, straight, () => {
		setMeImgStyles({
			opacity: 1,
			transform: `translate3d(0px, 0, 0) rotateZ(0deg)`
		});
		setFrontEndIcons({
			opacity: 1
		});
	});
	const backEndFall = useDropSlide(666, straight);
	const itFall = useDropSlide(333, straight);
	const mathFall = useDropSlide(0, straight);

	return (
		<Centerer>
			<AboutMe>
				<Me
					style={meImgStyles}
					onLoad={() => setImgLoaded(true)}
					onDragStart={evt => evt.preventDefault()}
					src={meImg}
					onClick={() => setStraight(!straight)}
				/>
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
						<IconList></IconList>
					</Block>
					<Block style={itFall} color='#6171F8'>
						<Header color='#6171F8'>IT</Header>
						<IconList></IconList>
					</Block>
					<Block style={mathFall} color='#69beef'>
						<Header color='#69beef'>Science</Header>
						<IconList></IconList>
					</Block>
				</Stack>
			</AboutMe>
		</Centerer>
	);
};

export default About2;
