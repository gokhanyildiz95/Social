import { defaultColors } from '../../../config/style';

export default {
  view: {
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3
  },
  graidentContent: {
    borderRadius: 8,
    marginBottom: 15
  },
  grid: {
    backgroundColor: defaultColors.bg.white,
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
    fontSize: 16,
    fontWeight: '600',
    color: defaultColors.black
  },
  slug: {
    fontSize: 12,
    color: defaultColors.black,
    marginTop: 2
  },
  range: {
    marginTop:5,
    fontSize: 11,
    color: defaultColors.blue
  }
};
