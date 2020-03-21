import React from 'react';
import { animated as a } from 'react-spring';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';

import useRedirect from 'components/bindings/hooks/useRedirect';
import { themeSelect } from 'theme';

const [radius, padding] = themeSelect(['getBorderRadius', 'getPaperPadding']);

export const AboutMe = styled(Container)`
	display: flex;
	flex-flow: column wrap;
	justify-content: center;
	align-items: center;
`;

export const Me = styled(a(Avatar))`
	height: 200px !important;
	width: 200px !important;
	margin-top: 100px;
	margin-bottom: 100px;
	cursor: pointer;
`;

export const Stack = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-auto-rows: auto;
`;

export const Block = styled(a.div)`
	backdrop-filter: saturate(0.3) blur(0.25rem);
	border: 1px solid
		${(props: { color?: string }): string => props.color ?? '#69beef'};
	border-radius: ${radius};
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 12px;
`;

export const IconList = styled.div`
	display: flex;
	flex-flow: row wrap;
	width: 100%;
	justify-content: center;
	align-items: center;
`;

export const Header = styled.div`
	color: #69beef;
	font-weight: lighter;
	width: 100%;
	text-align: center;
	font-size: 3rem;
`;

const Img = styled(a.img)`
	width: 75px;
	height: 75px;
`;

const ImgHolder = styled(a.div)`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	align-items: center;
	margin: 12px;
	cursor: pointer;
`;
const ImgTitle = styled.h3`
	color: white;
	font-size: 18px;
	padding: 5px;
`;

export const Image = (props: {
	src: string;
	title: string;
	style: any;
	url: string;
}) => {
	const { src, title, style, url } = props;
	const handleClick = useRedirect(url);
	return (
		<ImgHolder onClick={handleClick} style={style}>
			<Img onDragStart={evt => evt.preventDefault()} src={src} alt={title} />
			<ImgTitle>{title}</ImgTitle>
		</ImgHolder>
	);
};
