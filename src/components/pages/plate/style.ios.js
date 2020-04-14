import { defaultColors } from '../../../config/style';

export default {
  header: {
    backgroundColor: '#fff',
    height: 80,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: defaultColors.bg.lightGrey
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
  headerGridColLast: {
    justifyContent: 'flex-end'
  },
  backIcon: {
    fontSize: 20
  },
  addIcon: {
    fontSize: 20
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14
  }
};
