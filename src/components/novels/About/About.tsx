import React from 'react';
import { useTransition, useTrail } from 'react-spring';

import { AboutMe, Stack, Me, Block, StackItem, Image } from './style';
import meImg from 'assets/me/CUMP_jalford-me.jpg';

import reactLogo from 'assets/websites/reactlogo.svg';

interface stackItem {
	key: string;
	component: any;
}
interface block {
	key: string;
	items: stackItem[];
}

const blocks: block[] = [
	{
		key: 'front-end',
		items: [
			{
				key: 'react1',
				component: (props: { style: any }) => (
					<StackItem>
						<Image style={props.style} src={reactLogo} alt='react.js' />
					</StackItem>
				)
			}
		]
	},
	{
		key: 'back-end',
		items: [
			{
				key: 'react2',
				component: (props: { style: any }) => (
					<StackItem>
						<Image style={props.style} src={reactLogo} alt='react.js' />
					</StackItem>
				)
			}
		]
	},
	{
		key: 'mathematics',
		items: [
			{
				key: 'react3',
				component: (props: { style: any }) => (
					<StackItem style={props.style}>
						<Image src={reactLogo} alt='react.js' />
					</StackItem>
				)
			}
		]
	},
	{
		key: 'IT',
		items: [
			{
				key: 'react4',
				component: (props: { style: any }) => (
					<StackItem style={props.style}>
						<Image src={reactLogo} alt='react.js' />
					</StackItem>
				)
			}
		]
	}
];

const totalLength = blocks.reduce((acc, block) => {
	return acc + block.items.length;
}, 0);

const About2 = () => {
	const animBlocks = useTransition(blocks, block => block.key, {
		initial: { transform: `translate3d(0px,-100vh,0)` },
		from: { transform: `translate3d(0px,-100vh,0)` },
		enter: { transform: `translate3d(${Math.random() * 50}px,0vh,0)` },
		leave: { transform: `translate3d(0px,-100vh,0)` },
		trail: 100
	});
	const blockItems = useTrail(totalLength, {
		transform: `translate3d(0px, 0px, 0px)`,
		from: {
			transform: `translate3d(0px, -50px, 0px)`
		}
	});
	return (
		<AboutMe>
			<Me src={meImg} />
			<Stack>
				{animBlocks
					.reverse()
					.map(({ item: block, props: animStyles }, i, arr) => {
						const { items, key } = block;
						return (
							<Block key={key} style={animStyles}>
								{items.map((item, j) => {
									const style = blockItems[i * arr.length + j];
									const { key: key2, component: Comp } = item;
									return <Comp key={key2} style={style} />;
								})}
							</Block>
						);
					})}
			</Stack>
		</AboutMe>
	);
};

export default About2;
