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
        <ScrollView>
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
            <Text style={styles.TouchText}>Review Management</Text>
          </TouchableOpacity>
          <View style={styles.space} />
          <TouchableOpacity
            style={styles.Touch}
            onPress={() => navigation.navigate('LocationMan')}>
            <Text style={styles.TouchText}>Location Management</Text>
          </TouchableOpacity>
          <View style={styles.space} />
          <TouchableOpacity
            style={styles.Touch}
            onPress={() => navigation.navigate('Logout')}>
            <Text style={styles.TouchText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
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
  Label: {
    fontSize: 13,
    color: 'white',
  },
  Input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  Touch: {
    backgroundColor: 'darkorchid',
    padding: 10,
    alignItems: 'center',
  },
  TouchText: {
    fontSize: 20,
    // fontWeight: 'bold',
    color: 'white',
  },
  space: {
    width: 20,
    height: 20,
  },
});

export default AuthenticatedUser;
