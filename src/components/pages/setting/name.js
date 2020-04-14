import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar ,Image , Alert,KeyboardAvoidingView} from 'react-native';
import { Content, Text,Container,View,Icon  } from 'native-base';
import ImagePicker from '../../../lib/image-picker';
import { Row, Grid } from 'react-native-easy-grid';
import { Button, Input } from '../../../components/ui/';
import { changeUserFullName } from '../../../api/user';
import { defaultColors } from '../../../config/style';
import Header from './header';
 import {
    setPermitPicture, 
    setDefaultPermitPicture
} from '../../../api/permit-picture';

import style from './style';

class ChangeName extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
        form: {
            fullname:''
        },
        errorShow: false,
        errorMessage: null,
        loading: false
      };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){

  }

  handleChange(name, text) {
    const { form } = this.state;

    form[name] = text;
    this.setState(() => ({
      form
    }));
  }

  async handleSubmit() {
    const { navigation, user,setUserInfo } = this.props;
    if(this.state.form.fullname === '') {
        Alert.alert(
            'Uyarı',
            'Lütfen tüm alanları doldurunuz.',
            [
              {text: 'Tamam'},
             ],
            {cancelable: false},
          );
    }else {
        changeUserFullName(user.user.id,{ fullname: this.state.form.fullname})
        .then(() => {
            setUserInfo();
        });
        Alert.alert(
            'Başarılı',
            'İsim ve soyisminiz başarıyla değiştirildi.',
            [
              {text: 'Tamam' , onPress: () => navigation.navigate('User') },
             ],
            {cancelable: false},
          );
    }
  }

  render() {
    const { form, loading, errorShow, errorMessage } = this.state;
    const { navigation, user } = this.props;
    return (
<Container >
        <StatusBar translucent backgroundColor={defaultColors.bg.dark} barStyle="dark-content" />
        <Header navigation={navigation} />
        <Content>
        <KeyboardAvoidingView behavior="height" style={style.keyboardView}>
          <Grid>
            <Row size={55} style={style.form}>
              <View style={style.formScrollView} keyboardDismissMode="interactive">
                <View style={style.formContent}>
                <Icon type="FontAwesome" style={{fontSize: 50,marginBottom:25, color: 'red',textAlign:'center'}} name="user" />

                <Text style={{ textAlign:'center',marginBottom:15 }}>Tam adınızı değiştirmek için lütfen güncel isim ve soyisminizi giriniz.</Text>
                <Text style={{ textAlign:'center',marginBottom:15 }}>Şuanki isminiz. {user.user.fullname}</Text>
                  <View style={style.formView}>
                    <Input
                      onChange={this.handleChange}
                      value={form.fullname}
                      name="fullname"
                      shadow
                      extraStyle={{ marginBottom: 20 }}
                      title="Yeni isim ve soyisim"
                    />
 
                  </View>
                </View>
                  <Button
                  onPress={this.handleSubmit}
                  color="greyToHalfGrey"
                  size="xl"
                  extraStyle={style.formButton}
                  text="Güncelle"
                />
              </View>
            </Row>
          </Grid>
        </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }
}

ChangeName.propTypes = {
    user: PropTypes.object.isRequired,
    setUserInfo: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
};

export default ChangeName;
