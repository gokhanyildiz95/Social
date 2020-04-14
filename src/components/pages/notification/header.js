import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';
import { Header, Text, Icon } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';

import style from './style';

const ListHeader = props => {
  const { navigation } = props;

  return (
    <React.Fragment>
      <Header style={style.header}>
        <Grid style={style.headerGrid}>
          <Col style={style.headerGridCol}>
            <TouchableHighlight
              activeOpacity={0}
              underlayColor="transparent"
              style={style.backButton}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon name="arrow-back" style={style.backIcon} />
            </TouchableHighlight>
          </Col>
          <Col style={style.headerGridCol}>
            <Text style={style.headerTitle}>Bildirimler</Text>
          </Col>
          <Col style={style.headerGridCol} />
        </Grid>
      </Header>
    </React.Fragment>
  );
};

ListHeader.propTypes = {
  notification: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};

export default ListHeader;
