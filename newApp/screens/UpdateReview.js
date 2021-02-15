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
import AsyncStorage from '@react-native-community/async-storage';

class UpdateReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location_id: '',
      review_id: '',
      overall_rating: '',
      quality_rating: '',
      clenliness_rating: '',
      review_body: '',
      reviewData: [],
    };
  }

  update = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    const locationID = await AsyncStorage.getItem('@location_id');
    const reviewID = await AsyncStorage.getItem('@review_id');
    let details = {
      location_id: parseInt(this.state.loc_id),
      review_id: parseInt(this.state.rev_id),
      overall_rating: this.state.overall_rating,
      quality_rating: this.state.quality_rating,
      clenliness_rating: this.state.clenliness_rating,
      review_body: this.state.review_body,
    };
    return fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' +
        locationID +
        '/review/' +
        reviewID,
      {
        method: 'patch',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': userToken,
        },
        body: JSON.stringify(details),
      },
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          throw 'Invalid details, please try again!';
        } else {
          throw 'Error, please try again!';
        }
      })
      .then(async (responseJson) => {
        this.setState({
          reviewData: responseJson,
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
          <Text style={styles.Label}>Please fill in the below form...</Text>
          <View style={styles.space} />
          <Text style={styles.Label}>Location ID:</Text>
          <TextInput
            placeholder="Enter the Location ID"
            style={styles.Input}
            onChangeText={(location_id) => this.setState({location_id})}
            value={this.state.location_id}
          />
          <View style={styles.space} />
          <View>
            <Text style={styles.Label}>Review ID:</Text>
            <TextInput
              placeholder="Enter the Review ID"
              style={styles.Input}
              onChangeText={(review_id) => this.setState({review_id})}
              value={this.state.review_id}
            />
          </View>
          <View style={styles.space} />
          <View>
            <Text style={styles.Label}>Overall Rating:</Text>
            <TextInput
              placeholder="What's the overall rating?"
              style={styles.Input}
              onChangeText={(overall_rating) => this.setState({overall_rating})}
              value={this.state.overall_rating}
            />
          </View>
          <View style={styles.space} />
          <View>
            <Text style={styles.Label}>Quality Rating:</Text>
            <TextInput
              placeholder="What's the quality rating?"
              style={styles.Input}
              onChangeText={(quality_rating) => this.setState({quality_rating})}
              value={this.state.quality_rating}
            />
          </View>
          <View style={styles.space} />
          <View>
            <Text style={styles.Label}>Cleanliness Rating:</Text>
            <TextInput
              placeholder="What's the cleanliness rating?"
              style={styles.Input}
              onChangeText={(clenliness_rating) =>
                this.setState({clenliness_rating})
              }
              value={this.state.clenliness_rating}
            />
          </View>
          <View style={styles.space} />
          <View>
            <Text style={styles.Label}>Any Comments:</Text>
            <TextInput
              placeholder="Anything to add?"
              style={styles.Input}
              onChangeText={(review_body) => this.setState({review_body})}
              value={this.state.review_body}
            />
          </View>
          <View style={styles.space} />
          <View>
            <TouchableOpacity
              style={styles.Touch}
              onPress={() => this.update()}>
              <Text style={styles.TouchText}>Submit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.space} />
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

export default UpdateReview;
