import React, { useContext } from 'react';
import { View, StatusBar } from 'react-native';

import AuthContext from '../contexts/auth';
import AppRoutes from './app.routes';

const Routes: React.FC = () => {
  const { loading } = useContext(AuthContext);

  return loading ? (
    <View />
  ) : (
    <>
      <StatusBar barStyle="light-content" />
      <AppRoutes />
    </>
  );
};

export default Routes;
