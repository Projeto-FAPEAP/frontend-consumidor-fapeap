import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { withNavigation } from '@react-navigation/compat';

import formatMoney from '../../FormatMoney';
import { Container, Image, Title, Content, Text } from './styles';

interface IMixer {
  item: {
    id: string;
    nome_fantasia: string;
    taxa_delivery: string;
    verificado: boolean;
  };
  navigation: {
    navigate(route: string, params?: object): void;
  };
}

const Mixer: React.FC<IMixer> = ({ item, navigation }) => {
  return (
    <Container
      onPress={() => {
        navigation.navigate('Mixer', { item });
      }}
    >
      <Image
        source={{
          uri:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTHxLow7Y3A6Tr5aYXB50qUhO4KnQ3VYwfg-A&usqp=CAU',
        }}
      />
      <Content>
        <Title>{item.nome_fantasia}</Title>
        <Text style={{ marginBottom: 5 }} color="#FBC72D">
          <Icon name="star" color="#FBC72D" size={11} /> 0.0
        </Text>
        <Text color="#999">
          {item.taxa_delivery
            ? `Delivery - R$ ${formatMoney(item.taxa_delivery)}`
            : 'Apenas retirada'}
        </Text>
      </Content>
    </Container>
  );
};

export default withNavigation(Mixer);
