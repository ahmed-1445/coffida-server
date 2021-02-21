import React, {Component} from 'react';
import {View, Button, ToastAndroid, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import AsyncStorage from '@react-native-community/async-storage';

class AddPhoto extends Component {
  addPhoto = async (image) => {
    const userToken = await AsyncStorage.getItem('@session_token');
    const locationID = await AsyncStorage.getItem('@location_id');
    const reviewID = await AsyncStorage.getItem('@review_id');
    console.log(image.uri);
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locationID + '/review/' + reviewID + '/photo',{
        method: 'post',
        headers: {
          'Content-Type': 'image/jpeg',
          'X-Authorization': userToken,
        },
        body: image,
      },
    )
      .then((response) => {
        if (response.status === 200) {
          ToastAndroid.show('Photo added!', ToastAndroid.SHORT);
          this.props.navigation.navigate('UpdateReview');
        } else if (response.status === 400) {
          throw 'Invalid details, please try again!';
        } else if (response.status === 401) {
          throw 'Unauthorised!';
        } else if (response.status === 403) {
          throw 'Forbidden!';
        } else if (response.status === 404) {
          throw 'Not found!';
        } else if (response.status === 500) {
          throw 'Server error!';
        } else {
          throw 'Error, please try again!';
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  capture = async () => {
    if (this.camera) {
      const settings = {quality: 0.5, base64: true};
      const image = await this.camera.takePictureAsync(settings);
      this.addPhoto(image);
    }
  };

  render() {
    return (
      <View style={styles.cameraContainer}>
        <RNCamera style={styles.camera} ref={(ref) => {this.camera = ref;}} />
        <Button title="Capture" onPress={() => this.capture()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
  },
});
export default AddPhoto;
