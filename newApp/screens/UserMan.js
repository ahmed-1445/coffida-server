import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class UserMan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // id: '',
      isLoading: true,
      first_name: '',
      last_name: '',
      email: '',
      token: '',
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    const user_id = await AsyncStorage.getItem('@id');
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + user_id, {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userToken,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 401) {
          throw 'Not logged in, please login again!';
        } else {
          throw 'Error, please try again!';
        }
      })
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          first_name: responseJson.first_name,
          last_name: responseJson.last_name,
          email: responseJson.email,
        });
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  render() {
    const navigation = this.props.navigation;
    if (this.state.isLoading) {
      return (
        <View style={styles.loading}>
          <Text style={styles.Label}>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.row} />
          <Text style={styles.Label}>Account details:</Text>
          <View style={styles.space} />
          <Text style={styles.Label}>
            Full Name: {this.state.first_name} {this.state.last_name}
          </Text>
          <Text style={styles.Label}>Email: {this.state.email}</Text>
          <View style={styles.row} />
          <View style={styles.space} />
          <TouchableOpacity
            style={styles.Touch}
            onPress={() => navigation.navigate('UpdateUser')}>
            <Text style={styles.TouchText}>Update Details</Text>
          </TouchableOpacity>
          <View style={styles.space} />
          <TouchableOpacity
            style={styles.Touch}
            onPress={() => navigation.navigate('UserReviews')}>
            <Text style={styles.customReviews}>My Reviews</Text>
          </TouchableOpacity>
          <Image
            style={styles.Image}
            source={require('./../icons/settings.png')}
          />
          <TouchableOpacity
            style={styles.Back}
            onPress={() => navigation.navigate('AuthenticatedUser')}>
            <Text style={styles.TouchText}>Back</Text>
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
  loading: {
    backgroundColor: '#73D2DC',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Image: {
    alignSelf: 'center',
    width: 130,
    height: 130,
    top: 120,
  },
  customReviews: {
    fontSize: 15,
    color: 'black',
    backgroundColor: '#f77c39',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 150,
  },
  Label: {
    fontSize: 17,
    color: 'black',
  },
  Input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  row: {
    padding: 2,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  Touch: {
    paddingVertical: 5,
  },
  Back: {
    paddingVertical: 10,
    top: 270,
  },
  TouchText: {
    fontSize: 16,
    color: 'black',
    backgroundColor: '#f77c39',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 165,
  },
  space: {
    width: 10,
    height: 10,
  },
});

export default UserMan;
