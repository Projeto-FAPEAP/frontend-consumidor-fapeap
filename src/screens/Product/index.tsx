import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import formatMoney from '../../components/FormatMoney';
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
  const [data, setData] = useState(props.route.params.item);

  useEffect(() => {
    console.log(props.route.params.item);
  }, []);

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
          <Title>{data.nome}</Title>
          <Text>1 Litro R$ {formatMoney(data.preco)}</Text>

          {data.status_produto ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10
              }}
            >
              <Icon
                style={{ marginRight: 5 }}
                name="check-circle"
                color="#32C741"
                size={22}
              />
              <Text>Disponível</Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10
              }}
            >
              <Icon
                style={{ marginRight: 5 }}
                name="close-circle"
                color="#EB5757"
                size={22}
              />
              <Text>Indisponível</Text>
            </View>
          )}
        </Header>

        <Footer>
          <TouchableOpacity>
            <Icon
              style={{ marginRight: 10 }}
              name="minus-circle"
              color="#84378F"
              size={30}
            />
          </TouchableOpacity>
          <CountText>0</CountText>
          <TouchableOpacity>
            <Icon
              style={{ marginLeft: 10 }}
              name="plus-circle"
              color="#84378F"
              size={30}
            />
          </TouchableOpacity>

          <ButtonAdd onPress={() => props.navigation.navigate('Order')}>
            <ButtonAddText>Adicionar item</ButtonAddText>
          </ButtonAdd>
        </Footer>
      </Content>
    </Container>
  );
};

export default Product;
