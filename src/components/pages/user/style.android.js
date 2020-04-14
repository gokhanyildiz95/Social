import { defaultColors, shadow } from '../../../config/style';

export default {
  moreIconTouchableHighlight: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 20,
    top: 40
  },
  moreIcon: {
    justifyContent: 'flex-end',
    textAlign: 'right',
    color: defaultColors.dark,
    transform: [
      {
        rotate: '90deg'
      }
    ]
  },
  touchableHighlight: {
    width: 50,
    justifyContent: 'flex-end'
  },
  avatarContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    ...shadow,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 5
    }
  },
  title: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 22,
    fontWeight: '600'
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: defaultColors.black
  },
  settingsList: {
    paddingTop: 10
  },
  listItem: {
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 20,
    paddingBottom: 20
  },
  listItemFirstCol: {
    width: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  settingIcon: {
    fontSize: 15,
    color: defaultColors.halfGrey
  },
  settingTitle: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '500',
    alignSelf: 'flex-start',
    color: defaultColors.darkGrey
  },
  settingSubTitle: {
    fontSize: 12,
    fontWeight: '400',
    color: defaultColors.halfGrey,
    alignSelf: 'flex-start'
  },
  rightIcon: {
    fontSize: 15,
    color: defaultColors.halfGrey
  }
};
