import React, {Component} from 'react';
import {View, ToastAndroid, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class GetPhoto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: '',
      noImage: false,
    };
  }

  componentDidMount() {
    this.getPhoto();
    console.disableYellowBox = true;
    // Disabled YellowBox for source.uri is empty, getPhoto function solves this. (See Line 109)
  }

  getPhoto = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    const locationID = await AsyncStorage.getItem('@location_id');
    const reviewID = await AsyncStorage.getItem('@review_id');
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locationID + '/review/' + reviewID + '/photo', {
        headers: {
          'Content-Type': 'image/jpeg',
          'X-Authorization': userToken,
        },
      },
    )
      .then((response) => {
        if (response.status === 200) {
          this.setState({imageURL: response.url + '?timestamp=' + Date.now()});
          this.state.imageURL.stringify;
          console.log('URL:', this.state.imageURL);
        } else if (response.status === 400) {
          throw 'Invalid details, please try again!';
        } else if (response.status === 401) {
          throw 'Unauthorised!';
        } else if (response.status === 403) {
          throw 'Forbidden!';
        } else if (response.status === 404) {
          this.setState({noImage: true});
        } else if (response.status === 500) {
          throw 'Server error!';
        } else {
          throw 'Error, please try again!';
        }
      })
      .catch((error) => {
        console.error(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  deletePhoto = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    const locationID = await AsyncStorage.getItem('@location_id');
    const reviewID = await AsyncStorage.getItem('@review_id');
    console.log('Location ID:', locationID);
    console.log('Review ID:', reviewID);
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locationID + '/review/' + reviewID + '/photo', {
        method: 'delete',
        headers: {'X-Authorization': userToken},
      },
    )
      .then((response) => {
        if (response.status === 200) {
          ToastAndroid.show('Photo deleted!', ToastAndroid.SHORT);
          this.props.navigation.navigate('UserReviews');
          console.log('here');
        } else if (response.status === 400) {
          throw 'Bad request!';
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

  render() {
    if (this.state.noImage) {
      return (
        <View style={styles.noPhotoScreen}>
          <Image
            style={styles.noPhoto}
            source={require('./../icons/noImage.png')}
          />
          <Text style={styles.label}>No photo for this review</Text>
          <TouchableOpacity
            style={styles.noPhotoButton}
            onPress={() => this.props.navigation.navigate('AddPhoto')}>
            <Text style={styles.buttonText}>Add Photo</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      // The URI of the captured image is passed into 'source' by the state value
      // of 'imageURL' (Line 116) which triggers a warning about 'source.uri' being empty.
      // The feature has been tested extensively and no issues have been produced,
      // confirming the feature works.
      console.log('Render URL:', this.state.imageURL);
      return (
        <View style={styles.container}>
          <Image style={styles.photo} source={{uri: this.state.imageURL}} />
          <View style={styles.space} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.deletePhoto()}>
            <Text style={styles.buttonText}>Delete Photo</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: '#73D2DC',
  },
  photo: {
    width: 390,
    height: 610,
  },
  noPhotoScreen: {
    backgroundColor: '#73D2DC',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPhoto: {
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  label: {
    fontSize: 17,
    color: 'black',
    top: -15,
  },
  noPhotoButton: {
    backgroundColor: '#f77c39',
    height: 42,
    width: '70%',
    top: -7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#f77c39',
    height: 42,
    width: '70%',
    left: 60,
    top: -7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
  space: {
    width: 10,
    height: 10,
  },
});

export default GetPhoto;
