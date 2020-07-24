import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home';



const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen name="Home" options={{ headerShown: false }} component={Home} />

    </AuthStack.Navigator>
);

export default AuthRoutes;

//<AuthStack.Screen name="SignIn" component={SignIn} />
