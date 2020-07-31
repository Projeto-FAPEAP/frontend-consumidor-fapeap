import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import Slideshow from 'react-native-image-slider-show-razzium';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Product from '../../components/Cards/Product';
import api from '../../services/api';
import { Container, Content, Title, Text } from './styles';

interface IProduct {
  id: string;
  nome: string;
  preco: string;
  status_produto: boolean;
  estoque_produto: number;
}

const Mixer: React.FC = (props) => {
  const [data, setData] = useState<IProduct[]>([]);

  useEffect(() => {
    console.log(props.route.params.item.id);
    api
      .get<IProduct>('produto', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTU5Nzg0NjcsImV4cCI6MTU5NzcwNjQ2Nywic3ViIjoiNmZiODU2NTEtMGU4Zi00NjgxLTk4NmEtNzBhNjAyMzRmYjVlIn0.p4zQidBFusykDW4oDnhduhl6ApKnemY2N38xtAhrQ2c`,
        },
      })
      .then(({ data }) => {
        setData(data);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  return (
    <Container>
      <Slideshow
        height={150}
        dataSource={[
          {
            url:
              'https://www.acainative.com/wp-content/uploads/2020/01/bannerEC-site_a.png',
          },
          {
            url:
              'https://www.acainative.com/wp-content/uploads/2020/01/bannerEC-site_a.png',
          },
          {
            url:
              'https://www.acainative.com/wp-content/uploads/2020/01/bannerEC-site_a.png',
          },
        ]}
      />

      <Content>
        <Title>Batedeira de Açaí</Title>
        <Text color="#FBC72D" size={14}>
          <Icon name="star" color="#FBC72D" size={16} /> 4.0 -{' '}
          <Text size={14} color="#999">
            8 avaliações
          </Text>
        </Text>
        <Text size={12} color="#999">
          Delivery - R$ 1,00
        </Text>

        <FlatList
          style={{ marginTop: 15 }}
          data={data}
          renderItem={({ item }) => <Product item={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </Content>
    </Container>
  );
};

export default Mixer;
