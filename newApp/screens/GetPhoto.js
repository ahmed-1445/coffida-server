import React, {Component} from 'react';
import {
  View,
  Alert,
  ToastAndroid,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class GetPhoto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: '',
    };
  }

  componentDidMount() {
    this.getPhoto();
    console.disableYellowBox = true;
    //Disabled YellowBox for source.uri is empty, getPhoto function solves this
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
          // console.log('URL:', this.state.imageURL);
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

  deletePhoto = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    const locationID = await AsyncStorage.getItem('@location_id');
    const reviewID = await AsyncStorage.getItem('@review_id');
    console.log('Location ID:', locationID);
    console.log('Review ID:', reviewID);
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locationID + '/review/' + reviewID + '/photo', {
        method: 'delete',
        headers: {'X-Authorization': userToken},
    })
      .then((response) => {
        if (response.status === 200) {
          ToastAndroid.show('Photo deleted!', ToastAndroid.SHORT);
          this.props.navigation.navigate('UserReviews');
          console.log('here');
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
    console.log('Render URL:', this.state.imageURL);
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: this.state.imageURL}} />
        <View style={styles.space} />
        {/*<TouchableOpacity*/}
        {/*  style={styles.Touch}*/}
        {/*  onPress={() => this.props.navigation.navigate('AddPhoto')}>*/}
        {/*  <Text style={styles.TouchText}>Add Photo</Text>*/}
        {/*</TouchableOpacity>*/}
        <TouchableOpacity
          style={styles.Touch}
          onPress={() => this.deletePhoto()}>
          <Text style={styles.TouchText}>Delete Photo</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: '#73D2DC',
  },
  image: {
    width: 390,
    height: 600,
  },
  loading: {
    backgroundColor: '#73D2DC',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Label: {
    fontSize: 17,
    color: 'black',
  },
  Touch: {
    // backgroundColor: 'darkorchid',
    alignItems: 'center',
    // paddingVertical: 20,
    // paddingHorizontal: 25,
  },
  TouchText: {
    fontSize: 17,
    color: 'black',
    backgroundColor: '#f77c39',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 142,
  },
  space: {
    width: 10,
    height: 10,
  },
});

export default GetPhoto;
