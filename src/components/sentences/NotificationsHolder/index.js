import React from 'react';
import { useTransition , animated as a } from 'react-spring';

import Notification from 'components/words/Notification';

import useNotifications from 'components/bindings/hooks/useNotifications';

const styles = {
  container:{
    position:'fixed',
    width:'320px',
    paddingLeft:'14px',
    top:'14px',
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center',
    zIndex:1301
  },
  notification:{
    marginBottom:'14px'
  }
}

export default function NotificationsHolder(){
  const { notifications:notifsDetails , removeNotification } = useNotifications();
  const notifications = useTransition(notifsDetails,item => item.uid,{
    from: {transform: `translate3d(-350px,0,0)`,opacity:1},
    enter: {transform: `translate3d(0,0,0)`,opacity:1},
    leave: {transform: `translate3d(0,0,0)`,opacity:0},
    config: {
      unique:true,
      reset:true
    }
  });
  return (
    <div style={styles.container}>
      {notifications.map(notification => {
        const { item , props:newStyles , key } = notification;
        const {
          body, alertType,
          timeout, timeoutColor,
          uid
        } = item;
        return (
          <a.div
            key={key}
            style={{
              ...newStyles,
              ...styles.notification
            }}>
            <Notification
              body={body}
              alertType={alertType}
              timeout={timeout}
              timeoutColor={timeoutColor}
              closeAlert={() => removeNotification(uid)} />
          </a.div>
        );
      })}
    </div>
  );
}
