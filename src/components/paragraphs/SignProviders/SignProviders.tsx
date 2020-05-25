import React from 'react';
import { useSpring } from 'react-spring';
import renderOnPropDiff from 'helpers/renderOnPropDiff';
import BrandButton from 'components/words/BrandButton/BrandButton';
import { themeState } from 'global-state';
import { SignProviderDialogue, Title, Divider } from './SignProviders.styled';

interface SignProvidersProps {
  theme: themeState;
  submitByGoogle: () => Promise<void>;
  submitByApple: () => Promise<void>;
  submitByGithub: () => Promise<void>;
}

const SignProviders = (props: SignProvidersProps) => {
  const { theme, submitByGoogle, submitByApple, submitByGithub } = props;
  const signProviderSpring = useSpring({
    opacity: 1,
    transform: 'scale3d(1,1,1)',
    from: {
      opacity: 0,
      transform: 'scale3d(0.69, 0.69, 0.69)'
    },
    delay: 538
  });

  return (
    <SignProviderDialogue style={signProviderSpring} theme={theme}>
      <Title variant='h4' theme={theme}>
        Provider
      </Title>
      <Divider theme={theme} />
      {false && (
        <BrandButton
          onClick={submitByApple}
          prefix='/publicAssets/brand-buttons/apple/apple-signin'
          width={191}
          height={46}
          ariaLabel='sign in with apple'
          useHighlight='true'
          theme={theme}
          shadowOverride='drop-shadow(1px 1px .9px rgba(0,0,0,.2))'
          marginOverride='0px 0px 0px 0px'
        />
      )}
      <BrandButton
        onClick={submitByGithub}
        prefix='/publicAssets/brand-buttons/github/github-signin'
        shadowOverride='drop-shadow(1px 1px .9px rgba(0,0,0,.2))'
        marginOverride='0px 0px 0px 0px'
        ariaLabel='sign in with github'
        useHighlight='true'
        width={191}
        height={46}
        theme={theme}
      />
      <BrandButton
        onClick={submitByGoogle}
        prefix='/publicAssets/brand-buttons/google/google-signin'
        marginOverride='0px 0px 0px 0px'
        ariaLabel='sign in with google'
        width={191}
        height={46}
        theme={theme}
      />
    </SignProviderDialogue>
  );
};

export default renderOnPropDiff(SignProviders);
