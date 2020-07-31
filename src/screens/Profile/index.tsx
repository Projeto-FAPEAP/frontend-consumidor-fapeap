import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { Card, ListItem } from 'react-native-elements';

import AuthContext from '../../contexts/auth';
import { Container, TextProfile, ViewList } from './styles';

const Profile: React.FC = ({ navigation }) => {
  const { logOut } = useContext(AuthContext);

  function handleSignOut(): void {
    logOut();
  }

  return (
    <Container>
      <Card
        containerStyle={{
          borderRadius: 10,
        }}
      >
        <View>
          <TextProfile>Italo</TextProfile>
          <Text>000.000.000-00</Text>
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
    </Container>
  );
};

export default Profile;
