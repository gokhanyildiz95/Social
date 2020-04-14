import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';
import { Badge, Text, Icon, View, Button } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';

import { Avatar } from '../../../components/ui/';
import { getUserPlate } from '../../../lib/user';

// Style
import style from './style';

const UserConnectionCard = props => {
  const { active, count, onPress, message, user } = props;
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
              <Col size={30}>
                <Text style={style.title}>
                  {user.fullname}
                </Text>
               </Col>
              <Col size={35}>
              <Button rounded  small  primary><Text>Onay</Text></Button>
            </Col>
           <Col size={35}>
               <Button rounded  small  danger><Text>Reddet</Text></Button>
           </Col>
            </Grid>
          </Col>
        </Grid>
      </View>
    </TouchableHighlight>
  );
};

UserConnectionCard.defaultProps = {
  active: false,
  count: 0
};

UserConnectionCard.propTypes = {
  active: PropTypes.bool,
  count: PropTypes.number,
  onPress: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default UserConnectionCard;
