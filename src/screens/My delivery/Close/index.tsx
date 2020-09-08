import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { AirbnbRating } from 'react-native-elements';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

import Order from '@components/Cards/Order';
import Loading from '@components/Loading';
import ScreenLock from '@components/ScreenLock';
import api from '@services/api';
import { useTheme } from 'styled-components';

import AuthContext from '../../../contexts/auth';
import CartContext from '../../../contexts/cart';
import { Container, ModalTextView, ModalText } from './styles';

interface IPedido {
  id: string;
  fornecedor: {
    id: string;
    nome_fantasia: string;
    taxa_delivery: string;
  };
  delivery: boolean;
  status_pedido:
    | 'Pendente'
    | 'Reserva confirmada'
    | 'Delivery confirmado'
    | 'Pedido em rota de entrega'
    | 'Finalizado'
    | 'Cancelado';
  arqFornecedor: {
    url: string;
  };
  created_at: string;
  updated_at: string;
}

const MyDelivery: React.FC = () => {
  const { colors } = useTheme();

  const [pedidos, setPedidos] = useState<IPedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  const [loadingPedido, setLoadingPedido] = useState(false);

  const [selectedPedido, setSelectedPedido] = useState<IPedido>({} as IPedido);
  const [modalVisible, setModalVisible] = useState(false);
  const [stars, setStars] = useState(3);

  const { user } = useContext(AuthContext);
  const { cart, isChange } = useContext(CartContext);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  function getPedidos(page = 1): void {
    setRefresh(true);
    api
      .get(`/pedidos/finalizados?page=${page}`)
      .then(({ data }) => {
        setPedidos(data.historico);
        setLoading(false);
        setRefresh(false);

        setPage(1);
        setLastPage(data.pages);
      })
      .catch((error) => {
        setLoading(false);
        setRefresh(false);
      });
  }

  function loadData(page = 1): void {
    setRefresh(true);
    api
      .get(`/pedidos/finalizados?page=${page}`)
      .then(({ data }) => {
        setPedidos([...pedidos, ...data.historico]);
        setRefresh(false);
        setPage(page);
      })
      .catch((error) => {
        setRefresh(false);
      });
  }

  function loadMore(): void {
    if (page === lastPage) return;
    const pageNumber = page + 1;
    loadData(pageNumber);
  }

  useEffect(() => {
    getPedidos();
  }, [user, cart, isChange]);

  function avaliarPedido(pedido: IPedido): void {
    setSelectedPedido(pedido);
    setModalVisible(true);
  }

  function confirmarAvaliacaoPedido(): void {
    setLoadingPedido(true);
    api
      .post(`/avaliacao/${selectedPedido.fornecedor.id}`, {
        estrelas: stars,
      })
      .then(({ data }) => {
        Alert.alert(
          'Obrigado!',
          'Avaliação submetida com sucesso!',
          [{ text: 'OK', onPress: () => setModalVisible(false) }],
          { cancelable: false },
        );
        setLoadingPedido(false);
      });
  }

  return (
    <>
      {user && !loading ? (
        <Container>
          <View style={{ marginTop: 10 }} />

          {/* {pedidos.map((pedido) => (
            <Order pedido={pedido} avaliarPedido={avaliarPedido} />
          ))} */}

          <FlatList
            onRefresh={getPedidos}
            refreshing={refresh}
            data={pedidos}
            renderItem={({ item: pedido }) => (
              <Order pedido={pedido} avaliarPedido={avaliarPedido} />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            onEndReached={loadMore}
            ListEmptyComponent={() => (
              <View
                style={{
                  flexGrow: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {!loading && !refresh && (
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#999',
                      fontFamily: 'Ubuntu-Regular',
                      marginLeft: 10,
                    }}
                  >
                    Você ainda não fez o seu primeiro pedido
                  </Text>
                )}
              </View>
            )}
          />

          <View style={{ marginBottom: 10 }} />

          <Modal isVisible={modalVisible}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#fff',
                maxHeight: 300,
                borderRadius: 5,
                // justifyContent: 'center',
              }}
            >
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <ModalTextView>
                  <ModalText>
                    {selectedPedido?.fornecedor?.nome_fantasia}
                  </ModalText>

                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Icon name="close" size={30} color={colors.white} />
                  </TouchableOpacity>
                </ModalTextView>
                <AirbnbRating
                  starStyle={{ marginHorizontal: 8 }}
                  count={5}
                  reviews={[
                    'Chula',
                    'Ruim',
                    'Dá pro gasto',
                    'Bom',
                    'Só a polpa',
                  ]}
                  defaultRating={3}
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
                  {loadingPedido ? (
                    <ActivityIndicator size="small" color={colors.white} />
                  ) : (
                    <Text
                      style={{ color: '#fff', fontFamily: 'Ubuntu-Regular' }}
                    >
                      Confirmar
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </Container>
      ) : (
        <>{user && loading ? <Loading /> : <ScreenLock />}</>
      )}
    </>
  );
};

export default MyDelivery;
