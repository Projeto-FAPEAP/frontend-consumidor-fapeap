import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import order from '../../assets/order.png';

import {
  Container,
  StatusView,
  Image,
  Header,
  Title,
  Subtitle,
  BorderBottom,
  PrincipalText,
  PrincipalDivider,
  SaveDelivery
} from './styles';


const DetailsDelivery: React.FC = () => {

  return (
    <Container>
    <Header>
    <Image
    style={{marginBottom: 5 }}
    source={order}
    resizeMode="contain"
/>
    </Header>
    <Title>Consumidor Nome</Title>
    <Subtitle>Endereço: Rua tal, 1528</Subtitle>
    <BorderBottom />
    <StatusView>
    <PrincipalText>O seu pedido está sendo processado</PrincipalText>
    <PrincipalDivider />
    <PrincipalText style={{top: 60}}>Seu pedido saiu para a entrega</PrincipalText>
    <SaveDelivery>
        <Text style={{  textAlign: "center",
                        color: "#fff",
                        fontFamily: "Ubuntu-Bold",
                        fontSize:16,
                        top: 10}}
                        >Confirmar Entrega</Text>
    </SaveDelivery>
    </StatusView>

    </Container>
  );
};

export default DetailsDelivery;