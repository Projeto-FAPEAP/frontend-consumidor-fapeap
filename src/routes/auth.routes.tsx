import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import RecoveryP from '../screens/RecoveryPassword';
import Register from '../screens/Register';
import SignIn from '../screens/SignIn';
import Welcome from '../screens/Welcome';

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Welcome"
      options={{ headerShown: false }}
      component={Welcome}
    />
    <AuthStack.Screen
      name="SignIn"
      options={{ headerShown: false }}
      component={SignIn}
    />
    <AuthStack.Screen
      name="Register"
      options={{ headerShown: false }}
      component={Register}
    />
    <AuthStack.Screen
      name="RecoveryP"
      options={{ headerShown: false }}
      component={RecoveryP}
    />
  </AuthStack.Navigator>
);

export default AuthRoutes;
