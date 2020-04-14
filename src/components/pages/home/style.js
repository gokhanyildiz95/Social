import { Dimensions } from 'react-native';
import { defaultColors } from '../../../config/style';

const { width, height } = Dimensions.get('window');
const carouselHeight = height * 0.7;
const buttonContentMargin = (width * 0.5) / 2;

const bulletStyle = {
  width: 8,
  height: 8,
  borderRadius: 10,
  marginLeft: 5,
  marginRight: 5,
  marginTop: 50,
  backgroundColor: '#000',
  borderColor: '#000'
};

export default {
  carousel: {
    width,
    height: carouselHeight
  },
  carouselItem: {
    width,
    height: carouselHeight
  },
  textContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 15,
    backgroundColor: '#fff'
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    paddingBottom: 20,
    fontFamily: 'Roboto',
    margin: 10
  },
  bold: {
    textAlign: 'center',
    fontSize: 20,
    paddingBottom: 10,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  imageRow: {
    backgroundColor: '#fff',

  },
  image: {
    maxHeight: height > 600 ? '100%' : '80%',
    resizeMode:'contain'
  },
  imageContent: {
    position: 'absolute',
    //  bottom: 20,
    width,
    flex: 1,
    alignItems: 'center',
    elevation: 5,
  },
  lastImageContent: {
    bottom: carouselHeight * 0.015
  },
  lastImage: {
    resizeMode: 'contain'
  },
  bulletStyle: {
    ...bulletStyle,
    opacity: 0.5
  },
  chosenBulletStyle: {
    ...bulletStyle
  },
  orText: {
    color: defaultColors.grey,
    fontSize: 12,
    paddingTop: 15,
    paddingBottom: 5,
    textAlign: 'center'
  },
  buttonContent: {
    paddingTop: 30,
    marginLeft: buttonContentMargin,
    marginRight: buttonContentMargin
  }
};
