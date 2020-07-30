import React from 'react';
import { Text, View, TextComponent } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Container, Header, TextMid } from './styles';

const User1 = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Italo',
    cpf: '000.000.000-00',
  },
];
const Batedeiras = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ds',
    name: 'Batedeira Deus é Fiel',
  },
];

const Home: React.FC = () => {
  return (
    <Container>
      <Header>
        <Icon name="map-marker" size={40} color="#84378F" />
        {User1.map((u) => {
          return (
            <View key={u.id}>
              <Text style={{ fontSize: 10, paddingLeft: 5, paddingTop: 5 }}>
                Entregue para {u.name}, em
              </Text>
              <Text style={{ paddingLeft: 3, fontWeight: 'bold' }}>
                Current local
              </Text>
            </View>
          );
        })}
      </Header>
      <TextMid>Batedeiras proximas de você</TextMid>
    </Container>
  );
};

export default Home;
