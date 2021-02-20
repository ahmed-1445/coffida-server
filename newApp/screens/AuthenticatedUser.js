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
        <Text style={styles.Title}>What would you like to do?</Text>
        <TouchableOpacity
          style={styles.Touch}
          onPress={() => navigation.navigate('UserMan')}>
          <Text style={styles.TouchText}>My Account</Text>
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
  Title: {
    fontSize: 17,
    color: 'white',
  },
  Touch: {
    // alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  TouchText: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'darkorchid',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 132,
  },
  space: {
    width: 10,
    height: 10,
  },
});

export default AuthenticatedUser;
