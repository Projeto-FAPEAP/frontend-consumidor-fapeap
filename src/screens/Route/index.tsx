import React from 'react';
import { Image, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { useTheme } from 'styled-components';

import house from '../../assets/house.png';
import logo from '../../assets/icone1024x1024.png';

const GOOGLE_MAPS_APIKEY = 'AIzaSyAJLnjbwqDj7XpSoB7MORWcQMePWUPQ99c';

const Route: React.FC = () => {
  const { colors } = useTheme();

  const [initial, setInitial] = React.useState({
    latitude: 0.032472,
    longitude: -51.062987,
    latitudeDelta: 0.00522,
    longitudeDelta:
      (Dimensions.get('window').width / Dimensions.get('window').height) *
      0.00522,
  });

  const [final, setFinal] = React.useState({
    latitude: 0.0323312,
    longitude: -51.0711329,
    latitudeDelta: 0.00522,
    longitudeDelta:
      (Dimensions.get('window').width / Dimensions.get('window').height) *
      0.00522,
  });

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
