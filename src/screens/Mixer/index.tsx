import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import Slideshow from 'react-native-image-slider-show-razzium';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Product from '../../components/Cards/Product';
import formatMoney from '../../components/FormatMoney';
import api from '../../services/api';
import { Container, Content, Title, Text } from './styles';

interface IFile {
  url: string;
}

interface IProduct {
  id: string;
  nome: string;
  preco: string;
  status_produto: boolean;
  estoque_produto: number;
  route: {
    params: {
      item: {
        nome_fantasia: string;
        id: string;
        taxa_delivery: string;
        avaliacoesFornecedor: number[];
        arquivos: IFile[];
      };
    };
  };
}

const Mixer: React.FC<IProduct> = (props) => {
  const mixer = props?.route?.params?.item;
  const [data, setData] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`produto/${props?.route?.params?.item?.id}`).then((response) => {
      setData(response.data);
      setLoading(false);
    });
  }, [props?.route]);

  function media(avaliacoes: number[]): string {
    if (avaliacoes.length === 0) return '0.0';
    let total = 0;
    for (let i = 0; i < avaliacoes.length; i++) {
      total += avaliacoes[i];
    }
    return String(Number(total / avaliacoes.length).toFixed(1));
  }

  function imagesFiles(files: IFile[]): IFile[] {
    const fileExtension_img = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];

    const imagens = [];

    for (let i = 0; i < files.length; i++) {
      const ext = files[i]?.url?.split('.')?.pop()?.toLowerCase();

      if (fileExtension_img.includes(ext)) {
        imagens.push(files[i]);
      }
    }

    return imagens;
  }

  return (
    <Container>
      {imagesFiles(mixer.arquivos).length > 0 && (
        <Slideshow height={200} dataSource={imagesFiles(mixer.arquivos)} />
      )}

      <Content>
        <Title style={{ marginBottom: 5 }}>{mixer.nome_fantasia}</Title>
        <Text style={{ marginBottom: 5 }} color="#FBC72D" size={14}>
          <Icon name="star" color="#FBC72D" size={16} />{' '}
          {media(mixer.avaliacoesFornecedor)} -{' '}
          <Text size={14} color="#999">
            {mixer.avaliacoesFornecedor.length} avaliações
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
          ListEmptyComponent={() => (
            <>
              {!loading && (
                <Text size={12} color="#999">
                  Não há produtos disponíveis
                </Text>
              )}
            </>
          )}
        />
      </Content>
    </Container>
  );
};

export default Mixer;
