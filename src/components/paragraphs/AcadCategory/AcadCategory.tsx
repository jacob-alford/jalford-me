import React, { useCallback } from 'react';
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
  const _redirect = useRedirect() as (url: string) => void;
  const redirect = useCallback(
    (evt: React.SyntheticEvent<HTMLButtonElement>, url: string) => {
      evt.preventDefault();
      _redirect(url);
    },
    [_redirect]
  );
  return (
    <CatCont theme={theme} bgOvrd={bgOvrd} textOvrd={textOvrd}>
      <Title variant='h2'>{title}</Title>
      <Divider theme={theme} divOvrd={divOvrd} />
      <PapersHolder>
        {acadPapers.map(paper => (
          <AcadCard
            Renderer={paper.Renderer}
            href={paper.url}
            imageWidthOD={paper.imageWidth}
            key={paper.title}
            theme={theme}
            title={paper.title}
            img={paper.image}
            description={paper.description}
            read={evt => redirect(evt, paper.url)}
          />
        ))}
      </PapersHolder>
    </CatCont>
  );
};

export default AcadCategory;
