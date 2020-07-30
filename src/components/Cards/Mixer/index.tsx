import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { withNavigation } from '@react-navigation/compat';

import { Container, Image, Title, Content, Text } from './styles';

interface IMixer {
  item: {
    id: string;
    nome_fantasia: string;
    taxa_delivery: string;
  };
  navigation: {
    navigate(route: string): void;
  };
}

const Mixer: React.FC<IMixer> = ({ item, navigation }) => {
  return (
    <Container
      onPress={() => {
        navigation.navigate('Mixer');
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
        <Text>
          <Icon name="star" color="#e5e619" size={11} /> 4.0
        </Text>
        <Text>
          Açaí -{' '}
          {item.taxa_delivery ? `R$ ${item.taxa_delivery}` : 'Apenas retirada'}
        </Text>
      </Content>
    </Container>
  );
};

export default withNavigation(Mixer);
