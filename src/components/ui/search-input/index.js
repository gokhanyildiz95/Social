import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, View } from 'native-base';
import { Animated, TouchableHighlight, TextInput } from 'react-native';

// Styles
import style from './style';

class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      searchAnim: {
        opacity: new Animated.Value(0),
        width: new Animated.Value(0)
      }
    };

    this.handleAnimateInput = this.handleAnimateInput.bind(this);
    this.handleSearchPress = this.handleSearchPress.bind(this);
    this.setCloseTimeout = this.setCloseTimeout.bind(this);
  }

  componentDidUpdate() {
    this.setCloseTimeout();
  }

  setCloseTimeout() {
    const { value } = this.props;

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (!value) {
        this.handleAnimateInput({ opacity: 0, width: 0 });
        this.setState(() => ({
          isOpen: false
        }));
      }
    }, 5 * 1000);
  }

  handleAnimateInput({ opacity, width }) {
    Animated.parallel([
      Animated.timing(this.state.searchAnim.opacity, {
        toValue: opacity,
        duration: 500
      }),
      Animated.timing(this.state.searchAnim.width, {
        toValue: width,
        duration: 500
      })
    ]).start();
  }

  handleSearchPress() {
    const { isOpen } = this.state;
    if (!isOpen) {
      this.handleAnimateInput({ opacity: 1, width: 150 });
      this.setState(() => ({
        isOpen: true
      }));
      return;
    }
  }

  render() {
    const { handleChange } = this.props;
    const { text, searchAnim } = this.state;

    return (
      <View style={style.searchInputContent}>
        <TouchableHighlight
          activeOpacity={0}
          underlayColor="transparent"
          onPress={this.handleSearchPress}
          style={[style.touchableHighlight, style.searchIconTH]}
        >
          <Icon name="search" style={style.searchIcon} />
        </TouchableHighlight>
        <Animated.View style={[style.searchInputAnimatedView, searchAnim]}>
          <TextInput
            placeholder="Arama"
            value={text}
            onChangeText={handleChange}
            style={style.searchInput}
          />
        </Animated.View>
      </View>
    );
  }
}

SearchInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default SearchInput;
