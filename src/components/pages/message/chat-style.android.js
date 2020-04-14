import { defaultColors } from '../../../config/style';

export default {
  headerContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    zIndex: 3
  },
  header: {
    backgroundColor: '#fff',
    height: 90,
    paddingTop: 40,
    borderBottomColor: '#f3e8e3',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 3
  },
  headerGrid: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15
  },
  headerGridCol: {},
  title: {
    fontSize: 16,
    textAlign: 'center',
    color: defaultColors.black
    //darkgrey 
  },
  headerGridFirstCol: {},
  headerGridLastCol: {
    alignItems: 'flex-end'
  },
  backButton: {
    fontSize: 30,
    lineHeight: 26,
    color: defaultColors.darkGrey
  },
  navIcon: {
    width: 30,
    textAlign: 'right',
    fontSize: 16,
    lineHeight: 26,
    color: defaultColors.darkGrey
  },
  content: {
    flex: 1,
    backgroundColor: defaultColors.bg.white,
    elevation: 4,
    zIndex: 2
  },
  // Footer
  footer: {
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: defaultColors.bg.white,
    borderTopColor: defaultColors.bg.white
  },
  footerGrid: {
    marginLeft: 15,
    marginRight: 15
  },
  footerGridCol: {},
  footerGridFirstCol: {},
  footerGridLastCol: {
    alignItems: 'flex-end'
  },
  blockText: {
    color: defaultColors.white
  },
  plusButton: {
    marginTop:10,
    width: 32,
    height: 20
  },
  plusIcon: {
    color: defaultColors.white,
    marginLeft: 0,
    marginRight: 0,
    right: 6,
    top: 1,
    fontWeight: 'bold'
  },
  sendIcon: {
    fontSize: 28,
    marginTop:15,
    color: defaultColors.orange
  },
  messageInputContent: {
    borderRadius: 5,
    minHeight: 20,
    color:'black'
  },
  messageInput: {
    backgroundColor: defaultColors.bg.white,
    color: defaultColors.bg.darkGrey,
    borderRadius: 0,
    margin: 0,
    paddingLeft: 0
  }
};
