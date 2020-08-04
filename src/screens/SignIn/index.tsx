/* import React, { useState, useContext, useEffect } from 'react';
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
 */

import React, { useContext, useState } from 'react';
import { Alert, Platform, StatusBar } from 'react-native';
import { MaskService } from 'react-native-masked-text';

import Input from '@components/Input';
import KeyboardView from '@components/KeyboardView';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form as FormProvider } from '@unform/mobile';
import * as Yup from 'yup';

import AuthContext from '../../contexts/auth';
import getValidationErrors from '../../utils/getValidationErrors';
import Loader from '../utils/Loader';
import {
  RetrievePasswordButton,
  RetrievePasswordText,
  Footer,
  RegisterButton,
  RegularText,
  RegisterButtonText,
} from './styles';
import * as S from './styles';

interface ISubmitForm {
  cpf_cnpj: string;
  password: string;
}

const Login: React.FC = () => {
  const navigation = useNavigation();
  const formRef = React.useRef<FormHandles>(null);

  const { logIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  /* useEffect(() => {
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
  }, [loading]); */

  const handleSubmit = React.useCallback(
    async (data: ISubmitForm) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          cpf_cnpj: Yup.string().required('CPF é obrigatório'),
          password: Yup.string().required('Senha é obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        const { cpf_cnpj, password } = data;

        setLoading(true);

        const Response = await logIn(cpf_cnpj, password);
        const { responseState, responseStatus } = Response;

        if (!responseState) {
          Alert.alert('Aviso', responseStatus);
        } else {
          navigation.goBack();
        }

        setLoading(false);

        // logIn(cpf_cnpj, password);
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

  const navigateToResetPassword = React.useCallback(() => {
    navigation.navigate('RecoveryP');
  }, [navigation]);

  return (
    <KeyboardView>
      {/* <Loader loading={loading} /> */}
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      />
      <S.Container>
        <S.Title>Entre com sua conta</S.Title>
        <FormProvider
          /* initialData={{
            cpf_cnpj: '45687921',
            password: '152547xcz',
          }} */
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <S.Form>
            <Input
              icon="user"
              label="Sua credencial"
              name="cpf_cnpj"
              placeholder="Seu CPF"
              autoCapitalize="none"
              keyboardType="number-pad"
              returnKeyType="next"
              onSubmitEditing={() => focusTargetInput('password')}
              containerStyle={{
                maxWidth: 350,
              }}
              onChangeText={(text) => {
                let formatted = text;

                formatted = MaskService.toMask('cpf', text);

                formRef.current?.setFieldValue('cpf_cnpj', formatted);
              }}
            />
            <Input
              containerStyle={{
                marginTop: 15,
                maxWidth: 350,
              }}
              icon="lock"
              label="Sua senha"
              name="password"
              placeholder="Sua senha secreta"
              autoCapitalize="none"
              secureTextEntry
              returnKeyType="send"
            />
            <S.ButtonSignIn
              onPress={() => formRef.current?.submitForm()}
              loading={loading}
            >
              Entrar
            </S.ButtonSignIn>

            <RetrievePasswordButton onPress={navigateToResetPassword}>
              <RetrievePasswordText>Esqueceu a senha?</RetrievePasswordText>
            </RetrievePasswordButton>
          </S.Form>
        </FormProvider>
        <Footer>
          <RegularText>Não tem uma conta?</RegularText>
          <RegisterButton onPress={() => navigation.navigate('Register')}>
            <RegisterButtonText>Registre-se aqui</RegisterButtonText>
          </RegisterButton>
        </Footer>
      </S.Container>
    </KeyboardView>
  );
};

export default Login;
