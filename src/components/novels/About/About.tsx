import React from 'react';
import { useSpring } from 'react-spring';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typed from 'components/sentences/Typed';
import { useStoreState } from 'global-state';
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
  Icon,
  Circle,
  CirlceHolder,
  NoBreak,
  Divider
} from './About.styled';
import meImg from 'assets/me/6-20-pro-alt-1024-70.jpg';
import useRedirect from 'components/bindings/utilityHooks/useRedirect';
import skills from './About.skills';

const descriptionStrings = [
  `&#8220;My far-reaching preference of proclivity,^333 is matched singularly^33 by my intuitive peculiarity.&#8221;`
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
        <CirlceHolder>
          <NoBreak>
            <Circle level='novice' />
            <Text theme={theme}>Novice</Text>
          </NoBreak>
          <NoBreak>
            <Circle level='intermediate' />
            <Text theme={theme}>Intermediate</Text>
          </NoBreak>
          <NoBreak>
            <Circle level='advanced' />
            <Text theme={theme}>Advanced</Text>
          </NoBreak>
        </CirlceHolder>
        {skills.map(({ title, items }) => (
          <>
            <Text theme={theme} variant='h3'>
              {title}
            </Text>
            <Divider theme={theme} />
            <Stack>
              {items.map(({ title: text, description, link, icon, level }) => (
                <ItemsGroup>
                  <Item level={level} theme={theme} button onClick={() => redirect(link)}>
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
