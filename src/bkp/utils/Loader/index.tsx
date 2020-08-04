import React from 'react';
import { Modal, ActivityIndicator } from 'react-native';

import { ModalBackground, LoadingCircle } from './styles';

interface IProps {
  loading: boolean;
}

const Loader: React.FC<IProps> = (props) => {
  const { loading } = props;
  return (
    <Modal transparent animationType="none" visible={loading}>
      <ModalBackground>
        <LoadingCircle>
          <ActivityIndicator animating={loading} color="#84378F" />
        </LoadingCircle>
      </ModalBackground>
    </Modal>
  );
};

export default Loader;
