import React, { useContext } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { Card, ListItem } from 'react-native-elements';

import AuthContext from '../../contexts/auth';
import { Container, TextProfile, ViewList } from './styles';

const Profile: React.FC = ({ navigation }) => {
  const { user, logOut } = useContext(AuthContext);

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
              subtitle="Faça a edição do seu perfil"
              bottomDivider
              chevron
              onPress={() => navigation.navigate('EditProfile')}
            />
            <ListItem
              title="Sair"
              subtitle="Desconecte-se da sua conta"
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
          <Text style={{ fontFamily: 'Ubuntu-Regular', marginBottom: 5 }}>
            Faça login para continuar
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}
            style={{
              backgroundColor: '#84378F',
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 20,
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
