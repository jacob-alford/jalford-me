import React from 'react';
import { animated as a } from 'react-spring';
import styled from 'styled-components';

import C from '../constants';

const ItemContainer = styled(a.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  top: 0px;
  width: 100%;
`;

const ItemIndex = styled.div`
  color: white;
  margin-right: 16px;
`;

const StackCard = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: right;
  font-size: 30px;
  color: ${C.green(0)};
  border: 4px solid ${C.green(0)};
  background: black;
  border-radius: 8px;
  height: ${C.h};
  padding: 8px;
  margin: 8px;
  max-width: 100%;
  text-overflow: ellipse;
  white-space: nowrap;
  overflow: auto;
  overflow-y: hidden;
`;

const shouldExp = (num: number): boolean => {
  const str = num.toString();
  const isTenOne = (str.split('.')[0] || '').length <= 20;
  if ((!isTenOne && str.length > 17) || str.includes('e')) return true;
  else return false;
};

const getDigits = (num: number): number => {
  const strArr = num.toString().split('.');
  if (!strArr[1]) return 0;
  return strArr[1].length;
};
export const formatNumber = (num: number): string => {
  if (shouldExp(num)) return num.toExponential();
  else
    return num.toLocaleString(undefined, {
      minimumFractionDigits: getDigits(num)
    });
};

const StackItem = (props: {
  num: number;
  index: number | string;
  animatedStyles: any;
  UID: string;
}) => {
  const { num, index, animatedStyles, UID } = props;
  return (
    <ItemContainer style={animatedStyles} key={UID}>
      <StackCard>{formatNumber(num)}</StackCard>
      <ItemIndex>{index}</ItemIndex>
    </ItemContainer>
  );
};

export default StackItem;
