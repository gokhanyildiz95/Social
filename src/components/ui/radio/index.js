import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Button } from '..';

// Style
import style from './style';

class Radio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected !== null && props.items[props.selected]
    };
  }

  select = key => {
    const { items, name, onChange } = this.props;

    let selected = items[key];

    this.setState({
      ...this.state,
      selected
    });

    onChange(name, selected.value);
  };

  render() {
    const { extraStyle, extraItemStyle, items } = this.props;
    const { selected } = this.state;

    return (
      <View style={[style.radioButtonsContent, extraStyle]}>
        {items.map((item, key) => (
          <Button
            color={item.color ? item.color : 'blue'}
            size="s"
            rounded
            bordered={selected.key != item.key}
            shadow
            onPress={() => this.select(item.key)}
            key={key}
            text={item.label}
            extraStyle={{ ...extraItemStyle }}
            extraTextStyle={
              selected.key != item.key ? { ...item.passiveTextStyle } : { ...item.activeTextStyle }
            }
          />
        ))}
      </View>
    );
  }
}

Radio.defaultProps = {
  selected: null,
  extraStyle: {},
  extraItemStyle: {}
};

Radio.propTypes = {
  items: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  extraStyle: PropTypes.object,
  extraItemStyle: PropTypes.object
};

export default Radio;
