import { defaultColors } from '../../../config/style';

export default {
  view: {
    borderBottomWidth: 1,
    borderBottomColor: defaultColors.bg.lightGrey
  },
  graidentContent: {},
  grid: {
    backgroundColor: defaultColors.bg.white,
    alignItems: 'center',
    padding: 15
  },
  gridRead: {
    backgroundColor: defaultColors.bg.whiteGrey
  },
  avatar: {
    width: 50
  },
  contentGrid: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: defaultColors.black
  },
  defaultText: {
    fontSize: 12,
    color: defaultColors.halfGrey,
    marginTop: 2,
    textAlign: 'right'
  }
};
