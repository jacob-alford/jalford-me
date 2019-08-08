import React from 'react';
import {
  Container, Typography,
  Paper, Table, TableRow,
  TableCell, TableHead,
  CircularProgress, TableBody,
  IconButton, Grid
} from '@material-ui/core/';
import { DeleteForever } from '@material-ui/icons/';

import withPageFade from '../../bindings/wrappers/withPageFade';

import userRPostConnect from '../../bindings/hooks/useRPostConnect';

const styles = {
  container:{
    marginTop:"24px"
  },
  paper:{
    padding:'18px'
  },
  loader:{
    margin:'auto'
  },
  error:{
    color:'#E84040',
    textAlign:'center'
  },
  title:{
    color:"rgba(0,0,0,.85)",
    textAlign:"center"
  },
  notFound:{
    textAlign:'center'
  }
}

const dateify = date => new Date(date.toDate()).toLocaleDateString("default",{year: 'numeric', month: 'long', day: 'numeric'});

function UserPosts(){
  const { isLoading , postData , error } = userRPostConnect();
  const handleDelete = uid => {

  }
  const headerConfig = [
    {label:"Delete",ref:"__",transform:val => (
      <IconButton onClick={() => handleDelete(val)}>
        <DeleteForever />
      </IconButton>
    )},
    {label:"Title",ref:"title"},
    {label:"Slug",ref:"uid"},
    {label:"Date",ref:"date",transform:date => dateify(date)},
    {label:"Public",ref:"isPublic",transform:bool => bool.toString()},
    {label:"Last Publish",ref:"lastPublish",transform:date => dateify(date)},
    {label:"Series",ref:"series"},
    {label:"Tags",ref:"tags",transform:arr => arr.join(",")}
  ];
  return (
    <Container style={styles.container}>
      <Paper style={styles.paper}>
        {(isLoading) ? (
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <CircularProgress color="secondary" style={styles.loader} />
            </Grid>
          </Grid>
        ) : null}
        {(error) ? (
          <Typography variant="h5" style={styles.error}>
            {error.toString()}
          </Typography>
        ) : null}
        {(!error && postData && postData.length === 0) ? (
          <Typography variant="h5" style={styles.notFound}>
            You don't have any posts!
          </Typography>
        ) : null}
        {(!error && postData && postData.length > 0) ? (
          <React.Fragment>
            <Typography variant="h2" style={styles.title}>
              User Posts
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  {headerConfig.map((header,headerIndex) => (
                    <TableCell key={`header${headerIndex}`}>
                      {header.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {postData.map((post,postIndex) => (
                  <TableRow key={`postRow${postIndex}`}>
                    {headerConfig.map((header,dataIndex) => {
                      if(header.transform)
                        return (
                          <TableCell key={`dataEntry${dataIndex}`}>
                            {header.transform(post[header.ref])}
                          </TableCell>
                        );
                      else return (
                        <TableCell key={`dataEntry${dataIndex}`}>
                          {post[header.ref]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </React.Fragment>
        ) : null}
      </Paper>
    </Container>
  );
}

export default withPageFade(UserPosts);
