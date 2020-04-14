import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, ScrollableTab, Tab, Tabs, Text, Button, Icon } from 'native-base';
import { ScrollView, StatusBar, RefreshControl, View } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import _ from 'lodash';
import { getUsers } from '../../../api/user'; 

import { defaultColors } from '../../../config/style';
import { Footer } from '../../../components/common/';
import { UserCard, UserConnectionRequest } from '../../../components/ui/';

import style from './style';
import { getFriendRequest } from '../../../api/friend';

class Connection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      search: '',
      refreshing: false,
      friends: [],
      refreshing: false,
      friendRequest: [],
      sendedRequest: [],

      timer: null,
    };
    this.handlePress = this.handlePress.bind(this);

    this.setUserFriends = this.setUserFriends.bind(this);
    this.setUserFriendRequests = this.setUserFriendRequests.bind(this);
    this.setSendedFriendRequest = this.setSendedFriendRequest.bind(this);

  }

  componentDidMount() {
    this.setUserFriendRequests();
    this.setSendedFriendRequest();
    this.setUserFriends();
  }

  async setUserFriendRequests() {
    const { user } = this.props;
    this.setState({ refreshing: true });
    const id = user.user.id;
    const users = await getFriendRequest({ userId: id });
    const userIds = [];
   // console.log("MAAAAAAAA", users);
    users.forEach(element => {
      if (element.status === 0) {
        userIds.push(element.userId);
      }
    });
    const userss = await getUsers({ where: { id: userIds } });
    this.setState(() => ({ friendRequest: userss }));
    this.setState({ refreshing: false });
  }

  async setSendedFriendRequest() {
    this.setState({ refreshing: true });
    const { user, setUserInfo } = this.props;
    const a = user.user;
    const userIds = [];
    a.friends.forEach(element => {
      if (element.userId === user.user.id && element.status === 0) {
        userIds.push(element.friendUserId);
      }
    });
    const users = await getUsers({ where: { id: userIds } });
    this.setState(() => ({ sendedRequest: users }));
    console.log("MYLIST", users)
    setUserInfo();
    this.setState({ refreshing: false });
  }

  async setUserFriends() {
    this.setState({ refreshing: true });
    const { user, setUserInfo } = this.props;
    const a = user.user;
    const userIds = [];
    a.friends.forEach(element => {
      if (element.status == 1) {
        userIds.push(element.friendUserId);
      }
    });
    const users = await getUsers({ where: { id: userIds } });
    this.setState(() => ({ friends: users }));
    console.log("MYLIST", userIds);
    setUserInfo();
    this.setState({ refreshing: false });
  }

  handlePress(friend) {
    const { navigation } = this.props;
    navigation.push('Profile', { friendId: friend.id });

  }

  componentDidMount() {
    let timer = setInterval(this.tick, 5000);
    this.setState({ timer });
  }

  componentWillUnmount() {
    this.clearInterval(this.state.timer);
  }

  tick = () => {
    this.setState({
      refreshing: true
    });
    this.setUserFriendRequests();
    this.setUserFriends();
    this.setSendedFriendRequest();

  }

  render() {
    const { friends, friendRequest, sendedRequest } = this.state;

    return (
      <Container>
        <StatusBar translucent backgroundColor={defaultColors.bg.dark} barStyle="dark-content" />
        <Header style={style.header}>
          <Grid style={style.headerGrid}>
            <Col style={style.headerGridCol}>
              <View>
                <Text style={style.title}>Bağlantılarım</Text>
              </View>
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
            heading="İstekler"
          >
            <ScrollView

              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.setUserFriendRequests}
                />
              }
              style={style.scrollView}>
              {friendRequest.length != 0 ?
                <View style={style.scrollViewContent}>
                  {friendRequest.map(friendRequest => (
                    <UserConnectionRequest
                      key={friendRequest.id}
                      user={friendRequest}
                      handlePress={this.handlePress}
                    />
                  ))}
                </View> : <View style={style.scrollViewContent}><Text style={{ textAlign: 'center', fontSize: 12, color: 'grey' }}>Yeni isteğiniz yok</Text></View>}
            </ScrollView>
          </Tab>
          <Tab
            style={style.tabContent}
            tabStyle={style.tab}
            activeTabStyle={style.activeTab}
            textStyle={style.tabText}
            activeTextStyle={style.activeTabText}
            heading="Bağlantılarım"
          >
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.setUserFriends}
                />
              }
              style={style.scrollView}>
              {friends.length != 0 ?
                <View style={style.scrollViewContent}>
                  {friends.map(friend => (
                    <UserCard key={friend.id} user={friend} handlePress={this.handlePress} />
                  ))}
                </View> : <Text style={{ textAlign: 'center', fontSize: 12, color: 'grey' }}>Üzgünüm hiç bağlantınız yok</Text>}
            </ScrollView>
          </Tab>

          <Tab
            style={style.tabContent}
            tabStyle={style.tab}
            activeTabStyle={style.activeTab}
            textStyle={style.tabText}
            activeTextStyle={style.activeTabText}
            heading="Gönderdiklerim"
          >
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.setSendedFriendRequest}
                />
              }
              style={style.scrollView}>
              {sendedRequest.length != 0 ?
                <View style={style.scrollViewContent}>
                  {sendedRequest.map(friend => (
                    <UserCard key={friend.id} user={friend} handlePress={this.handlePress} />
                  ))}
                </View> : <Text style={{ textAlign: 'center', fontSize: 12, color: 'grey' }}>Hiç istek göndermediniz.</Text>}
            </ScrollView>
          </Tab>

        </Tabs>
        <Footer />
      </Container>
    );
  }
}

Connection.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setUserInfo: PropTypes.func
};

export default Connection;
