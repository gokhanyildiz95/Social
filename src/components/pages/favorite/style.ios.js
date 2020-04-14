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
  backIcon: {
    fontSize: 20
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14
  },
  listContent: {
    paddingTop: 15
  },
  userCard: {
    marginLeft: 15,
    marginRight: 15
  }
};
