import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ToastAndroid,Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class UserMan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      firstName: '',
      lastName: '',
      email: '',
      token: '',
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    const userID = await AsyncStorage.getItem('@id');
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + userID, {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userToken,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          throw 'Bad Request!';
        } else if (response.status === 401) {
          throw 'Not logged in, please login again!';
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
      .then((responseJSON) => {
        this.setState({
          loading: false,
          firstName: responseJSON.first_name,
          lastName: responseJSON.last_name,
          email: responseJSON.email,
        });
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  render() {
    const navigation = this.props.navigation;
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <Text style={styles.label}>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Account Details</Text>
          <View style={styles.row} />
          {/* <View style={styles.space} /> */}
          <Text style={styles.label}>Full Name: {this.state.firstName} {this.state.lastName}</Text>
          <Text style={styles.label}>Email: {this.state.email}</Text>
          <View style={styles.row} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('UpdateUser')}>
            <Text style={styles.buttonText}>Update Details</Text>
          </TouchableOpacity>
          <View style={styles.space} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('UserReviews')}>
            <Text style={styles.buttonText}>My Reviews</Text>
          </TouchableOpacity>
          <Image
            style={styles.image}
            source={require('./../icons/settings.png')}
          />
          <Text style={styles.imageTitle}>Fancy a change?</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('AuthenticatedUser')}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#73D2DC',
  },
  loading: {
    backgroundColor: '#73D2DC',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    alignSelf: 'center',
    width: 130,
    height: 130,
    top: 115,
  },
  imageTitle: {
    fontSize: 20,
    color: 'black',
    alignSelf: 'center',
    top: 100,
  },
  title: {
    fontSize: 17,
    color: 'black',
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    color: 'black',
    alignSelf: 'center',
  },
  row: {
    padding: 2,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  backButton: {
    backgroundColor: '#f77c39',
    height: 42,
    width: '70%',
    left: 60,
    top: 260,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#f77c39',
    height: 42,
    width: '70%',
    left: 60,
    top: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
  space: {
    width: 20,
    height: 20,
  },
});

export default UserMan;
