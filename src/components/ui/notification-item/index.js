import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';
import { Text, View } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import { Avatar } from '../../../components/ui/';

// Style
import style from './style';

timeConverter = (UNIX_timestamp) => {
  var a = new Date(UNIX_timestamp);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}


const NotificationItem = props => {
  const {
    notification,
    notification: { friend, type, status,createdAt },
    handlePress
  } = props;
  let typeText = '';

  switch (type) {
    case 1:
      typeText = `Size arkadaşlık isteği gönderdi`;
      break;
    case 2:
      typeText = `Arkadaşlık isteğinizi onayladı`;
      break;
    case 3:
      typeText = `Mesaj gönderdi`;
      break;
  }


  return (
    <TouchableHighlight
      style={{ elevation: 0 }}
      activeOpacity={1}
      underlayColor="transparent"
      onPress={() => handlePress(notification)}
    >
      <View style={style.view}>
        <Grid style={status == 1 ? [style.grid, style.gridRead] : style.grid}>
          <Col style={style.avatar}>
            <Avatar user={friend} small />
          </Col>
          <Col>
            <Text style={style.title}>{friend.fullname}</Text>
  <Text>{timeConverter(createdAt)}</Text>
            <Text style={style.slug}>{typeText}</Text>
          </Col>
        </Grid>
      </View>
    </TouchableHighlight>
  );
};

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired,
  handlePress: PropTypes.func.isRequired
};

export default NotificationItem;
