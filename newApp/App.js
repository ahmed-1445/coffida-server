import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './screens/Home';
import Register from './components/Register';
import Login from './components/Login';
import AuthenticatedUser from './screens/AuthenticatedUser';
import Logout from './screens/Logout';

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
            options={{title: 'Log into CoffiDa'}}
          />
          <Stack.Screen
            name="AuthenticatedUser"
            component={AuthenticatedUser}
            options={{title: 'Welcome!'}}
          />
          <Stack.Screen
            name="Logout"
            component={Logout}
            options={{title: 'Goodbye!'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
