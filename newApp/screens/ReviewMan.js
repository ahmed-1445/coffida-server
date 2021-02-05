import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

class ReviewMan extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.Label}>The following options are available:</Text>
        <TouchableOpacity
          style={styles.Touch}
          onPress={() => navigation.navigate('AddReview')}>
          <Text style={styles.TouchText}>Add a Review</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.Touch}
          onPress={() => navigation.navigate('UpdateReview')}>
          <Text style={styles.TouchText}>Update a Review</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.Touch}
          onPress={() => navigation.navigate('DeleteReview')}>
          <Text style={styles.TouchText}>Delete a Review</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.Touch}
          onPress={() => navigation.navigate('ViewPhoto')}>
          <Text style={styles.TouchText}>View a Photo </Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.Touch}
          onPress={() => navigation.navigate('AddPhoto')}>
          <Text style={styles.TouchText}>Add a Photo</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <TouchableOpacity
          style={styles.Touch}
          onPress={() => navigation.navigate('DeletePhoto')}>
          <Text style={styles.TouchText}>Delete a Photo</Text>
        </TouchableOpacity>
        {/*<View style={styles.space} />*/}
        {/*<TouchableOpacity*/}
        {/*  style={styles.Touch}*/}
        {/*  onPress={() => navigation.navigate('Like')}>*/}
        {/*  <Text style={styles.TouchText}>Like Review</Text>*/}
        {/*</TouchableOpacity>*/}
        {/*<View style={styles.space} />*/}
        {/*<TouchableOpacity*/}
        {/*  style={styles.Touch}*/}
        {/*  onPress={() => navigation.navigate('Unlike')}>*/}
        {/*  <Text style={styles.TouchText}>Unlike Review</Text>*/}
        {/*</TouchableOpacity>*/}
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
    width: 20,
    height: 20,
  },
});

export default ReviewMan;
