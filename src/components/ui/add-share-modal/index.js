import React from 'react';
import PropTypes from 'prop-types';
import { Container, Text, Icon, View } from 'native-base';
import { KeyboardAvoidingView, Modal, TouchableHighlight } from 'react-native';
import { defaultColors } from '../../../config/style';
import { Button, Input } from '../../../components/ui/';

import style from './style';

const AddShareModal = props => {
  const {
    handleFormSubmit,
    handleFormChange,
    handleFormDelete,
    handleClose,
    value,
    visibility,
    label,
    name,
    placeholder,
    buttonText,

    labelCar, 
    nameCar, 
    placeholderCar, 
    valueCar,
    enableDelete
  } = props;

  return (
    <Modal animationType="fade" transparent visible={visibility}>
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <Container
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,.7)'
          }}
        >
          <View
            style={{
              width: '80%',
              padding: 20,
              backgroundColor: '#fff',
              borderRadius: 8,
              borderWidth: 1,
              borderColor: defaultColors.bg.orange
            }}
          >
            <Text style={{ marginBottom: 20,textAlign:"center" }}>{label}</Text>
            <TouchableHighlight
              activeOpacity={0}
              underlayColor="transparent"
              style={{
                position: 'absolute',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: 30,
                height: 30,
                right: 10,
                top: -15,
                backgroundColor: defaultColors.bg.orange,
                borderRadius: 15
              }}
              onPress={handleClose}
            >
              <Icon name="close" style={{ color: '#fff' }} />
            </TouchableHighlight>
{/*             <Input
              onChange={handleFormChange}
              value={value}
              name={name}
              shadow
              autoCapitalize="characters"
              extraStyle={{ marginBottom: 20 }}
              title={placeholder}
            /> */}
            <Input
              onChange={handleFormChange}
              value={valueCar}
              name={nameCar}
              shadow
              extraStyle={{ marginBottom: 20,height:150 }}
              title={placeholderCar}
            />
            <Button
              onPress={handleFormSubmit}
              extraTextStyle={style.profileButtonContinueText}
              color="greyToHalfGrey"
              shadow
              size="xl"
              text={buttonText}
            />
          </View>
        </Container>
      </KeyboardAvoidingView>
    </Modal>
  );
};

AddShareModal.defaultProps = {
  placeholder: '',
  buttonText: 'Yayınla'
};

AddShareModal.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
  handleFormChange: PropTypes.func.isRequired,

  handleFormDelete: PropTypes.func,

  handleClose: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  visibility: PropTypes.bool.isRequired,

  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  buttonText: PropTypes.string,

  labelCar: PropTypes.string,
  nameCar: PropTypes.string,
  placeholderCar: PropTypes.string,
  valueCar: PropTypes.string,

  enableDelete: PropTypes.bool
};

export default AddShareModal;
