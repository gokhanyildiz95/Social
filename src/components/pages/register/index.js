import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Container, Content, View } from 'native-base';
import Carousel from 'react-native-looped-carousel';
import { KeyboardAvoidingView, ScrollView, StatusBar, Image, Alert as AlertReact } from 'react-native';
import { Alert, Radio, Select, Input, Stepper, Button } from '../../../components/ui/';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { defaultColors } from '../../../config/style';
import isValidEmail from '../../../lib/form';
import { isEmailExist } from '../../../api/user';
import { isPlateExist } from '../../../api/plate';
import { getGeocode } from '../../../api/google-map';
import _ from 'lodash';
import firebase, { messaging } from 'react-native-firebase';

import style from './style';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
      progressState: 1,
      formVisible: true,
      swipe: false,
      form: {
        genderId: 1
      },
      findAddressLoading: false,
      errorShow: false,
      errorMessage: null,
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleFindAddress = this.handleFindAddress.bind(this);
  }

  componentDidMount() {
    const { city, getCity } = this.props;

    setTimeout(() => {
      this.setState(() => ({
        formVisible: true
      }));
    }, 100);

    if (!city.fetched) {
      getCity();
    }
  }

  componentDidUpdate() {
    const { navigation, user } = this.props;

    if (user.signedUp) {
      navigation.navigate('Search');  
    }
  }

  getCityOptions() {
    const { city } = this.props; 
    return _.map(city.list, (cityItem, key) => ({
      key,
      label: cityItem.name,
      value: cityItem.id
    }));
  }

  setError(errorShow, errorMessage) {
    this.setState(() => ({
      errorShow,
      errorMessage,
      loading: false
    }));
  }

  changeFindAddressLoading = state => this.setState(() => ({ findAddressLoading: state }));

  async isFormValid(tab = false) {
    const { form } = this.state;

    if (!form.fullname || !form.email || !form.phone || isNaN(form.genderId)) {
      this.setError(true, 'Lütfen tüm alanları doldurunuz');
      return false;
    }

    if (!isValidEmail(form.email)) {
      this.setError(true, 'Lütfen geçerli bir email adresi giriniz');
      return false;
    }

    const emailControl = await isEmailExist(form.email);
    if (emailControl) {
      this.setError(true, 'E-mail adresi kullanılmaktadır');
      return false;
    }

    if (tab === 1) {
      return true;
    }

    if (!form.cityId || !form.plate || !form.password) {
      this.setError(true, 'Lütfen tüm alanları doldurunuz');
      return false;
    }

    const plateControl = await isPlateExist(form.plate);
    if (plateControl) {
      this.setError(true, 'Bu plaka sistemimizde kayıtlıdır');
      return false;
    }

    return true;
  }

  async changeTab(page, changeCurrentPage = false) {
    const state = this.state;
    const actualPage = page + 1;

    if (page === 1) {
      const formControl = await this.isFormValid(page);
      if (!formControl) {
        return false;
      }
    }

    if (actualPage === 2) {

      state.swipe = true
    }

    if (changeCurrentPage) {
      state.currentPage =  true

    }

    this.carousel.animateToPage(page);
    setTimeout(() => {
      this.setState({

        progressState: actualPage
      });
    }, 100);
  }

  handleChange(name, text) {
    const { form } = this.state;

    form[name] = text;
    this.setState(() => ({
      form
    }));
  }

  handleDismiss() {
    return this.setError(false, null);
  }

  async handleSubmit() {
    const { form } = this.state;
    const { userSignUp } = this.props;
    const alert = true;
    const fcmToken = await firebase.messaging().getToken();
    console.log(fcmToken)
    form["fcmToken"] = fcmToken;
    form["plate"] =  form["plate"].toUpperCase(); 
    this.setState({ form });

    var regex, v;
    var val = form.plate;
    // v = val.replace(/\s+/g, '').toUpperCase();
    // regex = /^(0[1-9]|[1-7][0-9]|8[01])(([A-Z])(\d{4,5})|([A-Z]{2})(\d{3,4})|([A-Z]{3})(\d{2}))$/;
    //if (v.match(regex) != null) {
    if (true) {
      this.setState(() => ({
        loading: true
      }));

      const formControl = await this.isFormValid();
      if (!formControl) {
        return false;
      }
      userSignUp({
        params: form
      });
    } else {
      AlertReact.alert(
        'Uyarı',
        'Lütfen geçerli bir plaka giriniz.',
        [
          { text: 'Tamam' },
        ],
        { cancelable: false },
      );
    }


  }

  async handleFindAddress() {
    const { location } = this.props;
    const cityOptions = this.getCityOptions();
    const { citySelect } = this.refs;
    this.changeFindAddressLoading(true);

    await setTimeout(async () => {
      try {
        const geoResult = await getGeocode({
          latlng: `${location.latitude},${location.longitude}`
        });

        const city = _.find(
          cityOptions,
          cityOption => cityOption.label.toLowerCase() === geoResult.city.toLowerCase()
        );

        this.handleChange('cityId', city.key);
        citySelect.selectItem(city.key);
      } catch (err) {
        // Ignore Error
      }
      this.changeFindAddressLoading(false);
    }, 1000);
  }

  render() {
    const {
      currentPage,
      form,
      errorShow,
      errorMessage,
      formVisible,
      findAddressLoading,
      loading,
      progressState,
      swipe
    } = this.state;
    const { user } = this.props;
    const cityOptions = this.getCityOptions();

    return (
      <Container>
        <StatusBar translucent backgroundColor={defaultColors.bg.dark} barStyle="light-content" />
        <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
          <Grid>
            <Row size={35}>
              <Image style={style.bg} source={require('../../../assets/login-bg.png')} />
            </Row>
            <Row size={65} style={style.form}>
              <Content>
                <View style={style.stepperContent}>
                  <Stepper labels={[1, 2]} progressState={progressState} />
                </View>
                <Carousel
                  ref={ref => (this.carousel = ref)}
                  pageStyle={{ flex: 1 }}
                  autoplay={false}
                  swipe={swipe}
                  isLooped={false}
                  currentPage={currentPage}
                  style={style.formCarouselItem}
                  onPageBeingChanged={eq => this.changeTab(eq)}
                >
                  <View style={style.formCarouselItem}>
                    {formVisible && (
                      <ScrollView style={style.formScrollView} keyboardDismissMode="interactive">
                        <View style={style.formView}>
                          <Input
                            onChange={this.handleChange}
                            value={form.fullname}
                            name="fullname"
                            shadow
                            extraStyle={{ marginBottom: 20 }}
                            title="Ad Soyad"
                          />
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
                            value={form.phone}
                            name="phone"
                            shadow
                            keyboardType='numeric'
                            mask="(500) 000 00 00"
                            extraStyle={{ marginBottom: 20 }}
                            title="Telefon"
                          />
                          <Radio
                            onChange={this.handleChange}
                            value={form.genderId}
                            name="genderId"
                            items={[
                              { key: 0, label: 'Erkek', value: 1 },
                              {
                                key: 1,
                                label: 'Kadın',
                                value: 2,
                                color: 'pink',
                                passiveTextStyle: { color: defaultColors.pink }
                              }
                            ]}
                            selected={0}
                            extraStyle={{ marginTop: 10, marginBottom: 10 }}
                            extraItemStyle={{
                              marginRight: 15,
                              paddingLeft: 15,
                              paddingRight: 15
                            }}
                          />
                        </View>
                      </ScrollView>
                    )}
                  </View>
                  <View style={style.formCarouselItem}>
                    {formVisible && (
                      <ScrollView style={style.formScrollView} keyboardDismissMode="interactive">
                        <View style={style.formView}>
                          <Grid>
                            <Col size={75}>
                              <Select
                                ref="citySelect"
                                onChange={this.handleChange}
                                value={form.cityId}
                                values={cityOptions.sort((a, b) => a.id - b.id)}
                                name="cityId"
                                shadow
                                extraStyle={{ marginTop: 20 }}
                                title="Şehir"
                              />
                            </Col>
                            <Col size={25}>
                              <Button
                                onPress={this.handleFindAddress}
                                color="blue"
                                shadow
                                rounded
                                size="xl"
                                extraStyle={style.locationButton}
                                iconType="FontAwesome"
                                icon="location-arrow"
                                extraIconStyle={style.locationButtonIcon}
                              />
                            </Col>
                          </Grid>
                          <Input
                            onChange={this.handleChange}
                            value={form.plate}
                            name="plate"
                            autoCapitalize="characters"
                            shadow
                            extraStyle={{ marginTop: 8 }}
                            title="Plaka"
                          />
                          <Input
                            onChange={this.handleChange}
                            value={form.model}
                            name="model"
                            shadow
                            extraStyle={{ marginTop: 8 }}
                            title="Araç Markası"
                          />
                          <Input
                            onChange={this.handleChange}
                            value={form.color}
                            name="color"
                            shadow
                            extraStyle={{ marginTop: 8 }}
                            title="Araç Rengi"
                          />
                          <Input
                            onChange={this.handleChange}
                            value={form.password}
                            name="password"
                            type="password"
                            shadow
                            extraStyle={{ marginTop: 8 }}
                            title="Şifre"
                          />
                        </View>
                      </ScrollView>
                    )}
                  </View>
                </Carousel>
                <Content style={{ paddingLeft: 30, paddingRight: 30 }}>
                  {progressState === 1 ? (
                    <Button
                      color="greyToHalfGrey"
                      size="xl"
                      extraStyle={{ marginTop: 0 }}
                      text="Devam"
                      onPress={() => this.changeTab(1, false)}
                    />
                  ) : (
                      <Button
                        color="greyToHalfGrey"
                        size="xl"
                        extraStyle={{ marginTop: 0 }}
                        text="Üye Ol"
                        onPress={this.handleSubmit}
                      />
                    )}
                </Content>
              </Content>
            </Row>
          </Grid>
        </KeyboardAvoidingView>
        <Alert
          show={loading || user.signingIn || findAddressLoading}
          title="Lütfen Bekleyin"
          progress
        />
        <Alert show={errorShow} message={errorMessage} onDismiss={this.handleDismiss} />
      </Container>
    );
  }
}

Register.propTypes = {
  city: PropTypes.array.isRequired,
  getCity: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  userSignUp: PropTypes.func.isRequired
};

export default Register;
