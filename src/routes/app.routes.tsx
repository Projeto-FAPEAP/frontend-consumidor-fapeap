import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import EditProfile from '../screens/EditProfile';
import Home from '../screens/Home';
import MyDelivery from '../screens/My delivery';
import Profile from '../screens/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs: React.FC = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#84378F',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MyDelivery"
        component={MyDelivery}
        options={{
          tabBarLabel: 'Meus pedidos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="menu" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppRoutes: React.FC = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
      name="Home"
      component={Tabs}
      options={{
        title: 'Quero Açaí',
        headerStyle: {
          backgroundColor: '#84378F',
        },
        headerTintColor: '#FFF',
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen
      name="MyDelivery"
      component={MyDelivery}
      options={{
        title: 'Meus pedidos',
        headerStyle: {
          backgroundColor: '#84378F',
        },
        headerTintColor: '#FFF',
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{
        title: 'Perfil',
        headerStyle: {
          backgroundColor: '#84378F',
        },
        headerTintColor: '#FFF',
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{
        title: 'Edição de perfil',
        headerStyle: {
          backgroundColor: '#84378F',
        },
        headerTintColor: '#FFF',
        headerTitleAlign: 'center',
      }}
    />
  </Stack.Navigator>
);

export default AppRoutes;
