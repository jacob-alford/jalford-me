import React from 'react';
import { animated as a } from 'react-spring';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';

import useRedirect from 'components/bindings/hooks/useRedirect';
import { themeSelect } from 'theme';

const [radius, padding] = themeSelect(['getBorderRadius', 'getPaperPadding']);

export const Centerer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 16px;
	padding-top: 128px;
`;
export const AboutMe = styled.div`
	display: grid;
	grid-template-columns: minmax(min-content, 100%);
	grid-template-rows: auto auto;
	align-items: center;
	justify-items: center;
`;

export const Me = styled(a(Avatar))`
	cursor: pointer;
	width: 300px !important;
	height: 300px !important;
`;

export const Stack = styled.div`
	display: flex;
	flex-flow: column wrap;
	justify-content: center;
	align-items: center;
`;

export const Block = styled(a.div)`
	backdrop-filter: saturate(0);
	border: 1px solid
		${(props: { color?: string }): string => props.color ?? '#69beef'};
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 12px;
	margin-top: 2px;
	width: max-content;
	max-width: 85vw;
	filter: drop-shadow(0 0 0.2rem rgba(0, 0, 0, 0.23));
`;

export const IconList = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	align-items: center;
`;

export const Header = styled.div`
	color: #69beef;
	font-weight: lighter;
	width: 100%;
	text-align: center;
	font-size: 3rem;
	letter-spacing: 12px;
	border-bottom: 1px solid
		${(props: { color?: string }): string => props.color ?? '#69beef'};
	color: ${(props: { color?: string }): string => props.color ?? '#69beef'};
`;

const Img = styled(a.img)`
	height: 75px;
	filter: drop-shadow(0 0 0.2rem rgba(0, 0, 0, 0.23)) !important;
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
