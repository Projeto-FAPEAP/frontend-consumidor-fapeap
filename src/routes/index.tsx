import React, { useContext } from 'react';
import { View } from 'react-native';

import AuthContext from '../contexts/auth';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {
  const { signed, loading } = useContext(AuthContext);

  return loading ? <View /> : signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
