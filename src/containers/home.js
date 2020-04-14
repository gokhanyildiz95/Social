import Intro from '../components/pages/home/';
import { connect } from 'react-redux';
import { userSignIn } from '../store/actions/user';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  userSignIn
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Intro);
