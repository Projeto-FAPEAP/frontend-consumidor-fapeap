import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import 'moment/locale/pt-br';
import { useNavigation } from '@react-navigation/native';
import api from '@services/api';
import moment from 'moment';
import { useTheme } from 'styled-components';

import { Card, Image, Title, Subtitle } from './styles';

interface IPedido {
  id: string;
  fornecedor: {
    nome_fantasia: string;
  };
  status_pedido: string;
  created_at: string;
  updated_at: string;
}

interface IProduto {
  quantidade: number;
  produto: {
    nome: string;
  };
}

interface IProps {
  pedido: IPedido;
  avaliarPedido(pedido: IPedido): void;
}

const Order: React.FC<IProps> = ({ pedido, avaliarPedido }) => {
  const { colors } = useTheme();

  const navigation = useNavigation();

  const [listaPedido, setListaPedidos] = React.useState<IProduto[]>([]);

  React.useEffect(() => {
    api
      .get(`consumidor/pedidos/itens/${pedido.id}`)
      .then(({ data }) => {
        setListaPedidos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pedido]);

  return (
    <Card>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <Image
          source={{
            uri:
              'https://www.dnbr.art.br/wp-content/uploads/2019/05/square_rgb-1024x1024.jpg',
          }}
        />
        <View style={{ flex: 1 }}>
          <Title>{pedido.fornecedor.nome_fantasia}</Title>
          <Subtitle>
            Pedido realizado em:{' '}
            {moment(pedido.created_at)
              .locale('pt-br')
              .format('DD/MM/YYYY [às] H:mm')}
          </Subtitle>
        </View>
      </View>

      <View
        style={{
          borderTopColor: '#ebebeb',
          borderTopWidth: 1,
          marginBottom: 10,
        }}
      />

      <View style={{ alignItems: 'center' }}>
        <Subtitle>Situação: {pedido.status_pedido}</Subtitle>
      </View>

      <View
        style={{
          borderTopColor: '#ebebeb',
          borderTopWidth: 1,
          marginTop: 10,
          marginBottom: 10,
        }}
      />

      <View>
        {listaPedido.map((item) => (
          <Subtitle style={{ margin: 5 }}>
            {item.quantidade}x {item.produto.nome}
          </Subtitle>
        ))}
      </View>

      <View
        style={{
          borderTopColor: '#ebebeb',
          borderTopWidth: 1,
          marginTop: 10,
          marginBottom: 10,
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 50,
        }}
      >
        <TouchableOpacity
          onPress={() => avaliarPedido(pedido)}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            margin: 10,
          }}
        >
          <Title style={{ color: colors.primary }}>Avaliar</Title>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DetailsDelivery', {
              item: { pedido, produtos: listaPedido },
            })
          }
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            margin: 10,
          }}
        >
          <Title style={{ color: colors.primary }}>Detalhes</Title>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default Order;
