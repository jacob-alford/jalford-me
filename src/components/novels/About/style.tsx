import React from 'react';
import { animated as a } from 'react-spring';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { themeState } from 'global-state';
import useRedirect from 'components/bindings/utilityHooks/useRedirect';
import C from 'theme-constants';

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

export const MeHolder = styled.div`
  height: max-content;
  display: flex;
  flex-flow: row wrap-reverse;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;
export const Me = styled(a(Avatar))`
  cursor: pointer;
  width: 300px !important;
  height: 300px !important;
  filter: ${C.shadow(1)} !important;
`;
export const MeText = styled(a.div)`
  transition: color 0.5s;
  color: ${(props: { theme: themeState }) => C.text(props.theme)};
  width: 50vw;
  font-size: 2rem;
  flex-grow: 2;
  padding: 12px;
`;

export const Stack = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
`;

export const Block = styled(a.div)`
  transition: background 0.5s, color 0.5s;
  color: ${(props: { theme: themeState }) => C.text(props.theme)};
  background: ${(props: { theme: themeState }) => C.contBack(props.theme)};
  border: 1px solid ${(props: { color?: string }): string => props.color ?? C.prim(0)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 12px;
  width: 85vw;
  filter: ${C.shadow(2)};
`;

export const IconList = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;

interface HeaderProps {
  theme: themeState;
  colour?: string;
}

export const Header = styled(Typography)`
  transition: color 0.5s;
  font-weight: 900 !important;
  width: 100%;
  text-align: center;
  margin: 0px;
  border-bottom: 1px solid ${(props: HeaderProps): string => props.colour ?? C.prim(0)};
  color: ${(props: HeaderProps) => C.text(props.theme)} !important;
`;

const Img = styled(a.img)`
  height: 75px;
`;

const ImgHolder = styled(a.div)`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  margin: 12px;
  cursor: pointer;
`;
const ImgTitle = styled.h3`
  transition: color 0.5s;
  color: ${(props: { theme: themeState }) => C.text(props.theme)};
  font-size: 18px;
  padding: 5px;
`;

type ImageProps = {
  src?: string;
  Render?: React.FunctionComponent;
  url: string;
  title: string;
  style: any;
  theme: themeState;
};
export const HTML = (props: { str: string }) => (
  <span dangerouslySetInnerHTML={{ __html: props.str }} />
);
export const Image = (props: ImageProps) => {
  const { theme, src, Render, title, style, url } = props;
  const handleClick = useRedirect(url) as () => void;
  if (src)
    return (
      <ImgHolder onClick={() => handleClick()} style={style}>
        <Img onDragStart={evt => evt.preventDefault()} src={src} alt={title} />
        <ImgTitle theme={theme}>{title}</ImgTitle>
      </ImgHolder>
    );
  if (Render)
    return (
      <ImgHolder onClick={() => handleClick()} style={style}>
        <Render />
        <ImgTitle theme={theme}>{title}</ImgTitle>
      </ImgHolder>
    );
  return null;
};

export const Design = styled.div`
  font-size: 2rem;
  height: max-content;
  background: linear-gradient(#c70066, #c74f06);
  background-clip: text;
  -webkit-background-clip: text;
  font-weight: bold;
  border: 1px dashed rgba(255, 255, 255, 0.35);
  border-radius: ${C.borderRadius};
  padding: 8px;
  color: ${(props: { theme: themeState }) => C.text(props.theme)};
`;
