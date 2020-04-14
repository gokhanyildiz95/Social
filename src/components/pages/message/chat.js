import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, View, Header, Footer, Text, Icon } from 'native-base';
import { FlatList, KeyboardAvoidingView, StatusBar, TouchableHighlight, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import OptionsMenu from 'react-native-options-menu';

import Socket from '../../../api/socket';
import { Button, ChatItem, Input } from '../../../components/ui/';
import { getUser } from '../../../api/user';
import { setBlockUser, getBlockState, unsetBlockUser } from '../../../api/block';
import { setFavoriteUser, unsetFavoriteUser } from '../../../api/favorite';
import Notification from '../../../lib/notification';

import { getChat, setBlockFriend, setUnblockFriend, deleteChat } from '../../../api/chat';
import {
  getChatMessages,
  setChatMessage,
  setReadAllChatMessages,
  setReadChatMessage
} from '../../../api/chat-message';
import ImagePicker from '../../../lib/image-picker';
import { getUserPlate } from '../../../lib/user';
import { defaultColors } from '../../../config/style';

import style from './chat-style';

class Chat extends Component {
  constructor(props) {
    super(props);

    const {
      navigation: {
        state: {
          params: { friendId }
        }
      }
    } = props;

    this.state = {
      chat: {},
      chatMessages: [],
      friend : {},
      form: {
        message: ''
      },
      friendId
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePhotoSubmit = this.handlePhotoSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.messageReceived = this.messageReceived.bind(this);
    this.chatReceived = this.chatReceived.bind(this);
    this.handleImagePicker = this.handleImagePicker.bind(this);
    this.handleBlockFriend = this.handleBlockFriend.bind(this);
    this.handleDeleteChat = this.handleDeleteChat.bind(this);
    this.handleUnblockFriend = this.handleUnblockFriend.bind(this);
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.setFriend();
    this.setChat();
   
  }

  componentWillUnmount() {
    this.backHandler.remove()
    if (this.socket) {
      this.socket.socket.disconnect();
      this.socket = undefined;
    }
  }

  handleBackPress = () => {
    console.log("chat")
    const { navigation } = this.props;
    navigation.goBack();
    // return true;
  }
  // Chat idsini alıyoruz eğer yoksa oluşturuluyor
  async setChat() {
    const { friendId } = this.state;
    console.log("friendId :" +friendId)
    const chat = await getChat({ friendUserId: friendId });
    console.log("friendId :" +friendId)
    console.log(chat)
    await setReadAllChatMessages({ chatId: chat.id });
    this.setState(() => ({ chat }));
    this.getChatMessages();
  }

  // Konuşma geçmişini getirir
  async getChatMessages() {
    const { chat } = this.state;
    const chatMessages = await getChatMessages({
      where: { chatId: chat.id },
      sort: 'createdAt DESC'
    });

    this.setState(() => ({
      chatMessages
    }));

    console.log(this.state.chatMessages);
    this.chatMessageActivitySocket();
  }

  // Kullanıcıyı state e tanımlar
  async setFriend() {
    const { friendId } = this.state;
    const user = await getUser(friendId);
    console.log("user")
    console.log(user)
    const isBlocked = await getBlockState({ blockedUserId: friendId });
    console.log("-----------isBlocked")
    console.log(isBlocked)
    if (isBlocked.status) {
      this.handleBlockFriend(false)
    }
    else {
      this.handleUnblockFriend()
    }
    this.setState(() => ({ friend: user }));
  }

  // Fotoğraf seçiciyi çalıştırır
  handleImagePicker() {
    new ImagePicker({
      success: this.handlePhotoSubmit
    });


  }

  // Fotoğraf gönderir
  handlePhotoSubmit({ file: files }) {
    const { friend, chat } = this.state;
    const form = {};

    files.map(file => {
      form.attachments = { filename: file.filename };
    });

    form.receiverId = friend.id;
    form.chatId = chat.id;
    console.log(files,"files")
    Alert.alert(
      'Uyarı',
      'Resim gönderilsinmi',
      [
        { text: 'Sil', onPress: () => { } },
        {
          text: 'Gönder', onPress: () => setChatMessage(form)
        },
      ],
      { cancelable: false },
    );
  }

  // Yeni mesaj gönderildiği zaman mesajı state e tanımlar
  messageReceived(message) {
    const {
      user: { user }
    } = this.props;

    // Mesajın durumunu okundu yapıyor
    if (user.id === message.receiverId) {
      setReadChatMessage({ messageId: message.id });
    }

    this.setState(({ chatMessages }) => {
      chatMessages.unshift(message);
      return {
        chatMessages
      };
    });
  }

  // Mesaj aktivitelerini takip edip kullanıcıyı günceller
  chatMessageActivitySocket() {
    if (this.socket && this.socket.connect) {
      return;
    }
    const { chat } = this.state;
    const {
      user: { user }
    } = this.props;

    this.socket = new Socket({
      connect: socket => {
        // Mesaj aktivitelerini almak izni için kayıt
        socket.get('/subscribe/chat');
        // Mesaj aktivitelerini alır
        socket.on(`chat-message-activity-receive/${chat.id}`, this.messageReceived);
        // Mesaj aktivitelerini alır
        socket.on(`chat-activity-receive/${user.id}`, this.chatReceived);
      }
    });

  }

  // Chat güncellendiğinde state chat'e tanımlar
  chatReceived(chat) {
    const { chat: prevChat } = this.state;

    if (chat.id == prevChat.id) {
      this.setState(() => ({
        chat
      }));
    }
  }

  // Mesaj Gönderir
  handleSubmit() {
    const { form, friend, chat } = this.state;
    const { user: { user } } = this.props;

    const { navigation } = this.props;
    // const {
    //   state: {
    //     params: { friend, user }
    //   }
    // } = navigation;

    const notification = new Notification({ navigation });
    if (!form.message) {
      return false;
    }

    form.receiverId = friend.id;
    form.chatId = chat.id;

    setChatMessage(form);
    const props2 = { user: user, friend: friend, type: 3, additionalData: form };
    notification.show(props2, "Chat");
    this.setState(() => ({
      form: {
        message: ''
      }
    }));
  }

  // Message textini günceller
  handleChange(name, text) {
    this.setState(() => ({
      form: {
        message: text
      }
    }));
  }

  // Message textini günceller
  handleDeleteChat() {
    const { chat } = this.state;
    const { navigation } = this.props;
    deleteChat(chat.id).then(() => {
      navigation.goBack();
    })
  }

  // Kullanıcıyı bloklar
  handleBlockFriend(isBlock = true) {
    const { chat, friend } = this.state;
    setBlockFriend({ chatId: chat.id }).then(updatedChat => {
      if (isBlock) {
        setBlockUser({ blockedUserId: friend.id }).then(asd => { console.log("engelledniii") });
        unsetFavoriteUser({ favoritedUserId: friend.id }).then(asd => { console.log("engelledniii") });
      }
      this.setState(() => ({
        chat: updatedChat
      }));
    })
      .catch((error) => {
        console.log(error);
      });

  }

  // Kullanıcının bloğunu kaldırır
  handleUnblockFriend() {
    const { chat, friend } = this.state;

    setUnblockFriend({ chatId: chat.id }).then(updatedChat => {
      unsetBlockUser({ blockedUserId: friend.id }).then(asd => { console.log("engel kaldırıldı") });
      this.setState(() => ({
        chat: updatedChat
      }));
    });
  }

  // Options menu render
  renderOptionsMenu() {
    const { chat } = this.state;
    const opts = {
      customButton: <Icon name="ellipsis-v" type="FontAwesome" style={style.navIcon} />,
      destructiveIndex: 0,
      options: ['Engelle', 'Sohbeti Sil'],
      actions: [this.handleBlockFriend, this.handleDeleteChat]
    };

    if (chat.status == 2) {
      opts.options = ['Engeli Kaldır'];
      opts.actions = [this.handleUnblockFriend, this.handleDeleteChat];
    }

    return <OptionsMenu {...opts} />;
  }

  // Options menu render
  renderFooter() {
    const {
      user: { user }
    } = this.props;
    const {
      chat,
      form: { message }
    } = this.state;

    return (
      <Footer style={style.footer}>
        {chat.status !== 2 ? (
          <Grid style={style.footerGrid}>
            <Col size={15} style={[style.footerGridCol, style.footerGridFirstCol]}>
              <Button
                size="s"
                icon="add"
                color="blue"
                rounded
                extraStyle={style.plusButton}
                extraIconStyle={style.plusIcon}
                onPress={this.handleImagePicker}
              />
            </Col>
            <Col size={70} style={style.footerGridCol}>
              <Input
                multiline
                value={message}
                onChange={this.handleChange}
                extraStyle={style.messageInputContent}
                extraInputStyle={style.messageInput}
              />
            </Col>
            <Col size={15} style={[style.footerGridCol, style.footerGridLastCol]}>
              <TouchableHighlight onPress={this.handleSubmit} style={style.touchableHighlight}>
                <Icon name="send" type="MaterialIcons" style={style.sendIcon} />
              </TouchableHighlight>
            </Col>
          </Grid>
        ) : user.id == chat.blockedUserId ? (
          <Text style={style.blockText}>Engellendiniz</Text>
        ) : (
              <Text style={style.blockText}>Kullanıcı Engellendi</Text>
            )}
      </Footer>
    );
  }

  render() {
    const {
      navigation,
      user: { user }
    } = this.props;
    const { chatMessages, friend } = this.state;
    // const plate = getUserPlate(user);
    const friendPlate = getUserPlate(friend);
    const optionsMenu = this.renderOptionsMenu();
    const footer = this.renderFooter();

    return (
      <Container>
        <StatusBar translucent backgroundColor={defaultColors.bg.dark} barStyle="dark-content" />
        <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
          <View style={style.headerContainer}>
            <Header style={style.header}>
              <Grid style={style.headerGrid}>
                <Col size={15} style={[style.headerGridCol, style.headerGridFirstCol]}>
                  <Button
                    onPress={() => {
                      navigation.goBack();
                    }}
                    icon="arrow-back"
                    color="transparent"
                    extraIconStyle={style.backButton}
                  />
                </Col>
                <Col size={70} style={style.headerGridCol}>
                  <TouchableOpacity onPress={() => navigation.navigate('Profile', { friendId : friend.id })}>
                    <Text style={style.title}>
                      {friend.fullname ? friend.fullname : ''}
                      {' • '}
                      {friendPlate.name ? friendPlate.name : ''}
                    </Text>
                  </TouchableOpacity>
                </Col>
                <Col size={15} style={[style.headerGridCol, style.headerGridLastCol]}>
                  {optionsMenu}
                </Col>
              </Grid>
            </Header>
          </View>
          <View style={style.content}>
            <FlatList
              inverted={-1}
              ref={ref => (this.flatList = ref)}
              extraData={this.state}
              data={chatMessages}
              renderItem={({ item: message, index }) => {
                return <ChatItem user={message.receiverId == user.id ? friend : user} key={index} message={message} friend={friend} />;
              }}
              removeClippedSubviews={false}
              enableEmptySections
              keyExtractor={(item, index) => index}
            />
          </View>
          {footer}
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

Chat.propTypes = {
  navigation: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default Chat;
