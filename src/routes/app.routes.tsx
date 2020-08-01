import React from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import EditProfile from '../screens/EditProfile';
import Home from '../screens/Home';
import Mixer from '../screens/Mixer';
import MyDelivery from '../screens/My delivery';
import Order from '../screens/Order';
import Product from '../screens/Product';
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
  <Stack.Navigator
    screenOptions={({ navigation }) => ({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Order')}
          style={{ marginRight: 10 }}
        >
          <MaterialCommunityIcons name="cart" color="#fff" size={30} />
        </TouchableOpacity>
      ),
    })}
    initialRouteName="Home"
  >
    <Stack.Screen
      name="Home"
      component={Tabs}
      options={{
        title: 'Quero Açaí',
        headerStyle: {
          backgroundColor: '#84378F',
        },
        headerTitleStyle: {
          fontFamily: 'Ubuntu-Bold',
        },
        headerTintColor: '#FFF',
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen
      name="Mixer"
      component={Mixer}
      options={{
        title: 'Detalhes da batedeira',
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#84378F',
        },
        headerTitleStyle: {
          fontFamily: 'Ubuntu-Bold',
        },
        headerTintColor: '#FFF',
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen
      name="Order"
      component={Order}
      options={{
        title: 'Detalhes do Pedido',
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#84378F',
        },
        headerTitleStyle: {
          fontFamily: 'Ubuntu-Bold',
        },
        headerTintColor: '#FFF',
        headerTitleAlign: 'center',
        headerRight: () => null,
      }}
    />
    <Stack.Screen
      name="Product"
      component={Product}
      options={{
        title: 'Detalhes do Item',
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#84378F',
        },
        headerTitleStyle: {
          fontFamily: 'Ubuntu-Bold',
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
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#84378F',
        },
        headerTintColor: '#FFF',
        headerTitleAlign: 'center',
        headerRight: () => null,
      }}
    />
  </Stack.Navigator>
);

export default AppRoutes;
