import { Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import upload from '../api/file';

const OPTIONS = {
  quality: 1.0,
  maxWidth: 500,
  maxHeight: 500,
  storageOptions: {
    skipBackup: true
  },title: 'Fotoğraf Seçiniz',
  cancelButtonTitle: 'İptal Et',
  takePhotoButtonTitle: 'Fotoğraf Çek',
  chooseFromLibraryButtonTitle : "Kütüphaneden Seç"
};

class ImagePickerClass {
  constructor(props) {
    this.props = props;
    this.init();
  }

  init() {
    ImagePicker.showImagePicker(OPTIONS, response => {
      if (response.didCancel) {
        // console.log('User cancelled photo picker');
        return;
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
        return;
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
        return;
      } else {
        response.source = { uri: response.uri };
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
      }

      this.doUpload(response);
    });
  }

  doUpload(file) {
    console.log(file,"filemiz")
    // eslint-disable-next-line
    const params = new FormData();

    params.append('file', {
      name: file.fileName ?? "newFile.HEIC",
      type: file.type,
      uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', '')
    });

    upload(params)

      .then(response => {
        console.log("params",params)
        this.success(response);
      })
      .catch(() => {});
  }

  success(response) {
    const { success } = this.props;
    console.log(response,"repsonase,iz")
    if (!success) {
      return false;
    }

    success(response);
  }
}

export default ImagePickerClass;
