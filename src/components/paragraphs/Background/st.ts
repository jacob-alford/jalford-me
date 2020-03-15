import styled from 'styled-components';

export type homeProps = {
	setHeaderIsOpen: (val: boolean) => void;
};

export const Landscape = styled.div`
	position: absolute;
	width: 100%;
	height: 125vh;
	z-index: -1;
`;

export const House = styled.canvas`
	width: 100%;
	height: 100%;
`;
