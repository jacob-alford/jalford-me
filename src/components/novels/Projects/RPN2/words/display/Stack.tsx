import styled from 'styled-components';

import C from '../constants';

const Stack = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: flex-end;
	background: linear-gradient(${C.blue(2)}, ${C.pink(2)}, ${C.orange(1)});
	overflow: hidden;
	border: 4px solid white;
	filter: drop-shadow(0 0 0.75rem crimson);
	border-radius: 12px;
	height: 333px;
	width: 50%;
	margin: 16px 0px 16px 0px;
`;

export default Stack;
