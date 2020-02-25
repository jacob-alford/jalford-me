import styled from 'styled-components';
import C from '../constants';

const EnteringValue = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	font-size: 38px;
	border-top: 2px solid white;
	color: black;
	height: ${C.h};
	width: 100%;
	background: ${C.orange(0)};
	padding: 8px;
	&:after {
		font-size: 38px;
		margin-left: 16px;
		margin-top: -8px;
		content: '←';
	}
`;

export default EnteringValue;
