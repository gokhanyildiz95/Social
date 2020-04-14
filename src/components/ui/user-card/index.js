import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';
import { Text, View } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import LinearGradient from 'react-native-linear-gradient';

import { Avatar } from '../../../components/ui/';
import { defaultColors } from '../../../config/style';
import { getUserPlate } from '../../../lib/user';

// Style
import style from './style';

const UserCard = props => {
  const { user, handlePress, extraStyle } = props;
  const plate = getUserPlate(user);
 //  console.log("DATAAA",plate );
  return (
    <TouchableHighlight
      style={{ elevation: 0 }}
      activeOpacity={1}
      underlayColor="transparent"
      onPress={() => handlePress(user)}
    >
      <View style={[style.view, extraStyle]}>
        <LinearGradient
          colors={[defaultColors.bg.darkGrey, defaultColors.bg.halfGrey]}
          style={style.graidentContent}
          useAngle
          angle={-45}
        >
          <Grid style={style.grid}>
            <Col style={style.avatar}>
              <Avatar user={user} small />
            </Col>
            <Col>
              <Grid style={style.contentGrid}>
                <Col size={75}>
                  <Text style={style.title}>{plate.name}</Text>
                  <Text style={style.slug}>{user.fullname}</Text>
                  <Text style={style.slug}>{plate.model} - { plate.color }</Text>
                </Col>
                <Col size={25}>
                  <Text style={style.range}>
                    {user.distance} 
                    {' '}
                    {user.distanceType}
                  </Text>
                </Col>
              </Grid>
            </Col>
          </Grid>
        </LinearGradient>
      </View>
    </TouchableHighlight>
  );
};

UserCard.defaultProps = {
  extraStyle: {}
};

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  handlePress: PropTypes.func.isRequired,
  extraStyle: PropTypes.object
};

export default UserCard;
