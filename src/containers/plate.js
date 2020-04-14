import Plate from '../components/pages/plate/';
import { connect } from 'react-redux';
import { setUserPlates } from '../store/actions/user';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  setUserPlates
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Plate);
