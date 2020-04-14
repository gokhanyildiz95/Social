import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'native-base';
import OptionsMenu from 'react-native-options-menu';

import { setBlockUser, unsetBlockUser } from '../../../api/block';
import { setFavoriteUser, unsetFavoriteUser } from '../../../api/favorite';

import style from './style';

class ProfileOptions extends Component {
  constructor(props) {
    super(props);

    this.handleBlockUser = this.handleBlockUser.bind(this);
    this.handleUnblockUser = this.handleUnblockUser.bind(this);
    this.handleAddFavoriteUser = this.handleAddFavoriteUser.bind(this);
    this.handleRemoveFavoriteUser = this.handleRemoveFavoriteUser.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.refresh = this.refresh.bind(this);
    this.deleteToRequestFunc = this.deleteToRequestFunc.bind(this);
  }

  handleBlockUser() {
    const { user } = this.props;
    unsetFavoriteUser({ favoritedUserId: user.id }).then(this.refresh);

    setBlockUser({ blockedUserId: user.id }).then(this.refresh);
  }

  handleUnblockUser() {
    const { user } = this.props;
    unsetBlockUser({ blockedUserId: user.id }).then(this.refresh);
  }

  handleAddFavoriteUser() {
    const { user } = this.props;
    setFavoriteUser({ favoritedUserId: user.id }).then(this.refresh);
  }

  handleRemoveFavoriteUser() {
    const { user } = this.props;
    unsetFavoriteUser({ favoritedUserId: user.id }).then(this.refresh);
  }

  handleCancel() { }

  refresh() {
    const { handleRefresh } = this.props;

    handleRefresh();
  }
  deleteToRequestFunc() {
    const { deleteToRequest, declineToRequest } = this.props;
    deleteToRequest();
  }

  render() {
    const { favorited, blocked, blockedMe, userStatus, friendStatus } = this.props;
    const opts = {
      customButton: <Icon name="more" style={style.moreIcon} />,
      destructiveIndex: 1,
      options: [],
      actions: [this.handleCancel]
    };

    if (blocked) {
      opts.options.unshift('Engeli Kaldır');
      opts.actions.unshift(this.handleUnblockUser);
    } else {
      opts.options.unshift('Engelle');
      opts.actions.unshift(this.handleBlockUser);
    }

    if (favorited) {
      opts.options.unshift('Favorilerden Çıkar');
      opts.actions.unshift(this.handleRemoveFavoriteUser);
    } else {
      if (!blocked && !blockedMe) {
        opts.options.unshift('Favorilere Ekle');
        opts.actions.unshift(this.handleAddFavoriteUser);
      }
    }
    // Eğer arkadaşlık isteği gönderilmiş ise
    if (friendStatus == 1 || friendStatus == 2 || userStatus == 1) {
      if (userStatus == 1) {
        opts.options.unshift('Arkadaşlık İsteğini İptal Et');
        opts.actions.unshift(this.deleteToRequestFunc);
      } else {
        opts.options.unshift('Arkadaşlıktan Çıkar');
        opts.actions.unshift(this.deleteToRequestFunc);
      }
      return <OptionsMenu {...opts} />;
    }

    return <OptionsMenu {...opts} />;
  }
}

ProfileOptions.propTypes = {
  user: PropTypes.object.isRequired,
  handleRefresh: PropTypes.func.isRequired,
  favorited: PropTypes.bool.isRequired,
  blocked: PropTypes.bool.isRequired,

  declineToRequest: PropTypes.func.isRequired,
  deleteToRequest: PropTypes.func.isRequired,
  userStatus: PropTypes.number.isRequired,
  friendStatus: PropTypes.number.isRequired
};

export default ProfileOptions;
