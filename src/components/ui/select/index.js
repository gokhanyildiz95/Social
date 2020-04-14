import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, ScrollView, TouchableHighlight } from 'react-native';
import { Button } from '../../../components/ui/';
import { Container, Text, View } from 'native-base';

// Style
import style from './style';

class SelectBox extends Component {
  constructor(props) {
    super(props);

    const { title, value } = props;

    this.state = {
      modalVisible: false,
      currentValue: value,
      text: (title != '' && title) || 'Seçiniz'
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  selectItem(key) {
    const { name, onChange, values } = this.props;
    const selectedItem = values[key];

    this.setState({
      ...this.state,
      text: selectedItem.label,
      value: selectedItem.value
    });

    onChange(name, selectedItem.value);
    this.setModalVisible(false);
  }

  render() {
    const { values, shadow } = this.props;
    const { text, modalVisible } = this.state;

    return (
      <React.Fragment>
        <Button
          size="xl"
          shadow={shadow}
          bordered
          color="orangeToYellow"
          align="left"
          text={text}
          extraTextStyle={style.text}
          onPress={() => {
            this.setModalVisible(true);
          }}
          icon="arrow-down"
        />
        <Modal transparent fade="fade" visible={modalVisible} onRequestClose={() => {}}>
          <Container style={style.modalContainer}>
            <View style={style.modalContent}>
              <ScrollView style={style.modalScrollView}>
                {values.map((item, key) => (
                  <View key={key}>
                    <TouchableHighlight
                      style={style.listItemTouchableHighlight}
                      underlayColor="transparent"
                      onPress={() => this.selectItem(item.key)}
                    >
                      <Text>{item.label}</Text>
                    </TouchableHighlight>
                  </View>
                ))}
              </ScrollView>
              <Button
                extraStyle={style.modalCloseButton}
                size="l"
                onPress={() => {
                  this.setModalVisible(false);
                }}
                text="Kapat"
              />
            </View>
          </Container>
        </Modal>
      </React.Fragment>
    );
  }
}

SelectBox.defaultProps = {
  shadow: false
};

SelectBox.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  shadow: PropTypes.bool,
  value: PropTypes.any.isRequired,
  values: PropTypes.array.isRequired
};

export default SelectBox;
