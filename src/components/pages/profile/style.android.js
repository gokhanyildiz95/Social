import { defaultColors, shadow } from '../../../config/style';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
export default {
  header: {
    justifyContent: 'flex-end',
    borderBottomWidth: 0,
    backgroundColor: 'transparent',
    paddingRight: 30
  },
  headerGridContent: {
    width: '100%',
    height: 20,
    flex: 0,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backButton: {},
  backIcon: {
    color: defaultColors.white,
    fontSize: 20
  },
  headerTitle: {
    color: defaultColors.white,
    textAlign: 'center',
    fontSize: 17
  },
  moreIconTouchableHighlight: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 20,
    top: 40,
    zIndex: 9
  },
  backIconTouchableHighlight: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 290,
    top: 50,
    //zIndex: 9
  },
  avatarContent: {
    flex: 1,
    width: '100%',
    height: '100%',
     paddingTop: height > 600 ? 30 : 40,
    ...shadow,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 5
    }
  },
  avatarContentView: {
    flex: 1,
    marginTop: 100,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  avatarContentViewLocked: {
    flex: 1,
    marginBottom: 90,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  avatarContentViewCenter: {
    padding: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarContentViewBetween: {
    padding: 25,
    paddingBottom: 50,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  avatarContentViewCenterLocked: {
    padding: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarContentViewBetweenLocked: {
    padding: 25,
    paddingBottom: 50,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  title: {
    marginTop: 20,
    marginBottom: 5,
    fontSize: 22,
    fontWeight: '600',
    color: defaultColors.white
  },
  subTitle: {
    fontSize: 13,
    fontWeight: '300',
    color: defaultColors.white
  },
  containerButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonView: {
    height: 50,
    width: '40%',
    marginTop: 25,
    marginBottom: 10

  },
  messageButtonView: {
    marginTop: 35,
    marginBottom: 0
  },
  buttonText: {
    fontSize: 15,
    textAlign: 'center'
  },
  tabContent: {
    padding: 25,
    paddingBottom: 0
  },
  lockedArea: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  lockIcon: {
    color: defaultColors.grey,
    fontSize: 22
  },
  lockText: {
    color: defaultColors.grey,
    fontSize: 13,
    marginTop: 10
  },
  listContent: {
    flexDirection: 'column'
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flex: 1,
    padding: 15,
    paddingTop: 5
  },
  avatarCarouselContent: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  avatarCarouselContentLocked: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  avatarIcons: {
    fontSize: 16,
    color: defaultColors.grey,
    marginLeft: 10,
    marginRight: 10
  },
  avatarIconsGreen: {
    fontSize: 16,
    color: defaultColors.green,
    marginLeft: 10,
    marginRight: 10
  },
  avatarIconLeft: {},
  avatarIconRight: {
    fontSize: 20
  },
  profileAddArea: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 40,
    paddingTop: 20,
    paddingBottom: 20
  },
  profileButtonText: {
    fontSize: 14,
    fontWeight: '400'
  },
  profileButtonContinueText: {
    fontSize: 14,
    fontWeight: '600'
  },
  profileButtonTextGrey: {
    fontSize: 14,
    fontWeight: '400',
    color: defaultColors.grey
  },
  profileButtonIcon: {
    fontSize: 16,
    width: 50,
    textAlign: 'center',
    left: 20
  },
  otherInputContent: {
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  otherInputIconContent: {
    width: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  otherInputIcon: {
    fontSize: 20,
    color: defaultColors.grey
  },
  otherInputText: {
    fontSize: 14
  },
  otherInput: {
    fontSize: 12,
    color: defaultColors.grey,
    marginTop: 2
  },
  reasonText: {
    color: defaultColors.white,
    marginBottom: 20,
    fontSize: 14
  }
};
