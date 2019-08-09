import React , { useState , useEffect } from 'react';
import {
  Typography, Table, TableRow,
  TableCell, TableHead, TableBody,
  IconButton, Grid
} from '@material-ui/core/';
import { KeyboardArrowDown , KeyboardArrowUp } from '@material-ui/icons/';

const styles = {
  header:{
    cursor:'pointer',
    fontWeight:'bold'
  }
}

export default function DataTable(props){
  const { headerConfig , defaultSort , data } = props;
  const [currentSort,setCurrentSort] = useState({ref:defaultSort,dir:'a'});
  /* TODO: Figure out why the heck the initial sort doesn't persist */
  useEffect(() => {
    if(currentSort && data && data[0]){
      const ascending = currentSort.dir === 'a';
      if(typeof data[0][currentSort.ref] === 'string'){
        data.sort((datum1,datum2) => {
          const comp1 = datum1[currentSort.ref].toUpperCase();
          const comp2 = datum2[currentSort.ref].toUpperCase();
          if(comp1 < comp2)
            return (ascending) ? -1 : 1;
          else if(comp1 > comp2)
            return (ascending) ? 1 : -1;
          else return 0;
        });
      }else if(typeof data[0][currentSort.ref] === 'number'){
        data.sort((datum1,datum2) => ((ascending) ? 1 : -1) * (datum1[currentSort.ref] - datum2[currentSort.ref]));
      }else if(typeof data[0][currentSort.ref] === 'boolean'){
        data.sort((datum1,datum2) => {
          if(datum1[currentSort.ref] < datum2[currentSort.ref])
            return (ascending) ? -1 : 1;
          else if(datum1[currentSort.ref] > datum2[currentSort.ref])
            return (ascending) ? 1 : -1;
          else return 0;
        });
      }else if(currentSort.ref.toLowerCase().includes('date')){
        data.sort((datum1,datum2) => {
          return ((ascending) ? 1 : -1) * (datum1[currentSort.ref].seconds - datum2[currentSort.ref].seconds);
        });
      }
    }
  },[currentSort,data]);
  const createSortBy = ref => {
    return () => {
      if(currentSort.ref === ref){
        const dir = (currentSort.dir === 'a') ? 'd' : 'a';
        setCurrentSort({...currentSort,dir:dir});
      }else{
        setCurrentSort({...currentSort,ref:ref});
      }
    }
  }
  return (
    <Table>
      <TableHead>
        <TableRow>
          {headerConfig.filter(header => header.display)
                       .map((header,headerIndex) => (
            <TableCell style={{textAlign:'center'}} key={`header${headerIndex}`}>
              <Grid container direction="row" justify="center" alignItems="center">
                {(currentSort && header.sortable) ? (
                  <Grid item>
                    <Typography variant="h6" component="span" style={styles.header} onClick={createSortBy(header.ref[0])}>
                      {header.label}
                    </Typography>
                  </Grid>
                ) : (
                  <Grid item>
                    <Typography variant="h6" component="span" style={{...styles.header,cursor:'default'}}>
                      {header.label}
                    </Typography>
                  </Grid>
                )}
                {(currentSort && header.sortable && currentSort.ref === header.ref[0]) ? (
                  <Grid item>
                    <IconButton onClick={createSortBy(header.ref[0])}>
                      {(currentSort.dir === 'a') ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                  </Grid>
                ) : null}
              </Grid>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((post,postIndex) => (
          <TableRow key={`postRow${postIndex}`}>
            {headerConfig.filter(header => header.display)
                         .map((header,dataIndex) => {
              if(header.transform)
                return (
                  <TableCell key={`dataEntry${dataIndex}`}>
                    {header.transform(...header.ref.map(ref => post[ref]))}
                  </TableCell>
                );
              else return (
                <TableCell key={`dataEntry${dataIndex}`}>
                  {post[header.ref[0]]}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
