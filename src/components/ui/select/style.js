import { Dimensions } from 'react-native';
import { defaultColors } from '../../../config/style';

const { width, height } = Dimensions.get('window');

export default {
  text: {
    color: defaultColors.grey,
    fontWeight: '400',
    fontSize: 18
  },
  listItemTouchableHighlight: {
    flex: 1,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 15,
    marginRight: 15,
    borderBottomWidth: 1,
    borderBottomColor: defaultColors.bg.borderLightGrey
  },
  // Modal
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    width: width * 0.8,
    backgroundColor: defaultColors.bg.white,
    borderRadius: 8
  },
  modalList: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingRight: 15
  },
  modalCloseButton: {
    backgroundColor: '#f1f1f1',
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderColor: '#f1f1f1',
    elevation: 0
  },
  modalCloseButtonIcon: {
    fontSize: 30,
    color: '#333'
  },
  modalCloseButtonText: {
    paddingLeft: 10,
    color: '#333'
  },
  modalScrollView: {
    maxHeight: height * 0.6
  }
};
