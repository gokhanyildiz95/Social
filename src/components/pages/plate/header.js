import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';
import { Header, Text, Icon } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';

import style from './style';

const PlateHeader = props => {
  const { handleAdd, navigation } = props;

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
            <Text style={style.headerTitle}>Plakalarım</Text>
          </Col>
          <Col style={[style.headerGridCol, style.headerGridColLast]}>
            <TouchableHighlight
              activeOpacity={0}
              underlayColor="transparent"
              style={style.addButton}
              onPress={handleAdd}
            >
              <Icon name="add" style={style.addIcon} />
            </TouchableHighlight>
          </Col>
        </Grid>
      </Header>
    </React.Fragment>
  );
};

PlateHeader.propTypes = {
  handleAdd: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
};

export default PlateHeader;
