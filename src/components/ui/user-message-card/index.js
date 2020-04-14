import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';
import { Badge, Text, Icon, View } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';

import { Avatar } from '../../../components/ui/';
import { getUserPlate } from '../../../lib/user';

// Style
import style from './style';

const UserMessageCard = props => {
  const { active, count, onPress, message, user } = props;
  const plate = getUserPlate(user);
  let cardStyle = style.view;
  let messageStyle = style.message;

  if (active) {
    cardStyle = { ...cardStyle, ...style.activeView };
    messageStyle = { ...messageStyle, ...style.messageActive };
  }

  return (
    <TouchableHighlight activeOpacity={1} underlayColor="transparent" onPress={onPress}>
      <View style={cardStyle}>
        <Grid style={style.grid}>
          <Col style={style.avatar}>
            <Avatar user={user} small />
          </Col>
          <Col>
            <Grid style={style.contentGrid}>
              <Col size={85}>
                <Text style={style.title}>
                  {user.fullname}
                  {' • '}
                  {plate.name}
                </Text>
                <Text style={messageStyle}>{message}</Text>
              </Col>
              <Col size={15}>
                {count > 0 ? (
                  <Badge style={style.badge}>
                    <Text style={style.count}>{count}</Text>
                  </Badge>
                ) : (
                  <Icon style={style.icon} name="arrow-forward" />
                )}
              </Col>
            </Grid>
          </Col>
        </Grid>
      </View>
    </TouchableHighlight>
  );
};

UserMessageCard.defaultProps = {
  active: false,
  count: 0
};

UserMessageCard.propTypes = {
  active: PropTypes.bool,
  count: PropTypes.number,
  onPress: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default UserMessageCard;
