import React, { useState } from 'react';
import { useTrail, useSpring } from 'react-spring';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Katex from 'components/words/Katex/Katex';
import Typed from 'components/sentences/Typed';
import { useStoreState } from 'global-state';
import C from 'theme-constants';
import {
  AboutMe,
  Stack,
  Me,
  MeText,
  Centerer,
  Item,
  ItemText,
  Text,
  ItemsGroup,
  Icon
} from './About.styled';
import meImg from 'assets/me/6-20-pro-alt-1024-70.jpg';
import Logos from './logos';
import useRedirect from 'components/bindings/utilityHooks/useRedirect';
import ICON_APIG from 'assets/AWS/apigateway.svg';
import ICON_CF from 'assets/AWS/cloudfront.svg';
import ICON_COGNITO from 'assets/AWS/cognito.svg';
import ICON_DYNAMO from 'assets/AWS/dynamo.svg';
import ICON_IAM from 'assets/AWS/iam.svg';
import ICON_LAMBDA from 'assets/AWS/lambda.svg';
import ICON_R53 from 'assets/AWS/route53.svg';
import ICON_S3 from 'assets/AWS/s3.svg';
import ICON_SM from 'assets/AWS/secretsmanager.svg';
import ICON_SUM from 'assets/AWS/sumerian.svg';

const descriptionStrings = [
  `&#8220;My far-reaching preference of proclivity,^333 is matched singularly^33 by my intuitive peculiarity.&#8221;`
];

interface Skill {
  title: string;
  description: string;
  link: string;
  icon: string;
}

interface SkillGroup {
  title: string;
  items: Array<Skill>;
}

const skill = (
  title: string,
  description: string,
  link: string,
  icon: string
): Skill => ({
  title,
  description,
  link,
  icon
});
const skillGroup = (title: string, ...items: Array<Skill>) => ({
  title,
  items
});

const skills: Array<SkillGroup> = [
  skillGroup(
    'AWS',
    skill(
      'AWS Cognito',
      'User identity service',
      'https://aws.amazon.com/cognito/',
      ICON_COGNITO
    ),
    skill(
      'AWS IAM',
      'Organization resource permissions',
      'https://aws.amazon.com/iam/',
      ICON_IAM
    ),
    skill(
      'AWS Secrets Manager',
      'Sensitive strings',
      'https://aws.amazon.com/secrets-manager/',
      ICON_SM
    ),
    skill('AWS S3', 'Extensible online storage', 'https://aws.amazon.com/s3/', ICON_S3),
    skill(
      'AWS Sumerian',
      '3d browser rendering, with human-like hosts (deprecated)',
      'https://aws.amazon.com/sumerian/',
      ICON_SUM
    ),
    skill(
      'AWS DynamoDB',
      'NoSQL database solution',
      'https://aws.amazon.com/dynamodb/',
      ICON_DYNAMO
    ),
    skill(
      'AWS API Gateway',
      'Routing for REST APIs',
      'https://aws.amazon.com/api-gateway/',
      ICON_APIG
    ),
    skill(
      'AWS CloudFront',
      'Content delivery networking',
      'https://aws.amazon.com/cloudfront/',
      ICON_CF
    ),
    skill('AWS Route 53', 'Domains', 'https://aws.amazon.com/route53/', ICON_R53),
    skill(
      'AWS Lambda',
      'Serverless function execution',
      'https://aws.amazon.com/lambda/',
      ICON_LAMBDA
    )
  )
];

const About2 = () => {
  const redirect = useRedirect();
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
  const textFade = useSpring({
    opacity: 1,
    from: { opacity: 0 }
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
          <Typed typeSpeed={42} strings={descriptionStrings} backDelay={0} />
        </MeText>
        <Text variant='h2'>Skills</Text>
        {skills.map(({ title, items }) => (
          <>
            <Text variant='h4'>{title}</Text>
            <Stack>
              {items.map(({ title: text, description, link, icon }) => (
                <ItemsGroup>
                  <Item theme={theme} button onClick={() => redirect(link)}>
                    <ListItemIcon>
                      <Icon src={icon} alt={text} />
                    </ListItemIcon>
                    <ItemText theme={theme} primary={text} secondary={description} />
                  </Item>
                </ItemsGroup>
              ))}
            </Stack>
          </>
        ))}
      </AboutMe>
    </Centerer>
  );
};

export default About2;
