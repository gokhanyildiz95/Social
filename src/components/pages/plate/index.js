import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {  StatusBar, Alert, BackHandler, FlatList, View, Text } from 'react-native';
import { Content, Container, List, Button, Icon, Toast } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';

import { getPlate, setPlate, updatePlate, deletePlate } from '../../../api/plate';
import { defaultColors } from '../../../config/style';
import { PlateItem, AddModal } from '../../../components/ui/';
import Header from './header';

// NOTE: Plaka listeme ekranı
class Plate extends Component {
  constructor(props) {
    super(props); 

    this.state = {
      plateFormShow: false,
      form: {
        name: '',
        model: '',
        color: ''
      }
    };

    this.handleDeletePlate = this.handleDeletePlate.bind(this);
    this.handleSetDefault = this.handleSetDefault.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormDelete = this.handleFormDelete.bind(this);

    this.handlePlateFormClose = this.handlePlateFormClose.bind(this);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    this.setPlates();
    Toast.show({
      text: "Sola ve sağa kaydırarak varsayılan plakanı değiştirebilirsin.",
      buttonText: "Tamam",
      buttonStyle: { backgroundColor: "#5cb85c" },
      duration: 30000
    })
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    const { navigation } = this.props;
    navigation.goBack();
    return true;
  }

  // NOTE: Plakaları çekmek için kullanılır
  async setPlates() {
    const {
      user: { user },
      setUserPlates
    } = this.props;

    const plates = await getPlate({ where: { userId: user.id } });
    setUserPlates(plates);
  }

  // NOTE: Plaka düzenlemek için modeli açar
  handlePress(plate = {}) {
    this.setState(() => ({
      form: plate,
      plateFormShow: true
    }));
  }

  // Formdan gelen verileri state'e ekler
  handleFormChange(name, text) {
    const { form } = this.state;

    form[name] = text;
    this.setState(() => ({
      form
    }));
  }

  // Plaka düzenleme için kulllanılan formu ekranda gösterir
  handlePlateFormClose() {
    this.setState(() => ({
      plateFormShow: false
    }));
  }

  // Plaka düzenleme için kulllanılan formu ekranda gösterir
  async handleFormSubmit() {
    const { form } = this.state;
    var regex, v;
    var val = form.name;
    // v = val.replace(/\s+/g, '').toUpperCase();
    // regex = /^(0[1-9]|[1-7][0-9]|8[01])(([A-Z])(\d{4,5})|([A-Z]{2})(\d{3,4})|([A-Z]{3})(\d{2}))$/;
    if (1) {
      const {
        user: { user }
      } = this.props;
      const { form } = this.state;
      const data = {
        name: form.name.toUpperCase(),
        model: form.model.toUpperCase(),
        color: form.color.toUpperCase(),
        userId: user.id
      };

      if (form.id) {
        await updatePlate(form.id, data);
      } else {
        await setPlate(data);
      }

      this.handlePlateFormClose();
      this.setPlates();
    } else {
      Alert.alert(
        'Hata !',
        'Lütfen plakanızı kontrol ediniz.\n'+v.match(regex),
        [
          { text: 'Tamam' },
        ],
        { cancelable: false },
      );
    }
  }

  async handleFormDelete() {
    const { form } = this.state;
    const {
      user: { user }
    } = this.props;
    const data = {
      name: form.name,
      model: form.model,
      userId: user.id
    };
    if (form.id) {
      if (user.plates[0].name == form.name) {
        Alert.alert(
          'Hata !',
          'Varsayılan Plakanızı Silemessiniz.',
          [
            { text: 'Tamam' },
          ],
          { cancelable: false },
        );
      } else {
        await deletePlate(form.id);
      }
    } else {
      await setPlate(data);
    }
    this.handlePlateFormClose();
    this.setPlates();
  }

  closeRow(rowMap, rowKey) {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  }

  // NOTE: Plaka silme işlemi yapar
  async handleDeletePlate(plate, rowMap) {
    this.closeRow(rowMap, plate.item.key)
    // NOTE: Listview içindeki satırı kapatıyor
    //rowMap[`${secId}${rowId}`].props.closeRow();
    if (plate.item.default) {
      Alert.alert(
        'Uyarı',
        'Varsayılan plakanızı silemezsiniz.',
        [

          { text: 'Tamam', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    }
    else {
      deletePlate(plate.item.id).then(() => {
        this.setPlates();
      });
    }

  }

  // NOTE: Plaka varsayılan yapma işlemi yapar
  async handleSetDefault(plate, rowMap) {
    console.log(plate) 
    const {
      user: { user }
    } = this.props;
    // NOTE: Listview içindeki satırı kapatıyor
    // rowMap[`${secId}${rowId}`].props.closeRow();
    this.closeRow(rowMap, plate.item.id)
    await Promise.all(
      user.plates.map(plateItem => {
        if (plateItem.default) {
          updatePlate(plateItem.id, { default: 0 });
        }
      })
    );

    updatePlate(plate.item.id, { default: 1 }).then(() => {
      this.setPlates();
    });


  }

  render() {
    const {
      navigation,
      user: { user }
    } = this.props;
    const { form, plateFormShow } = this.state;
    // NOTE: Plate listi ds'e atıyor ?!
    const listData = user.plates;
    const listData2 = user.plates;

    return (
      <Container>
        <StatusBar translucent backgroundColor={defaultColors.bg.dark} barStyle="dark-content" />
        <Header navigation={navigation} handleAdd={this.handlePress} />
        <Content>
          <SwipeListView
            data={listData2}
            renderItem={(data, rowMap) => (
              <View style={{}}>
                <PlateItem plate={data} handlePress={this.handlePress} />
              </View>
            )}
            renderHiddenItem={(plate, rowMap) => (
              <View style={{
                alignItems: 'center',
                backgroundColor: '#DDD',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
                <Button
                  style={{ width: 75, }}
                  success
                  onPress={() => this.handleSetDefault(plate, rowMap)}
                >
                  <Icon active name="checkmark" />
                </Button>
                <Button
                  style={{ width: 75, }}
                  danger
                  onPress={() => this.handleDeletePlate(plate, rowMap)}
                >
                  <Icon active name="trash" />
                </Button>
              </View>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
          />

          <List
            leftOpenValue={user.plates.length > 1 ? 50 : 0}
            rightOpenValue={user.plates.length > 1 ? -50 : 0}
            dataSource={listData}
            renderRow={plate => <PlateItem plate={plate} handlePress={this.handlePress} />}
            renderLeftHiddenRow={(plate, secId, rowId, rowMap) => (
              <Button
                full
                success
                onPress={() => this.handleSetDefault(plate, secId, rowId, rowMap)}
              >
                <Icon active name="checkmark" />
              </Button>
            )}
            renderRightHiddenRow={(plate, secId, rowId, rowMap) => (
              <Button
                full
                danger
                onPress={() => this.handleDeletePlate(plate, secId, rowId, rowMap)}
              >
                <Icon active name="trash" />
              </Button>
            )}
          />
        </Content>
        <AddModal
          label="Plakanızı yazın (örn: 06AC9878)"
          name="name"
          placeholder="Plaka"
          buttonText={form.id ? 'Düzenle' : 'Ekle'}
          visibility={plateFormShow}
          value={form.name}
          handleFormSubmit={this.handleFormSubmit}
          handleClose={this.handlePlateFormClose}
          handleFormChange={this.handleFormChange}
          handleFormDelete={this.handleFormDelete}
          enableDelete={true}
          labelCar="Araç Modeli"
          nameCar="model"
          placeholderCar="Araç Markasını Giriniz"
          valueCar={form.model}

          nameColor="color"
          placeholderColor="Araç Rengi"
          valueColor={form.color}
        />
      </Container>
    );
  }
}

Plate.propTypes = {
  setUserPlates: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};

export default Plate;
