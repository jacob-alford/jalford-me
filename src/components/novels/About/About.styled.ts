import { animated as a } from 'react-spring';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import styled from 'styled-components';
import { themeState } from 'global-state';
import C from 'theme-constants';

const squircle = (radius: number) => (theta: number) => ({
  x:
    Math.pow(Math.abs(Math.cos(theta)), 2 / radius) * 50 * Math.sign(Math.cos(theta)) +
    50,
  y:
    Math.pow(Math.abs(Math.sin(theta)), 2 / radius) * 50 * Math.sign(Math.sin(theta)) + 50
});

const SQUIRCLE_BORDER_RADIUS = 4;

const squirclePath = Array.from({ length: 360 })
  .map((_, i) => i)
  .map(v => v * (Math.PI / 180)) // Defined as deg => deg * Math.PI / 180 elsewhere
  .map(squircle(SQUIRCLE_BORDER_RADIUS)) // We'll use a border-radius of 4
  .map(({ x, y }) => ({ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 })) // Round to the ones place
  .map(({ x, y }) => `${x}% ${y}%`)
  .join(', ');

export const ItemsGroup = styled(List)`
  width: 100% !important;
`;

export const Icon = styled.img`
  width: 50px;
  height: 50px;
  clip-path: polygon(${squirclePath}) !important;
  margin-right: 16px;
`;

export const Text = styled(Typography)`
  color: ${({ theme }: { theme: themeState }) => C.text(theme)} !important;
  transition: color 0.5s !important;
`;

interface ItemProps {
  theme: themeState;
  level: 'novice' | 'intermediate' | 'advanced';
}

export const Item = styled(ListItem)`
  width: 100% !important;
  height: 76px !important;
  overflow-x: auto;
  background: ${({ theme }: ItemProps) => C.contBack(theme)} !important;
  color: ${({ theme }: ItemProps) => C.text(theme)} !important;
  border-radius: ${C.borderRadius};
  border: 2px solid
    ${({ level }: ItemProps) =>
      (level === 'novice' && C.success) ||
      (level === 'intermediate' && C.warn) ||
      (level === 'advanced' && C.danger)} !important;
  transition: color 0.5s, background 0.5s;
`;

export const CirlceHolder = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

interface CircleProps {
  level: 'novice' | 'intermediate' | 'advanced';
}
export const Circle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin: 25px 10px 25px 25px;
  background-color: ${({ level }: CircleProps) =>
    (level === 'novice' && C.success) ||
    (level === 'intermediate' && C.warn) ||
    (level === 'advanced' && C.danger)} !important;
`;
export const NoBreak = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;

export const Divider = styled.div`
  height: 1px;
  background: ${({ theme }: { theme: themeState }) => C.text(theme)};
  width: 100%;
  margin-top: 25px;
  margin-bottom: 25px;
  transition: background 0.5s;
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
  margin-bottom: 25px;
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, minmax(16rem, 2fr));
  }
  @media (min-width: 601px) {
    grid-template-columns: repeat(2, minmax(16rem, 2fr));
  }
`;
