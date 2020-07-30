import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { Card, ListItem } from 'react-native-elements';

import AuthContext from '../../contexts/auth';
import { Container, TextProfile, ViewList } from './styles';

const User = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Italo',
    cpf: '000.000.000-00',
  },
];

const Profile: React.FC = ({ navigation }) => {
  const { logOut } = useContext(AuthContext);

  function handleSignOut(): void {
    logOut();
  }

  return (
    <Container>
      <Card
        containerStyle={{
          width: 342,
          height: 110,
          marginTop: 20,
          borderRadius: 8,
          marginLeft: 25,
        }}
      >
        {User.map((u) => {
          return (
            <View key={u.id}>
              <TextProfile style={{}}>{u.name}</TextProfile>
              <Text style={{ marginLeft: 15 }}>{u.cpf}</Text>
            </View>
          );
        })}
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
