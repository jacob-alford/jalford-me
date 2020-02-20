import styled from 'styled-components';
import C from '../constants';

const TapeAndStack = styled.div`
	border: 4px solid white;
	border-radius: 12px;
	display: flex;
	margin-top: 4px;
	width: 95vw;
	flex-direction: column;
	flex-wrap: nowrap;
	max-width: 95vw;
	background: linear-gradient(${C.blue(2)}, ${C.pink(2)}, ${C.orange(1)});
	flex-grow: 2;
`;

export default TapeAndStack;
