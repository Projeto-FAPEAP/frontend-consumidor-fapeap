import React, { useEffect, useState, useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import formatMoney from '../../components/FormatMoney';
import CartContext from '../../contexts/cart';
import {
  Container,
  Content,
  Header,
  Image,
  Title,
  Text,
  Footer,
  CountText,
  ButtonAdd,
  ButtonAddText,
} from './styles';

const Product: React.FC = (props) => {
  const { cart, addCart, removeCart } = useContext(CartContext);
  const [data, setData] = useState(props.route.params.item);

  useEffect(() => {
    // console.log(cart);
  }, [cart]);

  return (
    <Container>
      <Image
        source={{
          uri:
            'https://blog.livup.com.br/wp-content/uploads/2020/01/acai-1024x683.jpg',
        }}
      />

      <Content>
        <Header>
          <Title style={{ marginBottom: 5 }}>{data.nome}</Title>
          <Text style={{ marginBottom: 5 }}>
            {isNaN(data.unidade_medida) ? 1 : data.unidade_medida} Litro(s) - R${' '}
            {formatMoney(data.preco)}
          </Text>

          {data.status_produto ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <Icon
                style={{ marginRight: 5 }}
                name="check-circle"
                color="#32C741"
                size={18}
              />
              <Text>Disponível</Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <Icon
                style={{ marginRight: 5 }}
                name="close-circle"
                color="#EB5757"
                size={18}
              />
              <Text>Indisponível</Text>
            </View>
          )}
        </Header>

        <Footer>
          <TouchableOpacity
            onPress={() => data.status_produto && removeCart(data)}
          >
            <Icon
              style={{ marginRight: 10 }}
              name="minus-circle"
              color="#84378F"
              size={30}
            />
          </TouchableOpacity>
          <CountText>
            {cart?.filter((item) => item.id === data.id).length > 0
              ? cart?.filter((item) => item.id === data.id)[0].quantity
              : 0}
          </CountText>
          <TouchableOpacity
            onPress={() => data.status_produto && addCart(data)}
          >
            <Icon
              style={{ marginLeft: 10 }}
              name="plus-circle"
              color="#84378F"
              size={30}
            />
          </TouchableOpacity>

          <ButtonAdd
            onPress={
              () =>
                data.status_produto &&
                addCart(data) /* props.navigation.navigate('Order') */
            }
          >
            <ButtonAddText>Adicionar item</ButtonAddText>
          </ButtonAdd>
        </Footer>
      </Content>
    </Container>
  );
};

export default Product;
