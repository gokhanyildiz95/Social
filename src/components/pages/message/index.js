import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, ScrollableTab, Tab, Tabs, Text } from 'native-base';
import { ScrollView, StatusBar, View, BackHandler } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import _ from 'lodash';

import Socket from '../../../api/socket';
import { defaultColors } from '../../../config/style';
import { Footer } from '../../../components/common/';
import { UserMessageCard, SearchInput } from '../../../components/ui/';
import { getChats } from '../../../api/chat';

import style from './style';

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      search: ''
    };

    this.renderUserMessageCard = this.renderUserMessageCard.bind(this);
    this.chatReceived = this.chatReceived.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.setChats();
    this.chatActivitySocket();
  }


  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    BackHandler.exitApp();
    return true;
  }

  componentDidUpdate(prevProps) {
    const { isFocused } = this.props;
    if (prevProps.isFocused !== isFocused && isFocused) {
      console.log('cdu isFocused: ' + isFocused);
      this.setChats();
      this.chatActivitySocket();
    }
  }

  // Kullanıcının chatlerini getirir
  async setChats() {
    try {
      const chats = await getChats();

      this.setState(() => ({
        list: chats
      }));
      this.chatFilter()
    } catch (err) {
      console.log('setChats Error: ', err);
      // Ignore
    }
  }

  // Chat güncellendiğinde state list'e tanımlar
  chatReceived(chat) {
    this.setState(({ list }) => {
      const key = _.findKey(list, { id: chat.id });

      if (key !== undefined) {
        list[key] = chat;
      } else {
        list.push(chat);
      }

      return {
        list
      };
    });
  }

  // Chat aktivitelerini takip edip chati günceller
  chatActivitySocket() {
    if (this.socket && this.socket.connect) {
      return;
    }

    const {
      user: { user }
    } = this.props;

    this.socket = new Socket({
      connect: socket => {
        // Mesaj aktivitelerini almak izni için kayıt
        socket.get('/subscribe/chat');
        // Mesaj aktivitelerini alır
        socket.on(`chat-activity-receive/${user.id}`, this.chatReceived);
      }
    });
  }

  // Chatin içinde search textini arar
  chatSearch(chat) {
    const { search } = this.state;
    const searchText = search.toLowerCase();
    let isExists = false;

    if (!search) {
      return true;
    }

    const searchArr = [];

    searchArr.push(chat.friend.fullname);
    searchArr.push(chat.friend.email);
    if (chat.friend.plates) {
      chat.friend.plates.map(plate => {
        searchArr.push(plate.name);
      });
    }

    searchArr.map(text => {
      if (text.toLowerCase().indexOf(searchText) > -1) {
        isExists = true;
      }
    });

    return isExists;
  }

  // Chatleri filtrelemek için kullanılır 0 = hepsi, 1 = istek, 2 engellenmiş
  chatFilter(status = 0) {
    const {
      user: { user }
    } = this.props;
    const { list } = this.state;
    const userMessageCards = [];
    if (list.length > 0) {
      list.sort((a, b) => a.lastMessage && b.lastMessage ? a.lastMessage.createdAt - b.lastMessage.createdAt : null).reverse().map((chat, key) => {
        console.log(chat.lastMessage)
        console.log("======================= chat")
        console.log(chat)
        // const isBlocked = await getBlockState({ blockedUserId: chat.friend.id });
        // if(!isBlocked.status)
        if (chat.status === status && this.chatSearch(chat)) {
          if (status == 2 && chat.blockedUserId === user.id) {
            return false;
          }

          userMessageCards.push(this.renderUserMessageCard(chat, key));
        }
      });
    }
    else { }
    if (userMessageCards.length == 0) {
      return <Text style={{ textAlign: 'center', marginTop: 15, fontSize: 14, color: 'grey' }}>Bulunamadı.</Text>
    } else {
      return userMessageCards;
    }
  }

  // Search textini state'e tanımlar
  handleSearchChange(searchText) {
    this.setState(() => ({
      search: searchText
    }));
  }

  // Chat mesajlarını render eder
  renderUserMessageCard(chat, key) {
    const { navigation } = this.props;
    const opts = {
      key,
      onPress: () => {
        // Mesajlara yönlendiriyor
        console.log("chat.friend")
        console.log(chat.friend)
        navigation.navigate('Chat', {  friendId: chat.friend.id });
      },
      user: chat.friend
    };

    if (chat.unreadMessages) {
      opts.active = true;
      opts.count = chat.unreadMessages.length;
      opts.message = chat.unreadMessages[0].message;
    }

    if (chat.lastMessage) {
      opts.message = chat.lastMessage.message;
    }

    return <UserMessageCard {...opts} />;
  }

  render() {
    const { search } = this.state;

    return (
      <Container>
        <StatusBar translucent backgroundColor={defaultColors.bg.dark} barStyle="dark-content" />
        <Header style={style.header}>
          <Grid style={style.headerGrid}>
            <Col style={style.headerGridCol}>
              <View>
                <Text style={style.title}>Mesajlar</Text>
              </View>
            </Col>
            <Col style={style.headerLastCol}>
              <SearchInput value={search} handleChange={this.handleSearchChange} />
            </Col>
          </Grid>
        </Header>
        <Tabs
          renderTabBar={() => (
            <ScrollableTab
              style={style.scrollTab}
              tabsContainerStyle={style.scrollTabsContainer}
              underlineStyle={style.tabUnderline}
            />
          )}
          tabBarUnderlineStyle={style.tabBarUnderline}
        >
          <Tab
            style={style.tabContent}
            tabStyle={[style.tab, style.firstTab]}
            activeTabStyle={[style.activeTab, style.firstActiveTab]}
            textStyle={style.tabText}
            activeTextStyle={style.activeTabText}
            heading="Hepsi"
          >
            <ScrollView style={style.scrollView}>
              <View style={style.scrollViewContent}>{this.chatFilter(0)}</View>
            </ScrollView>
          </Tab>
          <Tab
            style={style.tabContent}
            tabStyle={style.tab}
            activeTabStyle={style.activeTab}
            textStyle={style.tabText}
            activeTextStyle={style.activeTabText}
            heading="Engellenmiş"
          >
            <ScrollView style={style.scrollView}>
              <View style={style.scrollViewContent}>{this.chatFilter(2)}</View>
            </ScrollView>
          </Tab>
        </Tabs>
        <Footer />
      </Container>
    );
  }
}

Message.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default Message;
