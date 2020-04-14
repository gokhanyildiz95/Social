import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View } from 'react-native';
import { Content, Container, List, Button, Icon, Toast, Text } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';

import { defaultColors } from '../../../config/style';
import { NotificationItem } from '../../../components/ui/';
import { connect } from 'react-redux';
import Header from './header';

import style from './style';

// Bildirim listeme ekranı
class Notification extends Component {
  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);
  }

  // Notification yönlendirmesi yapar
  handlePress(notification) {
    const { navigation, setReadNotification } = this.props;

    // Bildirimi okundu olarak işaretliyor
    setReadNotification(notification.id);

    // Notification tipi 3 ise chat e yönlendiriyor
    if (notification.type === 3) {
      navigation.navigate('Chat', { friendId: notification.friend.id });
      return;
    }

    // Değilse profile yönleniyor
    navigation.navigate('Profile', { friendId: notification.friend.id });
  }

  // Notification silme işlemi yapar
  async handleDeleteNotification(notification, rowMap) {
    const { setDeleteNotification } = this.props;

    // Silme isteği gönderiyor
    setDeleteNotification(notification.item.id);

    // Listview içindeki satırı kapatıyor 
    rowMap[notification.index].closeRow()
    //rowMap[`${secId}${rowId}`].props.closeRow();
  }

  componentDidMount() {
    const {
      notification: { list },
      navigation
    } = this.props;
    // let newlist = list.sort((a, b) => a.createdAt > b.createdAt)
    // console.log(list) //createdAt
    // console.log(newlist) //createdAt
    Toast.show({
      text: "Sola kaydırarak bildirimleri silebilirsin.",
      buttonText: "Tamam",
      buttonStyle: { backgroundColor: "#5cb85c" },
      duration: 30000
    })
  }

  render() {
    const {
      notification: { list },
      navigation
    } = this.props;
    console.log(this.props.notification.list,"renderlist")



    return (
      <Container>
        <StatusBar translucent backgroundColor={defaultColors.bg.dark} barStyle="dark-content" />
        <Header navigation={navigation} />
        <Content>
          <SwipeListView
            disableRightSwipe
            data={this.props.notification.list}
            renderItem={notification => (
              <NotificationItem notification={notification.item} handlePress={this.handlePress} />
            )}
            renderHiddenItem={(notification, rowMap) => (
              <View style={{
                alignItems: 'center',
                backgroundColor: '#fff',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 60,
                    height: '100%',
                    backgroundColor: '#d9534f',
                  }}>
                  <Button
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 60,
                      height: '100%',
                      backgroundColor: '#d9534f',
                    }}
                    full
                    danger
                    onPress={_ => this.handleDeleteNotification(notification, rowMap)}
                  >
                    <Icon active name="trash" />
                  </Button>
                </View>
              </View>
            )}
            leftOpenValue={0}
            rightOpenValue={-60}

          />


          {/* <List
            rightOpenValue={-75}
            dataSource={list}
            renderRow={notification => (
              <NotificationItem notification={notification} handlePress={this.handlePress} />
            )}
            renderRightHiddenRow={(notification, secId, rowId, rowMap) => (
              <Button
                full
                danger
                onPress={_ => this.handleDeleteNotification(notification, secId, rowId, rowMap)}
              >
                <Icon active name="trash" />
              </Button>
            )}
          /> */}
        </Content>
      </Container>
    );
  }
}

Notification.propTypes = {
  user: PropTypes.object.isRequired,
  notification: PropTypes.object.isRequired,
  setReadNotification: PropTypes.func.isRequired,
  setNotifications: PropTypes.func.isRequired,
  setDeleteNotification: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
};





// const mapStateToProps = state => {
//   return {
//     notification: state.notification,
//   };
// };

// // const mapDispatchToProps = {
// //   setNotifications
// // };

// export default connect(
//   mapStateToProps
// )(Notification);

export default Notification;


