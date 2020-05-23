import React from 'react';
import { Button } from './BrandButton.styled';
import { themeState } from 'global-state';

interface BrandButtonProps {
  onClick: (evt: any) => void;
  prefix: string;
  theme: themeState;
  width: number;
  height: number;
  shadowOverride?: string;
  marginOverride?: string;
  ariaLabel?: string;
  useHighlight?: boolean;
}
const BrandButton = (props: BrandButtonProps) => {
  const {
    onClick,
    theme,
    prefix,
    width,
    height,
    shadowOverride = '',
    marginOverride = '',
    ariaLabel,
    useHighlight
  } = props;
  if (theme === themeState.light)
    return (
      <Button
        width={width}
        height={height}
        shadowoverride={shadowOverride}
        marginoverride={marginOverride}
        usehighlight={useHighlight}
        prefix={`${prefix}-light`}
        onClick={onClick}
        aria-label={ariaLabel}
        disableRipple
      />
    );
  return (
    <Button
      width={width}
      shadowoverride={shadowOverride}
      marginoverride={marginOverride}
      height={height}
      usehighlight={useHighlight}
      prefix={`${prefix}-dark`}
      onClick={onClick}
      aria-label={ariaLabel}
      disableRipple
    />
  );
};

export default BrandButton;
