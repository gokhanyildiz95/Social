import Message from '../components/pages/message/';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(withNavigationFocus(Message));
