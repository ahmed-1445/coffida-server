import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPass: '',
    };
  }

  signUp = () => {
    console.log(this.state);
  };
  // <View style={styles.Item}> - does not with styling (for each element from starting Line 33)
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Please fill in the below form...</Text>
          <View>
            <Text style={styles.Label}>First Name:</Text>
            <TextInput
              placeholder="Enter your first name"
              style={styles.Input}
              onChangeText={(firstName) => this.setState({firstName})}
              value={this.state.firstName}
            />
          </View>
          <View>
            <Text style={styles.Label}>Last Name:</Text>
            <TextInput
              placeholder="Enter your last name"
              style={styles.Input}
              onChangeText={(lastName) => this.setState({lastName})}
              value={this.state.firstName}
            />
          </View>
          <View>
            <Text style={styles.Label}>Email:</Text>
            <TextInput
              placeholder="Enter your Email Address"
              style={styles.Input}
              onChangeText={(email) => this.setState({email})}
              value={this.state.firstName}
            />
          </View>
          <View>
            <Text style={styles.Label}>Password:</Text>
            <TextInput
              placeholder="Enter your password"
              style={styles.Input}
              onChangeText={(password) => this.setState({password})}
              value={this.state.firstName}
            />
          </View>
          <View>
            <Text style={styles.Label}>Confirm Password:</Text>
            <TextInput
              placeholder="Enter your password"
              style={styles.Input}
              onChangeText={(confirmPass) => this.setState({confirmPass})}
              value={this.state.firstName}
            />
          </View>
          <View style={styles.space} />
          <View>
            <TouchableOpacity
              style={styles.Touch}
              onPress={() => this.signUp()}>
              <Text style={styles.TouchText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
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
  title: {
    color: 'white',
    // backgroundColor: 'red', - needs further adjusting
    padding: 3,
    fontSize: 14,
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

export default Register;
