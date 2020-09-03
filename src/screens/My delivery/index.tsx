import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { AirbnbRating } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import {
  Container,
  ViewFList,
  BorderBottom,
  ViewTouchD,
  ButtonDetails,
  ButtonRating,
  ViewTouchR,
  CenterView,
  ModalView,
  TouchClose,
  ModalText,
  ModalTextView,
  ViewRating,
  SaveRating,
} from './styles';

interface Data {
  id: number;
  total: number;
  status_pedido: string;
  delivery: boolean;
  fornecedor: {
    nome_fantasia: string;
  };
}

const MyDelivery: React.FC = () => {
  const [submit, setSubmit] = useState<Data[] | undefined>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    getList();
  }, []);

  async function getList(): Promise<void> {
    try {
      const response = await api.get(
        `${api.defaults.baseURL}/listapedidos`,
      );
      setSubmit(response.data);
      setLoading(false);
      console.log(JSON.stringify(response.data, null, 2))}
      catch (error) {
        setLoading(false);
        if (error.message === 'Network Error') {
          Alert.alert('Verifique sua conexão de internet e tente novamente!!');
        } else {

          Alert.alert(error.response.data.error);
        }
    }
  }


  const navigation = useNavigation();

  const renderItem = ({ item }) => (

    <ViewFList>
      <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 14 }}>
        {item.fornecedor.nome_fantasia}
      </Text>
      <BorderBottom style={{ top: 5 }} />
      <Text
        style={{
          fontFamily: 'Ubuntu-Regular',
          color: '#666666',
          fontSize: 12,
          top: 7,
        }}
      >
        Total: R$ {item.total}
      </Text>
      <Text
        style={{
          fontFamily: 'Ubuntu-Regular',
          color: '#666666',
          fontSize: 12,
          top: 7,
        }}
      >
        Status: {item.status_pedido}
      </Text>
      <BorderBottom style={{ top: 10 }} />
      <Text
        style={{
          fontFamily: 'Ubuntu-Regular',
          fontSize: 12,
          top: 15,
        }}
      >
        Avaliação do pedido: {item.status}
      </Text>
      <BorderBottom style={{ top: 20 }} />
      <View style={{ flexDirection: 'row' }}>
        <ViewTouchD>
          <ButtonDetails onPress={() => navigation.navigate('DetailsGetDelivery')}>
            <Text style={{fontSize: 14, color: '#84378F'}}>Detalhes</Text>
          </ButtonDetails>
        </ViewTouchD>
        <ViewTouchR>
          <ButtonRating
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text style={{ fontSize: 14, color: '#84378F' }}>Avaliação</Text>
          </ButtonRating>
        </ViewTouchR>
      </View>
    </ViewFList>

  );
  const [modalVisible, setModalVisible] = useState(false);

  return (

    <Container>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <CenterView>
          <ModalView>
            <ModalTextView>
              <ModalText>Avaliação</ModalText>
            </ModalTextView>
            <TouchClose>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Icon name="times" color="#EB5757" size={40} />
              </TouchableOpacity>
            </TouchClose>
            <ViewRating>
              <AirbnbRating
                starStyle={{ marginHorizontal: 8 }}
                count={5}
                reviews={['Chula', 'Ruim', 'Razoavel', 'Bom', 'Só a polpa']}
                defaultRating={1}
                size={40}
              />
            </ViewRating>
            <SaveRating>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  top: 5,
                  fontFamily: 'Ubuntu-Bold',
                }}
              >
                Salvar
              </Text>
            </SaveRating>
          </ModalView>
        </CenterView>
      </Modal>

      <FlatList
        data={submit}
        renderItem={renderItem}
        keyExtractor={(index) => String(index)}
        ListEmptyComponent={() => (
          <>
            {!loading && (
              <Text
                style={{
                  fontSize: 12,
                  color: '#999',
                  fontFamily: 'Ubuntu-Regular',
                  marginLeft: 10,
                }}
              >
                Não há pedidos registrados
              </Text>
            )}
          </>
        )}
      />
    </Container>
  );
};

export default MyDelivery;
