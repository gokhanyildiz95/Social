import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, Text } from 'react-native';
import { View, Row } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import LinearGradient from 'react-native-linear-gradient';

import { Avatar } from '../../../components/ui/';
import { defaultColors } from '../../../config/style';
import { getUserPlate } from '../../../lib/user';
// Style
import style from './style';

const PostItem = props => {
  const { user, distance, time, handlePress, extraStyle, title, content, date } = props;
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
                <Col size={100}>
                  {/* <Text style={style.title}>{title}</Text> */}
                  <Row>
                    <Text style={style.slug}>
                      {user.fullname} 
                      {' • '}
                      {plate.name}
                    </Text>
                    {/* <Text style={style.title}>{plate.name}{" | "}</Text>
                    <Text style={style.title}>{user.fullname}</Text> */}
                  </Row>
                  <Text style={style.slug}>{content}</Text>
                </Col>
              </Grid>
              <Grid style={style.contentGrid}>
                <Col size={60}>
                  <Text style={style.range}>{time}</Text>
                </Col>
                <Col size={40}>
                  <Text style={style.range}>{distance} km uzakta</Text>
                </Col>
              </Grid>
            </Col>
          </Grid>
        </LinearGradient>
      </View>
    </TouchableHighlight>
  );
};

PostItem.defaultProps = {
  extraStyle: {}
};

PostItem.propTypes = {
  user: PropTypes.object.isRequired,
  title: PropTypes.string,
  time: PropTypes.string,
  distance: PropTypes.string,
  content: PropTypes.string,
  handlePress: PropTypes.func.isRequired,
  extraStyle: PropTypes.object
};

export default PostItem;
