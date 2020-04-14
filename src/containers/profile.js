import Profile from '../components/pages/profile/';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Profile);
