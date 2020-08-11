import React, { useContext } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { Card, ListItem } from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import AuthContext from '../../contexts/auth';
import { Container, TextProfile, ViewList } from './styles';

const Profile: React.FC = () => {
  const navigation = useNavigation();
  const { user, logOut } = useContext(AuthContext);

  const { colors } = useTheme();

  function handleSignOut(): void {
    if (user) {
      Alert.alert(
        'Sair da conta',
        'Você realmente deseja sair de sua conta?',
        [
          { text: 'Sim', onPress: () => logOut() },
          {
            text: 'Cancelar',
            onPress: () => {},
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
    }
  }

  return (
    <Container>
      {user ? (
        <>
          <Card
            containerStyle={{
              borderRadius: 10,
            }}
          >
            <View>
              <TextProfile>{user.nome}</TextProfile>
              <TextProfile>
                {String(user.cpf).replace(
                  /^(\d{3})(\d{3})(\d{3})(\d{2})/,
                  '$1.$2.$3-$4',
                )}
              </TextProfile>
            </View>
          </Card>

          <ViewList>
            <ListItem
              title="Editar perfil"
              titleStyle={{
                fontFamily: 'Ubuntu-Bold',
              }}
              subtitle="Faça a edição do seu perfil"
              subtitleStyle={{
                fontFamily: 'Ubuntu-Regular',
              }}
              bottomDivider
              chevron
              onPress={() =>
                navigation.navigate('EditProfile', {
                  profile: true,
                  address: false,
                  password: false,
                })
              }
            />
            <ListItem
              title="Alterar Endereço"
              titleStyle={{
                fontFamily: 'Ubuntu-Bold',
              }}
              subtitle="Faça a alteração do seu endereço"
              subtitleStyle={{
                fontFamily: 'Ubuntu-Regular',
              }}
              bottomDivider
              chevron
              onPress={() =>
                navigation.navigate('EditProfile', {
                  profile: false,
                  address: true,
                  password: false,
                })
              }
            />
            <ListItem
              title="Alterar senha"
              titleStyle={{
                fontFamily: 'Ubuntu-Bold',
              }}
              subtitle="Faça a alteração da sua senha"
              subtitleStyle={{
                fontFamily: 'Ubuntu-Regular',
              }}
              bottomDivider
              chevron
              onPress={() =>
                navigation.navigate('EditProfile', {
                  profile: false,
                  address: false,
                  password: true,
                })
              }
            />
            <ListItem
              title="Sair"
              titleStyle={{
                fontFamily: 'Ubuntu-Bold',
              }}
              subtitle="Desconecte-se da sua conta"
              subtitleStyle={{
                fontFamily: 'Ubuntu-Regular',
              }}
              bottomDivider
              chevron
              onPress={handleSignOut}
            />
          </ViewList>
        </>
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text
            style={{
              fontFamily: 'Ubuntu-Regular',
              color: colors.title,
              marginBottom: 5,
            }}
          >
            Faça login para continuar
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}
            style={{
              backgroundColor: colors.primary,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: '#fff', fontFamily: 'Ubuntu-Regular' }}>
              Entrar
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Container>
  );
};

export default Profile;
