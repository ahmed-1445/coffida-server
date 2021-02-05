import React, {Component} from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';

class GetLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loc_id: '',
    };
  }

  locInfo = async () => {
    // const userToken = await AsyncStorage.getItem('@session_token');
    return fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' + this.state.loc_id,
      {
        headers: {
          // 'Content-Type': 'application/json',
          // 'X-Authorization': userToken,
        },
      },
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 401) {
          throw 'Not logged in, please login again!';
        } else {
          throw 'Error, please try again!';
        }
      })
      .then((responseJson) => {
        this.setState({
          // loading: false,
          user_data: responseJson,
        });
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.Label}>
            Please enter the following details...
          </Text>
          <View style={styles.space} />
          <Text style={styles.Label}>Location ID:</Text>

          <TextInput
            placeholder="Enter Location ID"
            style={styles.Input}
            onChangeText={(loc_id) => this.setState({loc_id})}
            value={this.state.loc_id}
          />
          <View style={styles.space} />
          <TouchableOpacity style={styles.Touch} onPress={() => this.locInfo()}>
            <Text style={styles.TouchText}>Search</Text>
          </TouchableOpacity>
          <View style={styles.space} />
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
    fontSize: 15,
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
    width: 10,
    height: 10,
  },
});

export default GetLocation;
