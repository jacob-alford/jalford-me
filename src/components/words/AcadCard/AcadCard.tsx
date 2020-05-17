import React, { memo } from 'react';
import AlfordButton, { types } from 'components/words/AlfordButton/AlfordButton';
import { Card, Title, Image, Description } from './AcadCard.styles';
import { themeState } from 'global-state';

interface AcedCardProps {
  theme: themeState;
  title: string;
  img?: string;
  imgTitle?: string;
  description: string;
  read: () => void;
  imageWidthOD?: number;
  Renderer?: React.ElementType;
}

const AcedCard = (props: AcedCardProps) => {
  const {
    theme,
    title,
    img,
    imgTitle,
    description,
    read,
    imageWidthOD = 250,
    Renderer
  } = props;
  return (
    <Card theme={theme}>
      <Title variant='h4' theme={theme}>
        {title}
      </Title>
      <Description variant='h5' theme={theme}>
        {description}
      </Description>
      {Renderer ? (
        <Renderer />
      ) : (
        <Image width={imageWidthOD} src={img} alt={imgTitle || title} />
      )}
      <AlfordButton type={types.secondary} onClick={read}>
        Read
      </AlfordButton>
    </Card>
  );
};

export default memo(AcedCard);
