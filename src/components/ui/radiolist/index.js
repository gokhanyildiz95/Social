import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableHighlight } from "react-native";
import { List, ListItem, Text, Icon } from "native-base";

// Styles
import styles from "./styles";

class RadioList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected !== null && props.items[props.selected]
    };
  }

  select = key => {
    const { items, name } = this.props;

    let selected = items[key];

    this.setState({
      ...this.state,
      selected
    });

    this.props.onChange(name, this.state.selected);
  };

  render() {
    const iconStyle = styles.icon;
    const iconActiveStyle = [iconStyle, styles.iconActive];

    return (
      <List style={styles.radiolist}>
        {this.props.items.map((item, key) => (
          <ListItem style={styles.radioItem} key={key}>
            <TouchableHighlight
              style={styles.touchable}
              underlayColor="transparent"
              onPress={() => this.select(item.key)}
            >
              <View style={styles.radio}>
                <Text style={styles.text}>{item.label}</Text>
                <Icon
                  name="ios-checkmark-circle"
                  style={
                    this.state.selected.key == item.key
                      ? iconActiveStyle
                      : iconStyle
                  }
                />
              </View>
            </TouchableHighlight>
          </ListItem>
        ))}
      </List>
    );
  }
}

RadioList.defaultProps = {
  items: [],
  name: null,
  selected: null,
  onChange: () => {}
};

RadioList.propTypes = {
  items: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.any,
  onChange: PropTypes.func.isRequired
};

export default RadioList;
