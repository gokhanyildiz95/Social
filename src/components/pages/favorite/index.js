import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar,BackHandler } from 'react-native';
import { Content, Container } from 'native-base';

import { defaultColors } from '../../../config/style';
import { UserCard } from '../../../components/ui/';
import { getFavorites } from '../../../api/favorite';
import Header from './header';

import style from './style';

// Bildirim listeme ekranı
class Favorite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favoriteUsers: []
    };

    this.handlePress = this.handlePress.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    const { navigation } = this.props;
    this.getFavorites();
    navigation.addListener('willFocus', this.getFavorites);
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    const { navigation } = this.props;
    navigation.goBack();
    return true;
  }


  async getFavorites() {
    const favoriteUsers = await getFavorites();

    this.setState(() => ({
      favoriteUsers
    }));
  }

  // Kullanıcı yönlendirmesi yapar
  handlePress(friend) {
    const { navigation } = this.props;
    // Profile yönleniyor
    navigation.navigate('Profile', { friendId : friend.id });
  }

  render() {
    const { navigation } = this.props;
    const { favoriteUsers } = this.state;

    return (
      <Container>
        <StatusBar translucent backgroundColor={defaultColors.bg.dark} barStyle="dark-content" />
        <Header navigation={navigation} />
        <Content style={style.listContent}>
          {favoriteUsers.map(user => (
            <UserCard
              extraStyle={style.userCard}
              key={user.id}
              user={user}
              handlePress={this.handlePress}
            />
          ))}
        </Content>
      </Container>
    );
  }
}

Favorite.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Favorite;
