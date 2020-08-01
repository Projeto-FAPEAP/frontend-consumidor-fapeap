import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import order from '../../assets/order.png';
import formatMoney from '../../components/FormatMoney';
import soma, { somaTaxas } from '../../components/SumTotalBag';
import AuthContext from '../../contexts/auth';
import CartContext from '../../contexts/cart';
import {
  Container,
  Header,
  Image,
  Title,
  TextQuantity,
  Subtitle,
  Content,
  CardInformation,
  Left,
  Right,
  Button,
  ButtonText,
} from './styles';

const Order: React.FC = () => {
  const { cart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  return (
    <Container>
      <Header>
        <Image
          style={{ marginTop: 5, marginBottom: 5 }}
          source={order}
          resizeMode="contain"
        />
        <Title style={{ marginBottom: 5 }}>{user.nome}</Title>
        <Subtitle>
          {user.logradouro}, {user.numero_local}, {user.bairro}, Macapá - AP
        </Subtitle>
      </Header>

      <Content>
        <CardInformation>
          {cart.map((item) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <Left>
                <Title>
                  <TextQuantity>{item.quantity}x</TextQuantity> {item.nome}
                </Title>
                <Subtitle>
                  {item.unidade_medida * item.quantity} Litro(s)
                </Subtitle>
              </Left>
              <Right>
                <Title>R$ {formatMoney(item.quantity * item.preco)}</Title>
              </Right>
            </View>
          ))}

          <View>
            <View
              style={{
                borderTopColor: '#ccc',
                borderTopWidth: 1,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{ fontFamily: 'Ubuntu-Regular', color: '#455A64' }}
                >
                  Subtotal
                </Text>
                <Text
                  style={{ fontFamily: 'Ubuntu-Regular', color: '#455A64' }}
                >
                  R$ {formatMoney(soma(cart))}
                </Text>
              </View>
            </View>

            <View
              style={{
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{ fontFamily: 'Ubuntu-Regular', color: '#455A64' }}
                >
                  Taxa de Entrega
                </Text>
                <Text
                  style={{ fontFamily: 'Ubuntu-Regular', color: '#455A64' }}
                >
                  R$ {formatMoney(somaTaxas(cart))}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontFamily: 'Ubuntu-Bold' }}>Total</Text>
              <Text style={{ fontFamily: 'Ubuntu-Bold' }}>
                R$ {formatMoney(Number(soma(cart)) + Number(somaTaxas(cart)))}
              </Text>
            </View>
          </View>
        </CardInformation>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}
        >
          <Button onPress={() => {}}>
            <ButtonText>Finalizar Pedido</ButtonText>
          </Button>
        </View>
      </Content>
    </Container>
  );
};

export default Order;
