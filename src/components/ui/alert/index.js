import React from 'react';
import PropTypes from 'prop-types';
import AwesomeAlert from 'react-native-awesome-alerts';
import { defaultColors } from '../../../config/style';

// Style
import style from './style';

const Alert = props => {
  const { show, title, progress, message, onDismiss } = props;

  return (
    <AwesomeAlert
      show={show}
      title={title}
      message={message}
      showProgress={progress}
      onDismiss={onDismiss}
      alertContainerStyle={style.alertContainerStyle}
      progressColor={defaultColors.bg.white}
      contentContainerStyle={style.contentContainerStyle}
      titleStyle={style.titleStyle}
      messageStyle={style.messageStyle}
    />
  );
};

Alert.defaultProps = {
  title: false,
  message: false,
  progress: false,
  onDismiss: false
};

Alert.propTypes = {
  progress: PropTypes.bool,
  show: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string
};

export default Alert;
