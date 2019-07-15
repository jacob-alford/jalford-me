import { connect } from 'react-redux';
import { setLoggedIn } from '../../redux/user/actions.js';

function mapDispatchToProps(dispatch){
  return {
    login:user => dispatch(setLoggedIn(user)),
    dispatch
  }
}

export default function withLogin(WrappedComponent){
  return connect(null,mapDispatchToProps)(WrappedComponent);
}
