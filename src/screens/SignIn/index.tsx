import React, { useState, useContext, useEffect } from 'react';
import { Alert, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';

import AuthContext from '../../contexts/auth';
import Loader from '../utils/Loader';
import {
  Container,
  BackButtonWrapper,
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
  const [cpf, setCpf] = useState('45687921');
  const [password, setPassword] = useState('152547xcz');
  const { logIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function logInLocal(): Promise<void> {
      const Response = await logIn(cpf, password);
      const { responseState, responseStatus } = Response;

      if (!responseState) {
        setLoading(false);
        Alert.alert('Aviso', responseStatus);
      } else {
        navigation.navigate('Home');
      }
    }
    if (loading) {
      logInLocal();
    }
  }, [loading]);

  return (
    <Container>
      <Header>
        <BackButtonWrapper onPress={() => navigation.goBack()}>
          <Icon color="#84378F" size={28} name="chevron-left" />
        </BackButtonWrapper>
      </Header>

      <KeyboardAwareScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            marginTop: '15%',
          }}
        >
          <Loader loading={loading} />
          <Header>
            <Title>Entre com sua conta</Title>
          </Header>
          <Form>
            <Input
              value={cpf}
              placeholder="Seu CPF"
              onChangeText={(text) => setCpf(text)}
            />
            <Input
              value={password}
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
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default SignIn;
