import React, {useEffect,useState} from 'react';
import {View,TouchableOpacity} from 'react-native'

import { useTheme } from 'styled-components';

import {Container,Card,Image,Title,Subtitle} from './styles';

import api from '@services/api';

import { useNavigation } from '@react-navigation/native';

interface IPedido {
  fornecedor: {
    nome_fantasia: string;
  }
  status_pedido: string;
}

const MyDelivery: React.FC = () => {
  const { colors } = useTheme();

  const [pedidos,setPedidos] = useState<IPedido[]>([])

  const navigation = useNavigation();

  useEffect(() => {
    api.get(`listapedidos`).then(({data}) => {
      setPedidos(data);
    })
  }, [])

  return (
    <Container>

      {pedidos.map(pedido => (
        <Card>
          <View style={{flexDirection:'row', alignItems:'center', marginBottom: 10}}>
            <Image source={{uri:'https://www.havan.com.br/media/catalog/product/cache/55f334c6f9412d6b39cfe195ce4e3943/b/o/bola-de-futebol-brasil-f14s5-havan_343621.jpg'}} />
            <View>
              <Title>{pedido.fornecedor.nome_fantasia}</Title>
              <Subtitle>Situação do Pedido: {pedido.status_pedido}</Subtitle>
            </View>
          </View>

          <View style={{borderTopColor: "#ebebeb", borderTopWidth: 1,marginBottom: 10}}></View>

          <View style={{alignItems:'center', justifyContent:'center'}}>
            <Title style={{margin: 5}}>1x Mister picanha especial</Title>
          </View>

          <View style={{borderTopColor: "#ebebeb", borderTopWidth: 1,marginTop: 10, marginBottom: 10}}></View>

          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',marginHorizontal: 50}}>
            <TouchableOpacity onPress={() => {}} style={{alignItems:'center', justifyContent:'center', margin: 10}}>
              <Title style={{color:colors.primary}}>Avaliar</Title>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('DetailsDelivery',pedido)} style={{alignItems:'center', justifyContent:'center', margin: 10}}>
              <Title style={{color:colors.primary}}>Detalhes</Title>
            </TouchableOpacity>
          </View>
        </Card>
      ))}

    </Container>
  )
}

export default MyDelivery;
