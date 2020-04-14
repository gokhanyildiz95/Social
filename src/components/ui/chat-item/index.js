import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import { Text, View } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import { Avatar } from '../../../components/ui/';
import imageUrl from '../../../lib/image/';
import Lightbox from 'react-native-lightbox';
import { timeDifference } from '../../../lib/user';

// Style
import style from './style';

const ChatItem = props => {
  const { user, message, friend } = props;
  const owner = friend.id === message.receiverId;

  let avatarStyle = style.avatar;
  let messageContentStyle = style.messageContent;
  let messageStyle = style.message;

  if (owner) {
    avatarStyle = { ...avatarStyle, ...style.avatarOwner };
    messageContentStyle = [messageContentStyle, style.messageContentOwner];
    messageStyle = [messageStyle, style.messageOwner];
  }

  const avatarCol = (
    <Col style={avatarStyle}>
      <Avatar small user={user} />
    </Col>
  );

  return (
    <View style={style.item}>
      <Grid style={style.grid}>
        {!owner && avatarCol}
        <Col>
          <View style={messageContentStyle}>
            {message.message !== null && <Text selectable={true}  selectionColor="red"  style={messageStyle}>{message.message}</Text>}
            {message.attachments && message.attachments.filename && (
              <React.Fragment>
                <Lightbox  style={{ width: '100%', height:200  }}>
                  <Image
                    resizeMode="contain"
                    style={{ width: '100%', height:'100%'  }}
                    source={{ uri: imageUrl(message.attachments.filename) }}
                  />
                </Lightbox>
              </React.Fragment>
            )}
          </View>
          <Text style={style.date}>{timeDifference(new Date(),message.createdAt)}</Text>
        </Col>
        {owner && avatarCol}
      </Grid>
    </View>
  );
};

ChatItem.propTypes = {
  user: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  friend: PropTypes.object.isRequired
};

export default ChatItem;
