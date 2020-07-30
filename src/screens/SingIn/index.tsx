import React, { useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AuthContext from '../../contexts/auth';
import Loader from '../utils/Loader';
import {
  Container,
  Title,
  Input,
  LoginButton,
  LoginButtonText,
  RetrievePasswordButton,
  RetrievePasswordText,
  Form,
  Header,
  Footer,
  RegisterButton,
  RegularText,
  RegisterButtonText,
} from './styles';

interface IProps {
  navigation: {
    navigate(route: string): void;
  };
}

const SignIn: React.FC<IProps> = ({ navigation }) => {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const { logIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function logInLocal(): Promise<void> {
      const Response = await logIn(cpf, password);
      const { responseState, responseStatus } = Response;

      if (!responseState) {
        setLoading(false);
        Alert.alert('Aviso', responseStatus);
      }
    }
    if (loading) {
      logInLocal();
    }
  }, [loading]);

  return (
    <Container>
      <KeyboardAwareScrollView>
        <Loader loading={loading} />
        <Header>
          <Title>Entre com sua conta</Title>
        </Header>
        <Form>
          <Input placeholder="Seu CPF" onChangeText={(text) => setCpf(text)} />
          <Input
            placeholder="Sua senha"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <LoginButton
            onPress={() =>
              cpf && password !== ''
                ? setLoading(true)
                : Alert.alert('Aviso', 'Preencha todos os campos!')
            }
          >
            <LoginButtonText>Entrar</LoginButtonText>
          </LoginButton>
          <RetrievePasswordButton
            onPress={() => navigation.navigate('RecoveryP')}
          >
            <RetrievePasswordText>Esqueceu a senha?</RetrievePasswordText>
          </RetrievePasswordButton>
        </Form>
        <Footer>
          <RegularText>Não tem uma conta?</RegularText>
          <RegisterButton onPress={() => navigation.navigate('Register')}>
            <RegisterButtonText>Registre-se aqui</RegisterButtonText>
          </RegisterButton>
        </Footer>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default SignIn;
