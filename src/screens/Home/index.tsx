import React, { useEffect, useState, useContext } from 'react';
import { Text, View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Axios from 'axios';

import Mixer from '../../components/Cards/Mixer';
import AuthContext from '../../contexts/auth';
import api from '../../services/api';
import { Container, Header, TextMid } from './styles';

interface IMixer {
  id: string;
  nome_fantasia: string;
  taxa_delivery: string;
}

interface ICEPResponse {
  localidade: string;
  uf: string;
}

const Home: React.FC = () => {
  const [data, setData] = useState<IMixer[]>([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const [city, setCity] = useState('');

  useEffect(() => {
    api
      .get<IMixer[]>('fornecedor')
      .then(({ data }) => {
        const filter = data.filter((item) => item?.verificado);
        setData(filter);
        setLoading(false);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  useEffect(() => {
    if (user?.cep) {
      getCityAndUf(user.cep);
    }
  }, [user]);

  function getCityAndUf(cep): Promise<void> {
    Axios.get<ICEPResponse>(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        const { localidade, uf } = response.data;
        setCity(` ${localidade} - ${uf}`);
      })
      .catch(() => {});
  }

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
                  {city}
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
        ListEmptyComponent={() => (
          <>
            {!loading && (
              <Text
                style={{
                  fontSize: 12,
                  color: '#999',
                  fontFamily: 'Ubuntu-Regular',
                  marginLeft: 10,
                }}
              >
                Não há batedeiras disponíveis
              </Text>
            )}
          </>
        )}
      />
    </Container>
  );
};

export default Home;
