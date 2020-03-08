import styled from 'styled-components';

export type homeProps = {
	setHeaderIsOpen: (val: boolean) => void;
};

export const House = styled.canvas`
	width: 100%;
	height: 100vh;
	z-index: 3;
`;
