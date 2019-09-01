import React , { useState } from 'react';
import useReactRouter from 'use-react-router';
import {
  Container, Typography,
  Paper, CircularProgress,
  IconButton, Grid, Chip
} from '@material-ui/core/';
import {
  DeleteForever, Edit,
  Pageview, Public,
  Title, Event,
  Category, LocationCity,
  Person, Label, Publish,
  Build
} from '@material-ui/icons/';

import DataTable from '../../sentences/DataTable';

import withPageFade from '../../bindings/wrappers/withPageFade';

import useRPostConnect from '../../bindings/hooks/useRPostConnect';
import useTitleSize from '../../bindings/hooks/useTitleSize';
import useNotify from '../../bindings/hooks/useNotify';

import { firebase } from '../../../index.js';

const styles = {
  container:{
    marginTop:"24px"
  },
  paper:{
    padding:'18px',
    overflow:'auto'
  },
  fieldPaper:{
    margin:'18px'
  },
  loader:{
    margin:'auto'
  },
  error:{
    color:'#E84040',
    textAlign:'center'
  },
  title:{
    color:"white",
    marginTop:"12px",
    marginBottom:"12px",
    textAlign:"center"
  },
  notFound:{
    textAlign:'center'
  },
  actionBar:{
    boxShadow: '0px 0px 10px -1px rgba(0,0,0,0.75)',
    backgroundColor:'#69beef'
  },
  selectedField:{
    backgroundColor:'rgba(0,0,0,.55)'
  },
  chipSelected:{
    margin:'4px',
    backgroundColor:'#58E855',
    color:'rgba(0,0,0,.85)'
  },
  chipDeselected:{
    margin:'4px',
    backgroundColor:'#697989',
    color:'white'
  },
  chipIcon:{

  }
}

const fields = [
  {field:'Actions',icon:(color) => <Build style={{...styles.chipIcon,color:color}} />,label:'Actions'},
  {field:'title',icon:(color) => <Title style={{...styles.chipIcon,color:color}} />,label:'Title'},
  {field:'date',icon:(color) => <Event style={{...styles.chipIcon,color:color}} />,label:'Date'},
  {field:'isPublic',icon:(color) => <Public style={{...styles.chipIcon,color:color}} />,label:'Public'},
  {field:'uid',icon:(color) => <LocationCity style={{...styles.chipIcon,color:color}} />,label:'Slug'},
  {field:'author',icon:(color) => <Person style={{...styles.chipIcon,color:color}} />,label:'Author'},
  {field:'tags',icon:(color) => <Label style={{...styles.chipIcon,color:color}} />,label:'Tags'},
  {field:'lastPublish',icon:(color) => <Publish style={{...styles.chipIcon,color:color}} />,label:'Last Published'},
  {field:'series',icon:(color) => <Category style={{...styles.chipIcon,color:color}} />,label:'Series' }
];

const dateify = date => new Date(date.toDate()).toLocaleDateString("default",{year: 'numeric', month: 'long', day: 'numeric'});

const getPermissions = user => user.activeUser.permissions.value;

function UserPosts(props){
  const { history } = useReactRouter();
  const { isLoading , postData , error , user } = useRPostConnect('title');
  const notify = useNotify({
    timeout:4500
  });
  const [currentDelete,setCurrentDelete] = useState(null);
  const [currentPublic,setCurrentPublic] = useState(null);
  const [selectedFields,setSelectedFields] = useState(["Title","Date","Public"]);
  const { h1:title } = useTitleSize();
  const handleDelete = uid => {
    if(currentDelete === uid){
      if(!error){
        const db = firebase.firestore();
        const doc = db.collection('posts').doc(uid);
        doc.update({erased:true})
           .then(() => notify({
             alertType:'success',
             body:`Successfully deleted post with slug: ${uid}`
           })).catch(err => notify({
             alertType:'error',
             body:err.toString()
           })).finally(() => setCurrentDelete(null));
      }
    }else{
      setCurrentDelete(uid);
    }
  }
  const createFieldToggler = field => {
    return () => {
      if(selectedFields.includes(field)){
        const copyArr = [...selectedFields];
        copyArr.splice(selectedFields.indexOf(field),1);
        setSelectedFields(copyArr);
      }else setSelectedFields([field,...selectedFields]);
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
           .then(() => notify({
             alertType:'success',
             body:`Successfully ${(isPublic) ? 'hid' : 'publicized'} ${uid}!`
           })).catch(err => notify({
             alertType:'error',
             body:err.toString()
           })).finally(() => setCurrentPublic(null));
      }
    }else{
      setCurrentPublic(uid);
    }
  }
  const headerConfig = [
    {label:"Actions",ref:["uid","isPublic"],sortable:false,transform:(ref,ref2) => (
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
    {label:"Title",ref:["title"],sortable:true},
    {label:"Slug",ref:["uid"],sortable:true},
    {label:"Author",ref:["author"],sortable:true},
    {label:"Tags",ref:["tags"],sortable:false,transform:arr => arr.join(",")},
    {label:"Last Published",ref:["lastPublish"],sortable:true,transform:date => dateify(date)},
    {label:"Date",ref:["date"],sortable:true,transform:date => dateify(date)},
    {label:"Public",ref:["isPublic"],sortable:true,transform:bool => bool.toString()},
    {label:"Series",ref:["series"],sortable:true}
  ];
  return (
    <React.Fragment>
      <Container>
        <Typography variant="h1" style={{...styles.title,fontSize:title}}>
          {(getPermissions(user) === 8) ?
            "My Posts"
          : (getPermissions(user) === 10) ?
            "All Posts"
          : "Posts"}
        </Typography>
      </Container>
      {(!error && postData) ? (
        <Container fixed style={styles.container}>
          <Grid container justify="center" alignItems="center">
            {fields.map((field,index) => (
              <Grid item key={`chip${index}`}>
                <Chip
                  style={(selectedFields.includes(field.label)) ? styles.chipSelected : styles.chipDeselected}
                  icon={field.icon((selectedFields.includes(field.label)) ? 'black' : 'white')}
                  label={field.label}
                  onClick={createFieldToggler(field.label)} />
              </Grid>
            ))}
          </Grid>
        </Container>
      ) : null}
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
            <DataTable defaultSort='title' selectedFields={selectedFields} headerConfig={headerConfig} data={postData} />
          ) : null}
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default withPageFade(UserPosts);
