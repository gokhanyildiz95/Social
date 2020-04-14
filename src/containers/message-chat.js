import Chat from '../components/pages/message/chat';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Chat);
