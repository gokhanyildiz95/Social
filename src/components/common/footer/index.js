import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import { Footer, Button, Icon,Text } from 'native-base';
import { connect } from 'react-redux';

import style from './style';
 
class AppFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePageRoute: null
    };
  }

  componentDidMount() {
    const { navigation } = this.props;

    navigation.addListener('didFocus', payload => {
      const { state } = payload;

      this.setState({
        ...this.state,
        activePageRoute: state.routeName
      });
    });
  }

 

  render() {
    const { navigation , setting } = this.props;
    const { activePageRoute } = this.state;
    console.log("SS",setting);  
    return (
      <Footer style={style.footer}>
        <LinearGradient style={style.content} colors={style.contentColors} useAngle angle={45}>
          <Button style={style.button} onPress={() => navigation.navigate('Search')}>
            <Icon style={activePageRoute === 'Search' ? style.activeText : style.defaultColor} name="search" />
          </Button>
          { setting.showConnection ? <Button style={style.button} onPress={() => navigation.navigate('Connection')}>
            <Icon style={activePageRoute === 'Connection' ? style.activeText : style.defaultColor } name="people" />
          </Button> : <Text></Text>}
          <Button style={style.button} onPress={() => navigation.navigate('Message')}>
            <Icon style={activePageRoute === 'Message' ? style.activeText : style.defaultColor} name="mail" />
          </Button>
          <Button style={style.button} onPress={() => navigation.navigate('User')}>
            <Icon style={activePageRoute === 'User' ? style.activeText : style.defaultColor} name="person" />
          </Button>
        </LinearGradient>
      </Footer>
    );
  }
}

AppFooter.defaultProps = {
  navigation: {}
};

AppFooter.propTypes = {
  navigation: PropTypes.object,
  setting: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
  return {
    setting: state.user.setting
  };
};

export default connect(mapStateToProps)(withNavigation(AppFooter));
