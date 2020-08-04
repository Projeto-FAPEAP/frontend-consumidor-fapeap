import React from 'react';
import { Text, View } from 'react-native';

const MyDelivery: React.FC = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontFamily: 'Ubuntu-Regular' }}>
        Estou na tela de meus pedidos!!!
      </Text>
    </View>
  );
};

export default MyDelivery;
