import { connect } from 'react-redux';

function mapStateToProps(state){
  const { user } = state;
  return {
    user:user
  }
}

export default function withUser(WrappedComponent){
  return connect(mapStateToProps)(WrappedComponent);
}
