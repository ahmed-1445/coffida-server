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

  test = () => {
    console.log(this.state);
  };

  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.label}>
            Please enter the following details...
          </Text>
          <View style={styles.space} />
          <TextInput
            placeholder="Enter user ID"
            style={styles.Input}
            onChangeText={(userID) => this.setState({userID})}
            value={this.state.userID}
          />
          <TextInput
            placeholder="Enter email"
            style={styles.Input}
            onChangeText={(userEmail) => this.setState({userEmail})}
            value={this.state.userEmail}
          />
          <View style={styles.space} />
          <TouchableOpacity style={styles.Touch} onPress={() => this.test()}>
            <Text style={styles.TouchText}>Search</Text>
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
    color: 'black',
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

export default UserInfo;
