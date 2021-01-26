import React, {Component} from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: '',
      userEmail: '',
    };
  }

  handleIdInput = (id) => {
    this.setState({id: id});
  };

  handleEmailInput = (email) => {
    this.setState({email: email});
  };

  test = () => {
    console.log(this.state);
  };

  render() {
    return (
      <View>
        style={styles.container}>
        <ScrollView>
          <Text style={styles.label}>
            Please enter the following details...
          </Text>
          <View style={styles.space} />
          <TextInput
            placeholder="Enter User ID"
            style={styles.label}
            onChangeText={this.handleIdInput}
            value={this.state.id}
          />
          <TextInput
            placeholder="Enter email"
            style={styles.label}
            onChangeText={this.handleEmailInput}
            value={this.state.email}
          />
          <TouchableOpacity style={styles.Touch} onPress={() => this.test()} />
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
    color: 'white',
  },
  space: {
    width: 20,
    height: 20,
  },
});

export default UserInfo;
