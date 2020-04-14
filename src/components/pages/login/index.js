import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, View } from 'native-base';
import { KeyboardAvoidingView, StatusBar, Image } from 'react-native';
import { Button, Input } from '../../../components/ui/';
import { Row, Grid } from 'react-native-easy-grid';
import { defaultColors } from '../../../config/style';
import AwesomeAlert from 'react-native-awesome-alerts';
import isValidEmail from '../../../lib/form';

import style from './style';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {},
      errorShow: false,
      errorMessage: null,
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
  }

  componentDidUpdate() {
    const { errorShow } = this.state;
    const { navigation, user } = this.props;

    if (user.signedIn) {
      navigation.navigate('Search');
    }

    if (!errorShow && user.signInError) {
      this.setError(true, 'E-mail adresi veya şifre yanlış');
    }
  }

  setError(errorShow, errorMessage) {
    this.setState(() => ({
      errorShow,
      errorMessage,
      loading: false
    }));
  }

  isFormValid = form => !form.email || !form.password;

  handleChange(name, text) {
    const { form } = this.state;

    form[name] = text;
    this.setState(() => ({
      form
    }));
  }

  handleDismiss() {
    const { clearUserSignInError } = this.props;
    clearUserSignInError();

    return this.setError(false, null);
  }

  async handleSubmit() {
    const { form } = this.state;
    const { userSignIn } = this.props;

    this.setState(() => ({
      loading: true
    }));

    if (this.isFormValid(form)) {
      this.setError(true, 'Lütfen tüm alanları doldurunuz');
      return;
    }

    if (!isValidEmail(form.email)) {
      this.setError(true, 'Lütfen geçerli bir email adresi giriniz');
      return;
    }

    userSignIn({
      params: form
    });
  }

  render() {
    const { form, loading, errorShow, errorMessage } = this.state;
    const { navigation, user } = this.props;

    return (
      <Container>
        <StatusBar translucent backgroundColor={defaultColors.bg.dark} barStyle="light-content" />
        <KeyboardAvoidingView behavior="height" style={style.keyboardView}>
          <Grid>
            <Row size={45}>
              <Image style={style.bg} source={require('../../../assets/login-bg-base.png')} />
            </Row>
            <Row size={55} style={style.form}>
              <View style={style.formScrollView} keyboardDismissMode="interactive">
                <View style={style.formContent}>
                  <View style={style.formView}>
                    <Input
                      onChange={this.handleChange}
                      value={form.email}
                      name="email"
                      shadow
                      extraStyle={{ marginBottom: 20 }}
                      title="E-Posta"
                    />
                    <Input
                      onChange={this.handleChange}
                      value={form.password}
                      name="password"
                      type="password"
                      shadow
                      extraStyle={{ marginBottom: 20 }}
                      title="Şifre"
                    />
                  </View>
                </View>
                <Button
                  onPress={this.handleSubmit}
                  color="darkBlueToTurquoise"
                  size="xl"
                  extraStyle={style.formButton}
                  text="Giriş Yap"
                />
                  <Button
                  onPress={() => navigation.navigate('Password')}
                  color="redToBeige"
                  size="xl"
                  extraStyle={style.formButton}
                  text="Şifremi Unuttum"
                />
              </View>
            </Row>
          </Grid>
        </KeyboardAvoidingView>
        <AwesomeAlert show={loading || user.signingIn} showProgress />
        <AwesomeAlert show={errorShow} message={errorMessage} onDismiss={this.handleDismiss} />
      </Container>
    );
  }
}

Login.defaultProps = {
  navigation: {}
};

Login.propTypes = {
  clearUserSignInError: PropTypes.func.isRequired,
  navigation: PropTypes.object,
  user: PropTypes.object.isRequired,
  userSignIn: PropTypes.func.isRequired
};

export default Login;
