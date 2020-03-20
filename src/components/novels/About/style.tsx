import React from 'react';
import { animated as a } from 'react-spring';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';

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
`;

export const Stack = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr;
	grid-auto-rows: auto;
`;

export const Block = styled(a.div)`
	backdrop-filter: saturate(0.3) blur(0.25rem);
	border: 1px solid #69beef;
	border-radius: ${radius};
	display: flex;
	flex-flow: row wrap;
`;

export const StackItem = styled(a.div)``;

export const Image = styled(a.img)`
	width: 100px;
	height: 100px;
`;
