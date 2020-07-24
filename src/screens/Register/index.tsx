import React, {useState} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text } from 'react-native';

import {
  Container,
  Title,
  Input,
  RetrievePasswordButton,
  RetrievePasswordText,
  Form,
  Header,
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

const Register: React.FC = ({ navigation }) => {

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  return (
    <Container>
      <KeyboardAwareScrollView>
        <Header>
          <BackButtonWrapper onPress={() => navigation.goBack()}>
            <Icon color="#84378F" size={28} name="chevron-left" />
          </BackButtonWrapper>
          <Title>Crie sua conta</Title>
        </Header>
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
          <Input
            placeholder="Senha"
            onChangeText={(text) => setPassword(text)}
          />
          <Input
            placeholder="Confirme sua senha"
            onChangeText={(text) => setPassword(text)}
          />


          <RegisterButton onPress={() => {}}>
            <RegisterButtonText>Registre-me</RegisterButtonText>
          </RegisterButton>
        </Form>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default Register;