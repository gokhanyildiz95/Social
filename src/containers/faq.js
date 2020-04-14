import FAQ from '../components/pages/faq/';
import { connect } from 'react-redux';

 const mapStateToProps = state => {
    return {
      user: state.user
    };
  };
  
  export default connect(
    mapStateToProps,
  )(FAQ);
  