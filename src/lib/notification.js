import { showMessage } from 'react-native-flash-message';
import { setAcceptToRequest, getRelation, setDeclineToRequest } from '../api/friend';
import firebase from 'react-native-firebase'
import { defaultColors } from '../config/style';
import PropTypes from 'prop-types';
import {setNotifications} from '../store/actions/notification'
import { connect } from 'react-redux';

// Ekranda bildirim göstermek için kullanılır
class Notification {
  constructor(props) {
    this.props = props;
  }

  async getFriendStatus(userId, friendUserId) {
    const relation = await getRelation({ userId: userId, friendUserId: friendUserId });
    return relation;
  }
  async show(notification, currentPage) {

    console.log(" this.props")
    console.log(this.props)
    const { user, friend, type, additionalData, reason, istekTipi } = notification;
    const {
      navigation: { navigate },
    } = this.props;
    const fullname = friend.fullname;
    const messageData = {
      message: "\n" + friend.fullname,
      backgroundColor: defaultColors.bg.messageDark,
      duration: 5000
    };
    let push_message = "";
    // Arkadaşlık isteği geldi
    if (type == 1) {
      // alert(user.id + "   " + friend.id)
      let data = await this.getFriendStatus(user.id, friend.id)
      console.log(" ================================================================================ ")
      console.log(data)
      let reason_api = data.reason
      let messageg = ""
      if (reason == "1" || reason_api == "1") messageg = "Trafik"
      else if (reason == "2" || reason_api == "2") messageg = "Tanışmak"
      else if (reason == "3" || reason_api == "3") messageg = "Araba"
      else if (reason == "4" || reason_api == "4") messageg = "Diğer"
      else {
        messageg = "Diğer";
      }
      if (messageg != "") {
        if (reason) {
          messageData.description = 'Arkadaşlık isteği gönderildi. \nSosyalleşme sebebi: ' + messageg;
          push_message = 'Arkadaşlık isteği gönderdi. \nSosyalleşme sebebi: ' + messageg;
          messageData.onPress = () => navigate('Profile', { friendId : user.id });
          let fcmToken = friend.fcmToken;

          this.sendPush(fcmToken, title, body,user.id,type === 3 ? 0 : 1)
         

        }
        else {
          console.log("FRIIIEND")
          console.log(friend)
          messageData.description = 'Arkadaşlık isteği gönderdi. \nSosyalleşme sebebi: ' + messageg;
          messageData.onPress = () => navigate('Profile', { friendId : friend.id });
        }
      }
      else {
        return null;
      }
    }

    // Arkadaşlık isteği onaylandı
    if (type == 2) {
      messageData.description = 'Arkadaşlık isteğiniz onaylandı';

      messageData.onPress = () => navigate('Profile', { friendId : user.id });
    }

    // Mesaj gönderildi
    if (type == 3) {
      if (currentPage == 'Message' || currentPage == 'Chat') {
        let fcmToken = friend.fcmToken;
        let body = user.fullname + "\n" + additionalData.message;
        let title = "Social Traffic"
        this.sendPush(fcmToken, title, body,user.id,type === 3 ? 0 : 1)
        console.log(fcmToken)
        return false;
      }
      messageData.description = additionalData.message;
      messageData.onPress = () => navigate('Chat', { friendId : friend.id });

    }

    if (type == 4) {

      if (istekTipi == "gerialma") {
        messageData.description = 'Arkadaşlık isteğini geri alındı';
        messageData.onPress = () => navigate('Search');
      }
      else if (istekTipi == "red") {
        messageData.description = 'Arkadaşlık isteği reddedildi';
        messageData.onPress = () => navigate('Search');
      }
      else {
        return null;
      }
    }
    // const fcmToken = 'dLekuR5i-9A:APA91bGOT5ipe8rrtnQcjZ5VE9cc3BlBLZn5NafgWelFSSKL0z_LhKTczkWm84GhuPSxppRSHRh_Cny6F8T4-vj9HGNEsDNnKmul6EJ2-npXgtv1g45xD734v53AnYNo7Ouiv3YXpX-2'; //Device Key
    //const fcmToken = 'eHxclVoZ5SY:APA91bFQEp1_6szYlEi-eLoOT_LTXWZLTatuvNcKij__1tIjPnvqGTiwKHqFH863gEo6-j05H4114cYBlu4FPX9buvClwZcpVyH7gf1-DGLOs72pIlJzoPv6i90_giGmG7vqCNkuL1PY'; //Device Key
    console.log(user)
    let fcmToken = friend.fcmToken;
    let body = "";
    if (type == 3) {
      if (push_message == "") {
        body = user.fullname + "\n" + messageData.description;
      }
      else body = user.fullname + "\n" +push_message;
    }
    else { body = user.fullname + " " + messageData.description; }
    console.log(fcmToken)
    let title = "Social Traffic"
    this.sendPush(fcmToken, title, body,user.id,type === 3 ? 0 : 1)
    showMessage(messageData);
    console.log(this.props.user, " user s" )
 

  }

  async sendPush(referenceKey, title, body,senderUserId,notificaitonType) {

    const FIREBASE_API_KEY = 'AAAAox9Yu7U:APA91bFQxKaOCoZOd-D5gAw0m1MhbLxgmhGXpk3UYEuxf02NS4cx95Bl6MTgtwKF3T-Q3rUNV5bwt_9-1rbwHWoSZL9ZzMIsDn4iRztt5O4cRZCplahNVR6RwzTYiqExGS0peWk5vuqL';
    const message = {
      registration_ids: [referenceKey],
      notification: {
        title: title,
        body: body,
        "vibrate": 1,
        "sound": 1,
        "show_in_foreground": true,
        "priority": "high",
        "content_available": true,
      },
      data: {
        title: title,
        body: body,
        score: 50,
        wicket: 1,
        id : senderUserId,
        type : notificaitonType
      }
    }

    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": "key=" + FIREBASE_API_KEY
    });

    let response = await fetch("https://fcm.googleapis.com/fcm/send", { method: "POST", headers, body: JSON.stringify(message) })
    response = await response.json();
    console.log(response);

  }

}

Notification.propTypes = {
  setNotifications: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

// setNotifications



// const mapDispatchToProps = {
//   setNotifications
// };

// export default connect(null,
//   mapDispatchToProps
// )(Notification);


export default Notification;
