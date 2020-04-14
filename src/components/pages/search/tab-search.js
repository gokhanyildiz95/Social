import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Icon, View, Spinner } from 'native-base';
import { TouchableHighlight,ImageBackground ,ScrollView} from 'react-native';
import { Input } from '../../../components/ui/';
import { getSearch } from '../../../api/search';
import List from './list';
import { setDistanceToUsers } from '../../../lib/user';
import { defaultColors } from '../../../config/style';

import style from './style';
   
class TabSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      loading: false,
      fetched: false,
      query: ''
    };
    // this.handlePress = this.handlePress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemoveSearch = this.handleRemoveSearch.bind(this);
  }

  handleChange(name, text) {
    this.setState(() => ({
      [name]: text
    }));
  }

  handleClick() {
    const { query } = this.state;
    const { location , user } = this.props;
  
    this.setState(() => ({
      loading: true,
      fetched: false
    }));

    setTimeout(() => {
      getSearch({ query }).then(({ users }) => {
       const myUsers = users.filter((arr) => {
          return arr.id != user.user.id;
        });
        console.log("myusers",myUsers);
        console.log("users",users);
        console.log("user",user);
        this.setState(() => ({
          users: setDistanceToUsers(myUsers, location),
          loading: false,
          fetched: true
        }));
      }).catch(err=>{
        console.log(err)
      });
    }, 4000);
  }

  handleRemoveSearch() {
    this.setState(() => ({
      loading: false,
      fetched: false
    }));
  }

  // Seçilen kullanıcının profil sayfasına yönlendirir
  handlePress(id) {
    const { navigation } = this.props;
    console.log("frendim")
    console.log(id)
    let newId = id;
    console.log(newId)

      navigation.navigate('Profile', { friendId : newId});


  }

  render() {
    const { location, user } = this.props;
    const { query, users, loading, fetched } = this.state;

    return (
      <React.Fragment>
        {!fetched && !loading && (
        <ImageBackground source={require('../../../assets/search_bg.png')} style={{width: '100%', height: '100%'}}>
          <View style={style.searchContent}>
            <View style={style.searchInputContainer}>
              <View style={style.searchButton}>
                <TouchableHighlight
                  onPress={this.handleClick}
                  activeOpacity={0}
                  underlayColor="transparent"><Icon name="search" color="#000" style={style.searchButtonIcon} />
                </TouchableHighlight>
              </View>
              <Input
                shadow
                extraStyle={style.searchInputContent}
                extraInputStyle={style.searchInput}
                onChange={this.handleChange}
                name="query"
                value={query}
                title="Plaka/Kullanıcı adı"
              />
            </View>
          </View></ImageBackground>
        )}
        {loading && <Spinner color={defaultColors.bg.darkGrey} />}
        {fetched && (
          <View style={style.listContainer}>
            <View style={style.searchResultTextContent}>
              <View style={style.searchResultText}>
                <Text>
                  Arama:
                  {query}
                </Text>
                <TouchableHighlight
                  onPress={this.handleRemoveSearch}
                  activeOpacity={0}
                  underlayColor="transparent"
                  style={style.searchResultTextRemoveIconContent}
                >
                  <Icon name="close" style={style.searchResultTextRemoveIcon} />
                </TouchableHighlight>
              </View>
            </View>
            <ScrollView
      style={style.scrollView}>
            <List location={location} users={users} user={user} handlePress={(x) => this.handlePress(x.id)} />
            </ScrollView>
          </View>
        )}
      </React.Fragment>
    );
  }
}

TabSearch.propTypes = {
  user: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};

export default TabSearch;
