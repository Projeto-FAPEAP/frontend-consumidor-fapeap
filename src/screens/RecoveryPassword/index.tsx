/* import React from 'react';
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

export default RecoveryPassword; */

/* import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Container,
  Title,
  Input,
  Form,
  Header,
  RegisterButton,
  RegisterButtonText,
  BackButtonWrapper,
} from './styles';

interface IProps {
  navigation: {
    navigate(route: string): void;
    goBack(): void;
  };
}

const Register: React.FC<IProps> = ({ navigation }) => {
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
          <Input placeholder="Seu CPF" onChangeText={(text) => setCpf(text)} />
          <Input
            placeholder="Telefone"
            onChangeText={(text) => setPhone(text)}
          />
          <Input placeholder="Email" onChangeText={(text) => setEmail(text)} />
          <Input
            placeholder="Senha"
            onChangeText={(text) => setPassword(text)}
          />
          <Input
            placeholder="Confirme sua senha"
            onChangeText={(text) => setPassword(text)}
          />

          <RegisterButton onPress={() => navigation.goBack()}>
            <RegisterButtonText>Registre-me</RegisterButtonText>
          </RegisterButton>
        </Form>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default Register;
 */

import React, { useContext, useState } from 'react';
import { Alert } from 'react-native';

import Input from '@components/Input';
import KeyboardView from '@components/KeyboardView';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form as FormProvider } from '@unform/mobile';
import * as Yup from 'yup';

import AuthContext from '../../contexts/auth';
import getValidationErrors from '../../utils/getValidationErrors';
import * as S from './styles';

interface ISubmitForm {
  cpf_cnpj: string;
  password: string;
}

const LogOut: React.FC = () => {
  const navigation = useNavigation();
  const formRef = React.useRef<FormHandles>(null);

  const { logIn, signOut } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = React.useCallback(
    async (data: ISubmitForm) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          email: Yup.string().required('Email é obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        setLoading(true);

        /* const response = await signOut(data);
        const { responseState, responseStatus } = response;

        if (!responseState) {
          Alert.alert('Não foi possível cadastrar', responseStatus);
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        } */

        setLoading(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [logIn],
  );

  const focusTargetInput = React.useCallback((field: string) => {
    const nameInput = formRef.current?.getFieldRef(field);
    nameInput.focus();
  }, []);

  return (
    <KeyboardView>
      <S.Container>
        <FormProvider onSubmit={handleSubmit} ref={formRef}>
          <S.Title>Recupere sua conta</S.Title>
          <S.Subtitle>
            favor, insira o email da sua conta para receber o link de
            recuperação de senha.
          </S.Subtitle>

          <S.Form>
            <Input
              containerStyle={{
                marginTop: 15,
                maxWidth: 350,
              }}
              icon="mail"
              label="Seu Email"
              name="email"
              placeholder="Seu Email"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => focusTargetInput('password')}
            />
            <S.ButtonSignIn
              onPress={() => formRef.current?.submitForm()}
              loading={loading}
            >
              Enviar
            </S.ButtonSignIn>
          </S.Form>
        </FormProvider>
      </S.Container>
    </KeyboardView>
  );
};

export default LogOut;
