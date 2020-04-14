import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Icon, Fab } from 'native-base';
import { AddShareModal } from '../../../components/ui/';
import { sharePost, getPosts } from '../../../api/post';
import { getUser } from '../../../api/user';
import { ScrollView, RefreshControl } from 'react-native';
import { setDistanceToPosts } from '../../../lib/user';
import { PostItem } from '../../../components/ui/';


import style from './style';

class TabPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetched: false,
      popupShow: false,
      refreshing: false,
      yuklemeBittimi: false,
      form: [],
      posts: [],
    };
    this.handlePress = this.handlePress.bind(this);
    this.handlePlateFormClose = this.handlePlateFormClose.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.setPostWithProfiles = this.setPostWithProfiles.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.setAllPosts = this.setAllPosts.bind(this);

  }

  handleFormChange(name, text) {
    const { form } = this.state;
    form[name] = text;
    this.setState(() => ({
      form
    }));
  }

  async onRefresh() {
    this.setState({ refreshing: true, yuklemeBittimi: false, });
    const all = await getPosts();

    const { location } = this.props;
    const postsWithDistance = await setDistanceToPosts(all, location);
    console.log("postsWithDistance")
    console.log(postsWithDistance)
    await this.setPostWithProfiles(postsWithDistance);
  }

  async componentDidMount() {
    // setInterval(, 6000);
    // this.setAllPosts()
  }
  componentWillMount(){
    this.setAllPosts()
  }

  async setAllPosts() {
    const all = await getPosts();
    const { location } = this.props;
    const postsWithDistance = await setDistanceToPosts(all, location);
    await this.setPostWithProfiles(postsWithDistance);
  }


  async handleFormSubmit() {
    const { form } = this.state;
    const { location, user } = this.props;
    let data = {
      title: form.undefined,
      content: form.model,
      latitude: location.latitude,
      longitude: location.longitude,
      userId: user.user.id,

    }
    const a = await sharePost(data);
    this.handlePlateFormClose();
  }

  // Seçilen kullanıcının profil sayfasına yönlendirir
  handlePress(friend) {
    const { navigation } = this.props;
    navigation.navigate('Profile', { friendId : friend.id });
  }

  handlePlateFormClose() {
    this.setState(() => ({
      popupShow: false
    }));
  }

  async setPostWithProfiles(posts) {
    this.setState({
      posts: posts,
      refreshing: false,
      yuklemeBittimi: true,
    });
    // const userIds = posts.map((arr) => arr.userId.id);
    // //console.log("IDS", userIds);
    // const postWithProfiles = [];
    // var itemsProcessed = 0;
    // posts.forEach((post, key, array) => {
    //   // profile = await getUser(post.userId.id);
    //   postWithProfiles.push({
    //     ...post, user: { ...post.userId }
    //   })
    // //  console.log(post.userId);
    //   itemsProcessed++;
    //   if (itemsProcessed === array.length) {
    //     console.log("bll");
    //     this.setState({
    //       posts: postWithProfiles,
    //       refreshing: false,
    //       yuklemeBittimi: true,
    //     });
    //     console.log("itemsProcessed");
    //     console.log(itemsProcessed);
    //   }
    // });

  }


  render() {
    const { form, fetched, popupShow, posts } = this.state;
    console.log("POST", posts);
    return (
      <React.Fragment>

        {!fetched && (
          <View style={style.listContainer}>

            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />}
              style={style.scrollView}>
              <View style={style.scrollViewContent}>
                {posts.sort(function(a, b){return a.createdAt - b.createdAt}).reverse().map((post) =>
                  (
                    // console.log(post);
                    post.distance <= 50 ? <PostItem
                      user={post.userId} key={post.id}
                      title={post.title} distance={post.distance}
                      time={post.time} content={post.content} handlePress={this.handlePress} /> : null
                  ))}
              </View>
            </ScrollView>
            <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{}}
              style={{ backgroundColor: '#5067FF' }}
              position="bottomRight"
              onPress={() => this.setState({ popupShow: !this.state.popupShow })}>
              <Icon type="FontAwesome" name="comments" />
            </Fab>
            <AddShareModal
              title="Başlık"
              placeholder="Başlık"
              label="Bize gününden bahset !"
              visibility={popupShow}
              value={form.title}
              valueCar={form.content}
              handleFormSubmit={this.handleFormSubmit}
              handleClose={this.handlePlateFormClose}
              handleFormChange={this.handleFormChange}
              handleFormDelete={this.handleFormDelete}
              enableDelete={true}
              labelCar="Araç Modeli"
              nameCar="model"
              placeholderCar="Nasıl gidiyor ?  ( 180 Karakter )"
            />
          </View>
        )}
      </React.Fragment>
    );
  }
}

TabPost.propTypes = {
  user: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  handlePress: PropTypes.func,

};

export default TabPost;
