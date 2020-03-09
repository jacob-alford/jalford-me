import React from 'react';
import { animated as a, useSpring } from 'react-spring';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';

import { themeSelect } from 'theme';

const [cardPadding, majorSpacing, borderRadius] = themeSelect([
	'getCardPadding',
	'getMajorSpacing',
	'getBorderRadius'
]);

export const NavItems = styled(a.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	position: fixed;
	padding: ${cardPadding};
	z-index: 1;
	border-radius: ${borderRadius};
`;

const Toggler = styled(IconButton)`
	position: fixed;
	z-index: 1;
`;
const AnimArrow = styled(a(KeyboardArrowUp))`
	color: white;
`;
type toggleArrowProps = {
	setHeaderIsOpen: (val: boolean) => void;
	headerIsOpen: boolean;
};
export const ToggleArrow = (props: toggleArrowProps) => {
	const { headerIsOpen, setHeaderIsOpen } = props;
	const animStyles = useSpring({
		transform: headerIsOpen ? `rotateZ(90deg)` : `rotateZ(270deg)`,
		from: {
			transform: headerIsOpen ? `rotateZ(90deg)` : `rotateZ(270deg)`
		}
	});
	return (
		<Toggler
			onClick={() => setHeaderIsOpen(!headerIsOpen)}
			aria-expanded={headerIsOpen}
			aria-label='nav-toggle'>
			<AnimArrow style={animStyles} />
		</Toggler>
	);
};

type navItemsProps = {
	active: number;
	onClick: () => void;
	key: string;
	style: any;
};
const temp = a(Typography);
export const NavItem = styled(temp)`
	color: red;
	background: white;
	margin: 2px !important;
	padding: 2px !important;
	border-radius: ${borderRadius};
	filter: ${(props: navItemsProps) =>
		props.active ? 'grayscale(0%)' : 'grayscale(100%)'};
	cursor: ${(props: navItemsProps) => (props.active ? 'default' : 'pointer')};
	transition: filter 0.25s;
	user-select: none;
	&:hover {
		filter: grayscale(50%);
		text-decoration: none;
	}
`;
