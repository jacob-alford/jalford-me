import React from 'react';
import { useTrail } from 'react-spring';
import useBabylon from 'components/bindings/utilityHooks/useBabylon';
import init from './IntroII.init';
import {
  CodeP,
  Splash,
  Screen,
  Haskell,
  Code,
  Var,
  Type,
  TypeClass,
  String
} from './IntroII.style';

const Intro = () => {
  const canvasRef = useBabylon(init);
  const [l1, l2, l3] = useTrail(3, {
    opacity: 1,
    from: {
      opacity: 0
    },
    delay: 666
  });
  return (
    <Screen>
      <Splash ref={canvasRef} />
      <Haskell>
        <Code>
          <CodeP style={l1}>
            <Var>lovesHaskell</Var>
            <Type>{` :: Humanoid -> Bool`}</Type>
          </CodeP>
          <CodeP style={l2}>
            lovesHaskell <TypeClass>Person </TypeClass>a <Type>= </Type>(hasSeen{' '}
            <Type>. </Type>
            largeCodebases) a
          </CodeP>
          <CodeP style={l3}>
            {`lovesHaskell        _ `}
            <Type>= </Type>error <String>"alien"</String>
          </CodeP>
        </Code>
      </Haskell>
    </Screen>
  );
};

export default Intro;
