import { MouseEvent } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  width: number;
  height: number;
  prefix: string;
  onClick: (evt: MouseEvent<HTMLDivElement>) => void;
}

export const Button = styled.div`
  width: ${(props: ButtonProps) => props.width}px;
  height: ${(props: ButtonProps) => props.height}px;
  background: url(${(props: ButtonProps) => props.prefix}-normal.png);
  background-size: 100% 100%;
  &:focus {
    background: url(${(props: ButtonProps) => props.prefix}-focus.png);
    background-size: 100% 100%;
  }
  &:active {
    background: url(${(props: ButtonProps) => props.prefix}-pressed.png);
    background-size: 100% 100%;
  }
  &:disabled {
    background: url(${(props: ButtonProps) => props.prefix}-disabled.png);
    background-size: 100% 100%;
  }
`;
