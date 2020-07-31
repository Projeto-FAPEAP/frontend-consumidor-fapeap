import React, { useState, useContext } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';

import AuthContext from '../../contexts/auth';
import {
  Container,
  Input,
  Form,
  RegisterButton,
  RegisterButtonText,
} from './styles';

const EditProfile: React.FC = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState(user.nome);
  const [cpf, setCpf] = useState(user.cpf);
  const [phone, setPhone] = useState(user.telefone_whatsapp);
  const [zipcode, setZipcode] = useState(user.cep);
  const [street, setStreet] = useState(user.logradouro);
  const [number, setNumber] = useState(user.numero_local);
  const [neighborhood, setNeighborhood] = useState(user.bairro);
  const [email, setEmail] = useState(user.email);

  return (
    <Container>
      <KeyboardAvoidingView>
        <ScrollView>
          <Form>
            <Input
              placeholder="Seu nome"
              onChangeText={(text) => setName(text)}
              value={name}
            />
            <Input
              placeholder="Seu CPF"
              onChangeText={(text) => setCpf(text)}
              value={cpf}
            />
            <Input
              placeholder="Telefone"
              onChangeText={(text) => setPhone(text)}
              value={phone}
            />
            <Input
              placeholder="CEP"
              onChangeText={(text) => setZipcode(text)}
              value={zipcode}
            />
            <Input
              placeholder="Logradouro"
              onChangeText={(text) => setStreet(text)}
              value={street}
            />
            <Input
              placeholder="Numero"
              onChangeText={(text) => setNumber(text)}
              value={number}
            />
            <Input
              placeholder="Bairro"
              onChangeText={(text) => setNeighborhood(text)}
              value={neighborhood}
            />
            <Input
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <RegisterButton onPress={() => navigation.goBack()}>
              <RegisterButtonText>Salvar</RegisterButtonText>
            </RegisterButton>
          </Form>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default EditProfile;
