import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export const Splash = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100%;
`;

export const Orbital = styled.canvas`
	@media (max-width: 450px) {
		width: 250px;
		height: 250px;
	}
	@media (min-width: 451px) {
		width: 400px;
		height: 400px;
	}

	backdrop-filter: saturate(0.3) blur(0.25rem);
	border-radius: 200px;
`;

const MUITitle = styled(Typography)`
	font-weight: bolder !important;
	user-select: none !important;
	@media (max-width: 450px) {
		font-size: 64px !important;
		margin-top: -76.67px !important;
	}
	@media (min-width: 451px) {
		font-size: 96px !important;
		margin-top: -115.33px !important;
	}
`;
const DB = styled.span`
	color: #212832;
`;
const Blue = styled.span`
	color: #69beef;
`;
const Gray = styled.span`
	color: #262626;
`;

export const Title = () => {
	return (
		<MUITitle align='center' variant='h1'>
			<DB>j</DB>
			<Blue>a</Blue>
			<Gray>lford</Gray>
		</MUITitle>
	);
};
