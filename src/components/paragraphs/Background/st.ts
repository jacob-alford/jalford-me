import styled from 'styled-components';

export type homeProps = {
	setHeaderIsOpen: (val: boolean) => void;
};

export const Landscape = styled.div`
	position: absolute;
	top: 0;
	bottom: -500px;
	left: 0;
	right: 0;
	z-index: -1;
`;

export const House = styled.canvas`
	width: 100%;
	height: 100%;
`;
