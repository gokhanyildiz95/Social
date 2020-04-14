import User from '../components/pages/user/';
import { connect } from 'react-redux';
import { setUserInfo, userSignOut } from '../store/actions/user';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  setUserInfo,
  userSignOut
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
