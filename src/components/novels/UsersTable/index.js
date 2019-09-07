import React , { useState } from 'react';

import * as MUI_COMPONENTS from './mui.js';

import DataTable from 'components/sentences/DataTable';

import withPageFade from 'components/bindings/wrappers/withPageFade';

import useRsConnect from 'components/bindings/hooks/useRsConnect';
import useTitleSize from 'components/bindings/hooks/useTitleSize';
import useNotify from 'components/bindings/hooks/useNotify';

import { firebase } from 'firebase.js';

const {
  Container, Typography,
  Paper, CircularProgress,
  IconButton, Grid, Chip,
  InputBase, Edit, Person,
  AssignmentInd, ColorLens, Check,
  KeyboardBackspace
} = MUI_COMPONENTS;

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

  },
  changePerms:{
    maxWidth:'30px',
    textAlign:'right',
    color:'rgba(0,0,0,.45)'
  }
}

const fields = [
  {field:'username',icon:(color) => <Person style={{...styles.chipIcon,color:color}} />,label:'Username'},
  {field:'permissions',icon:(color) => <AssignmentInd style={{...styles.chipIcon,color:color}} />,label:'Permissions'},
  {field:'color',icon:(color) => <ColorLens style={{...styles.chipIcon,color:color}} />,label:'Color'}
];

const checkParseInt = str => !Number.isNaN(parseInt(str,10));
const getPerms = (users,uid) => users.find(user => user.uid === uid).permissions.value.toString();
const permsHaveChanged = (currentPermsText,users,uid) => parseInt(currentPermsText,10) !== parseInt(getPerms(users,uid),10);
const validPermissions = permsStr => {
  if(!checkParseInt(permsStr)) return false;
  else{
    const int = parseInt(permsStr,10);
    return int >= 1 && int <= 10;
  }
}

function UsersTable(props){
  const { isLoading , users , error , user } = useRsConnect('title');
  const [selectedFields,setSelectedFields] = useState(["Username","Permissions"]);
  const [currentPermsEdit,setCurrentPermsEdit] = useState(null);
  const [currentPermsText,setCurrentPermsText] = useState("");
  const notify = useNotify({
    alertType:'success',
    timeout:4500
  });
  const { h1:title } = useTitleSize();
  const createFieldToggler = field => {
    return () => {
      if(selectedFields.includes(field)){
        const copyArr = [...selectedFields];
        copyArr.splice(selectedFields.indexOf(field),1);
        setSelectedFields(copyArr);
      }else setSelectedFields([field,...selectedFields]);
    }
  }
  const handlePermsEditToggle = uid => {
    if(currentPermsEdit === null){
      setCurrentPermsEdit(uid);
      setCurrentPermsText(getPerms(users,uid));
    }else{
      setCurrentPermsEdit(null);
    }
  }
  const handleCommitPermsChange = uid => {
    if(currentPermsEdit === uid){
      if(currentPermsText === ""){
        setCurrentPermsEdit(null);
      }else{
        if(permsHaveChanged(currentPermsText,users,uid) && validPermissions(currentPermsText)){
          const db = firebase.firestore();
          const user = db.collection("users").doc(uid);
          user.update({
            permissions:{
              value:parseInt(currentPermsText,10)
            }
          }).then(() => notify({
            body:`Successfully updated user with uid: ${uid}`
          })).catch(err => notify({
            alertType:'error',
            body:err.toString()
          })).finally(setCurrentPermsEdit(null));
        }
      }

    }
  }
  const handlePermsTextChange = evt => {
    if(checkParseInt(evt.target.value) || evt.target.value === ""){
      setCurrentPermsText(evt.target.value);
    }
  }
  const headerConfig = [
    {label:"Username",ref:["username"],sortable:true},
    {label:"Permissions",deepAccessor:obj => obj.value,ref:["permissions","uid"],sortable:true,transform:(perms,uid) => {
      if(currentPermsEdit === uid){
        return (
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
              <InputBase style={styles.changePerms} onChange={handlePermsTextChange} value={currentPermsText} />
            </Grid>
            <Grid item>
              {(permsHaveChanged(currentPermsText,users,uid)) ? (
                <IconButton
                  onClick={() => handleCommitPermsChange(uid)}
                  disabled={!validPermissions(currentPermsText)}>
                  {(validPermissions(currentPermsText)) ?
                    <Check style={{color:'#58E855'}} />
                  : <KeyboardBackspace style={{color:'#E84040'}} />}
                </IconButton>
              ) : (
                <IconButton onClick={() => handlePermsEditToggle(uid)}>
                  <KeyboardBackspace />
                </IconButton>
              )}
            </Grid>
          </Grid>
        );
      }else{
        if(uid !== user.activeUser.uid && uid !== 'C7VXSRpoFcQvEp8kVC0EUrr0FkY2'){
          return (
            <Grid container direction="row" justify="center" alignItems="center">
              <Grid item>
                {perms.value}
              </Grid>
              <Grid item>
                <IconButton onClick={() => handlePermsEditToggle(uid)}>
                  <Edit />
                </IconButton>
              </Grid>
            </Grid>
          );
        }else{
          return perms.value;
        }
      }
    }},
    {label:"Color",ref:["color"],sortable:false,transform:color => (
      <ColorLens style={{color:color}} />
    )}
  ];
  return (
    <React.Fragment>
      <Container>
        <Typography variant="h1" style={{...styles.title,fontSize:title}}>
          Users
        </Typography>
      </Container>
      {(!error && users) ? (
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
          {(!error && users && users.length === 0) ? (
            <Typography variant="h5" style={styles.notFound}>
              No users in database!
            </Typography>
          ) : null}
          {(!error && users && users.length > 0) ? (
            <DataTable defaultSort='username' selectedFields={selectedFields} headerConfig={headerConfig} data={users} />
          ) : null}
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default withPageFade(UsersTable);
