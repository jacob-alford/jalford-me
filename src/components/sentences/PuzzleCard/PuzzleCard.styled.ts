import { animated as a } from 'react-spring';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

import C from 'theme-constants';

type diffclty = 'easy' | 'medium' | 'hard';

const difficulties = {
  easy: C.success,
  medium: C.warn,
  hard: C.danger
};
const getDifficultyBg = (difficulty: diffclty) => difficulties[difficulty];

export const Card = styled(a.div)`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  background: ${(props: { difficulty: diffclty }) => getDifficultyBg(props.difficulty)};
  transition: background 0.5s;
  padding: ${C.spacing(0)};
  margin: ${C.spacing(1)};
  cursor: pointer;
  width: 224px;
  height: 224px;
  margin-top: 0px;
`;

export const Banner = styled.img`
  width: 306px;
  filter: ${C.shadow(2)};
  cursor: pointer;
`;

export const Title = styled(Typography)`
  margin: 0px;
`;
