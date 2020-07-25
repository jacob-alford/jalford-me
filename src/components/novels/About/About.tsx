import React, { useState } from 'react';
import { useTrail, useSpring } from 'react-spring';
import Katex from 'components/words/Katex/Katex';
import Typed from 'components/sentences/Typed';
import { useStoreState } from 'global-state';
import C from 'theme-constants';
import {
  AboutMe,
  Stack,
  Me,
  MeText,
  Block,
  Image,
  IconList,
  Centerer,
  Design
} from './style';
import meImg from 'assets/me/6-20-pro-alt-1024-70.jpg';
import Logos from './logos';

const {
  FrontEnd: {
    reactLogo,
    tsLogo,
    reduxLogo,
    jestLogo,
    webglLogo,
    rxjslogo,
    haskellLogo,
    elmLogo
  },
  BackEnd: { awsLogo, firebaseLogo }
} = Logos;

const descriptionStrings = [
  `&#8220;All told,^333 a monad^111 is just a monoid^333 in the category of endofunctors.&#8221;^666 -Saunders MacLane`
];

const About2 = () => {
  const [shouldType, setShouldType] = useState(false);
  const theme = useStoreState(store => store.theme);
  const meImgStyles = useSpring({
    opacity: 1,
    transform: `scale3d(1, 1, 1)`,
    from: {
      opacity: 0,
      transform: `scale3d(1.69, 1.69, 1.69)`
    },
    config: {
      tension: 169,
      friction: 9,
      precision: 0.00001
    }
  });
  const [[aUx, aBook, aCamera], setCreativeIcons] = useTrail(3, () => ({
    from: {
      opacity: 0
    }
  }));
  const [[aCat, aLinAlg, aPhys, aPhil], setScienceIcons] = useTrail(4, () => ({
    from: {
      opacity: 0
    },
    onRest: () => setCreativeIcons({ opacity: 1 })
  }));
  const [[aAws, aFirebase], setBackEndIcons] = useTrail(2, () => ({
    from: {
      opacity: 0
    },
    onRest: () => setScienceIcons({ opacity: 1 })
  }));
  const [
    [aHask, aElm, aTs, aReact, aRedux, aRxjs, aJest, aWebgl],
    setFrontEndIcons
  ] = useTrail(8, () => ({
    from: {
      opacity: 0
    },
    onRest: () => setBackEndIcons({ opacity: 1 })
  }));
  const [textFade, setTextFade] = useSpring(() => ({
    opacity: 0,
    from: { opacity: 0 }
  }));

  const [frontEndFall, backEndFall, mathFall, creativeFall] = useTrail(4, {
    opacity: 1,
    from: {
      opacity: 0
    },
    onRest: () => {
      setFrontEndIcons({
        opacity: 1
      });
      setTextFade({ opacity: 1 });
      setShouldType(true);
    }
  });

  return (
    <Centerer theme={theme}>
      <AboutMe>
        <Me
          style={meImgStyles}
          onDragStart={evt => evt.preventDefault()}
          onClick={() => void (window.location.href = 'mailto: jalford-website@pm.me')}
          src={meImg}
        />
        <MeText theme={theme} style={textFade}>
          <Typed
            shouldStart={shouldType}
            typeSpeed={42}
            strings={descriptionStrings}
            backDelay={0}
          />
        </MeText>
        <Stack>
          <Block theme={theme} style={frontEndFall} color='#62F8De'>
            <IconList>
              <Image
                url='https://www.haskell.org'
                style={aHask}
                title='Haskell'
                src={haskellLogo}
                theme={theme}
              />
              <Image
                url='https://elm-lang.org'
                style={aElm}
                title='Elm'
                src={elmLogo}
                theme={theme}
              />
              <Image
                url='https://www.typescriptlang.org/'
                style={aTs}
                title='Typescript'
                src={tsLogo}
                theme={theme}
              />
              <Image
                url='https://reactjs.org/'
                style={aReact}
                title='React'
                src={reactLogo}
                theme={theme}
              />
              <Image
                url='https://redux.js.org/'
                style={aRedux}
                title='Redux'
                src={reduxLogo}
                theme={theme}
              />
              <Image
                url='https://rxjs.dev/'
                style={aRxjs}
                title='RxJS'
                src={rxjslogo}
                theme={theme}
              />

              <Image
                url='https://jestjs.io/en/'
                style={aJest}
                title='Jest'
                src={jestLogo}
                theme={theme}
              />
              <Image
                url='https://webglfundamentals.org/'
                style={aWebgl}
                title='WebGL'
                src={webglLogo}
                theme={theme}
              />
            </IconList>
          </Block>
          <Block theme={theme} style={backEndFall} color='#55CBD9'>
            <IconList>
              <Image
                url='https://aws.amazon.com/'
                style={aAws}
                title='AWS'
                src={awsLogo}
                theme={theme}
              />
              <Image
                url='https://firebase.google.com/'
                style={aFirebase}
                title='Firebase and GCP'
                src={firebaseLogo}
                theme={theme}
              />
            </IconList>
          </Block>
          <Block theme={theme} style={mathFall} color='#69beef'>
            <IconList>
              <Image
                url='https://plato.stanford.edu/entries/category-theory/'
                style={aCat}
                title='Category Theory'
                theme={theme}
                Render={() => (
                  <Katex
                    str={String.raw`a \rightarrow ma`}
                    inline
                    style={{
                      transition: 'color .5s',
                      color: C.text(theme),
                      fontSize: '2rem',
                      border: `1px solid ${C.text(theme)}`,
                      borderRadius: '12px',
                      padding: '8px'
                    }}
                  />
                )}
              />
              <Image
                url='https://en.wikipedia.org/wiki/Numerical_linear_algebra'
                style={aLinAlg}
                title='Numerical Mathematics'
                theme={theme}
                Render={() => (
                  <Katex
                    str={String.raw`\bold{A} = \bold{Q}\bold{\Lambda}\bold{Q}^{-1}`}
                    inline
                    style={{
                      transition: 'color .5s, border .5s',
                      color: C.text(theme),
                      fontSize: '2rem',
                      border: `1px solid ${C.text(theme)}`,
                      borderRadius: '12px',
                      padding: '8px'
                    }}
                  />
                )}
              />
              <Image
                url='https://en.wikipedia.org/wiki/Physics'
                style={aPhys}
                title='Physics'
                theme={theme}
                Render={() => (
                  <Katex
                    str={String.raw`\frac{\partial^2 u}{\partial t^2}=k \bold{\nabla^2}u`}
                    inline
                    style={{
                      transition: 'color .5s',
                      color: C.text(theme),
                      fontSize: '2rem',
                      border: `1px solid ${C.text(theme)}`,
                      borderRadius: '12px',
                      padding: '8px'
                    }}
                  />
                )}
              />
              <Image
                url='https://en.wikipedia.org/wiki/Philosophy'
                style={aPhil}
                title='Philosophy'
                theme={theme}
                Render={() => (
                  <Katex
                    str={String.raw`\Phi`}
                    inline
                    style={{
                      transition: 'color .5s',
                      color: C.text(theme),
                      fontSize: '2rem',
                      border: `1px solid ${C.text(theme)}`,
                      borderRadius: '12px',
                      padding: '8px'
                    }}
                  />
                )}
              />
            </IconList>
          </Block>
          <Block theme={theme} style={creativeFall} color='#6171F8'>
            <IconList>
              <Image
                url='https://developer.apple.com/design/human-interface-guidelines/'
                style={aUx}
                title='design'
                theme={theme}
                Render={() => <Design theme={theme}>UX</Design>}
              />
              <Image
                url='/posts'
                style={aBook}
                title='creative writing'
                theme={theme}
                Render={() => (
                  <Design theme={theme}>
                    <span aria-label='books' role='img'>
                      📚
                    </span>
                  </Design>
                )}
              />
              <Image
                url='https://northrup.photo/product/stunning-digital-photography/'
                style={aCamera}
                title='photography'
                theme={theme}
                Render={() => (
                  <Design theme={theme}>
                    <span aria-label='camera' role='img'>
                      📷
                    </span>
                  </Design>
                )}
              />
            </IconList>
          </Block>
        </Stack>
      </AboutMe>
    </Centerer>
  );
};

export default About2;

/*

const philFocus = [
  'A philosophy focused mathematician who likes^333',
  'A philosophy focused mathematician who loves web stuff.'
];
const designFocused = [
  'I like good design as an end in itself.  ^333 Striving for the divine is what makes us human.'
];
const frontEndStuff = [
  `I learned RxJS recently!  RxJS + Redux Observables + Redux === ❤️`
];
const goodDesign = [
  `Good design is really defined as suiting the purpose of that for which it was originally intended.  ^333 The purpose of this site is to demonstrate good design.`
];



*/
