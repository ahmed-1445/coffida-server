import React, {Component} from 'react';
import {
  View,
  TextInput,
  // ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  // VirtualizedList,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class UpdateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      first_name: '',
      last_ame: '',
      email: '',
      password: '',
    };
  }

  test = () => {
    console.log(this.state);
  };

  update = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    // const id = await AsyncStorage.getItem('@user_id');
    let details = {
      user_id: parseInt(this.state.id),
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
    };
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/', +this.state.id, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userToken,
      },
      body: JSON.stringify(details),
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
        console.log(this.test);
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
        <Text style={styles.Label}>Please fill in the below form...</Text>
        <View style={styles.space} />
        <Text style={styles.Label}>User ID:</Text>
        <TextInput
          placeholder="Enter your user ID"
          style={styles.Input}
          onChangeText={(id) => this.setState({id})}
          value={this.state.id}
        />
        <View style={styles.space} />
        <View>
          <Text style={styles.Label}>First Name:</Text>
          <TextInput
            placeholder="Enter your first name"
            style={styles.Input}
            onChangeText={(first_name) => this.setState({first_name})}
            value={this.state.first_name}
          />
        </View>
        <View>
          <Text style={styles.Label}>Last Name:</Text>
          <TextInput
            placeholder="Enter your last name"
            style={styles.Input}
            onChangeText={(last_name) => this.setState({last_name})}
            value={this.state.last_name}
          />
        </View>
        <View>
          <Text style={styles.Label}>Email:</Text>
          <TextInput
            placeholder="Enter your Email Address"
            style={styles.Input}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
          />
        </View>
        <View>
          <Text style={styles.Label}>Password:</Text>
          <TextInput
            placeholder="Enter your password"
            style={styles.Input}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.space} />
        <View>
          <TouchableOpacity style={styles.Touch} onPress={() => this.update()}>
            <Text style={styles.TouchText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.space} />
        <View style={styles.space} />
        {/*<VirtualizedList*/}
        {/*  data={this.state.user_data}*/}
        {/*  renderItem={({item}) => (*/}
        {/*    <View>*/}
        {/*      <Text>{item.first_name}</Text>*/}
        {/*      <Text>{item.last_name}</Text>*/}
        {/*    </View>*/}
        {/*  )}*/}
        {/*  keyExtractor={(item) => item.id.toString()}*/}
        {/*/>*/}
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
    // fontWeight: 'bold',
    color: 'white',
  },
  space: {
    width: 5,
    height: 5,
  },
});

export default UpdateUser;
