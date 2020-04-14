import { defaultColors } from '../../../config/style';

export default {
  markerContent: {
    flex: 1,
    alignItems: 'center'
  },
  markerMan: {
    backgroundColor: defaultColors.bg.white,
    borderWidth: 2  ,
    borderColor: defaultColors.bg.markerBlue,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
    height: 20
  },
  markerWoman: {
    backgroundColor: defaultColors.bg.white,
    borderWidth: 2,
    borderColor: defaultColors.bg.pink,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
    height: 20
  },
  arrow: {
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: defaultColors.bg.markerBlue,
    width: 0
  },
  text: {
    fontSize: 12,
    lineHeight: 16,
  }
};
