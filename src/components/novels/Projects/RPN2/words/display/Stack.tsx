import styled from 'styled-components';

import C from '../constants';

const Stack = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: flex-end;
	flex-wrap: nowrap;
	background: linear-gradient(${C.blue(2)}, ${C.pink(2)}, ${C.orange(1)});
	border-radius: 12px 0px 0px 0px;
	overflow: hidden;
	width: 70%;
	height: 100%;
	flex-grow: 2;
`;

export default Stack;
