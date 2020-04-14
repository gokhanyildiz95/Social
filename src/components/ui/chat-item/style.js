import { defaultColors } from '../../../config/style';

export default {
  view: {
    marginBottom: 15
  },
  grid: {
    padding: 15,   
  },
  avatar: {
    width: 50,
    marginTop: 10
  },
  avatarOwner: {
    alignItems: 'flex-end'
  },
  messageContent: {
    backgroundColor: defaultColors.bg.white,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: defaultColors.bg.borderLightGrey
  },
  message: {
    fontSize: 12,
    lineHeight: 16,
    color: defaultColors.darkGrey
  },
  messageContentOwner: {
    borderColor: defaultColors.bg.messageDark,
    backgroundColor: defaultColors.bg.markerBlue
  },
  messageOwner: {
    color: defaultColors.white
  },
  date: {
    fontSize: 11,
    color: defaultColors.grey,
    paddingTop: 5,
    paddingLeft: 12
  }
};
