import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar ,Image , Alert,KeyboardAvoidingView} from 'react-native';
import { Content, Text,Container,View,Icon  } from 'native-base';
//import ImagePicker from '../../../lib/image-picker';
import { Row, Grid } from 'react-native-easy-grid';
import { Button, Input } from '../../../components/ui/';
import { resetPassword } from '../../../api/user';
import { defaultColors } from '../../../config/style';
import Header from './header';
 import {
    setPermitPicture, 
    setDefaultPermitPicture
} from '../../../api/permit-picture';

import style from './style';

class Password extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      form: {
       
      },
      errorShow: false,
      errorMessage: null,
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
 
  handleChange(name, text) {
    const { form } = this.state;

    form[name] = text;
    this.setState(() => ({
      form
    }));
  }

  handleSubmit() {
    const { navigation, user } = this.props;
    console.log(this.state.form.email);
    resetPassword({ email: this.state.form.email }).then((response) => {
      console.log(response)
      Alert.alert(
        'Başarılı',
        'Başarılı, lütfen mailinizi kontrol ediniz.',
        [
          {text: 'Tamam', onPress: () => navigation.navigate('Login') },
         ],
        {cancelable: false},
      );
    });
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
                <Icon type="FontAwesome" style={{fontSize: 50,marginBottom:25, color: 'red',textAlign:'center'}} name="key" />

                <Text style={{ textAlign:'center',marginBottom:15 }}>Şifreni sıfırlamak için lütfen mail adresinizi giriniz.</Text>
                  <View style={style.formView}>
                    <Input
                      onChange={this.handleChange}
                      value={form.email}
                      name="email"
                      shadow
                      extraStyle={{ marginBottom: 20 }}
                      title="E-Posta"
                    />
 
                  </View>
                </View>
                  <Button
                  onPress={this.handleSubmit}
                  color="greyToHalfGrey"
                  size="xl"
                  extraStyle={style.formButton}
                  text="Şifremi Yenile"
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

Password.propTypes = {
    user: PropTypes.object.isRequired,
    setUserInfo: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
};

export default Password;
