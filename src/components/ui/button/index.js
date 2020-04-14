import React from 'react';
import { View, TouchableHighlight,TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Text, Icon } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { defaultColors, shadow } from '../../../config/style';

/* Component Style */
import style from './style';

const UIButton = props => {
  const {
    bordered,
    rounded,
    extraStyle,
    extraTextStyle,
    extraIconStyle,
    shadow: isShadowed,
    size,
    color,
    angle: isAngled,
    align,
    onPress,
    text,
    icon,
    iconType
  } = props;

  let isGraident = false;
  let iconStyle = { ...style.icon };
  let textStyle = { ...style.text };
  let graidentContentStyle = { ...style.graidentContent };
  let useAngle = false;
  let angle = 0;
  const attributes = {
    title: 'Button',
    block: true,
    style: style.button
  };

  if (bordered) {
    attributes.bordered = true;
    textStyle.color = defaultColors.blue;
    attributes.style = { ...attributes.style, backgroundColor: '#fff' };
  }

  if (rounded) {
    attributes.rounded = true;
  }

  if (extraStyle) {
    attributes.style = { ...attributes.style, ...extraStyle };
  }

  if (isShadowed) {
    attributes.style = {
      ...attributes.style,
      ...shadow
    };
  }

  if (size == 'xl') {
    attributes.style.height = 50;
    textStyle = {
      ...textStyle,
      fontSize: 21,
      fontWeight: '500'
    };
  } else if (size == 'l') {
    attributes.style.height = 40;
    textStyle = {
      ...textStyle,
      fontSize: 14
    };
  } else if (size == 's') {
    attributes.style.height = 32;
    textStyle = {
      ...textStyle,
      fontSize: 16
    };
  }

  if (color == 'orangeToYellow') {
    isGraident = true;
    attributes.colors = [defaultColors.bg.orange, defaultColors.bg.orange, defaultColors.bg.yellow];
  } else if (color == 'greyToHalfGrey') {
    isGraident = true;
    attributes.colors = [defaultColors.bg.darkGrey, defaultColors.bg.halfGrey];
  } else if (color == 'darkBlueToTurquoise') {
    isGraident = true;
    attributes.colors = [defaultColors.bg.darkBlue, defaultColors.bg.turquoise];
  } else if (color == 'redToBeige') {
    isGraident = true;
    attributes.colors = [defaultColors.bg.red, defaultColors.bg.beige];
  } else if (color == 'greenToTurquoise') {
    isGraident = true;
    attributes.colors = [defaultColors.bg.green, defaultColors.bg.turquoise];
  } else if (defaultColors.bg[color]) {
    if (!bordered) {
      attributes.style.backgroundColor = defaultColors.bg[color];
    } else {
      attributes.style.borderColor = defaultColors.bg[color];
    }
  }

  if (isGraident) {
    attributes.style = {
      ...attributes.style,
      ...style.graidentButton
    };

    if (extraStyle) {
      attributes.style = { ...attributes.style, ...extraStyle };
    }

    if (isAngled) {
      useAngle = true;
      angle = 45;
    }

    if (rounded) {
      attributes.style = {
        ...attributes.style,
        borderRadius: attributes.style.height
      };

      graidentContentStyle.borderRadius = attributes.style.height;
    }

    if (bordered) {
      graidentContentStyle.backgroundColor = defaultColors.white;
    }

    if (align == 'left') {
      graidentContentStyle.alignItems = 'flex-start';
      graidentContentStyle.paddingLeft = 20;
    } else if (align == 'right') {
      graidentContentStyle.alignItems = 'flex-end';
      graidentContentStyle.paddingRight = 20;
    }
  } else {
    if (align == 'left') {
      attributes.style.justifyContent = 'flex-start';
      attributes.style.paddingLeft = 5;
    } else if (align == 'right') {
      attributes.style.justifyContent = 'flex-end';
      attributes.style.paddingRight = 5;
    }
  }

  textStyle = { ...textStyle, ...extraTextStyle };

  iconStyle.top = (attributes.style.height - style.icon.fontSize) / 2;
  iconStyle.color = textStyle.color;
  iconStyle = { ...iconStyle, ...extraIconStyle };

  return (
    <React.Fragment>
      {isGraident ? (
        <TouchableOpacity
          activeOpacity={1}
          underlayColor="transparent"
          style={isShadowed && shadow}
          onPress={onPress}
        >
          <LinearGradient {...attributes} useAngle={useAngle} angle={angle}>
            <View style={graidentContentStyle}>
              <Text style={textStyle}>{text}</Text>
              {icon ? <Icon type={iconType} style={iconStyle} name={icon} /> : false}
            </View>
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <Button {...attributes} onPress={onPress}>
          <Text style={textStyle}>{text}</Text>
          {icon ? <Icon type={iconType} style={iconStyle} name={icon} /> : false}
        </Button>
      )}
    </React.Fragment>
  );
};

UIButton.defaultProps = {
  align: 'center',
  angle: true,
  bordered: false,
  color: 'dark',
  extraStyle: {},
  extraTextStyle: {},
  extraIconStyle: {},
  icon: '',
  onPress: () => {},
  rounded: false,
  shadow: false,
  size: 'l',
  text: '',
  iconType: 'Ionicons'
};

UIButton.propTypes = {
  align: PropTypes.string,
  angle: PropTypes.bool,
  bordered: PropTypes.bool,
  color: PropTypes.string,
  extraStyle: PropTypes.object,
  extraTextStyle: PropTypes.object,
  extraIconStyle: PropTypes.object,
  icon: PropTypes.any,
  iconType: PropTypes.string,
  onPress: PropTypes.func,
  rounded: PropTypes.bool,
  size: PropTypes.string,
  shadow: PropTypes.bool,
  text: PropTypes.string
};

export default UIButton;
