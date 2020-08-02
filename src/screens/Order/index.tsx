import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Alert } from 'react-native';

import order from '../../assets/order.png';
import basket from '../../components/Basket';
import formatMoney from '../../components/FormatMoney';
import soma from '../../components/SumTotalBag';
import AuthContext from '../../contexts/auth';
import CartContext from '../../contexts/cart';
import api from '../../services/api';
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
  BasketDeliveryCard,
  TextCard,
} from './styles';

const Order: React.FC = ({ navigation }) => {
  const { cart, clearCart, changeDeliveryProduct } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  const [baskets, setBaskets] = useState([]);

  useEffect(() => {
    setLoading(true);
    const result = basket(cart);
    if (result[0].length > 0) {
      setBaskets(result);
    } else {
      setBaskets([]);
    }
    setLoading(false);
  }, [cart]);

  function setDeliveryChange(value, basket): void {
    changeDeliveryProduct(basket);
  }

  function finalizeOrder(order): void {
    if (user.cep == null && order[0].fornecedor.delivery) {
      Alert.alert(
        'Pedido não efetuado',
        'Adicione um endereço de entrega antes de finalizar o pedido!',
      );

      return;
    }

    const products = order.map((item) => ({
      produto_id: item.id,
      preco_venda: item.preco,
      quantidade: item.quantity,
    }));

    Alert.alert(
      'Finalizar pedido',
      'Você realmente deseja confirmar o pedido?',
      [
        {
          text: 'Sim',
          onPress: () => {
            api
              .post(
                `consumidor/${order[0].fornecedor.id}/${order[0].fornecedor.delivery}`,
                products,
              )
              .then(({ data }) => {
                Alert.alert(
                  'Pedido Confirmado',
                  "Pedido realizado com sucesso! Verifique a situção do pedido em 'Meus pedidos'.",
                );
                clearCart(order);
              })
              .catch((response) => {
                Alert.alert(
                  'Pedido não efetuado',
                  response.response.data.error,
                );
              });
          },
        },
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }

  return (
    <Container>
      {user && (
        <Header>
          <Image
            style={{ marginTop: 5, marginBottom: 5 }}
            source={order}
            resizeMode="contain"
          />
          <Title style={{ marginBottom: 5 }}>{user.nome}</Title>
          {user.cep && (
            <Subtitle>
              {user.logradouro}, {user.numero_local}, {user.bairro}, Macapá - AP
            </Subtitle>
          )}
        </Header>
      )}

      {baskets.length > 0 ? (
        <>
          {baskets.map((basket) => (
            <>
              <Content>
                <CardInformation>
                  <Text style={{ fontFamily: 'Ubuntu-Bold', marginBottom: 20 }}>
                    {basket[0].fornecedor.nome_fantasia}
                  </Text>

                  {basket[0].fornecedor.taxa_delivery ? (
                    <View style={{ flexDirection: 'row' }}>
                      <BasketDeliveryCard
                        onPress={() => setDeliveryChange(true, basket)}
                      >
                        <TextCard
                          style={{
                            textTransform: 'uppercase',
                            fontSize: 11,
                          }}
                          color={
                            basket[0].fornecedor.delivery ? `#84378F` : '#CCC'
                          }
                        >
                          Entrega
                        </TextCard>
                      </BasketDeliveryCard>

                      <BasketDeliveryCard
                        onPress={() => setDeliveryChange(false, basket)}
                      >
                        <TextCard
                          style={{
                            textTransform: 'uppercase',
                            fontSize: 11,
                          }}
                          color={
                            basket[0].fornecedor.delivery ? '#CCC' : `#84378F`
                          }
                        >
                          Retirar no Local
                        </TextCard>
                      </BasketDeliveryCard>
                    </View>
                  ) : (
                    <Subtitle
                      style={{
                        fontFamily: 'Ubuntu-Bold',
                        marginTop: -18,
                        marginBottom: 20,
                      }}
                    >
                      Apenas retirada
                    </Subtitle>
                  )}

                  {basket.map((item) => (
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
                          <TextQuantity>{item.quantity}x</TextQuantity>{' '}
                          {item.nome}
                        </Title>
                        <Subtitle>
                          {isNaN(item.unidade_medida)
                            ? 1
                            : item.unidade_medida * item.quantity}{' '}
                          Litro(s)
                        </Subtitle>
                      </Left>
                      <Right>
                        <Title>
                          R$ {formatMoney(item.quantity * item.preco)}
                        </Title>
                      </Right>
                    </View>
                  ))}

                  <View>
                    <View style={{ borderTopColor: '#ccc', borderTopWidth: 1 }}>
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
                          style={{
                            fontFamily: 'Ubuntu-Regular',
                            color: '#455A64',
                          }}
                        >
                          Subtotal
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Ubuntu-Regular',
                            color: '#455A64',
                          }}
                        >
                          R$ {formatMoney(soma(basket))}
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
                          style={{
                            fontFamily: 'Ubuntu-Regular',
                            color: '#455A64',
                          }}
                        >
                          Taxa de Entrega
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Ubuntu-Regular',
                            color: '#455A64',
                          }}
                        >
                          R${' '}
                          {formatMoney(
                            basket[0].fornecedor.delivery
                              ? basket[0].fornecedor.taxa_delivery
                              : 0,
                          )}
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
                        R${' '}
                        {formatMoney(
                          Number(soma(basket)) +
                            Number(
                              basket[0].fornecedor.delivery
                                ? basket[0].fornecedor.taxa_delivery
                                : 0,
                            ),
                        )}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginTop: 20,
                    }}
                  >
                    <Button
                      onPress={() =>
                        user && basket.length != 0
                          ? finalizeOrder(basket)
                          : !user && navigation.navigate('SignIn')
                      }
                    >
                      <ButtonText>Finalizar Pedido</ButtonText>
                    </Button>
                  </View>
                </CardInformation>
              </Content>
            </>
          ))}
        </>
      ) : (
        <>
          {!loading && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {!user && (
                <Image
                  style={{ marginTop: 5, marginBottom: 5 }}
                  source={order}
                  resizeMode="contain"
                />
              )}
              <Title style={{ marginBottom: 5, marginTop: !user ? 0 : '30%' }}>
                Não há produtos no seu carrinho
              </Title>
            </View>
          )}
        </>
      )}

      {/* {cart.length > 0 ? (
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
            <Button
              onPress={() =>
                user && cart.length != 0
                  ? navigation.goBack()
                  : !user && navigation.navigate('SignIn')
              }
            >
              <ButtonText>Finalizar Pedido</ButtonText>
            </Button>
          </View>
        </Content>
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          {!user && (
            <Image
              style={{ marginTop: 5, marginBottom: 5 }}
              source={order}
              resizeMode="contain"
            />
          )}
          <Title style={{ marginBottom: 5, marginTop: !user ? 0 : '30%' }}>
            Não há produtos no seu carrinho
          </Title>
        </View>
      )} */}
    </Container>
  );
};

export default Order;
