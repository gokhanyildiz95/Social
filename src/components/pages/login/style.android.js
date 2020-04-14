import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const formCarouselHeight = height * 0.5 * 0.6;

export default {
  bg: {
    width: '100%',
    height: '100%',
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
    flex: 1,
    justifyContent: 'space-between'
  },
  formContent: {
    paddingTop: 35,
    paddingLeft: 30,
    paddingRight: 30
  },
  stepperContent: {
    paddingTop: 65,
    paddingLeft: 30,
    paddingBottom: 10,
    paddingRight: 30
  },
  locationButton: {
    width: 50,
    marginTop: 0,
    right: 0,
    position: 'absolute'
  },
  locationButtonIcon: {
    right: -2
  },
  formButton: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 5,
  },
  formButton2: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 60
  },
  formView: {}
};
