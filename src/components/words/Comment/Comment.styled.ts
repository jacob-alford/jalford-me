import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { themeState } from 'global-state';
import C from 'theme-constants';

interface CommentCardProps {
  theme: themeState;
  color: string;
}

export const CommentCard = styled.div`
  display: flex;
  flex-flow: column;
  height: max-content;
  width: 100%;
  max-height: ${C.V};
  padding: ${C.spacing(0)};
  margin-top: 7px;
  color: ${(props: CommentCardProps) => C.text(props.theme)};
  border: 2px solid ${(props: CommentCardProps) => props.color || '#14b2c7'};
  background: ${(props: CommentCardProps) => C.contBack(props.theme)};
  transition: background 0.5s, color 0.5s;
`;

export const CommentHeader = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
`;
export const UserIdentity = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  flex-grow: 2;
  align-items: center;
`;

export const Divider = styled.div`
  background: ${(props: { theme: themeState }) => C.div(props.theme)};
  height: 2px;
  width: 100%;
  margin: ${C.spacing(0)} 0px ${C.spacing(0)} 0px !important;
  transition: background 0.5s, color 0.5s;
`;

export const Username = styled(Typography)`
  color: ${(props: { theme: themeState }) => C.text(props.theme)};
  margin: 0px ${C.spacing(0)} 0px ${C.spacing(0)} !important;
  transition: background 0.5s, color 0.5s;
`;

export const Padding = styled.div`
  padding: ${C.spacing(0)};
`;

export const DepthMeter = styled.div`
  width: 2px;
  margin: 0px ${C.spacing(0)} 0px ${C.spacing(0)};
  background: ${(props: { theme: themeState }) => C.contBackAlt(props.theme)};
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  justify-content: flex-end;
`;

export const ActionsHolder = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  flex-flow: row nowrap;
`;

export const SuperContainer = styled.div`
  display: flex;
  flex-flow: row;
  align-items: stretch;
  margin-bottom: ${C.spacing(0)} !important;
`;

export const MarkdownBody = styled.div`
  width: 100%;
  margin-bottom: ${C.spacing(0)};
  align-items: center;
  color: ${(props: { theme: themeState }) => C.text(props.theme)} !important;
  text-align: left;
  flex-grow: 2;
  overflow-y: auto;
  transition: background 0.5s, color 0.5s;
  p {
    font-family: Georgia, Cambria, 'Times New Roman', Times, serif;
  }
  & > hr {
    width: 100%;
    height: 1px;
    transition: background 0.5s;
    background: ${(props: { theme: themeState }) => C.div(props.theme)} !important;
    margin: ${C.spacing(0)} 0px ${C.spacing(0)} 0px !important;
  }
  & > blockquote {
    color: ${(props: { theme: themeState }) => C.textHighlight(props.theme)};
    border-left: 0.25rem solid
      ${(props: { theme: themeState }) => C.textHighlight(props.theme)};
  }
`;

export const Date = styled(Typography)`
  font-size: 0.75rem;
  color: ${(props: { theme: themeState }) => C.textDim(props.theme)};
  margin-top: 7px;
  transition: background 0.5s, color 0.5s;
`;
