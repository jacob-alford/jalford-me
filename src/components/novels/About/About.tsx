import React, { useState } from 'react';
import { useTrail } from 'react-spring';
import useDropSlide from './useDropSlide';

import { AboutMe, Stack, Me, Block, Header, Image, IconList } from './style';
import meImg from 'assets/me/CUMP_jalford-me.jpg';

import { reactLogo, tsLogo, reduxLogo, jestLogo } from './logos';

const About2 = () => {
	const [straight, setStraight] = useState(false);

	const frontEndFall = useDropSlide(1500, straight);
	const backEndFall = useDropSlide(1000, straight);
	const mathFall = useDropSlide(500, straight);
	const itFall = useDropSlide(0, straight);

	const [aReact, aRedux, aTs, aJest] = useTrail(4, {
		opacity: 1,
		from: {
			opacity: 0
		},
		delay: 3000
	});

	return (
		<AboutMe>
			<Me
				onDragStart={evt => evt.preventDefault()}
				src={meImg}
				onClick={() => setStraight(!straight)}
			/>
			<Stack>
				<Block style={frontEndFall} color='#62F8De'>
					<Header>Front End</Header>
					<IconList>
						<Image
							url='https://reactjs.org/'
							style={aReact}
							title='react'
							src={reactLogo}
						/>
						<Image
							url='https://redux.js.org/'
							style={aRedux}
							title='redux'
							src={reduxLogo}
						/>
						<Image
							url='https://www.typescriptlang.org/'
							style={aTs}
							title='typescript'
							src={tsLogo}
						/>
						<Image
							url='https://jestjs.io/en/'
							style={aJest}
							title='jest'
							src={jestLogo}
						/>
					</IconList>
				</Block>
				<Block style={backEndFall} color='#55CBD9'>
					<Header>Back End</Header>
					<IconList></IconList>
				</Block>
				<Block style={mathFall} color='#69beef'>
					<Header>Science</Header>
					<IconList></IconList>
				</Block>
				<Block style={itFall} color='#6171F8'>
					<Header>IT</Header>
					<IconList></IconList>
				</Block>
			</Stack>
		</AboutMe>
	);
};

export default About2;
