import React from 'react';
import {
  Typography, Paper, Table,
  TableHead, TableBody, TableRow,
  TableCell, List, ListItem,
  ListItemText, Link, ListItemIcon
 } from '@material-ui/core/';

import useTitleSize from '../../bindings/hooks/useTitleSize';

const styles = {
  header:{

  },
  "h1":{

  }
}

export default function AdaptiveHeading(props){
  const titleSize = useTitleSize();
  const { level , children } = props;
  const style = {
    ...styles.header,
    ...styles[`h${level}`],
    fontSize:titleSize[`h${level}`]
  }
  return (
    <Typography paragraph style={style} variant={`h${level}`}>
      {children}
    </Typography>
  );
}
