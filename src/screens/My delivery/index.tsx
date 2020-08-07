import React, { useState } from 'react';
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

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    company: 'Açai do bom',
    submit: 'Açai 1L',
    status: 'Pendente',
    qtd: 1,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: '',
    company: 'La casa de Açai',
    submit: 'Farinha',
    status: 'Pendente',
    qtd: 1,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    company: 'Vitaminosa 10',
    submit: 'Camarão',
    status: 'Finalizado',
    qtd: 1,
  },
];

const MyDelivery: React.FC = () => {
  const renderItem = ({ item }) => (
    <ViewFList>
      <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 14 }}>
        {item.company}
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
        {item.qtd} {item.submit}
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
          <ButtonDetails
            onPress={() => Alert.alert('Essa tela ainda será desenvolvida')}
          >
            <Text style={{ fontSize: 14, color: '#84378F' }}>Detalhes</Text>
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
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </Container>
  );
};

export default MyDelivery;
