import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import 'moment/locale/pt-br';
import formatMoney from '@components/FormatMoney';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useTheme } from 'styled-components';

import { Container, Image, Header, Title, Subtitle } from './styles';

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
  preco_venda: string;
  produto: {
    nome: string;
  };
}

interface IProps {
  route: {
    params: {
      item: {
        pedido: IPedido;
        produtos: IProduto[];
      };
    };
  };
}

const DetailsDelivery: React.FC<IProps> = (props) => {
  const { pedido, produtos } = props?.route?.params?.item;
  const { colors } = useTheme();

  const navigation = useNavigation();

  React.useEffect(() => {
    // console.log(props.route.params.pedido)
  }, []);

  return (
    <Container>
      <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
        <Header>
          <Image
            source={{
              uri:
                'https://www.dnbr.art.br/wp-content/uploads/2019/05/square_rgb-1024x1024.jpg',
            }}
          />
          <Title>{pedido.fornecedor.nome_fantasia}</Title>
        </Header>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <Text style={{ fontFamily: 'Ubuntu-Regular', color: '#999' }}>
            Realizado em{' '}
            {moment(pedido.created_at)
              .locale('pt-br')
              .format('DD/MM/YYYY [às] H:mm')}
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('Route', pedido)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.regular,
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Icon
              name="map-marker"
              style={{ marginRight: 5 }}
              size={14}
              color={colors.white}
            />
            <Text style={{ fontFamily: 'Ubuntu-Regular', color: '#fff' }}>
              Traçar rota
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            backgroundColor: '#ebebeb',
            padding: 5,
          }}
        >
          <Icon
            name="check-circle"
            style={{ marginRight: 10 }}
            size={30}
            color={colors.success}
          />
          <Text style={{ fontFamily: 'Ubuntu-Regular' }}>
            Pedido concluído em{' '}
            {moment(pedido.updated_at)
              .locale('pt-br')
              .format('DD/MM/YYYY [às] H:mm')}
          </Text>
        </View>

        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Subtitle style={{ marginBottom: 10 }}>
            Situação do Pedido: {pedido.status_pedido}
          </Subtitle>

          <View
            style={{
              borderTopColor: '#ebebeb',
              borderTopWidth: 1,
              marginTop: 10,
              marginBottom: 10,
            }}
          />

          {produtos.map((item) => (
            <>
              <View
                style={{
                  marginVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      backgroundColor: '#ccc',
                      paddingVertical: 2,
                      borderRadius: 5,
                      paddingHorizontal: 5,
                      marginRight: 10,
                    }}
                  >
                    <Text style={{ fontFamily: 'Ubuntu-Regular' }}>
                      {item.quantidade}
                    </Text>
                  </View>
                  <Text style={{ fontFamily: 'Ubuntu-Regular' }}>
                    {item.produto.nome}
                  </Text>
                </View>
                <Text style={{ fontFamily: 'Ubuntu-Regular' }}>
                  R${' '}
                  {formatMoney(
                    Number(item.quantidade) * Number(item.preco_venda),
                  )}
                </Text>
              </View>
              <View
                style={{
                  borderTopColor: '#ebebeb',
                  borderTopWidth: 1,
                  marginTop: 10,
                  marginBottom: 10,
                }}
              />
            </>
          ))}
        </View>

        <View style={{ marginBottom: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            <Text style={{ fontFamily: 'Ubuntu-Regular' }}>Subtotal</Text>
            <Text style={{ fontFamily: 'Ubuntu-Regular' }}>R$ 45,00</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            <Text style={{ fontFamily: 'Ubuntu-Regular' }}>
              Taxa de entrega
            </Text>
            <Text style={{ fontFamily: 'Ubuntu-Regular' }}>R$ 5,00</Text>
          </View>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ fontFamily: 'Ubuntu-Bold' }}>Total</Text>
            <Text style={{ fontFamily: 'Ubuntu-Bold' }}>R$ 50,00</Text>
          </View>
        </View>

        <View>
          <Text
            style={{
              fontFamily: 'Ubuntu-Regular',
              color: '#999',
              marginBottom: 5,
            }}
          >
            Endereço de entrega
          </Text>
          <Text style={{ fontFamily: 'Ubuntu-Bold', textAlign: 'justify' }}>
            Avenida Brunei, nº 357, Loteamento Parque Novo Mundo, Cabralzinho,
            Macapá - AP
          </Text>
        </View>
      </View>
    </Container>
  );
};

export default DetailsDelivery;
