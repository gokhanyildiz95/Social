import Setting from '../components/pages/setting/';
import { connect } from 'react-redux';
import { setSetting,setUserInfo } from '../store/actions/user';

 const mapStateToProps = state => {
    return {
      user: state.user,
      setting:state.user.setting
    };
  };
  
  const mapDispatchToProps = {
    setUserInfo,
    setSetting
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Setting);
  