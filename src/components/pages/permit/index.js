import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar ,Image , Alert, BackHandler} from 'react-native';
import { Content, Text,Container } from 'native-base';
import ImagePicker from '../../../lib/image-picker';

import { defaultColors } from '../../../config/style';
import Header from './header';
import { Button } from '../../../components/ui/';
import {
    setPermitPicture, 
    setDefaultPermitPicture
} from '../../../api/permit-picture';

import style from './style';

class Permit extends Component {
  constructor(props) {
    super(props);
 
    this.handleUpload = this.handleUpload.bind(this);
    this.handlePhotoSubmit = this.handlePhotoSubmit.bind(this);
 
  }

  handleUpload() {
    console.log("works handle");
    new ImagePicker({
      success: this.handlePhotoSubmit
    });
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    const { navigation } = this.props;
    navigation.goBack();
    return true;
  }

  // Fotoğraf gönderir
  handlePhotoSubmit({ file: files }) {
    const { setUserInfo, user,navigation } = this.props;
    console.log("USER",setUserInfo);
    console.log("USER2",user);

    const form = {
      userId: user.user.id,
      default:0
    };
    console.log("FORM",form);

    files.map(file => {
      form.picture = file.filename;
    });
    console.log("FILES",files);

    setPermitPicture(form).then(() => {
        setUserInfo();
    });

    setDefaultPermitPicture(form).then(() => {
        setUserInfo();
    });
    Alert.alert(
        'Başarlı !',
        'Başvurunuz incelenmek üzere gönderildi.',
        [
          {text: 'Tamam', onPress: () => navigation.navigate('User') },
         ],
        {cancelable: false},
      );
  }
  

  render() {
    const { navigation } = this.props;
    const {  user } = this.props;

    return (
      <Container >
        <StatusBar translucent backgroundColor={defaultColors.bg.dark} barStyle="dark-content" />
        <Header navigation={navigation} />
        <Content contentContainerStyle={style.listContent}>
        <Image
          style={style.image}
          source={require('../../../assets/safe.png')}
        />
        <Text style={style.textTitle}>Onaylı Hesap Başvurusu</Text>
        <Text style={style.textNormal}>Social Traffic'de onaylı hesap olmak sizin diğer kullanıcılara karşı daha güvenilir ve gerçek 
            hesap olduğunuzu gösterir.Bu sayede daha sağlıklı iletişim kurabilirsiniz.
        </Text>
        <Text style={style.textNormalBold}>Onayı hesap olmak için tek yapman sahip olduğunuz aracın ruhtasını bize göndermek.
        Gerekli incelemelerden sonra bilgilendirileceksiniz.</Text>
         {  user.user.permitPictures.length == 0 ? <Button
                extraTextStyle={style.profileButtonTextGrey}
                extraIconStyle={style.profileButtonIcon}
                icon="shield-alt"
                iconType="FontAwesome5"
                color="green"
                shadow
                size="xl"
                rounded
                text="Ruhsatını Yükle"
                onPress={this.handleUpload}
              /> :  <Button
              extraTextStyle={style.profileButtonTextGrey}
              extraIconStyle={style.profileButtonIcon}
              iconType="FontAwesome5"
              color="green"
              shadow
              size="xl"
              rounded
              text="Önceden başvurunuz bulunuyor."
              disabled /> 
              } 
        </Content>
      </Container>
    );
  }
}

Permit.propTypes = {
    user: PropTypes.object.isRequired,
    setUserInfo: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
};

export default Permit;
