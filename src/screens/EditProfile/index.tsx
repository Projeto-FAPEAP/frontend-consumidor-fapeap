import React, { useContext } from 'react';
import { Alert, Keyboard, StatusBar } from 'react-native';

import KeyboardView from '@components/KeyboardView';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form as FormProvider } from '@unform/mobile';
import { darken } from 'polished';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import AuthContext from '../../contexts/auth';
import getValidationErrors from '../../utils/getValidationErrors';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
import * as S from './styles';

interface ISubmitForm {
  nome: string;
  email: string;
  senha: string;
  password_confirmation: string;
  cpf: string;
  telefone_whatsapp: string;
  cep: string;
  logradouro: string;
  numero_local: string;
  bairro: string;
}

interface IFormDataStep1 {
  nome: string;
  telefone_whatsapp: string;
  email: string;
  cpf: string;
  cep: string;
  logradouro: string;
  numero_local: string;
  bairro: string;
  senha: string;
  password_confirmation: string;
}

interface IFormDataStep2 {
  cep: string;
  logradouro: string;
  numero_local: string;
  bairro: string;
}

const EditProfile: React.FC = () => {
  const navigation = useNavigation();
  const formRef = React.useRef<FormHandles>(null);
  const { colors } = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [subtitle, setSubtitle] = React.useState('');
  const [keyboardIsOpen, setKeyboardIsOpen] = React.useState(false);

  const { user, signOut } = useContext(AuthContext);

  const [dataStep1, setDataStep1] = React.useState<IFormDataStep1>(
    {} as IFormDataStep1,
  );

  const formData = React.useMemo(() => dataStep1, [dataStep1]);

  React.useEffect(() => {
    switch (step) {
      case 1:
        setSubtitle(
          'Primeiramente, precisamos de seus dados pessoais e de acesso',
        );
        break;
      case 2:
        setSubtitle('Onde seu endereço para entrega fica localizado?');
        break;
      default:
        setSubtitle('Etapa não identificada');
        break;
    }

    if (step < 4) {
      formRef.current?.setData(formData);
      formRef.current?.setErrors({});
    }
  }, [formData, step]);

  React.useEffect(() => {
    function onKeyboardDidShow(): void {
      setKeyboardIsOpen(true);
    }

    function onKeyboardDidHide(): void {
      setKeyboardIsOpen(false);
    }

    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);

    return (): void => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
    };
  }, [keyboardIsOpen]);

  const handleSubmit = React.useCallback(async (data: ISubmitForm) => {
    formRef.current?.setErrors({});
    if (step === 1) {
      try {
        const schemaStep1 = Yup.object().shape({
          nome: Yup.string().required('Campo obrigatório'),
          telefone_whatsapp: Yup.string().required('Campo obrigatório'),
          email: Yup.string()
            .email('Informe um email válido')
            .required('Campo obrigatório'),
          cpf: Yup.string().required('Campo obrigatório'),
          cep: Yup.string().required('Campo obrigatório'),
          logradouro: Yup.string().required('Campo obrigatório'),
          bairro: Yup.string().required('Campo obrigatório'),
          numero_local: Yup.string().required('Campo obrigatório'),
          senha: Yup.string()
            .min(3, 'Você deve informar no mínimo 4 caracteres')
            .required('Senha é obrigatória'),
          password_confirmation: Yup.string()
            .oneOf([Yup.ref('senha')], 'Senhas não coincidem')
            .required('A confirmação da senha é obrigatória'),
        });

        const objectFormData = Object.assign(formData, {
          nome: data.nome,
          telefone_whatsapp: data.telefone_whatsapp,
          email: data.email,
          cpf: data.cpf,
          cep: data.cep,
          logradouro: data.logradouro,
          bairro: data.bairro,
          numero_local: data.numero_local,
          senha: data.senha,
          password_confirmation: data.password_confirmation,
        });

        const {
          nome,
          telefone_whatsapp,
          email,
          cpf,
          cep,
          logradouro,
          bairro,
          numero_local,
        } = objectFormData;
        const { senha, password_confirmation } = objectFormData;

        await schemaStep1.validate(
          {
            nome,
            telefone_whatsapp,
            email,
            cep,
            logradouro,
            bairro,
            numero_local,
            senha,
            password_confirmation,
            cpf,
          },
          { abortEarly: false },
        );

        setDataStep1({
          nome,
          telefone_whatsapp,
          cpf,
          email,
          senha,
          password_confirmation,
          cep,
          logradouro,
          bairro,
          numero_local,
        });

        setStep(step + 1);

        setLoading(true);

        const response = await signOut(data);
        const { responseState, responseStatus } = response;

        if (!responseState) {
          Alert.alert('Não foi possível cadastrar', responseStatus);
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        }

        setLoading(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    }
  }, []);

  const submitForm = React.useCallback(() => {
    formRef.current?.submitForm();
  }, []);

  const focusTargetInput = React.useCallback((field: string) => {
    const nameInput = formRef.current?.getFieldRef(field);
    nameInput.focus();
  }, []);

  const nextStep = React.useCallback(
    (targetStep: number) => {
      if (targetStep > step) {
        Alert.alert(
          'Um momento',
          'Você deve preencher corretamente o formulário e clicar em avançar para ir para a próxima etapa.',
        );
        return;
      }
      setStep(targetStep);
    },
    [step],
  );

  return (
    <S.Container showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" />
      <KeyboardView>
        <FormProvider
          initialData={{
            nome: user.nome,
            telefone_whatsapp: user.telefone_whatsapp,
            email: user.email,
            cpf: user.cpf,
            cep: user.cep,
            logradouro: user.logradouro,
            bairro: user.bairro,
            numero_local: user.numero_local,
          }}
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <S.Form>
            {step === 1 && (
              <FormStep1
                onSubmitForm={submitForm}
                focusTargetInput={focusTargetInput}
              />
            )}
            {step === 2 && (
              <FormStep2
                onSubmitForm={submitForm}
                focusTargetInput={focusTargetInput}
              />
            )}
          </S.Form>
        </FormProvider>
      </KeyboardView>

      {!keyboardIsOpen && (
        <S.Footer>
          <S.DotsContainer>
            <S.Dots
              onPress={() => nextStep(1)}
              isFilled
              color={colors.primary}
            />
          </S.DotsContainer>

          <S.ButtonSignIn
            onPress={() => formRef.current?.submitForm()}
            loading={loading}
          >
            Salvar
          </S.ButtonSignIn>
        </S.Footer>
      )}
    </S.Container>
  );
};

export default EditProfile;
