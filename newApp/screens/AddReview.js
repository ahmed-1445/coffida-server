import React, {Component} from 'react';
import {View ,ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {AirbnbRating} from 'react-native-elements';

class AddReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      overallRating: '',
      priceRating: '',
      qualityRating: '',
      clenlinessRating: '',
      reviewBody: '',
    };
  }

  addReview = async () => {
    const userToken = await AsyncStorage.getItem('@session_token');
    const locationID = await AsyncStorage.getItem('@location_id');
    let details = {
      overall_rating: parseInt(this.state.overallRating),
      price_rating: parseInt(this.state.priceRating),
      quality_rating: parseInt(this.state.qualityRating),
      clenliness_rating: parseInt(this.state.clenlinessRating),
      review_body: this.state.reviewBody,
    };

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locationID + '/review', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': userToken,
        },
        body: JSON.stringify(details),
      },
    )
      .then((response) => {
        if (response.status === 201) {
          console.log('Review added!', response);
          ToastAndroid.show('Review added!', ToastAndroid.SHORT);
          this.props.navigation.navigate('AllLocations');
        } else if (response.status === 400) {
          throw 'Fill in the form in full, please try again!';
        } else if (response.status === 401) {
          throw 'Unauthorised, please log in!';
        } else if (response.status === 403) {
          throw 'Forbidden!';
        } else if (response.status === 404) {
          throw 'Not found!';
        } else if (response.status === 500) {
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
          <Text style={styles.title}>Enter your Ratings</Text>
          <View style={styles.row} />
          <Text style={styles.label}>Overall Rating</Text>
          <AirbnbRating
            count={5}
            reviews={['1', '2', '3', '4', '5']}
            defaultRating={0}
            size={20}
            onFinishRating={(overallRating) => this.setState({overallRating})}
          />
          <View style={styles.space} />
          <Text style={styles.label}>Price Rating</Text>
          <AirbnbRating
            count={5}
            reviews={['1', '2', '3', '4', '5']}
            defaultRating={0}
            size={20}
            onFinishRating={(priceRating) => this.setState({priceRating})}
          />
          <View style={styles.space} />
          <Text style={styles.label}>Quality Rating</Text>
          <AirbnbRating
            count={5}
            reviews={['1', '2', '3', '4', '5']}
            defaultRating={0}
            size={20}
            onFinishRating={(qualityRating) => this.setState({qualityRating})}
          />
          <View style={styles.space} />
          <Text style={styles.label}>Cleanliness Rating</Text>
          <AirbnbRating
            count={5}
            reviews={['1', '2', '3', '4', '5']}
            defaultRating={0}
            size={20}
            onFinishRating={(clenlinessRating) => this.setState({clenlinessRating})}
          />
          <View style={styles.row} />
          <View style={styles.space} />
          <Text style={styles.label}>Comments:</Text>
          <TextInput
            placeholder="Anything to add?"
            style={styles.input}
            onChangeText={(reviewBody) => this.setState({reviewBody})}
            value={this.state.reviewBody}
          />
          <View style={styles.space} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.addReview()}>
            <Text style={styles.buttonText}>Submit</Text>
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
    padding: 8,
    backgroundColor: '#73D2DC',
  },
  label: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'black',
  },
  row: {
    padding: 2,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  title: {
    fontSize: 17,
    color: 'black',
    alignSelf: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#f77c39',
    height: 42,
    width: '70%',
    left: 60,
    top: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
  space: {
    width: 10,
    height: 10,
  },
});

export default AddReview;
