import React from 'react';

import Input from '../../../components/Input';

interface IFormStep1Props {
  focusTargetInput(name: string): void;
  onSubmitForm(): void;
}

const FormStep1: React.FC<IFormStep1Props> = (props) => {
  const { focusTargetInput } = props;
  const { onSubmitForm } = props;

  return (
    <>
      <Input
        icon="user"
        label="Seu nome"
        name="nome"
        placeholder="Seu nome completo"
        autoCapitalize="words"
        returnKeyType="next"
        onSubmitEditing={() => focusTargetInput('email')}
        containerStyle={{
          maxWidth: 350,
        }}
      />
      <Input
        containerStyle={{
          marginTop: 15,
          maxWidth: 350,
        }}
        icon="message-circle"
        label="Telefone whatsapp"
        name="telefone_whatsapp"
        placeholder="Telefone whatsapp"
        keyboardType="number-pad"
        returnKeyType="send"
        onSubmitEditing={onSubmitForm}
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
        onSubmitEditing={() => focusTargetInput('cpf_cnpj')}
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
        onSubmitEditing={() => focusTargetInput('senha')}
        containerStyle={{
          marginTop: 15,
          maxWidth: 350,
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
        onSubmitEditing={() => focusTargetInput('logradouro')}
        containerStyle={{
          maxWidth: 350,
          marginTop: 15,
        }}
      />
      <Input
        containerStyle={{
          marginTop: 15,
          maxWidth: 350,
        }}
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
        icon="hash"
        label="Número da casa"
        name="numero_local"
        placeholder="Número da casa"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        onSubmitEditing={onSubmitForm}
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
