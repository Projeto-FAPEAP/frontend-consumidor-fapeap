import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components';

import { somaUnitaria } from '../components/SumTotalBag';
import CartContext from '../contexts/cart';
import EditProfile from '../screens/EditProfile';
import Home from '../screens/Home';
import Mixer from '../screens/Mixer';
import MyDelivery from '../screens/My delivery';
import Order from '../screens/Order';
import Product from '../screens/Product';
import Profile from '../screens/Profile';
import RecoveryP from '../screens/RecoveryPassword';
import Register from '../screens/Register';
import SignIn from '../screens/SignIn';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs: React.FC = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.primary,
        labelStyle: {
          fontFamily: 'Ubuntu-Regular',
          marginBottom: 5,
        },
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

const AppRoutes: React.FC = () => {
  const { cart } = useContext(CartContext);
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Order')}
            style={{ marginRight: 10 }}
          >
            <MaterialCommunityIcons name="cart" color="#fff" size={30} />
            {cart.length > 0 && (
              <View
                style={{
                  position: 'absolute',
                  backgroundColor: '#FF4646',
                  width: 20,
                  height: 20,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  right: 0,
                  top: 0,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Ubuntu-Bold',
                    fontSize: 11,
                    color: '#fff',
                  }}
                >
                  {somaUnitaria(cart)}
                </Text>
              </View>
            )}
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
            backgroundColor: colors.primary,
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
            backgroundColor: colors.primary,
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
            backgroundColor: colors.primary,
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
            backgroundColor: colors.primary,
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
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            fontFamily: 'Ubuntu-Bold',
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
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            fontFamily: 'Ubuntu-Bold',
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
            backgroundColor: colors.primary,
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
        name="SignIn"
        options={{ headerShown: false, headerRight: () => null }}
        component={SignIn}
      />
      <Stack.Screen
        name="Register"
        options={{ headerShown: false, headerRight: () => null }}
        component={Register}
      />
      <Stack.Screen
        name="RecoveryP"
        options={{ headerShown: false, headerRight: () => null }}
        component={RecoveryP}
      />
    </Stack.Navigator>
  );
};

export default AppRoutes;
