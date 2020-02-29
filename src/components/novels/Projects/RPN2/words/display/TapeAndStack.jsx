import styled from 'styled-components';

import C from '../constants';

const TapeAndStack = styled.div`
	display: flex;
	width: 100%;
	height: 50vh;
	flex-direction: column;
	flex-wrap: nowrap;
	background: linear-gradient(${C.blue(2)}, ${C.pink(2)}, ${C.orange(1)});
`;
export default TapeAndStack;
