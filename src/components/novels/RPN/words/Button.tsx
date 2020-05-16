import React, { ReactNode } from 'react';
import { useStoreState } from 'global-state';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { themeState } from 'global-state';
import C2 from 'theme-constants';
import C from './constants';

type ContProps = {
  backgroundColor: string;
  borderColor?: string;
  flexGrow?: number;
  toggled?: string;
};
const Cont = styled.div`
  background: ${(props: ContProps) =>
    props.toggled ? props.toggled : props.backgroundColor};
  transition: background 0.5s, border 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: ${({ flexGrow = 1 }) => flexGrow};
  text-align: center;
  height: ${C.H};
  border-bottom: 2px solid ${(props: { theme: themeState }) => C2.div(props.theme)};
`;

type ButtProps = {
  colour: string;
};
const InnerButton = styled(Button)`
  color: ${(props: ButtProps) => props.colour} !important;
  text-transform: none !important;
  font-size: 1.5rem !important;
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 16px;
  line-height: 0px;
  @media (max-height: 500px) {
    font-size: 0.75rem !important;
  }
`;

export type SurfaceProps = {
  children: ReactNode;
  onClick?: (evt: any) => any;
  flexGrow?: number;
  disabled?: boolean;
  toggled?: boolean;
  backgroundColor?: string;
  color?: string;
  theme?: themeState;
};

type ButtonProps = {
  children: ReactNode;
  onClick?: (evt: any) => any;
  backgroundColor: string;
  borderColor?: string;
  color: string;
  flexGrow?: number;
  disabled?: boolean;
  toggled?: string;
};

export default (props: ButtonProps) => {
  const {
    children,
    onClick,
    backgroundColor,
    borderColor,
    color,
    flexGrow,
    disabled,
    toggled
  } = props;
  const theme = useStoreState(store => store.theme);
  return (
    <Cont
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      flexGrow={flexGrow}
      theme={theme}
      toggled={toggled}>
      <InnerButton disabled={disabled} onClick={onClick} colour={color}>
        {children}
      </InnerButton>
    </Cont>
  );
};
