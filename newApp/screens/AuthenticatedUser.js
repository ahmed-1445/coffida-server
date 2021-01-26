import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

class AuthenticatedUser extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.Label}>Select of the following options:</Text>
          <TouchableOpacity
            style={styles.Touch}
            onPress={() => navigation.navigate('UserMan')}>
            <Text style={styles.TouchText}>User Management</Text>
          </TouchableOpacity>
          {/*<View style={styles.space} />*/}
          {/*<TouchableOpacity*/}
          {/*  style={styles.Touch}*/}
          {/*  onPress={() => navigation.navigate('UserInfo')}>*/}
          {/*  <Text style={styles.TouchText}>Get User Information</Text>*/}
          {/*</TouchableOpacity>*/}
          {/*<View style={styles.space} />*/}
          {/*<TouchableOpacity*/}
          {/*  style={styles.Touch}*/}
          {/*  onPress={() => navigation.navigate('UpdateUser')}>*/}
          {/*  <Text style={styles.TouchText}>Update your Information</Text>*/}
          {/*</TouchableOpacity>*/}
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
