import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, View } from 'native-base';
import { StatusBar, Image, Text, Dimensions } from 'react-native';
import Carousel from 'react-native-looped-carousel';
import { Button } from '../../../components/ui/';
import { Row, Grid } from 'react-native-easy-grid';
import { defaultColors } from '../../../config/style';

import style from './style';

const { width, height } = Dimensions.get('window');
const Home = props => {
  console.log('screen size_width' + Math.round(Dimensions.get('window').width))
  console.log('screen size_height' + Math.round(Dimensions.get('window').height))
  const { navigation } = props;
  return (
    <Container>
      <StatusBar translucent backgroundColor={defaultColors.bg.dark} barStyle="light-content" />
      <Grid>
        <Row size={65}>
          <Carousel
            delay={5000}
            autoplay
            style={style.carousel}
            bullets
            bulletsContainerStyle={style.bulletsContainerStyle}
            bulletStyle={style.bulletStyle}
            chosenBulletStyle={style.chosenBulletStyle}
          >
            <View style={style.carouselItem}>
              <Grid>
                <Row style={style.imageRow} size={75}>
                  <View style={style.imageContent}>
                    <Image style={style.image} source={require('../../../assets/intro-1.png')} />
                  </View>
                </Row>
                <Row size={25}>
                  <View style={style.textContent}>
                    <Text style={style.bold}>Social Traffic</Text>
                    <Text style={style.text}>Sosyalleşmek istediğin aracın plakasını gir ve hemen iletişime geç.</Text>
                  </View>
                </Row>
              </Grid>
            </View>
            <View style={style.carouselItem}>
              <Grid>
                <Row style={style.imageRow} size={75}>
                  <View style={style.imageContent}>
                    <Image style={style.image} source={require('../../../assets/intro-2.png')} />
                  </View>
                </Row>
                <Row size={25}>
                  <View style={style.textContent}>
                    <Text style={style.bold}>Social Traffic</Text>
                    <Text style={style.text}>Çevrendeki tüm araçlarla aynı anda ortak sohbete geç.</Text>
                  </View>
                </Row>
              </Grid>
            </View>
            <View style={style.carouselItem}>
              <Grid>
                <Row style={style.imageRow} size={75}>
                  <View style={style.imageContent}>
                    <Image style={style.image} source={require('../../../assets/intro-3.png')} />
                  </View>
                </Row>
                <Row size={25}>
                  <View style={style.textContent}>
                    <Text style={style.bold}>Social Traffic</Text>
                    <Text style={style.text}>Etrafındaki plakaları gör</Text>
                  </View>
                </Row>
              </Grid>
            </View>
            <View style={style.carouselItem}>
              <Grid>
                <Row style={style.imageRow} size={75}>
                  <View style={style.imageContent}>
                    <Image style={style.image} source={require('../../../assets/intro-4.png')} />
                  </View>
                </Row>
                <Row size={25}>
                  <View style={style.textContent}>
                    <Text style={style.bold}>Social Traffic</Text>
                    <Text style={style.text}>Kurallara uyulmasını sağla</Text>
                  </View>

                </Row>
              </Grid>
            </View>

          </Carousel>
        </Row>
        <Row size={30}>
          <Content style={style.buttonContent}>
            <Button
              color="orangeToYellow"
              rounded
              extraStyle={{ marginTop: height > 600 ? 10 : 5 }}
              text="Üye Ol"
              onPress={() => navigation.navigate('Register')}
            />
            <Text style={style.orText}>ya da</Text>
            <Button
              bordered
              color="orangeToYellow"
              rounded
              extraStyle={{ marginTop: height > 600 ? 10 : 5 }}
              text="Hesabın mı var?"
              onPress={() => navigation.navigate('Login')}
            />
          </Content>
        </Row>
      </Grid>
    </Container>
  );
};

Home.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Home;
