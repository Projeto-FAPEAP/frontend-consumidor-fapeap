import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { withNavigation } from '@react-navigation/compat';

import { Container, Image, Title, Content, Text } from './styles';

interface IProduct {
  item: {
    id: string;
    nome: string;
    preco: string;
    status_produto: boolean;
    estoque_produto: number;
  };
  navigation: {
    navigate(route: string): void;
  };
}

const Product: React.FC<IProduct> = ({ item, navigation }) => {
  return (
    <Container
      onPress={() => {
        navigation.navigate('Product');
      }}
    >
      <Image
        source={{
          uri:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTHxLow7Y3A6Tr5aYXB50qUhO4KnQ3VYwfg-A&usqp=CAU',
        }}
      />
      <Content>
        <Title>{item.nome} - 1 Litro</Title>
        <Text>1 Litro R$ {item.preco}</Text>
        {item.status_produto ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icon
              style={{ marginRight: 5 }}
              name="check-circle"
              color="#080"
              size={16}
            />
            <Text>Disponível</Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icon
              style={{ marginRight: 5 }}
              name="close-circle"
              color="#f00"
              size={16}
            />
            <Text>Indisponível</Text>
          </View>
        )}
      </Content>
    </Container>
  );
};

export default withNavigation(Product);
