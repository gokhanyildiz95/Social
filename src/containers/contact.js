import Contact from '../components/pages/contact/';
import { connect } from 'react-redux';

 const mapStateToProps = state => {
    return {
      user: state.user
    };
  };
  
  export default connect(
    mapStateToProps,
  )(Contact);
  