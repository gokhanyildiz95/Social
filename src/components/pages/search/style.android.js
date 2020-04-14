import { defaultColors } from '../../../config/style';

export default {
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    height: 70,
    paddingTop: 40
  },
  headerGrid: {
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 15
  },
  headerGridCol: {
    flex: 1,
    flexDirection: 'row'
  },
  activeNotificationIcon: {
    color: defaultColors.bg.orange
  },
  pinIcon: {
    fontSize: 20,
    marginRight: 5
  },
  location: {
    fontSize: 13
  },
  inputDotImage: {
    width: '100%',
    height: 1,
    marginTop: 2
  },
  headerLastCol: {
    alignItems: 'flex-end'
  },
  mapIcon: {
    fontSize: 20,
    marginRight: 4,
    marginTop: -5
  },
  menuIconContent: {
    flex: 1,
    alignItems: 'center',
    width: 24
  },
  menuIconLine: {
    width: '100%',
    height: 2,
    marginBottom: 4,
    backgroundColor: defaultColors.bg.halfGrey
  },
  scrollTab: {
    backgroundColor: defaultColors.bg.white,
    borderBottomColor: defaultColors.bg.lightGrey,
    borderBottomWidth: 2,
    height: 40,
    justifyContent: 'flex-start'
  },
  scrollTabsContainer: {
    marginLeft: 15,
    // marginBottom: -2,
    marginBottom: 0,
    justifyContent: 'flex-start'
  },
  tabContent: {},
  tab: {
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 0,
    paddingRight: 0,
    minWidth: 0,
    backgroundColor: defaultColors.bg.white
  },
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
    fontWeight: '500'
  },
  activeTabText: {
    marginLeft: 0,
    marginRight: 0,
    color: defaultColors.black,
    fontWeight: '500'
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
    backgroundColor: '#fdfdfd'
  },
  scrollViewContent: {
    padding: 15
  },
  warningText: {
    color: defaultColors.black,
    textAlign: 'center'
  },
  touchableHighlight: {
    padding: 20,
    margin: -20
  },
  searchContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInputContainer: {
    width: '80%'
  },
  searchInputContent: {
    zIndex: 1,
    height: 60,
    borderRadius: 60
  },
  searchInput: {
    borderRadius: 60,
    paddingRight: 0,
    paddingLeft: 30,
    fontSize: 16
  },
  searchButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
    shadowOpacity: 0,
    elevation: 9,
    paddingLeft: 15,
    paddingRight: 15,
    width: 60,
    height: 60
  },
  searchButtonIcon: {
    color: defaultColors.darkGrey,
    fontSize: 18,
    lineHeight: 58,
    marginLeft: 10,
    marginRight: 0,
    paddingTop: 0
  },
  listContainer: {
    flex: 1
  },
  searchResultTextContent: {
    height: 50
  },
  searchResultText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  searchResultTextRemoveIconContent: {
    backgroundColor: defaultColors.darkGrey,
    height: 20,
    width: 20,
    borderRadius: 20
  },
  searchResultTextRemoveIcon: {
    color: defaultColors.white,
    height: 20,
    width: 20,
    fontSize: 20,
    textAlign: 'center'
  }
};
