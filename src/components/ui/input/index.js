import React from 'react';
import PropTypes from 'prop-types';
import { Platform, TouchableHighlight } from 'react-native';
import { Input } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { defaultColors, shadow } from '../../../config/style';

// Styles
import style from './style';

const UIInput = props => {
  const {
    extraStyle,
    extraInputStyle,
    title,
    value,
    multiline,
    onChange,
    name,
    keyboardType,
    shadow: isShadowed,
    type,
    autoCapitalize
  } = props;

  let inputStyle = { ...style.input, ...extraInputStyle };
  let contentStyle = { ...style.content, ...extraStyle };
  let highlightStyle = {};

  if (Platform.OS == 'android' && isShadowed) {
    contentStyle = { ...contentStyle, ...shadow };
  }

  if (Platform.OS == 'ios') {
    highlightStyle = shadow;
  }

  return (
    <TouchableHighlight activeOpacity={1} underlayColor="transparent" style={highlightStyle}>
      <LinearGradient
        colors={[defaultColors.bg.orange, defaultColors.bg.yellow]}
        useAngle
        angle={45}
        style={contentStyle}
      >
        <Input

          autoCorrect={false}
          multiline={multiline}
          placeholder={title}
          value={value}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          onChangeText={text => {
            onChange(name, text);
          }}
          placeholderTextColor={defaultColors.grey}
          style={inputStyle}
          secureTextEntry={type === 'password'}
        />
      </LinearGradient>
    </TouchableHighlight>
  );
};

UIInput.defaultProps = {
  extraStyle: {},
  extraInputStyle: {},
  multiline: false,
  shadow: false,
  type: 'text'
};

UIInput.propTypes = {
  extraStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  extraInputStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  keyboardType: PropTypes.string,
  type: PropTypes.string,
  multiline: PropTypes.bool,
  name: PropTypes.string.isRequired,
  shadow: PropTypes.bool,
  autoCapitalize: PropTypes.string
};

export default UIInput;
