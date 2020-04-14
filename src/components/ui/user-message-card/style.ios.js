import { defaultColors } from '../../../config/style';

export default {
  view: {
    borderRadius: 18,
    marginBottom: 15
  },
  activeView: {
    backgroundColor: defaultColors.bg.dblLightGrey,
    borderWidth: 1,
    borderColor: defaultColors.bg.borderLightGrey
  },
  grid: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 8
  },
  avatar: {
    width: 50
  },
  contentGrid: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 11,
    color: defaultColors.grey
  },
  message: {
    fontSize: 12,
    color: defaultColors.darkGrey,
    marginTop: 4
  },
  messageActive: {
    fontWeight: '600'
  },
  badge: {
    backgroundColor: defaultColors.blue,
    height: 23,
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 1,
    paddingBottom: 1,
    alignSelf: 'flex-end'
  },
  count: {
    fontSize: 13,
    lineHeight: 16
  },
  icon: {
    fontSize: 16,
    color: defaultColors.grey,
    alignSelf: 'flex-end'
  }
};
