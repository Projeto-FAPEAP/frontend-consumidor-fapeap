import React from 'react';
import { Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import logo from '../../assets/icone1024x1024.png';

const Route: React.FC = () => {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 51.5078788,
        longitude: -0.0877321,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      region={{
        latitude: 51.5078788,
        longitude: -0.0877321,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      followsUserLocation
      zoomEnabled
      showsUserLocation
    >
      <Marker coordinate={{ latitude: 51.5078788, longitude: -0.0877321 }} />

      <Marker
        coordinate={{
          latitude: 51.5078788,
          longitude: -0.0877321,
        }}
        title="Casa do Açaí"
        description="Inicio do Percurso"
      >
        <Image
          resizeMode="contain"
          source={logo}
          style={{ height: 60, width: 60 }}
        />
      </Marker>

      <Marker
        coordinate={{
          latitude: 52.5078788,
          longitude: -0.0877321,
        }}
        title="Casa do Cliente"
        description="Fim do Percurso"
      >
        <Image
          resizeMode="contain"
          source={logo}
          style={{ height: 60, width: 60 }}
        />
      </Marker>
    </MapView>
  );
};

export default Route;
