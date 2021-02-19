import React, {Component} from 'react';
import {View, Button, Alert, ToastAndroid, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import AsyncStorage from '@react-native-community/async-storage';

class AddPhoto extends Component {
  addPhoto = async (data) => {
    const userToken = await AsyncStorage.getItem('@session_token');
    const locationID = await AsyncStorage.getItem('@location_id');
    const reviewID = await AsyncStorage.getItem('@review_id');
    console.log(data.uri);
    return fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' +
        locationID +
        '/review/' +
        reviewID +
        '/photo',
      {
        method: 'post',
        headers: {
          'Content-Type': 'image/jpeg',
          'X-Authorization': userToken,
        },
        body: data,
      },
    )
      .then((response) => {
        Alert.prompt(response.status);
        ToastAndroid.show('Review Updated!', ToastAndroid.SHORT);
        this.props.navigation.navigate('UpdateReview');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      this.addPhoto(data);
    }
  };

  render() {
    return (
      <View style={styles.cameraContainer}>
        <RNCamera ref={(ref) => {this.camera = ref;}} style={styles.camera} />
        <Button title="Capture" onPress={() => this.takePicture()} />
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
