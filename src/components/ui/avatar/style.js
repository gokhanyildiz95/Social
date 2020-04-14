import { defaultColors } from '../../../config/style';

const bulletStyle = {
  width: 3,
  height: 3,
  borderRadius: 10,
  marginLeft: 3,
  marginRight: 3,
  backgroundColor: defaultColors.bg.white,
  borderColor: defaultColors.bg.white
};

export default {
  row: {
    flex: 1
  },
  imageContent: {
    marginTop: 2,
    marginLeft: 1,
    marginRight: 1
  },
  image: {
    flex: 1
  },
  carousel: {
    width: 100,
    height: 100,
    marginBottom: 10
  },
  carouselItem: {
    width: 100,
    height: 100
  },
  bulletsContainer: {
    bottom: -30
  },
  bulletStyle: {
    ...bulletStyle,
    opacity: 0.5
  },
  chosenBulletStyle: {
    ...bulletStyle
  },
  moreIcon: {
    justifyContent: 'flex-end',
    textAlign: 'right',
    color: defaultColors.white,
    marginRight: 10
  }
};
