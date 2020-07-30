import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Container,
  Title,
  Input,
  LoginButton,
  LoginButtonText,
  Form,
  Header,
  P,
  BackButtonWrapper,
} from './styles';

interface IProps {
  navigation: {
    navigate(route: string): void;
    goBack(): void;
  };
}

const RecoveryPassword: React.FC<IProps> = ({ navigation }) => {
  return (
    <Container>
      <KeyboardAwareScrollView>
        <Header>
          <BackButtonWrapper onPress={() => navigation.goBack()}>
            <Icon color="#84378F" size={28} name="chevron-left" />
          </BackButtonWrapper>
          <Title>Recupere sua conta</Title>
          <P>
            Por favor, insira o email da sua conta para receber o link de
            recuperação de senha.
          </P>
        </Header>
        <Form>
          <Input placeholder="Email associado a sua conta" />

          <LoginButton>
            <LoginButtonText>Recuperar Senha</LoginButtonText>
          </LoginButton>
        </Form>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default RecoveryPassword;
