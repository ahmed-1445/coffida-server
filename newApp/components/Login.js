import React, {Component} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

// Login component
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleEmailInput = (email) => {
    this.setState({email: email});
  };

  handlePasswordInput = (pass) => {
    this.setState({password: pass});
  };

  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.Label}>Email:</Text>
        <TextInput
          placeholder="Enter Email"
          style={styles.Input}
          onChangeText={this.handleEmailInput}
          value={this.state.email}
        />
        <Text style={styles.Label}>Password:</Text>
        <TextInput
          placeholder="Enter Password"
          style={styles.Input}
          onChangeText={this.handlePasswordInput}
          value={this.state.password}
        />
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.Touch}
          onPress={() => navigation.navigate('AuthenticatedUser')}>
          <Text style={styles.TouchText}>Sign In</Text>
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
    color: 'white',
  },
  space: {
    width: 20,
    height: 20,
  },
});

export default Login;
