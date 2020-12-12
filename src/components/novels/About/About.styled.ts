import { animated as a } from 'react-spring';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import styled from 'styled-components';
import { themeState } from 'global-state';
import C from 'theme-constants';

export const ItemsGroup = styled(List)`
  width: 100% !important;
`;

export const Icon = styled.img`
  width: 50px;
  height: 50px;
  border-radius: ${C.borderRadius};
  margin-right: 16px;
`;

export const Text = styled(Typography)`
  color: ${({ theme }: { theme: themeState }) => C.text(theme)} !important;
`;

export const Item = styled(ListItem)`
  width: 100% !important;
  background: ${({ theme }: { theme: themeState }) => C.contBack(theme)} !important;
  color: ${({ theme }: { theme: themeState }) => C.text(theme)} !important;
  border-radius: ${C.borderRadius};
  transition: color 0.5s, background 0.5s;
`;

export const ItemText = styled(ListItemText)`
  color: ${({ theme }: { theme: themeState }) => C.text(theme)} !important;
  transition: color 0.5s, background 0.5s;
  p {
    transition: color 0.5s, background 0.5s;
    color: ${({ theme }: { theme: themeState }) => C.textAlt(theme)} !important;
  }
`;

export const Centerer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  padding-top: ${C.pagePad};
  background: ${(props: { theme: themeState }) => C.contBackAlt(props.theme)};
  transition: background 0.5s;
`;
export const AboutMe = styled.div`
  display: grid;
  grid-template-columns: minmax(min-content, 100%);
  grid-template-rows: auto auto;
  align-items: center;
  justify-items: center;
`;
export const Me = styled(a(Avatar))`
  cursor: pointer;
  max-width: 95vw;
  max-height: 95vw;
  width: 375px !important;
  height: 375px !important;
  filter: ${C.shadow(2)} !important;
`;
export const MeText = styled(a.div)`
  transition: color 0.5s;
  color: ${(props: { theme: themeState }) => C.text(props.theme)};
  width: 50vw;
  height: max-content;
  min-height: 50px;
  font-size: 2rem;
  flex-grow: 2;
  padding: 12px;
  filter: ${C.shadow(0)};
`;
export const Stack = styled.div`
  display: grid;
  grid-gap: 12px;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(2, minmax(16rem, 2fr));
`;
