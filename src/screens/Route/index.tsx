import React from 'react';
import { Image, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import api from '@services/api';
import Axios from 'axios';
import { useTheme } from 'styled-components';

import house from '../../assets/house.png';
import logo from '../../assets/icone1024x1024.png';
import authContext from '../../contexts/auth';

const GOOGLE_MAPS_APIKEY = 'AIzaSyAJLnjbwqDj7XpSoB7MORWcQMePWUPQ99c';

interface IPedido {
  id: string;
  fornecedor: {
    nome_fantasia: string;
    taxa_delivery: string;
    latitude: number;
    longitude: number;
  };
  delivery: boolean;
  status_pedido:
    | 'Pendente'
    | 'Reserva confirmada'
    | 'Delivery confirmado'
    | 'Pedido em rota de entrega'
    | 'Finalizado'
    | 'Cancelado';
  created_at: string;
  updated_at: string;
}

interface IProps {
  route: {
    params: {
      item: IPedido;
    };
  };
}

interface ICEPResponse {
  localidade: string;
  uf: string;
}

const Route: React.FC<IProps> = (props) => {
  const { pedido } = props?.route?.params?.item;
  const { colors } = useTheme();
  const { user } = React.useContext(authContext);

  const [initial, setInitial] = React.useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.00522,
    longitudeDelta:
      (Dimensions.get('window').width / Dimensions.get('window').height) *
      0.00522,
  });

  const [final, setFinal] = React.useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.00522,
    longitudeDelta:
      (Dimensions.get('window').width / Dimensions.get('window').height) *
      0.00522,
  });

  React.useEffect(() => {
    const pedido = props?.route?.params?.item;

    if (pedido?.fornecedor && user?.cep) {
      try {
        setInitial({
          latitude: pedido.fornecedor.latitude,
          longitude: pedido.fornecedor.longitude,
          latitudeDelta: 0.00522,
          longitudeDelta:
            (Dimensions.get('window').width / Dimensions.get('window').height) *
            0.00522,
        });

        Axios.get<ICEPResponse>(
          `https://viacep.com.br/ws/${user?.cep}/json/`,
        ).then((response) => {
          const { localidade, uf } = response.data;
          api
            .get(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${user?.numero_local}+${user?.logradouro},+${localidade},+${uf}&key=AIzaSyARpgEngeu2k129CS3cdlp4HjTUhKyPblU`,
            )
            .then(({ data }) => {
              console.log(data.results[0].geometry.location);

              setFinal({
                latitude: data.results[0].geometry.location.lat,
                longitude: data.results[0].geometry.location.lng,
                latitudeDelta: 0.00522,
                longitudeDelta:
                  (Dimensions.get('window').width /
                    Dimensions.get('window').height) *
                  0.00522,
              });
            });
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [user, props]);

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={initial}
      region={initial}
      zoomEnabled
    >
      <MapViewDirections
        origin={initial}
        destination={final}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={5}
        strokeColor={colors.primary}
      />

      <Marker
        coordinate={initial}
        title="Casa do Açaí"
        description="Inicio do Percurso"
      >
        <Image
          resizeMode="center"
          resizeMethod="resize"
          source={logo}
          style={{ height: 60, width: 60 }}
        />
      </Marker>

      <Marker
        coordinate={final}
        title="Casa do Cliente"
        description="Fim do Percurso"
      >
        <Image
          resizeMode="center"
          resizeMethod="resize"
          source={house}
          style={{ height: 60, width: 60, borderRadius: 50 }}
        />
      </Marker>
    </MapView>
  );
};

export default Route;
