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
          <Text style={styles.label}>You have successfully logged out!</Text>
          <View style={styles.space} />
          <TouchableOpacity
            style={styles.Touch}
            onPress={() => navigation.popToTop()}>
            <Text style={styles.TouchText}>Home</Text>
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
    fontWeight: 'bold',
    color: 'black',
  },
  space: {
    width: 20,
    height: 20,
  },
});

export default AuthenticatedUser;
