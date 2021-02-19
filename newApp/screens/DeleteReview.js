import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class DeleteReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loc_id: '',
      rev_id: '',
    };
  }

  deleteReview = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    // const location_id = await AsyncStorage.getItem('@location_id');
    const rev_id = await AsyncStorage.getItem('@review_id');
    console.log(this.state.loc_id);
    console.log(this.state.rev_id);
    return fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' +
      this.state.loc_id +
      '/review/' +
      this.state.rev_id,
      {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': userToken,
        },
      },
    )
      .then(() => {
        ToastAndroid.show('Deleted!', ToastAndroid.SHORT);
        console.log('Deleted Review!');
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
          <Text style={styles.Label}>Please fill in the below form...</Text>
          <View style={styles.space} />
          <Text style={styles.Label}>Location ID:</Text>
          <TextInput
            placeholder="Enter the Location ID"
            style={styles.Input}
            onChangeText={(loc_id) => this.setState({loc_id})}
            value={this.state.loc_id}
          />
          <View style={styles.space} />
          <Text style={styles.Label}>Review ID:</Text>
          <TextInput
            placeholder="Enter the Review ID"
            style={styles.Input}
            onChangeText={(rev_id) => this.setState({rev_id})}
            value={this.state.rev_id}
          />
          <View style={styles.space} />
          <View>
            <TouchableOpacity
              style={styles.Touch}
              onPress={() => this.delete()}>
              <Text style={styles.TouchText}>Delete Review</Text>
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
    width: 10,
    height: 10,
  },
});

export default DeleteReview;
