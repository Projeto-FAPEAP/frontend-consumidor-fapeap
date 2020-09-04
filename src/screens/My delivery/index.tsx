import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { AirbnbRating } from 'react-native-elements';
import Modal from 'react-native-modal';

import Order from '@components/Cards/Order';
import Loading from '@components/Loading';
import ScreenLock from '@components/ScreenLock';
import api from '@services/api';
import { useTheme } from 'styled-components';

import AuthContext from '../../contexts/auth';
import CartContext from '../../contexts/cart';
import { Container, ModalTextView, ModalText } from './styles';

interface IPedido {
  id: string;
  fornecedor: {
    id: string;
    nome_fantasia: string;
  };
  status_pedido: string;
  created_at: string;
  updated_at: string;
}

const MyDelivery: React.FC = () => {
  const { colors } = useTheme();

  const [pedidos, setPedidos] = useState<IPedido[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedPedido, setSelectedPedido] = useState<IPedido>({} as IPedido);
  const [modalVisible, setModalVisible] = useState(false);
  const [stars, setStars] = useState(0);

  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  useEffect(() => {
    api
      .get(`listapedidos`)
      .then(({ data }) => {
        setPedidos(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [user, cart]);

  function avaliarPedido(pedido: IPedido): void {
    setSelectedPedido(pedido);
    setModalVisible(true);
  }

  function confirmarAvaliacaoPedido(): void {
    api
      .post(`/avaliacao/${selectedPedido.fornecedor.id}`, {
        estrelas: stars,
      })
      .then(({ data }) => {
        Alert.alert('Obrigado!', 'Avaliação submetida com sucesso!');
        setModalVisible(false);
      });
  }

  return (
    <>
      {user && !loading ? (
        <Container>
          <View style={{ marginTop: 10 }} />
          {pedidos.map((pedido) => (
            <Order pedido={pedido} avaliarPedido={avaliarPedido} />
          ))}

          <View style={{ marginBottom: 10 }} />

          <Modal isVisible={modalVisible}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                maxHeight: 300,
                borderRadius: 5,
              }}
            >
              <ModalTextView>
                <ModalText>Avaliação do estabelecimento</ModalText>
              </ModalTextView>
              <AirbnbRating
                starStyle={{ marginHorizontal: 8 }}
                count={5}
                reviews={['Chula', 'Ruim', 'Dá pro gasto', 'Bom', 'Só a polpa']}
                defaultRating={5}
                size={40}
                onFinishRating={(value) => setStars(value)}
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
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: '#fff', fontFamily: 'Ubuntu-Regular' }}>
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </Container>
      ) : (
        <>{loading ? <Loading /> : <ScreenLock />}</>
      )}
    </>
  );
};

export default MyDelivery;
