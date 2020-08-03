import React, { useEffect, useState, useContext } from 'react';
import { Text, View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Mixer from '../../components/Cards/Mixer';
import AuthContext from '../../contexts/auth';
import api from '../../services/api';
import { Container, Header, TextMid } from './styles';

interface IMixer {
  id: string;
  nome_fantasia: string;
  taxa_delivery: string;
}

const Home: React.FC = () => {
  const [data, setData] = useState<IMixer[]>([]);
  const { user } = useContext(AuthContext);

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
      {user && (
        <Header>
          <Icon name="map-marker" size={40} color="#84378F" />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: 'Ubuntu-Regular',
                color: '#455A64',
                fontSize: 10,
                paddingLeft: 5,
                paddingTop: 5,
              }}
            >
              Entregar para {user.nome}, em
            </Text>
            <Text
              style={{
                fontFamily: 'Ubuntu-Bold',
                color: '#455A64',
                paddingLeft: 3,
              }}
            >
              {user.cep ? (
                <>
                  {user.logradouro}, nº {user.numero_local}, {user.bairro},
                  Macapá - AP
                </>
              ) : (
                <Text>Sem endereço cadastrado</Text>
              )}
            </Text>
          </View>
        </Header>
      )}

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
