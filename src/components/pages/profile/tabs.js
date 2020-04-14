import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

import { defaultColors } from '../../../config/style';

import style from './style';

const ProfileTabs = ({ user, theme }) => {
  let styleTabs = style.tabs;
  let styleTab = style.tab;
  let styleTabNumber = style.tabNumber;
  let styleTabText = style.tabText;

  if (theme == 'dark') {
    styleTabs = [styleTabs, style.darkTabs];
    styleTab = [styleTab, style.darkTab];
    styleTabNumber = [styleTabNumber, style.darkTabNumber];
    styleTabText = [styleTabText, style.darkTabText];
  }

  return (
    <View style={styleTabs}>
      <View style={styleTab}>
        <Text style={styleTabNumber}>{user.plates.length}</Text>
        <Text style={styleTabText}>Plaka</Text>
        <LinearGradient
          colors={[defaultColors.bg.orange, defaultColors.bg.yellow]}
          useAngle
          angle={45}
          style={style.activeTabBorder}
        />
      </View>
      <View style={styleTab}>
        <Text style={styleTabNumber}>{user.friends.length}</Text>
        <Text style={styleTabText}>Bağlantı</Text>
      </View>
      <View style={styleTab}>
        <Text style={styleTabNumber}>0</Text>
        <Text style={styleTabText}>Favori</Text>
      </View>
    </View>
  );
};

ProfileTabs.propTypes = {
  user: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired
};

export default ProfileTabs;
