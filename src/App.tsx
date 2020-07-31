import React from 'react';
import { YellowBox } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from './contexts/auth';
import { CartProvider } from './contexts/cart';
import Routes from './routes';
import themeLigth from './styles/themes/light';

YellowBox.ignoreWarnings(['']);

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <CartProvider>
        <AuthProvider>
          <ThemeProvider theme={themeLigth}>
            <Routes />
          </ThemeProvider>
        </AuthProvider>
      </CartProvider>
    </NavigationContainer>
  );
};

export default App;
