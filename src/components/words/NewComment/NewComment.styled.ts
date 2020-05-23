import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import C from 'theme-constants';
import { themeState } from 'global-state';

export const NotLoggedIn = styled(Typography)`
  color: ${(props: { theme: themeState }) => C.text(props.theme)};
  margin-top: 7px;
  text-align: center;
`;

export const NewCommentCard = styled.div`
  background: ${(props: { theme: themeState }) => C.contBack(props.theme)};
  display: flex;
  flex-flow: column;
  padding: ${C.spacing(0)};
  margin: 0px 0px ${C.spacing(1)} 0px;
`;

export const CardButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
