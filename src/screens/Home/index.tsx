import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Mixer from '../../components/Cards/Mixer';
import api from '../../services/api';
import { Container, Header, TextMid } from './styles';

interface IMixer {
  id: string;
  nome_fantasia: string;
  taxa_delivery: string;
}

const Home: React.FC = () => {
  const [data, setData] = useState<IMixer[]>([]);

  useEffect(() => {
    api
      .get<IMixer>('fornecedor')
      .then(({ data }) => {
        setData(data);
      })
      .catch((response) => {
        console.log(response.data);
      });
  }, []);

  return (
    <Container>
      <Header>
        <Icon name="map-marker" size={40} color="#84378F" />
        <View>
          <Text style={{ fontSize: 10, paddingLeft: 5, paddingTop: 5 }}>
            Entregar para Ítalo, em
          </Text>
          <Text style={{ paddingLeft: 3, fontWeight: 'bold' }}>
            Avenida FAB, nº 254, Central, Macapá - AP
          </Text>
        </View>
      </Header>
      <TextMid>Batedeiras proximas à você</TextMid>

      <FlatList
        data={data}
        renderItem={({ item }) => <Mixer item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default Home;
