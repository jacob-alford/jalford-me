import styled from 'styled-components';

const EntryGroup = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  width: 50%;
  @media (max-width: 576px) {
    width: 100%;
  }
`;

export default EntryGroup;
