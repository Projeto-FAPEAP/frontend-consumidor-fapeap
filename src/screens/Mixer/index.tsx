import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import Slideshow from 'react-native-image-slider-show-razzium';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Product from '../../components/Cards/Product';
import formatMoney from '../../components/FormatMoney';
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
  const [mixer, setMixer] = useState(props.route.params.item);
  const [data, setData] = useState<IProduct[]>([]);

  useEffect(() => {
    console.log(props.route.params.item);
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
        height={200}
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
        <Title style={{ marginBottom: 5 }}>{mixer.nome_fantasia}</Title>
        <Text style={{ marginBottom: 5 }} color="#FBC72D" size={14}>
          <Icon name="star" color="#FBC72D" size={16} /> 0.0 -{' '}
          <Text size={14} color="#999">
            0 avaliações
          </Text>
        </Text>
        <Text size={12} color="#999">
          {mixer.taxa_delivery
            ? `Delivery - R$ ${formatMoney(mixer.taxa_delivery)}`
            : 'Apenas retirada'}
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
