import Register from '../components/pages/register/';
import { connect } from 'react-redux';
import { userSignUp } from '../store/actions/user';
import { getCity } from '../store/actions/city';

const mapStateToProps = state => {
  return {
    user: state.user,
    city: state.city,
    location: state.location
  };
};

const mapDispatchToProps = {
  getCity,
  userSignUp
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
