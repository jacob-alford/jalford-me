import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

export const ModalPaper = styled(Paper)`
  position: absolute;
  top: calc(100vh - 442px);
  left: calc(100% - 290px);
  height: max-content;
  width: 230px;
  padding: 30px;
`;
