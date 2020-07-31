import React from 'react';
import { View, Text } from 'react-native';

import logo from '../../assets/logo.png';
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
  return (
    <Container>
      <Header>
        <Image source={logo} resizeMode="contain" />
        <Title>Consumidor Nome</Title>
        <Subtitle>Endereço: Av. FAB, 256</Subtitle>
      </Header>

      <Content>
        <CardInformation>
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
                <TextQuantity>2x</TextQuantity> Açaí
              </Title>
              <Subtitle>1 Litro</Subtitle>
            </Left>
            <Right>
              <Title>R$ 14,00</Title>
            </Right>
          </View>

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
                <TextQuantity>2x</TextQuantity> Açaí
              </Title>
              <Subtitle>1 Litro</Subtitle>
            </Left>
            <Right>
              <Title>R$ 14,00</Title>
            </Right>
          </View>

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
                <TextQuantity>2x</TextQuantity> Açaí
              </Title>
              <Subtitle>1 Litro</Subtitle>
            </Left>
            <Right>
              <Title>R$ 14,00</Title>
            </Right>
          </View>

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
                <TextQuantity>2x</TextQuantity> Açaí
              </Title>
              <Subtitle>1 Litro</Subtitle>
            </Left>
            <Right>
              <Title>R$ 14,00</Title>
            </Right>
          </View>

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
                  R$ 14,00
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
                  R$ 6,00
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
              <Text style={{ fontFamily: 'Ubuntu-Bold' }}>R$ 20,00</Text>
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
