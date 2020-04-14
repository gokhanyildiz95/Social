import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, View, Thumbnail, Footer, Icon , Content} from 'native-base';
import { Modal, TouchableHighlight, Text,BackHandler } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Carousel from 'react-native-looped-carousel';
import OptionsMenu from 'react-native-options-menu';

import getImageUrl from '../../../lib/image';

import { getUserProfilePicture } from '../../../lib/user';

// Style
import style from './style';

class Avatar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      imageViewerShow: true,
      zoomModalVisible: false
    };
    this.setIndex = this.setIndex.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  

  componentDidUpdate({ user: prevUser }) {
    const { user } = this.props;

    if (
      prevUser.profilePictures &&
      user.profilePictures.length != prevUser.profilePictures.length
    ) {
      this.setState(() => ({
        imageViewerShow: false
      }));
      setTimeout(() => {
        this.setState(() => ({
          imageViewerShow: true,
          index: user.profilePictures.length - 1
        }));
      }, 10);
    }
  }

  setIndex(index) {
    this.setState(() => ({
      index
    }));
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    this.setState(() => ({ zoomModalVisible: false }));
    return true;
  }

  getProfilePictures() {
    const { user } = this.props;
    const userProfilePictures = getUserProfilePicture(user);

    return userProfilePictures;
  }

  getZoomImages() {
    const { index } = this.state;
    const { editable, handleUpload } = this.props;
    const userProfilePictures = this.getProfilePictures();
    const optionsMenu = this.renderOptionsMenu();
    const images = [];

    userProfilePictures.map(pp => {
      images.push({ url: getImageUrl(pp.picture), freeHeight: true });
    });

    return (
      <ImageViewer
        enableSwipeDown
        index={index}
        onChange={this.setIndex}
        onSwipeDown={() => {
          this.setState(() => ({ zoomModalVisible: false }));
        }}
        imageUrls={images}
        renderIndicator={() => null}
        footerContainerStyle={{ left: 0, bottom: 0, width: '100%' }}
        renderHeader={() => 
          editable && (
            <View style={{ width: '100%', position: 'absolute', zIndex: 99 }}>
              <Header
                style={{
                  backgroundColor: 'transparent',
                  borderBottomWidth: 0,
                  color: '#fff'
                }}
              >
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                  {optionsMenu}
                </View>
              </Header>
            </View>
          )
        }
        renderFooter={() =>
          editable && (
            <View style={{ width: '100%' }}>
              <Footer
                style={{
                  backgroundColor: 'transparent',
                  paddingTop: 10,
                  borderTopColor: 'rgba(255, 255, 255, 0.25)'
                }}
              >
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <TouchableHighlight
                    style={{
                      height: 50,
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRightWidth: 0.5,
                      borderRightColor: 'rgba(255, 255, 255, 0.2)'
                    }}
                    onPress={() => {
                      this.handleDelete(index, userProfilePictures[index]);
                    }}
                  >
                    <Text style={{ color: '#FF0844' }}>Sil</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={{
                      height: 50,
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRightWidth: 0.5,
                      borderRightColor: 'rgba(255, 255, 255, 0.2)'
                    }}
                    onPress={handleUpload}
                  >
                    <Text style={{ color: '#118DF0' }}>Ekle</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={{
                      height: 50,
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      this.setState(() => ({ zoomModalVisible: false }));
                    }}
                  >
                    <Text style={{ color: '#118DF0' }}>Geri</Text>
                  </TouchableHighlight>
                </View>
              </Footer>
            </View>
) || ( 
<Footer
  style={{
    backgroundColor: 'transparent',
    paddingTop: 10,
    borderTopColor: 'rgba(255, 255, 255, 0.25)'
  }}
>
  <View style={{ flex: 1, flexDirection: 'row' }}>
    <TouchableHighlight
      style={{
        height: 50,
        flex: 1,
        backgroundColor:'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => {
        this.setState(() => ({ zoomModalVisible: false }));
      }}
    >
      <Text style={{ color: '#212121',fontSize:20  }}>Geri</Text>
    </TouchableHighlight>
  </View>
</Footer>
)
          
        }
      
      />
      
     );
  }

  getThumb({ index, url }) {
    const { small, large, xlarge } = this.props;

    return (
      <TouchableHighlight
        activeOpacity={0.8}
        underlayColor="transparent"
        onPress={() => this.handleThumbPress(index)}
      >
        <Thumbnail small={small} large={large} style={xlarge ? {height:100,width:100} : {}} source={{ uri: getImageUrl(url) }} />
      </TouchableHighlight>
    );
  }

  handleThumbPress(index) {
    const { editable, handleUpload, user } = this.props;

    if (user.profilePictures && user.profilePictures.length == 0 && editable) {
      handleUpload();
      return;
    }

    this.handleShowZoomModal(index);
  }

  handleDelete(index, pictureObj) {
    const { handlePhotoDelete } = this.props;

    this.setIndex(0);
    handlePhotoDelete(pictureObj);
  }

  handleShowZoomModal(index) {
    this.setState(() => ({
      index,
      zoomModalVisible: true
    }));
  }

  // Options menu render
  renderOptionsMenu() {
    const userProfilePictures = this.getProfilePictures();
    const { handleSetDefault } = this.props;

    const opts = {
      customButton: <Icon name="more" style={style.moreIcon} />,
      destructiveIndex: 1,
      options: ['Profil Fotoğrafı Yap', 'İptal'],
      actions: [
        () => {
          const { index } = this.state;

          handleSetDefault(userProfilePictures[index]);
        },
        () => {}
      ]
    };

    return <OptionsMenu {...opts} />;
  }

  render() {
    const { multiple } = this.props;
    const { index, zoomModalVisible, imageViewerShow } = this.state;
    const userProfilePictures = this.getProfilePictures();
    const imageViewer = this.getZoomImages();
    let avatar = null;

    if (multiple && userProfilePictures.length > 1) {
      avatar = (
        <Carousel
          currentPage={index}
          autoplay={false}
          style={style.carousel}
          bullets
          bulletsContainerStyle={style.bulletsContainer}
          bulletStyle={style.bulletStyle}
          chosenBulletStyle={style.chosenBulletStyle}
        >
          {userProfilePictures.map((picture, index) => (
            <View key={index} style={style.carouselItem}>
              {this.getThumb({ index, url: picture.picture })}
            </View>
          ))}
        </Carousel>
      );
    } else {
      avatar = this.getThumb({ index: 0, url: userProfilePictures[0].picture });
    }

    return (
      <React.Fragment>
        <Modal visible={zoomModalVisible} style={{ backgroundColor: '#000' }}>
          {imageViewerShow && imageViewer}
        </Modal>
        {avatar}
      </React.Fragment>
    );
  }
}

Avatar.defaultProps = {
  editable: false,
  handleSetDefault: () => {},
  handlePhotoDelete: () => {},
  handleUpload: () => {},
  user: {},
  small: false,
  large: false,
  xlarge: false,
  multiple: false
};

Avatar.propTypes = {
  editable: PropTypes.bool,
  handleSetDefault: PropTypes.func,
  handlePhotoDelete: PropTypes.func,
  handleUpload: PropTypes.func,
  user: PropTypes.object,
  small: PropTypes.bool,
  large: PropTypes.bool,
  xlarge: PropTypes.bool,
  multiple: PropTypes.bool
};

export default Avatar;
