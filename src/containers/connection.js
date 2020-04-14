import Connection from '../components/pages/connection/';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { setUserInfo } from '../store/actions/user';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  setUserInfo
};

export default connect(mapStateToProps,mapDispatchToProps)(withNavigationFocus(Connection));
