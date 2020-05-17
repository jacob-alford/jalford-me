import React from 'react';
import { useStoreState } from 'global-state';
import { CatCont, Title, Divider, PapersHolder } from './AcadCategory.styles';
import AcadCard from 'components/words/AcadCard/AcadCard';
import useRedirect from 'components/bindings/utilityHooks/useRedirect';
import { acadPapers } from 'config';

interface Props {
  title: string;
  bgOvrd?: string;
  textOvrd?: string;
  divOvrd?: string;
}

const AcadCategory = (props: Props) => {
  const { title, bgOvrd, textOvrd, divOvrd } = props;
  const theme = useStoreState(store => store.theme);
  const redirect = useRedirect() as (url: string) => void;
  return (
    <CatCont theme={theme} bgOvrd={bgOvrd} textOvrd={textOvrd}>
      <Title variant='h2'>{title}</Title>
      <Divider theme={theme} divOvrd={divOvrd} />
      <PapersHolder>
        {acadPapers.map(paper => (
          <AcadCard
            Renderer={paper.Renderer}
            imageWidthOD={paper.imageWidth}
            key={paper.title}
            theme={theme}
            title={paper.title}
            img={paper.image}
            description={paper.description}
            read={() => redirect(paper.url)}
          />
        ))}
      </PapersHolder>
    </CatCont>
  );
};

export default AcadCategory;
