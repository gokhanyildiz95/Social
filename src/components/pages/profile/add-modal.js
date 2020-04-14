import React from 'react';
import PropTypes from 'prop-types';
import { Container, Text, Icon, View } from 'native-base';
import { KeyboardAvoidingView, Modal, TouchableHighlight } from 'react-native';
import { defaultColors } from '../../../config/style';
import { Button, Input } from '../../../components/ui/';

import style from './style';

const UserAddModal = props => {
  const { handleFormChange, handleClose, form, visibility } = props;

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
            <Text style={{ marginBottom: 20 }}>Ekleme nedeniniz nedir ?</Text>
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
            <Input
              onChange={handleFormChange}
              value={form.reasonDesc}
              name="reasonDesc"
              shadow
              extraStyle={{ marginBottom: 20 }}
              title="Ekleme nedeni"
            />
            <Button
              onPress={handleFormSubmit}
              extraTextStyle={style.profileButtonContinueText}
              color="greyToHalfGrey"
              shadow
              size="xl"
              text="Ekle"
            />
          </View>
        </Container>
      </KeyboardAvoidingView>
    </Modal>
  );
};

UserAddModal.defaultProps = {
  form: {}
};

UserAddModal.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  form: PropTypes.object,
  visibility: PropTypes.bool.isRequired
};

export default UserAddModal;
