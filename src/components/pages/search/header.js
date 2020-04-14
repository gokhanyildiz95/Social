import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Text, Icon, View } from 'native-base';
import { ImageBackground, TouchableHighlight } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';

import style from './style';

class SearchHeader extends Component {
  // Okunmamış notification varsa true döner
  isNotificationActive() {
    const { notification } = this.props;
    let notificationActive = false;

    if (notification.list && notification.list.length) {
      notification.list.map(data => {
        // Eğer notification okunmamışsa active true tanımlanıyor
        if (data.status === 0) {
          notificationActive = true;
        }
      });
    }

    return notificationActive;
  }

  render() {
    const {
      handlePressNotification,
      handleChangeViewType,
      location,
      viewMode,
      currentTab
    } = this.props;
    const notificationActive = this.isNotificationActive();

    return (
      <React.Fragment>
        <Header style={style.header}>
          <Grid style={style.headerGrid}>
            <Col style={style.headerGridCol}>
              <Icon name="pin" style={style.pinIcon} />
              <View>
                {location.county !== '' && location.city !== '' && (
                  <React.Fragment>
                    <Text style={style.location}>
                      {location.county} 
                      {' '}
                      {location.city}
                    </Text>
                    <ImageBackground
                      resizeMode="repeat"
                      style={style.inputDotImage}
                      source={require('../../../assets/input-dot.gif')}
                    />
                  </React.Fragment>
                )}
              </View>
            </Col>
            <Col style={style.headerLastCol}>
              {currentTab === 0 ? (
                <TouchableHighlight
                  activeOpacity={0}
                  underlayColor="transparent"
                  onPress={handlePressNotification}
                  style={style.touchableHighlight}
                >
                  <React.Fragment>
                    <Icon
                      name="notifications"
                      style={
                        notificationActive
                          ? [style.notificationIcon, style.activeNotificationIcon]
                          : style.notificationIcon
                      }
                    />
                  </React.Fragment>
                </TouchableHighlight>
              ) : (
                <TouchableHighlight
                  activeOpacity={0}
                  underlayColor="transparent"
                  onPress={handleChangeViewType}
                  style={style.touchableHighlight}
                >
                  <React.Fragment>
                    {viewMode === 'list' ? (
                      <Icon name="map" style={style.mapIcon} />
                    ) : (
                      <View style={style.menuIconContent}>
                        <View style={style.menuIconLine} />
                        <View
                          style={{
                            ...style.menuIconLine,
                            width: '50%'
                          }}
                        />
                        <View
                          style={{
                            ...style.menuIconLine,
                            width: '15%'
                          }}
                        />
                      </View>
                    )}
                  </React.Fragment>
                </TouchableHighlight>
              )}
            </Col>
          </Grid>
        </Header>
      </React.Fragment>
    );
  }
}

SearchHeader.propTypes = {
  handleChangeViewType: PropTypes.func.isRequired,
  handlePressNotification: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  notification: PropTypes.object.isRequired,
  currentTab: PropTypes.number.isRequired,
  viewMode: PropTypes.string.isRequired
};

export default SearchHeader;
