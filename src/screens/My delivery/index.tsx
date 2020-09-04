import React, {useEffect,useState,useContext} from 'react';
import {View,Text,TouchableOpacity} from 'react-native'

import 'moment/locale/pt-br';
import moment from 'moment';

import { AirbnbRating } from 'react-native-elements';

import Modal from 'react-native-modal';

import { useTheme } from 'styled-components';

import {Container,Card,Image,Title,Subtitle,ModalTextView,ModalText} from './styles';

import api from '@services/api';

import { useNavigation } from '@react-navigation/native';

import AuthContext from '../../contexts/auth';
import CartContext from '../../contexts/cart';

interface IPedido {
  fornecedor: {
    nome_fantasia: string;
  }
  status_pedido: string;
  created_at: string;
}

const MyDelivery: React.FC = () => {
  const { colors } = useTheme();

  const [pedidos,setPedidos] = useState<IPedido[]>([])

  const [selectedPedido, setSelectedPedido] = useState({})
  const [modalVisible, setModalVisible] = useState(false)

  const navigation = useNavigation();

  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  useEffect(() => {
    api.get(`listapedidos`).then(({data}) => {
      setPedidos(data);
    })
  }, [user,cart])

  function avaliarPedido(pedido){
    setSelectedPedido(pedido);
    setModalVisible(true)
  }

  function confirmarAvaliacaoPedido(){
    setModalVisible(false)
  }

  return (
    <Container>
      {user ? (
        <>
          <View style={{marginTop: 10}}></View>
          {pedidos.map(pedido => (
            <Card>
              <View style={{flexDirection:'row', alignItems:'center', marginBottom: 10}}>
                <Image source={{uri:'https://www.dnbr.art.br/wp-content/uploads/2019/05/square_rgb-1024x1024.jpg'}} />
                <View style={{flex:1}}>
                  <Title>{pedido.fornecedor.nome_fantasia}</Title>
                  <Subtitle>Pedido realizado em: {moment(pedido.created_at).locale('pt-br').format('DD/MM/YYYY [às] H:mm')}</Subtitle>
                </View>
              </View>

              <View style={{borderTopColor: "#ebebeb", borderTopWidth: 1,marginBottom: 10}}></View>

              <View style={{alignItems:"center"}}>
                <Subtitle>Situação: {pedido.status_pedido}</Subtitle>
              </View>

              <View style={{borderTopColor: "#ebebeb", borderTopWidth: 1,marginTop:10,marginBottom: 10}}></View>

              <View >
                <Subtitle style={{margin: 5}}>1x Mister picanha especial</Subtitle>
                <Subtitle style={{margin: 5}}>1x Mister picanha especial</Subtitle>
                <Subtitle style={{margin: 5}}>1x Mister picanha especial</Subtitle>
                <Subtitle style={{margin: 5}}>1x Mister picanha especial</Subtitle>
              </View>

              <View style={{borderTopColor: "#ebebeb", borderTopWidth: 1,marginTop: 10, marginBottom: 10}}></View>

              <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',marginHorizontal: 50}}>
                <TouchableOpacity onPress={() => avaliarPedido(pedido)} style={{alignItems:'center', justifyContent:'center', margin: 10}}>
                  <Title style={{color:colors.primary}}>Avaliar</Title>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('DetailsDelivery',pedido)} style={{alignItems:'center', justifyContent:'center', margin: 10}}>
                  <Title style={{color:colors.primary}}>Detalhes</Title>
                </TouchableOpacity>
              </View>
            </Card>
          ))}
          <View style={{marginBottom: 10}}></View>
        </>
      ):(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: 'Ubuntu-Regular',
              color: colors.title,
              marginBottom: 10,
              fontSize: 16
            }}
          >
            Faça login para continuar
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}
            style={{
              backgroundColor: colors.primary,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
              minHeight: 40,
              minWidth: 100,
              alignItems:"center",
              justifyContent:'center'
            }}
          >
            <Text style={{ color: '#fff', fontFamily: 'Ubuntu-Regular' }}>
              Entrar
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal isVisible={modalVisible}>
        <View style={{ flex: 1, backgroundColor:"#fff", alignItems:'center', justifyContent:"center", maxHeight: 300 }}>
          <ModalTextView>
            <ModalText>Avaliação do estabelecimento</ModalText>
          </ModalTextView>
          <AirbnbRating
            starStyle={{ marginHorizontal: 8 }}
            count={5}
            reviews={['Chula', 'Ruim', 'Dá pro gasto', 'Bom', 'Só a polpa']}
            defaultRating={1}
            size={40}
          />

          <TouchableOpacity
            onPress={() => confirmarAvaliacaoPedido()}
            style={{
              backgroundColor: colors.primary,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
              minHeight: 40,
              width: 200,
              marginTop: 20,
              alignItems:"center",
              justifyContent:'center'
            }}
          >
            <Text style={{ color: '#fff', fontFamily: 'Ubuntu-Regular' }}>
              Confirmar
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </Container>
  )
}

export default MyDelivery;
