import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ProductItem from '../../components/Cards/Product';
import { Container } from './styles';

const Product: React.FC = () => {
  return (
    <Container>
      <ProductItem
        item={{
          id: 'c4ca6061-b389-479a-894b-89808f10c393',
          nome: 'Farinha',
          preco: '10.3',
          status_produto: false,
          estoque_produto: 6,
        }}
      />
    </Container>
  );
};

export default Product;
