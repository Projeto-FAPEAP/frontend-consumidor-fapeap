import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import Welcome from '../screens/Welcome';
import SignIn from '../screens/SingIn';
import Register from '../screens/Register';
import RecoveryP from '../screens/RecoveryPassword';

const AppStack = createStackNavigator();

const AppRoutes: React.FC = () => (
    <AppStack.Navigator>
        <AppStack.Screen name="Welcome" options={{ headerShown: false }} component={Welcome} />
        <AppStack.Screen name="SignIn"  options={{ headerShown: false }} component={SignIn} />
        <AppStack.Screen name="Register" options={{ headerShown: false }} component={Register} />
        <AppStack.Screen name="RecoveryP" options={{ headerShown: false }} component={RecoveryP} />   
    </AppStack.Navigator>
);

export default AppRoutes;
