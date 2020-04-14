import { connect } from 'react-redux';

import Loading from '../components/pages/intro/';
import { setUserInfo } from '../store/actions/user';
import { setNotifications } from '../store/actions/notification';

const mapStateToProps = state => {
  return {
    navigationState: state.navigation,
    notification: state.notification,
    user: state.user,
    system: state.system
  };
};

const mapDispatchToProps = {
  setUserInfo,
  setNotifications
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loading);
