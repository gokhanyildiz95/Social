import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';
import { Text, View } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';

// Style
import style from './style';

const PlateItem = props => {
  const { plate, handlePress } = props;
  console.log(plate.item)
     return (
    <TouchableHighlight
      style={{ elevation: 0 }}
      activeOpacity={1}
      underlayColor="transparent"
      onPress={() => handlePress(plate.item)}
    >
      <View style={style.view}>
        <Grid style={style.grid}>
          <Col>
            <Text style={style.title}>{plate.item.name}</Text>
          </Col>
          <Col>
            <Text style={style.defaultText}>{plate.item.default ? 'Varsayılan' : ''}</Text>
          </Col>
        </Grid>
      </View>
    </TouchableHighlight>
  );
};

PlateItem.propTypes = {
  plate: PropTypes.object.isRequired,
  handlePress: PropTypes.func.isRequired
};

export default PlateItem;
