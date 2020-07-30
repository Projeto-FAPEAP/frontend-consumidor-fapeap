import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Container,
  Title,
  Input,
  RetrievePasswordButton,
  RetrievePasswordText,
  Form,
  RegisterButton,
  RegularText,
  RegisterButtonText,
  P,
  BackButtonWrapper,
  Footer,
  Dropdown,
  DropdownWrappeer,
  MediaSpot,
  MediaSpotButton,
  WrapperList,
  AddMediaButtonWrapper,
  RemoveMediaButtonWrapper,
  MediaWrapper,
  RemoveMedia,
} from './styles';

const EditProfile: React.FC = ({ navigation }) => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Container>
      <KeyboardAvoidingView>
        <ScrollView>
          <Form>
            <Input
              placeholder="Seu nome"
              onChangeText={(text) => setName(text)}
            />
            <Input
              placeholder="Seu CPF"
              onChangeText={(text) => setCpf(text)}
            />
            <Input
              placeholder="Telefone"
              onChangeText={(text) => setPhone(text)}
            />
            <Input
              placeholder="Logradouro"
              onChangeText={(text) => setStreet(text)}
            />
            <Input
              placeholder="Numero"
              onChangeText={(text) => setNumber(text)}
            />
            <Input
              placeholder="Bairro"
              onChangeText={(text) => setNeighborhood(text)}
            />
            <Input
              placeholder="CEP"
              onChangeText={(text) => setZipcode(text)}
            />
            <Input
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
            />

            <RegisterButton onPress={() => {}}>
              <RegisterButtonText>Salvar</RegisterButtonText>
            </RegisterButton>
          </Form>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default EditProfile;
