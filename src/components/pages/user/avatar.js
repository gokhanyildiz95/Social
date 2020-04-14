import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  setProfilePicture,
  setDefaultProfilePicture,
  deleteProfilePicture
} from '../../../api/profile-picture';
import { Avatar } from '../../../components/ui/';
import ImagePicker from '../../../lib/image-picker';

class UserAvatar extends Component {
  constructor(props) {
    super(props);

    this.handleSetDefault = this.handleSetDefault.bind(this);
    this.handlePhotoDelete = this.handlePhotoDelete.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handlePhotoSubmit = this.handlePhotoSubmit.bind(this);
  }

  handlePhotoDelete(pictureObj) {
    const { setUserInfo } = this.props;

    deleteProfilePicture(pictureObj.id).then(() => {
      setUserInfo();
    });
  }

  // Fotoğraf seçiciyi çalıştırır
  handleUpload() {
    new ImagePicker({
      success: this.handlePhotoSubmit
    });   
  } 
 
  // Fotoğraf gönderir
  handlePhotoSubmit({ file: files }) {
    const { setUserInfo, user } = this.props;

    const form = {
      userId: user.id
    };  

    if (user.profilePictures && !user.profilePictures.length) {
      form.default = 1;
    }

    files.map(file => {
      form.picture = file.filename;
    });

    setProfilePicture(form).then(() => {
      setUserInfo();
    });
  }

  // Fotoğrafı profil fotoğrafı yapar
  handleSetDefault(pictureObj) {
    const { setUserInfo } = this.props;

    setDefaultProfilePicture({ profilePictureId: pictureObj.id }).then(() => {
      setUserInfo();
    });
  }

  render() {
    const { user } = this.props;

    return (
      <Avatar
        large
        user={user}
        editable
        multiple
        handleSetDefault={this.handleSetDefault}
        handlePhotoDelete={this.handlePhotoDelete}
        handleUpload={this.handleUpload}
      />
    );
  }
}

UserAvatar.propTypes = {
  user: PropTypes.object.isRequired,
  setUserInfo: PropTypes.func.isRequired,
};

export default UserAvatar;
