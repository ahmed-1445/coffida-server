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

class AddReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      overallRating: '',
      priceRating: '',
      qualityRating: '',
      cleanlinessRating: '',
      reviewBody: '',
    };
  }

  // test = () => {
  //   console.log(this.state);
  // };

  // TextInput fields to be replaced with Stars

  // componentDidMount() {
  //   this.addReview();
  // }

  addReview = async () => {
    // Needs validation
    const userToken = await AsyncStorage.getItem('@session_token');
    const locationID = await AsyncStorage.getItem('@location_id');
    let details = {
      overall_rating: parseInt(this.state.overallRating),
      price_rating: parseInt(this.state.priceRating),
      quality_rating: parseInt(this.state.qualityRating),
      clenliness_rating: parseInt(this.state.cleanlinessRating),
      review_body: this.state.reviewBody,
    };

    return fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' + locationID + '/review',
      {
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
          return response.json();
        } else if (response.status === 400) {
          throw 'Please try again!';
        } else {
          throw 'Something went wrong...';
        }
      })
      .then((responseJSON) => {
        console.log('Review added!', responseJSON);
        ToastAndroid.show('Review added', ToastAndroid.SHORT);
        this.props.navigation.navigate('AuthenticatedUser');
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
          <Text style={styles.Label}>Please enter the following details:</Text>
          <View style={styles.space} />
          <View>
            <Text style={styles.Label}>Overall Rating:</Text>
            <TextInput
              placeholder="What's your overall rating?"
              style={styles.Input}
              onChangeText={(overallRating) => this.setState({overallRating})}
              value={this.state.overallRating}
            />
          </View>
          <View>
            <Text style={styles.Label}>Price Rating:</Text>
            <TextInput
              placeholder="What's your price rating?"
              style={styles.Input}
              onChangeText={(priceRating) => this.setState({priceRating})}
              value={this.state.priceRating}
            />
          </View>
          <View>
            <Text style={styles.Label}>Quality Rating:</Text>
            <TextInput
              placeholder="What's your quality rating?"
              style={styles.Input}
              onChangeText={(qualityRating) => this.setState({qualityRating})}
              value={this.state.qualityRating}
            />
          </View>
          <View>
            <Text style={styles.Label}>Cleanliness Rating:</Text>
            <TextInput
              placeholder="What's your cleanliness rating?"
              style={styles.Input}
              onChangeText={(cleanlinessRating) =>
                this.setState({cleanlinessRating})
              }
              value={this.state.cleanlinessRating}
            />
          </View>
          <View>
            <Text style={styles.Label}>Comment:</Text>
            <TextInput
              placeholder="Any comments?"
              style={styles.Input}
              onChangeText={(reviewBody) => this.setState({reviewBody})}
              value={this.state.reviewBody}
            />
          </View>
          <View style={styles.space} />
          <View>
            <TouchableOpacity
              style={styles.Touch}
              onPress={() => this.addReview()}>
              <Text style={styles.TouchText}>Submit</Text>
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
  // title: {
  //   color: 'white',
  //   padding: 3,
  //   fontSize: 14,
  // },
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
    paddingVertical: 1,
    paddingHorizontal: 20,
  },
  TouchText: {
    fontSize: 15,
    color: 'white',
    elevation: 8,
    backgroundColor: 'darkorchid',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 115,
  },
  space: {
    width: 10,
    height: 10,
  },
});

export default AddReview;
