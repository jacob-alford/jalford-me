import React from 'react';
import useReactRouter from 'use-react-router';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy as codeTheme } from 'react-syntax-highlighter/dist/esm/styles/prism';

import {
  Typography, Paper, Table,
  TableHead, TableBody, TableRow,
  TableCell, List, ListItem,
  ListItemText, Link, ListItemIcon
 } from '@material-ui/core/';
import { CheckCircleOutline , RadioButtonUnchecked } from '@material-ui/icons';

import AdaptiveHeading from '../components/words/AdaptiveHeading';
import Image from '../components/words/Image';

 const getInnermostProps = props => {
   if(typeof props.children === "string" || typeof props.value === "string")
     return props;
   else
     return (props.children
         && props.children[0]
         && props.children[0].props) ?
         props.children.map(child => getInnermostProps(child.props))
       : false;
 }

 const getDepthIcon = depth => {
   return {
     __html:(!Number.isNaN(depth)) ?
       ["&#9823;","&#9822;","&#9821;","&#9820;","&#9819;"][(depth <= 4) ? depth : 4]
     : null
   }
 }

 const getDeepQuote = child => {
  if(typeof child.value === 'string') return child.value;
  else if(Array.isArray(child))
    return child.map(subChild => getDeepQuote(subChild));
  else return null;
 }

 const styles = {
   link:{
     cursor:'pointer'
   },
   blockquote:{
     marginLeft:'4px',
     fontSize:'20px',
     fontWeight:'300',
     borderLeft:'4px solid #DDD',
     borderColor: '#69BEEF',
     color: 'rgba(0,0,0,.8)',
     padding: '0 15px'
   },
   codePaper:{
     maxWidth:'100%',
     overflowX:'auto',
     marginTop:'8px',
     marginBottom:'8px',
     paddingTop:'14px',
     paddingLeft:'14px',
     paddingRight:'14px',
     paddingBottom:'-2px'
   },
   blogImage:{
     boxShadow:'0px 0px 77px -32px rgba(0,0,0,0.75)',
     display:'block',
     maxWidth:'100%',
     marginLeft:'auto',
     marginRight:'auto'
   },
   inlineCode:{
     color:"#AD463F"
   },
   tablePaper:{
     marginTop:'8px',
     marginBottom:'8px'
   },
   h1:{

   }
 }

 const InBlogLink = props => {
   const { history } = useReactRouter();
   const { href } = props;
   const handleClick = () => {
     if(href.includes("http"))
       window.location.href = href;
     else history.push(href);
   }
   return (
     <Link style={styles.link} onClick={handleClick} key={props.key}>
       {props.children}
     </Link>
   );
 }

 const Blockquote = props => {
   const { quoteArr } = props;
   return (
     <React.Fragment>
      {(Array.isArray(quoteArr)) ?
        quoteArr.map((quote,index) => (
          <span key={`blockQuote${index}-${parseInt(Math.random()*255,16)}`}>
           {quote} <br />
          </span>
        ))
      : (quoteArr) ?
        quoteArr
      : null
      }
     </React.Fragment>
   )
 }

 const markdownConfig = {
  "blockquote":props => {
    return (
      <Typography paragraph variant="body1" style={styles.blockquote}>
        <Blockquote quoteArr={getDeepQuote(getInnermostProps(props))} />
      </Typography>
    );
  },
  "code":props => {
    const { language , value } = props;
    return (
      <Paper elevation={2} style={styles.codePaper}>
        <SyntaxHighlighter
          children={value}
          customStyle={{margin:0}}
          language={language}
          showLineNumbers={true}
          style={codeTheme} />
      </Paper>
    );
  },
  "heading":props => (
    <AdaptiveHeading level={props.level}>
      {props.children}
    </AdaptiveHeading>
  ),
  "image":props => (
    <span>
      <Image naked scrollFade imageStyles={styles.blogImage} alt={props.alt} src={props.src}/>
    </span>
  ),
  "inlineCode":props => (
      <code style={styles.inlineCode}>
        {props.value}
      </code>
  ),
  "link":InBlogLink,
  "paragraph":props => (
    <Typography paragraph variant="body1">
      {props.children}
    </Typography>
  ),
  "table":props => (
    <Paper elevation={2} style={styles.tablePaper}>
      <Table>
        {props.children}
      </Table>
    </Paper>
  ),
  "tableHead":props => (
    <TableHead>
      {props.children}
    </TableHead>
  ),
  "tableBody":props => (
    <TableBody>
      {props.children}
    </TableBody>
  ),
  "tableRow":props => (
    <TableRow>
      {props.children}
    </TableRow>
  ),
  "tableCell":props => (
    <TableCell children={props.children} />
  ),
  "list":props => {
    const checklistIndecies = props.children.map(child => child.props.checked);
    return (
      <List>
        {props.children.map((child,index) => {
          return React.cloneElement(
            child,
            {depth:props.depth,isChecklistItem:!checklistIndecies.includes(null)}
          );
        })}
      </List>
    );
  },
  "listItem":props => {
    if(props.isChecklistItem)
      return (
        <ListItem>
          <ListItemIcon style={{minWidth:0,marginRight:'14px'}}>
            {(props.checked) ? (
              <CheckCircleOutline />
            ) : (
              <RadioButtonUnchecked />
            )}
          </ListItemIcon>
          <ListItemText>
            {props.children}
          </ListItemText>
        </ListItem>
      );
    else if(props.ordered)
      return (
        <ListItem>
          <ListItemText>
            <span style={{marginRight:'14px'}}>
              {props.index + 1}.
            </span>
            {props.children}
          </ListItemText>
        </ListItem>
      );

    else
      return (
        <ListItem>
          <ListItemText>
            <span style={{marginRight:'14px'}} dangerouslySetInnerHTML={getDepthIcon(props.depth)} />
            {props.children}
          </ListItemText>
        </ListItem>
      );
  }
}

export default markdownConfig;
