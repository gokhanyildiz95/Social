import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar} from 'react-native';
import { Container } from 'native-base';
import { defaultColors } from '../../../config/style';
import Header from './header';
import { WebView } from 'react-native-webview';

class FAQ extends Component {
  constructor(props) {
    super(props);
  }

  handleBackPress = () => {
    const { navigation } = this.props;
    navigation.goBack();
    return true;
  }

  render() {
    const { navigation } = this.props;
    return (
      <Container >
        <StatusBar translucent backgroundColor={defaultColors.bg.dark} barStyle="dark-content" />
        <Header navigation={navigation} />
        <WebView source={{ uri: 'http://gncz.net/terms/sss.html' }} />
      </Container>
    );
  }
}

FAQ.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default FAQ;
