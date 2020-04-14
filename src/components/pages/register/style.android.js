import { Dimensions } from 'react-native';
// import { defaultColors } from "../../../config/style";

const { width, height } = Dimensions.get('window');
const formCarouselHeight = height * 0.65 - 150;

export default {
  bg: {
    // flex: 1,
    width: '100%',
    height: '100%',
    // height: height * 0.35,
    resizeMode: 'cover'
  },
  keyboardView: {
    flex: 1
  },
  formCarousel: {
    width: width,
    height: formCarouselHeight
  },
  formCarouselItem: {
    width: width,
    height: formCarouselHeight,
    flex: 1,
    flexDirection: 'row'
  },
  form: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  formScrollView: {
    // paddingTop: 10,
    // paddingBottom: 30,
  },
  formView: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30
  },
  stepperContent: {
    paddingTop: 40,
    paddingLeft: 30,
    paddingRight: 30,
    height: 75
  },
  locationButton: {
    width: 50,
    marginTop: 0,
    right: 0,
    position: 'absolute'
  },
  locationButtonIcon: {
    right: -2
  }
};
