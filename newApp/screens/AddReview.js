import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

class AddReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      overallRating: '',
      priceRating: '',
      qualityRating: '',
      cleanlinessRating: '',
      reviewComment: '',
    };
  }

  test = () => {
    console.log(this.state);
  };

  // TextInput fields to be replaced with Stars

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Please enter the following details:</Text>
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
              onChangeText={(reviewComment) => this.setState({reviewComment})}
              value={this.state.reviewComment}
            />
          </View>
          <View style={styles.space} />
          <View>
            <TouchableOpacity style={styles.Touch} onPress={() => this.test()}>
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
  title: {
    color: 'white',
    // backgroundColor: 'red', - needs further adjusting
    padding: 3,
    fontSize: 14,
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

export default AddReview;
