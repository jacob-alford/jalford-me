import styled from 'styled-components';
import C from '../constants';

const TapeItem = styled.div`
	font-size: 20px;
	text-align: ${(props: { value?: boolean; index: number }) =>
		props.value ? 'right' : 'left'};
	color: ${(props: { index: number }) => (props.index % 2 === 0 ? C.pink(0) : C.blue(0))};
	overflow: auto;
	overflow-y: hidden;
`;

export default TapeItem;
