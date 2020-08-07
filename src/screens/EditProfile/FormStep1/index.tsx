import React from 'react';
import { Alert } from 'react-native';
import { MaskService } from 'react-native-masked-text';

import { FormHandles } from '@unform/core';
import Axios from 'axios';

import Input from '../../../components/Input';

interface ICEPResponse {
  logradouro: string;
  bairro: string;
  localidade: string;
}

interface IFormStep1Props {
  focusTargetInput(name: string): void;
  onSubmitForm(): void;
  formRef: React.RefObject<FormHandles>;
}

const FormStep1: React.FC<IFormStep1Props> = (props) => {
  const { focusTargetInput } = props;
  const { onSubmitForm, formRef } = props;
  const [cep, setCep] = React.useState('');

  React.useEffect(() => {
    if (cep.length === 9) {
      Axios.get<ICEPResponse>(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
          const { logradouro, bairro } = response.data;
          formRef.current?.setFieldValue('logradouro', logradouro);
          formRef.current?.setFieldValue('bairro', bairro);
        })
        .catch(() => {
          Alert.alert('Cuidado', 'Você informou um CEP inválido ');
          formRef.current?.setFieldValue('logradouro', '');
          formRef.current?.setFieldValue('bairro', '');
        });
    }
  }, [cep, formRef]);

  return (
    <>
      <Input
        icon="user"
        label="Seu nome"
        name="nome"
        placeholder="Seu nome completo"
        autoCapitalize="words"
        returnKeyType="next"
        onSubmitEditing={() => focusTargetInput('telefone_whatsapp')}
        containerStyle={{
          maxWidth: 350,
        }}
      />
      <Input
        containerStyle={{
          marginTop: 15,
          maxWidth: 350,
        }}
        onChangeText={(text) => {
          const formatted = MaskService.toMask('cel-phone', text, {
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) ',
          });
          formRef.current?.setFieldValue('telefone_whatsapp', formatted);
        }}
        icon="message-circle"
        label="Telefone whatsapp"
        name="telefone_whatsapp"
        placeholder="Telefone whatsapp"
        keyboardType="number-pad"
        returnKeyType="send"
        onSubmitEditing={() => focusTargetInput('email')}
      />
      <Input
        containerStyle={{
          marginTop: 15,
          maxWidth: 350,
        }}
        icon="mail"
        label="Seu email"
        name="email"
        placeholder="Seu email"
        autoCapitalize="none"
        autoCorrect={false}
        onSubmitEditing={() => focusTargetInput('cpf')}
        returnKeyType="next"
      />

      <Input
        icon="info"
        label="Seu CPF"
        name="cpf"
        placeholder="Seu CPF"
        autoCapitalize="none"
        returnKeyType="next"
        keyboardType="number-pad"
        onSubmitEditing={() => focusTargetInput('cep')}
        containerStyle={{
          marginTop: 15,
          maxWidth: 350,
        }}
        onChangeText={(text) => {
          let formatted = text;

          formatted = MaskService.toMask('cpf', text);

          formRef.current?.setFieldValue('cpf', formatted);
        }}
      />

      <Input
        icon="map-pin"
        label="CEP"
        name="cep"
        placeholder="CEP"
        autoCapitalize="none"
        returnKeyType="next"
        keyboardType="number-pad"
        onSubmitEditing={() => focusTargetInput('numero_local')}
        containerStyle={{
          maxWidth: 350,
          marginTop: 15,
        }}
        onChangeText={(text) => {
          setCep(text);
          const formatted = MaskService.toMask('custom', text, {
            mask: '99999-999',
          });
          formRef.current?.setFieldValue('cep', formatted);
        }}
      />
      <Input
        containerStyle={{
          marginTop: 15,
          maxWidth: 350,
        }}
        editable={false}
        icon="map"
        label="Logradouro"
        name="logradouro"
        placeholder="Logradouro"
        autoCapitalize="none"
        autoCorrect={false}
        onSubmitEditing={() => focusTargetInput('bairro')}
        returnKeyType="next"
      />

      <Input
        containerStyle={{
          marginTop: 15,
          maxWidth: 350,
        }}
        editable={false}
        icon="map"
        label="Bairro"
        name="bairro"
        placeholder="Bairro"
        returnKeyType="send"
        onSubmitEditing={() => focusTargetInput('numero_local')}
      />
      <Input
        containerStyle={{
          marginTop: 15,
          maxWidth: 350,
        }}
        editable={formRef.current?.getFieldValue('logradouro') !== ''}
        icon="hash"
        label="Número da casa"
        name="numero_local"
        placeholder="Número da casa"
        autoCapitalize="none"
        keyboardType="number-pad"
        autoCorrect={false}
        returnKeyType="next"
        onSubmitEditing={() => focusTargetInput('senha')}
      />

      <Input
        containerStyle={{
          marginTop: 15,
          maxWidth: 350,
        }}
        icon="lock"
        label="Senha"
        name="senha"
        placeholder="Sua senha secreta"
        secureTextEntry
        returnKeyType="next"
        onSubmitEditing={() => focusTargetInput('password_confirmation')}
      />

      <Input
        containerStyle={{
          marginTop: 15,
          maxWidth: 350,
        }}
        editable={formRef.current?.getFieldValue('senha') !== ''}
        icon="lock"
        label="Confirmar senha"
        name="password_confirmation"
        placeholder="Confirme sua senha"
        secureTextEntry
        returnKeyType="send"
        onSubmitEditing={onSubmitForm}
      />
    </>
  );
};

export default FormStep1;
