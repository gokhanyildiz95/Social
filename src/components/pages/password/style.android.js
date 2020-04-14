import { defaultColors } from '../../../config/style';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const formCarouselHeight = height * 0.5 * 0.6;

export default {
  header: {
    backgroundColor: '#fff',
    height: 80,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: defaultColors.bg.lightGrey
  },
  headerGrid: {
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 15
  },
  headerGridCol: {
    flex: 1,
    flexDirection: 'row'
  },
  backIcon: {
    fontSize: 30
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14
  },
  textTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    marginTop:50
  },
  textNormal:{
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    marginTop:15
  },
  textNormalBold:{
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    marginTop:15,
    fontWeight: 'bold',
    marginBottom:15
  },
  image:{
    width: 150,
    height: 150,
    flex: 1,
    marginTop:30
    },
  listContent: {
    alignItems: 'center',
    justifyContent: 'center', 
    marginRight:15,
    marginLeft:15
   },
   profileButtonTextGrey: {
    fontSize: 14,
    fontWeight: '400',
    color: defaultColors.white
  },  
  profileButtonIcon: {
    fontSize: 16,
    width: 50,
    textAlign: 'center',
    left: 20
  },
  button :{
    marginLeft:15,
    marginRight:15,
  },
  
   userCard: {
    marginLeft: 15,
    marginRight: 15
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
    marginBottom: 30
  },
  formView: {}
};
