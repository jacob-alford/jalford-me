import React from 'react';
import { Button } from './BrandButton.styled';
import { themeState } from 'global-state';

interface BrandButtonProps {
  onClick: (evt: React.MouseEvent<HTMLDivElement>) => void;
  prefix: string;
  theme: themeState;
  width: number;
  height: number;
}
const BrandButton = (props: BrandButtonProps) => {
  const { onClick, theme, prefix, width, height } = props;
  if (theme === themeState.light)
    return (
      <Button
        width={width}
        height={height}
        prefix={`${prefix}-light`}
        onClick={onClick}
      />
    );
  return (
    <Button width={width} height={height} prefix={`${prefix}-dark`} onClick={onClick} />
  );
};

export default BrandButton;
