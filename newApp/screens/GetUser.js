import React, {Component} from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  // ActivityIndicator,
  VirtualizedList,
  LogBox,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class GetUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      loading: true,
      first_name: '',
      last_name: '',
      // email: '',
      user_data: [],
      token: '',
    };
  }

  componentDidMount() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }

  find = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + this.state.id, {
      // method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userToken,
      },
    })
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
    // if (this.state.loading) {
    //   return (
    //     <View>
    //       <ActivityIndicator />
    //     </View>
    //   );
    // } else {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.Label}>
            Please enter the following details...
          </Text>
          <View style={styles.space} />
          <TextInput
            placeholder="Enter user ID"
            style={styles.Input}
            onChangeText={(id) => this.setState({id})}
            value={this.state.id}
          />
          {/*<TextInput*/}
          {/*  placeholder="Enter Last Name"*/}
          {/*  style={styles.Input}*/}
          {/*  onChangeText={(last_name) => this.setState({last_name})}*/}
          {/*  value={this.state.last_name}*/}
          {/*/>*/}
          <View style={styles.space} />
          <TouchableOpacity style={styles.Touch} onPress={() => this.find()}>
            <Text style={styles.TouchText}>Search</Text>
          </TouchableOpacity>
          <View style={styles.space} />
          <View style={styles.space} />
          <VirtualizedList
            data={this.state.user_data}
            getItem={(data, index) => data[index]}
            getItemCount={(data) => data.length}
            renderItem={({item}) => (
              <View>
                <Text>{item.first_name}</Text>
                <Text>{item.last_name}</Text>
              </View>
            )}
            keyExtractor={(item, index) => item.id.toString()}
          />
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
    width: 5,
    height: 5,
  },
});

export default GetUser;
