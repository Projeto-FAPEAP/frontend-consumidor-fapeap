import React from 'react';

import logo from '../../assets/logo.png';
import {
  Container,
  Logo,
  Title,
  Span,
  P,
  LoginButton,
  LoginButtonText,
  RegisterButton,
  RegisterButtonText,
  TextBetweenButtons,
} from './styles';

interface IProps {
  navigation: {
    navigate(route: string): void;
  };
}

const Welcome: React.FC<IProps> = ({ navigation }) => {
  return (
    <Container>
      <Logo source={logo} resizeMode="contain" />
      <Span>
        <Title>Quero Açaí </Title>
        <P>
          Descubra uma nova forma de conectar-se com seus clientes e embarque no
          digital.
        </P>
        <LoginButton>
          <LoginButtonText onPress={() => navigation.navigate('SignIn')}>
            Faça Login
          </LoginButtonText>
        </LoginButton>
        <TextBetweenButtons>ou</TextBetweenButtons>
        <RegisterButton onPress={() => navigation.navigate('Register')}>
          <RegisterButtonText>Registre-se</RegisterButtonText>
        </RegisterButton>
      </Span>
    </Container>
  );
};

export default Welcome;
