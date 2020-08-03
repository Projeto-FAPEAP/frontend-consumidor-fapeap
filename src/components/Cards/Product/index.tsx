import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { withNavigation } from '@react-navigation/compat';

import formatMoney from '../../FormatMoney';
import { Container, Image, Title, Content, Text } from './styles';

interface IProduct {
  item: {
    id: string;
    nome: string;
    preco: string;
    status_produto: boolean;
    estoque_produto: number;
    unidade_medida: number;
  };
  navigation: {
    navigate(route: string, params?: object): void;
  };
}

const Product: React.FC<IProduct> = ({ item, navigation }) => {
  return (
    <Container
      onPress={() => {
        navigation.navigate('Product', { item });
      }}
    >
      <Image
        source={{
          uri:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTHxLow7Y3A6Tr5aYXB50qUhO4KnQ3VYwfg-A&usqp=CAU',
        }}
      />
      <Content>
        <Title style={{ marginBottom: 5 }}>{item.nome}</Title>
        <Text>
          {isNaN(item.unidade_medida)
            ? `1 ${item.unidade_medida}`
            : `${item.unidade_medida} Litro(s)`}{' '}
          - R$ {formatMoney(item.preco)}
        </Text>
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
              color="#32C741"
              size={15}
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
              color="#EB5757"
              size={15}
            />
            <Text>Indisponível</Text>
          </View>
        )}
      </Content>
    </Container>
  );
};

export default withNavigation(Product);
