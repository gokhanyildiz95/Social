import Privacy from '../components/pages/privacy/';
import { connect } from 'react-redux';

 const mapStateToProps = state => {
    return {
      user: state.user
    };
  };
  
  export default connect(
    mapStateToProps,
  )(Privacy);
  