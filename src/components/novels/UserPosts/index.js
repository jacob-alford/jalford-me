import React , { useState } from 'react';
import { withRouter } from 'react-router';
import {
  Container, Typography,
  Paper, Table, TableRow,
  TableCell, TableHead,
  CircularProgress, TableBody,
  IconButton, Grid
} from '@material-ui/core/';
import { DeleteForever , Edit , Pageview , Public } from '@material-ui/icons/';

import withPageFade from '../../bindings/wrappers/withPageFade';

import userRPostConnect from '../../bindings/hooks/useRPostConnect';

import { firebase } from '../../../index.js';

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
  },
  actionBar:{
    boxShadow: '0px 0px 10px -1px rgba(0,0,0,0.75)',
    backgroundColor:'#69beef'
  }
}

const dateify = date => new Date(date.toDate()).toLocaleDateString("default",{year: 'numeric', month: 'long', day: 'numeric'});

function UserPosts(props){
  const { history } = props;
  const { isLoading , postData , error } = userRPostConnect();
  const [currentDelete,setCurrentDelete] = useState(null);
  const [currentPublic,setCurrentPublic] = useState(null);
  const handleDelete = uid => {
    if(currentDelete === uid){
      if(!error){
        const db = firebase.firestore();
        const doc = db.collection('posts').doc(uid);
        doc.update({erased:true})
           .then(() => setCurrentDelete(null))
           .catch(err => console.error(err));
      }
    }else{
      setCurrentDelete(uid);
    }
  }
  const handleEdit = uid => {
    history.push(`/posts/edit/${uid}`);
  }
  const handleView = uid => {
    history.push(`/posts/view/${uid}`);
  }
  const handleTogglePublic = (uid,isPublic) => {
    if(currentPublic === uid){
      if(!error){
        const db = firebase.firestore();
        const doc = db.collection('posts').doc(uid);
        doc.update({isPublic:!isPublic})
           .then(() => setCurrentPublic(null))
           .catch(err => console.error(err));
      }
    }else{
      setCurrentPublic(uid);
    }
  }
  const headerConfig = [
    {label:"Actions",refs:["uid","isPublic"],transform:(ref,ref2) => (
      <Grid container justify="center" alignItems="center" style={styles.actionBar}>
        <Grid item>
          <IconButton onClick={() => handleView(ref)}>
            <Pageview />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={() => handleEdit(ref)}>
            <Edit />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton style={(currentPublic === ref) ? {color:'#E84040'} : null} onClick={() => handleTogglePublic(ref,ref2)}>
            <Public />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton style={(currentDelete === ref) ? {color:'#E84040'} : null} onClick={() => handleDelete(ref)}>
            <DeleteForever />
          </IconButton>
        </Grid>
      </Grid>
    )},
    {label:"Title",ref:"title"},
    {label:"Date",refs:["date"],transform:date => dateify(date)},
    {label:"Public",refs:["isPublic"],transform:bool => bool.toString()}
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
              My Posts
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  {headerConfig.map((header,headerIndex) => (
                    <TableCell style={{textAlign:'center'}} key={`header${headerIndex}`}>
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
                            {header.transform(...header.refs.map(ref => post[ref]))}
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

export default withRouter(withPageFade(UserPosts));
