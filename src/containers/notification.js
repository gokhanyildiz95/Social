import Notification from '../components/pages/notification/';
import { connect } from 'react-redux';
import { clearUserSignInError, userSignIn } from '../store/actions/user';
import {
  setReadNotification,
  setNotifications,
  setDeleteNotification
} from '../store/actions/notification';

const mapStateToProps = state => {
  return {
    user: state.user,
    notification: state.notification
  };
};

const mapDispatchToProps = {
  clearUserSignInError,
  userSignIn,
  setNotifications,
  setReadNotification,
  setDeleteNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
