import React, { useContext } from 'react';
import { View, Button, Text } from 'react-native';
import AuthContext from '../../contexts/auth';

import styles from './styles';

const Home: React.FC = () => {

  const { logOut } = useContext(AuthContext);

  function handleLogout(){
    logOut();
  }

  return (
    <View style={styles.container}>
        <Text>{'Minha pagina de Home!!!'}</Text>
        <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};
export default Home;
