import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

class Home extends Component {
  render() {
    const navigation = this.props.navigation;

    return (
      <View style={styles.container}>
        <Button
          title="Register"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightseagreen',
  },
  text: {
    color: 'white',
    fontSize: 25,
  },
});

export default Home;
