import ChangeName from '../components/pages/setting/name';
import { connect } from 'react-redux';
import { setSetting,setUserInfo } from '../store/actions/user';

 const mapStateToProps = state => {
    return {
      user: state.user,
    };
  };
  
  const mapDispatchToProps = {
    setUserInfo,
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChangeName);
  