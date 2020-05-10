import React from 'react';
import Container from 'components/words/Holder';
import CircularProgress from '@material-ui/core/CircularProgress';
import themeConstruct from 'theme';
import C from 'theme-constants';

const styles = themeConstruct(
  ['getCardPadding', 'getMajorSpacing'],
  ([padding, spacing]) => ({
    superHolder: {
      width: '100vw'
    },
    holder: {
      padding: padding,
      marginTop: C.pagePad,
      width: '100px',
      height: '100px'
    }
  })
);

export default function Loader({ style = {} }) {
  return (
    <Container style={styles.superholder}>
      <Container style={{ ...styles.holder, ...style }}>
        <CircularProgress />
      </Container>
    </Container>
  );
}
