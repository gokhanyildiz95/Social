import Login from '../components/pages/login/';
import { connect } from 'react-redux';
import { clearUserSignInError, userSignIn } from '../store/actions/user';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  clearUserSignInError,
  userSignIn
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
