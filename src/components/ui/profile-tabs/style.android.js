import { defaultColors } from '../../../config/style';

export default {
  tabs: {
    width: '100%',
    height: 80,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#fff',
    flexDirection: 'row',
    overflow: 'hidden'
  },
  tab: {
    width: '33.333333%',
    flex: 1,
    justifyContent: 'space-around'
  },
  tabNumber: {
    color: defaultColors.white,
    fontWeight: '800',
    fontSize: 18,
    textAlign: 'center'
  },
  tabText: {
    color: defaultColors.white,
    fontSize: 14,
    textAlign: 'center'
  },
  darkTabs: {
    borderColor: defaultColors.bg.lightGrey
  },
  darkTabNumber: {
    color: defaultColors.dark
  },
  darkTabText: {
    color: defaultColors.dark
  },
  activeTabBorder: {
    position: 'absolute',
    bottom: -10,
    left: '15%',
    height: 3,
    width: '70%',
    borderTopRightRadius: 10,
    borderTopStartRadius: 10
  }
};
