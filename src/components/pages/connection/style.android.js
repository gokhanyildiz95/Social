import { defaultColors } from '../../../config/style';

export default {
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    height: 70,
    paddingTop: 40,
    elevation: 0
  },
  headerGrid: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15
  },
  headerGridCol: {
    flex: 1,
    flexDirection: 'row'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  headerLastCol: {
    alignItems: 'flex-end'
  },
  scrollTab: {
    backgroundColor: defaultColors.bg.white,
    borderBottomColor: defaultColors.bg.whiteGrey,
    borderBottomWidth: 2,
    height: 40,
    justifyContent: 'flex-start',
    marginTop: 15
  },
  scrollTabsContainer: {
    marginLeft: 15,
    marginBottom: 0,
    justifyContent: 'flex-start'
  },
  tabContent: {},
  firstTab: {},
  tab: {
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 0,
    paddingRight: 0,
    minWidth: 0,
    backgroundColor: defaultColors.bg.white
  },
  firstActiveTab: {},
  activeTab: {
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 0,
    paddingRight: 0,
    minWidth: 0,
    backgroundColor: defaultColors.bg.white
  },
  tabText: {
    marginLeft: 0,
    marginRight: 0,
    color: defaultColors.grey,
    fontWeight: '500',
    fontSize: 14
  },
  activeTabText: {
    marginLeft: 0,
    marginRight: 0,
    color: defaultColors.black,
    fontWeight: '500',
    fontSize: 14
  },
  tabBarUnderline: {
    backgroundColor: defaultColors.bg.blue,
    zIndex: 5,
    bottom: 0,
    height: 2
  },
  tabUnderline: {
    backgroundColor: defaultColors.bg.blue,
    height: 2
  },
  scrollView: {
    flex: 1,
    margin:10
  },
  scrollViewContent: {
    marginBottom: 15
  }
};
