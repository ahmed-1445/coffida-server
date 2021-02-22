import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {AirbnbRating} from 'react-native-elements';

class AddReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      overall_rating: '',
      price_rating: '',
      quality_rating: '',
      clenliness_rating: '',
      review_body: '',
    };
  }

  addReview = async () => {
    // Needs validation
    const userToken = await AsyncStorage.getItem('@session_token');
    const locationID = await AsyncStorage.getItem('@location_id');
    let details = {
      overall_rating: parseInt(this.state.overall_rating),
      price_rating: parseInt(this.state.price_rating),
      quality_rating: parseInt(this.state.quality_rating),
      clenliness_rating: parseInt(this.state.clenliness_rating),
      review_body: this.state.review_body,
    };

    return fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' + locationID + '/review', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': userToken,
        },
        body: JSON.stringify(details),
      },
    )
      .then((responseJSON) => {
        if (responseJSON.status === 201) {
          console.log('Review added!', responseJSON);
          ToastAndroid.show('Review added!', ToastAndroid.SHORT);
          this.props.navigation.navigate('GetLocation');
        } else if (responseJSON.status === 400) {
          throw 'Fill in the form in full, please try again!';
        } else if (responseJSON.status === 401) {
          throw 'Unauthorised, please log in!';
        } else if (responseJSON.status === 403) {
          throw 'Forbidden!';
        } else if (responseJSON.status === 404) {
          throw 'Not found!';
        } else if (responseJSON.status === 500) {
          throw 'Server error!';
        } else {
          throw 'Something went wrong, please try again!';
        }
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
          {/* <Text style={styles.Title}>Give your rating:</Text> */}
          <View style={styles.space} />
          <Text style={styles.Label}>Overall Rating:</Text>
          <AirbnbRating
            count={5}
            reviews={['1', '2', '3', '4', '5']}
            defaultRating={0}
            size={20}
            onFinishRating={(overall_rating) => this.setState({overall_rating})}
          />
          <View style={styles.space} />
          <Text style={styles.Label}>Price Rating:</Text>
          <AirbnbRating
            count={5}
            reviews={['1', '2', '3', '4', '5']}
            defaultRating={0}
            size={20}
            onFinishRating={(price_rating) => this.setState({price_rating})}
          />
          <View style={styles.space} />
          <Text style={styles.Label}>Quality Rating:</Text>
          <AirbnbRating
            count={5}
            reviews={['1', '2', '3', '4', '5']}
            defaultRating={0}
            size={20}
            onFinishRating={(quality_rating) => this.setState({quality_rating})}
          />
          <View style={styles.space} />
          <Text style={styles.Label}>Cleanliness Rating:</Text>
          <AirbnbRating
            count={5}
            reviews={['1', '2', '3', '4', '5']}
            defaultRating={0}
            size={20}
            onFinishRating={(clenliness_rating) => this.setState({clenliness_rating})}
          />
          <View style={styles.space} />
          <Text style={styles.Label}>Any comments:</Text>
          <TextInput
            placeholder="Any comments?"
            style={styles.Input}
            onChangeText={(review_body) => this.setState({review_body})}
            value={this.state.review_body}
          />
          <View style={styles.space} />
          <TouchableOpacity
            style={styles.Touch}
            onPress={() => this.addReview()}>
            <Text style={styles.TouchText}>Submit</Text>
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
    backgroundColor: '#73D2DC',
  },
  Title: {
    color: 'black',
    padding: 3,
    fontSize: 16,
  },
  Label: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'black',
  },
  Input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  Touch: {
    paddingVertical: 1,
    paddingHorizontal: 20,
  },
  TouchText: {
    fontSize: 16,
    color: 'black',
    backgroundColor: '#f77c39',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 148,
  },
  space: {
    width: 10,
    height: 10,
  },
});

export default AddReview;
