import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class AuthenticatedUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkAuth();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  checkAuth = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if (value == null) {
      this.props.navigation.navigate('Login');
    }
  };

  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.Label}>Select of the following options:</Text>
        <TouchableOpacity
          style={styles.Touch}
          onPress={() => navigation.navigate('UserMan')}>
          <Text style={styles.TouchText}>My Account</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.Touch}
          onPress={() => navigation.navigate('ReviewMan')}>
          <Text style={styles.TouchText}>Reviews</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.Touch}
          onPress={() => navigation.navigate('LocationMan')}>
          <Text style={styles.TouchText}>Locations</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.Touch}
          onPress={() => navigation.navigate('Logout')}>
          <Text style={styles.TouchText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: 'lightseagreen',
  },
  // logout: {
  //   marginTop: 10,
  //   // flex: 2,
  //   padding: 55,
  //   backgroundColor: 'lightseagreen',
  // },
  Label: {
    fontSize: 15,
    color: 'white',
  },
  Input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  Touch: {
    // alignItems: 'center',
    // borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  TouchText: {
    fontSize: 15,
    color: 'white',
    elevation: 8,
    backgroundColor: 'darkorchid',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 95,
  },
  space: {
    width: 10,
    height: 10,
  },
});

export default AuthenticatedUser;
