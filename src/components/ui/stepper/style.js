import { defaultColors } from '../../../config/style';

export default {
  progressGhostBorder: {
    height: 3,
    flexDirection: 'row',
    backgroundColor: '#f1f1f1'
  },
  progressBorder: {
    height: 3,
    flex: 0.3,
    backgroundColor: defaultColors.bg.blue
  },
  indicatorContent: {
    marginTop: -13
  },
  indicatorCol: {
    alignItems: 'flex-end'
  },
  indicator: {
    borderRadius: 25,
    backgroundColor: defaultColors.bg.lightGrey,
    width: 25,
    height: 25,
    justifyContent: 'center'
  },
  indicatorFinished: {
    backgroundColor: defaultColors.bg.blue
  },
  indicatorText: {
    color: '#fff',
    textAlign: 'center'
  },

  customStyles: {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 25,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: defaultColors.bg.blue,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: defaultColors.bg.blue,
    stepStrokeUnFinishedColor: defaultColors.bg.lightGrey,
    separatorFinishedColor: defaultColors.bg.blue,
    separatorUnFinishedColor: defaultColors.bg.lightGrey,
    stepIndicatorFinishedColor: defaultColors.bg.blue,
    stepIndicatorUnFinishedColor: defaultColors.bg.lightGrey,
    stepIndicatorCurrentColor: defaultColors.bg.blue,
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fff',
    stepIndicatorLabelFinishedColor: '#fff',
    stepIndicatorLabelUnFinishedColor: '#fff',
    labelColor: '#E6E6E6',
    labelSize: 0.01,
    currentStepLabelColor: '#fe7013'
  }
};
