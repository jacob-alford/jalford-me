import React from 'react';
import AcadCard from './AcadCard';

export default {
  title: 'Academic Card',
  component: AcadCard
};

export const AcademicCardDarkTheme = () => (
  <div
    style={{
      background: '#232323',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      padding: '14px'
    }}>
    <AcadCard
      theme='dark'
      title='Modeling Craps'
      img='https://i3.kym-cdn.com/photos/images/newsfeed/000/925/494/218.png_large'
      imgTitle='Kappa'
      description='Studying various strategies in craps with respect to stochastic processes'
    />
  </div>
);
AcademicCardDarkTheme.story = {
  name: 'Project Kappa (Dark Theme)'
};

export const AcademicCardLightTheme = () => (
  <div
    style={{
      background: '#cdcdcd',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      padding: '14px'
    }}>
    <AcadCard
      theme='light'
      title='Quaternions'
      img='https://harry.gg/forums/uploads/default/original/2X/2/21f3d6cfdfdc7e5be874776fbf8d32d8f61703a2.png'
      imgTitle='OMEGALUL'
      description='Fourth dimensional rotational operators'
    />
  </div>
);
AcademicCardDarkTheme.story = {
  name: 'Project OMEGALUL (Light Theme)'
};
