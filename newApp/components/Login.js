import React, {Component} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ToastAndroid,
  // ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // isLoading: true,
      email: '',
      password: '',
      token: '',
    };
  }

  handleEmailInput = (email) => {
    this.setState({email: email});
  };

  handlePasswordInput = (pass) => {
    this.setState({password: pass});
  };

  // componentDidMount() {
  //   this.login();
  // }

  login = async () => {
    // Add some validation i.e. password strength
    console.log('test');
    let to_send = {
      email: this.state.email,
      password: this.state.password,
    };
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(to_send),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          throw 'Invalid email or password, please try again!';
        } else {
          throw 'Error, please try again!';
        }
      })
      .then(async (responseJson) => {
        console.log(responseJson);
        await AsyncStorage.setItem('@session_token', responseJson.token);
        this.props.navigation.navigate('AuthenticatedUser');
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  render() {
    // const navigation = this.props.navigation;
    // if (this.state.isLoading) {
    //   return (
    //     <View>
    //       <ActivityIndicator />
    //     </View>
    //   );
    // }
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
          secureTextEntry={true}
        />
        <View style={styles.space} />
        <TouchableOpacity style={styles.Touch} onPress={() => this.login()}>
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
