import React, {Component} from 'react';
import {View, StyleSheet, Button} from 'react-native';

class Home extends Component {
  render() {
    const navigation = this.props.navigation;

    return (
      <View style={styles.container}>
        <Button
          title="Register"
          onPress={() => navigation.navigate('Register')}
        />
        <View style={styles.space} />
        <Button title="Sign In" onPress={() => navigation.navigate('Login')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'lightseagreen',
  },
  text: {
    color: 'white',
    fontSize: 25,
  },
  space: {
    width: 30,
    height: 30,
  },
});

export default Home;
