import React, { useState } from 'react';
import { useTrail, useSpring } from 'react-spring';
import Katex from 'components/words/Katex/Katex';
import Typed from 'components/sentences/Typed';
import { useStoreState } from 'global-state';
import useDropSlide from './useDropSlide';
import C from 'theme-constants';
import {
  AboutMe,
  Stack,
  Me,
  MeText,
  MeHolder,
  Block,
  Header,
  Image,
  IconList,
  Centerer,
  Design,
  HTML
} from './style';
import meImg from 'assets/me/CUMP_jalford-me.jpg';
import Logos from './logos';

const {
  FrontEnd: { reactLogo, tsLogo, reduxLogo, jestLogo, webglLogo, muiLogo, rxjslogo },
  BackEnd: { awsLogo, firebaseLogo, nodeLogo }
} = Logos;

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

const descriptionStrings = [philFocus, designFocused, frontEndStuff, goodDesign][
  (Math.random() * 4) | 0
];

const About2 = () => {
  const [straight, setStraight] = useState(false);
  const [shouldType, setShouldType] = useState(false);
  const theme = useStoreState(store => store.theme);
  const [meImgStyles, setMeImgStyles] = useSpring(() => ({
    opacity: 0,
    transform: `translate3d(-100px, 0, 0) rotateZ(-30deg)`,
    from: {
      opacity: 0,
      transform: `translate3d(-100px, 0, 0) rotateZ(-30deg)`
    },
    config: {
      tension: 69,
      friction: 42,
      precision: 0.00001
    }
  }));
  const [[aUx, aBook, aCamera], setCreativeIcons] = useTrail(3, () => ({
    from: {
      opacity: 0
    }
  }));
  const [[aLinAlg, aPhys, aPhil, aPsy, aTechWr], setScienceIcons] = useTrail(5, () => ({
    from: {
      opacity: 0
    },
    onRest: () => setCreativeIcons({ opacity: 1 })
  }));
  const [[aAws, aFirebase, aNode], setBackEndIcons] = useTrail(3, () => ({
    from: {
      opacity: 0
    },
    onRest: () => setScienceIcons({ opacity: 1 })
  }));
  const [[aReact, aRedux, aRxjs, aTs, aJest, aWebgl, aMui], setFrontEndIcons] = useTrail(
    7,
    () => ({
      from: {
        opacity: 0
      },
      onRest: () => setBackEndIcons({ opacity: 1 })
    })
  );
  const [textFade, setTextFade] = useSpring(() => ({
    opacity: 0,
    from: { opacity: 0 }
  }));

  const frontEndFall = useDropSlide(207, straight, () => {
    setMeImgStyles({
      opacity: 1,
      transform: `translate3d(0px, 0, 0) rotateZ(0deg)`
    });
    setFrontEndIcons({
      opacity: 1
    });
    setTextFade({ opacity: 1 });
    setShouldType(true);
  });
  const backEndFall = useDropSlide(138, straight);
  const mathFall = useDropSlide(69, straight);
  const creativeFall = useDropSlide(0, straight);

  return (
    <Centerer theme={theme}>
      <AboutMe>
        <MeHolder>
          <Me
            style={meImgStyles}
            onDragStart={evt => evt.preventDefault()}
            src={meImg}
            onClick={() => setStraight(!straight)}
          />
          <MeText theme={theme} style={textFade}>
            <HTML str='&#8220;' />
            <Typed shouldStart={shouldType} strings={descriptionStrings} backDelay={0} />
            <HTML str='&#8221;' />
          </MeText>
        </MeHolder>
        <Stack>
          <Block theme={theme} style={frontEndFall} color='#62F8De'>
            <Header variant='h2' theme={theme}>
              Front End
            </Header>
            <IconList>
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
                url='https://www.typescriptlang.org/'
                style={aTs}
                title='Typescript'
                src={tsLogo}
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
              <Image
                url='https://material-ui.com/'
                style={aMui}
                title='Material UI'
                src={muiLogo}
                theme={theme}
              />
            </IconList>
          </Block>
          <Block theme={theme} style={backEndFall} color='#55CBD9'>
            <Header variant='h2' theme={theme}>
              Back End
            </Header>
            <IconList>
              <Image
                url='https://aws.amazon.com/'
                style={aAws}
                title='Amazon Web Services'
                src={awsLogo}
                theme={theme}
              />
              <Image
                url='https://firebase.google.com/'
                style={aFirebase}
                title='Firebase'
                src={firebaseLogo}
                theme={theme}
              />
              <Image
                url='https://nodejs.org/en/'
                style={aNode}
                title='Node.js'
                src={nodeLogo}
                theme={theme}
              />
            </IconList>
          </Block>
          <Block theme={theme} style={mathFall} color='#69beef'>
            <Header variant='h2' theme={theme}>
              Science
            </Header>
            <IconList>
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
                      transition: 'color .5s',
                      color: C.text(theme),
                      fontSize: '2rem',
                      border: '1px solid rgba(255,255,255,.5)',
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
                      border: '1px solid rgba(255,255,255,.5)',
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
                      border: '1px solid rgba(255,255,255,.5)',
                      borderRadius: '12px',
                      padding: '8px'
                    }}
                  />
                )}
              />
              <Image
                url='https://en.wikipedia.org/wiki/Psychology'
                style={aPsy}
                title='Psychology'
                theme={theme}
                Render={() => (
                  <Katex
                    str={String.raw`\Psi`}
                    inline
                    style={{
                      transition: 'color .5s',
                      color: C.text(theme),
                      fontSize: '2rem',
                      border: '1px solid rgba(255,255,255,.5)',
                      borderRadius: '12px',
                      padding: '8px'
                    }}
                  />
                )}
              />
              <Image
                url='https://en.wikipedia.org/wiki/Technical_writing'
                style={aTechWr}
                title='Technical Writing'
                theme={theme}
                Render={() => (
                  <Katex
                    str={String.raw`\text{click my face}`}
                    inline
                    style={{
                      transition: 'color .5s',
                      color: C.text(theme),
                      fontSize: '2rem',
                      border: '1px solid rgba(255,255,255,.5)',
                      borderRadius: '12px',
                      padding: '8px'
                    }}
                  />
                )}
              />
            </IconList>
          </Block>
          <Block theme={theme} style={creativeFall} color='#6171F8'>
            <Header variant='h2' theme={theme}>
              Creative
            </Header>
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
