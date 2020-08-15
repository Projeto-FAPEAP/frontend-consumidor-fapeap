import OneSignal, {OpenResult} from 'react-native-onesignal';

import { useNavigation } from '@react-navigation/native';

function onOpened(openResult: OpenResult): void {
  const navigation = useNavigation();

  try {
    if (openResult.notification.payload.additionalData) {
      const { pedido_id } = openResult.notification.payload.additionalData;
      navigation.navigate('DetailsDelivery', { pedido_id });
    } else {
      navigation.navigate('Home');
    }
  } catch (error) {
    navigation.navigate('Home');
  }
}

function subscribeToNotification(id: string | null): void {
  OneSignal.init('<id>', {
    kOSSettingsKeyAutoPrompt: true,
  });
  OneSignal.addEventListener('opened', onOpened);
  if (id) {
    OneSignal.sendTag('user', id);
  }
  OneSignal.setSubscription(true);
}

function unsubscribeToNotification(id: string | null): void {
  OneSignal.init('<id>', {
    kOSSettingsKeyAutoPrompt: true,
  });
  if (id) {
    OneSignal.deleteTag('user', id);
  }
}

export { subscribeToNotification, unsubscribeToNotification };
