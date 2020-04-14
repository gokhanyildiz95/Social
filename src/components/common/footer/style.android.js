import { Dimensions } from 'react-native';
import { defaultColors } from '../../../config/style';

const { width } = Dimensions.get('window');
export default {
  button: {
    flex: 1,
    width: width / 3,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    elevation: 0,
  },
  activeText: {
    color: defaultColors.orange
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    
  },
  contentColors: ["#fff", "#fff"],
  footer: {
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.58,
shadowRadius: 16.00,

elevation: 24,
    
  },
  defaultColor:{
    color:"#212121"
  }
};
