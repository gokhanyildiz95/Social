import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';
import { Text, View, Button, Icon } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import LinearGradient from 'react-native-linear-gradient';

import { Avatar } from '../../../components/ui/';
import { defaultColors } from '../../../config/style';
import { getUserPlate } from '../../../lib/user';

// Style
import style from './style';

const UserConnectionRequest = props => {
  const { user, handlePress,onPressAccept,onPressDecline, extraStyle } = props;
  const plate = getUserPlate(user);

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
                <Col size={70}>
                  <Text style={style.title}>{plate.name}</Text>
                  <Text style={style.slug}>{user.fullname}</Text>
                </Col>
                <Col size={30}>
              <Button rounded  small  primary onPress={() => handlePress(user)}><Text style={style.buttonText}>Göz At</Text></Button>
            </Col>
       
              </Grid>
            </Col>
          </Grid>
        </LinearGradient>
      </View>
    </TouchableHighlight>
  );
};

UserConnectionRequest.defaultProps = {
  extraStyle: {}
};

UserConnectionRequest.propTypes = {
  user: PropTypes.object.isRequired,
  handlePress: PropTypes.func.isRequired,
  extraStyle: PropTypes.object
};

export default UserConnectionRequest;
