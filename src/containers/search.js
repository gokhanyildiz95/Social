import Search from '../components/pages/search/';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';

const mapStateToProps = state => {
  return {
    notification: state.notification,
    location: state.location,
    user: state.user
  };
};

export default connect(mapStateToProps)(withNavigationFocus(Search));
