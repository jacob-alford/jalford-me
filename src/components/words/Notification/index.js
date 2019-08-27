import React , { useState , useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSpring , animated as a } from 'react-spring';
import { SnackbarContent , IconButton } from '@material-ui/core/';
import {
  CheckCircle, Error,
  Info, Close,
  Warning
} from '@material-ui/icons/';

const variantIcon = {
  error: Error,
  warning: Warning,
  info: Info,
  success: CheckCircle
}

const colors = {
  "error":"#d32f2f",
  "warning":"#ffa000",
  "info":"#1976d2",
  "success":"#43a047"
}

const styles = variant => {
  return {
    snackbar:{
      backgroundColor:colors[variant]
    },
    icon:{
      fontSize:20,
      opacity:.9,
      marginRight:'14px'
    },
    progress:{
      display:'block',
      height:'4px',
      marginTop:'-4px',
      borderRadius:'4px'
    },
    message:{
      display:'flex',
      alignItems:'center'
    }
  }
}

const toGradStr = arr => `linear-gradient(to right, ${arr.join(", ")})`;

export default function Notification(props){
  const [shouldUnmount,setShouldUnmount] = useState(false);
  const {
    body, alertType,
    timeout, timeoutColor,
    closeAlert
  } = props;
  const { width , opacity } = useSpring({
    width:"100%",
    opacity:.5,
    from:{
      width:`0%`,
      opacity:1
    },
    config:{
      duration:timeout
    },
    onRest:() => setShouldUnmount(true)
  });
  const Badge = variantIcon[alertType];
  useEffect(() => {
    if(shouldUnmount)
      closeAlert();
  },[shouldUnmount,closeAlert]);
  return (
    <React.Fragment>
      <SnackbarContent
        style={styles(alertType).snackbar}
        aria-describedby="client-snackbar"
        message={
          <span style={styles(alertType).message}>
            <Badge style={styles(alertType).icon} />
            {body}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            style={{color:'white'}}
            onClick={closeAlert}>
            <Close style={styles(alertType).icon} />
          </IconButton>
        ]}/>
        <a.div
          style={{
            ...styles(alertType).progress,
            background:toGradStr(timeoutColor),
            width, opacity
          }}>
        </a.div>
    </React.Fragment>
  );
}

Notification.propTypes = {
  body:PropTypes.string,
  alertType:PropTypes.oneOf(["error","warning","info","success"]),
  timeout:PropTypes.number,
  timeoutColor:PropTypes.arrayOf(PropTypes.string),
  closeAlert:PropTypes.func
}
