import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Importing all Screens & Components
import Home from './screens/Home';
import Register from './screens/Register';
import Login from './screens/Login';
import AuthenticatedUser from './screens/AuthenticatedUser';
import Logout from './screens/Logout';
import GetUser from './screens/GetUser';
import UpdateUser from './screens/UpdateUser';
import UserMan from './screens/UserMan';
import ReviewMan from './screens/ReviewMan';
import AddReview from './screens/AddReview';
import LocationMan from './screens/LocationMan';
import UpdateReview from './screens/UpdateReview';
import DeleteReview from './screens/DeleteReview';
import DeletePhoto from './screens/DeletePhoto';
import GetLocation from './screens/GetLocation';
import LocationDetails from './screens/LocationDetails';

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome to CoffiDa!" component={Home} />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{title: 'Create an account'}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{title: 'CoffiDa Sign In'}}
          />
          <Stack.Screen
            name="AuthenticatedUser"
            component={AuthenticatedUser}
            options={{title: 'Welcome User!'}}
          />
          <Stack.Screen
            name="Logout"
            component={Logout}
            options={{title: 'Goodbye!'}}
          />
          <Stack.Screen
            name="FindUser"
            component={GetUser}
            options={{title: 'View your Information'}}
          />
          <Stack.Screen
            name="UpdateUser"
            component={UpdateUser}
            options={{title: 'Update your Information'}}
          />
          <Stack.Screen
            name="UserMan"
            component={UserMan}
            options={{title: 'My Account'}}
          />
          <Stack.Screen
            name="ReviewMan"
            component={ReviewMan}
            options={{title: 'Review Management'}}
          />
          <Stack.Screen
            name="AddReview"
            component={AddReview}
            options={{title: 'New Review'}}
          />
          <Stack.Screen
            name="LocationMan"
            component={LocationMan}
            options={{title: 'Location Management'}}
          />
          <Stack.Screen
            name="UpdateReview"
            component={UpdateReview}
            options={{title: 'Update a Review'}}
          />
          <Stack.Screen
            name="DeleteReview"
            component={DeleteReview}
            options={{title: 'Delete a Review'}}
          />
          <Stack.Screen
            name="DeletePhoto"
            component={DeletePhoto}
            options={{title: 'Delete a Photo'}}
          />
          <Stack.Screen
            name="GetLocation"
            component={GetLocation}
            options={{title: 'View all Locations'}}
          />
          <Stack.Screen
            name="LocationDetails"
            component={LocationDetails}
            options={{title: 'Location Details'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
