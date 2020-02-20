import styled from 'styled-components';

type propTypes = {
	minHeight?: string;
	flexGrow?: number;
	maxHeight?: string;
};

const EntryRow = styled.div`
	display: flex;
	flex-wrap: nowrap;
	flex-direction: row;
	justify-content: center;
	height: 100%;
	width: 100%;
	flex-grow: ${(props: propTypes) => props.flexGrow || '0'};
	min-height: ${(props: propTypes) => props.minHeight || ''};
	max-height: ${(props: propTypes) => props.maxHeight || ''};
`;

export default EntryRow;
