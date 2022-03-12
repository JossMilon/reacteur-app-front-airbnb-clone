import { Image } from 'react-native';

export default function LogoTitle() {
    return (
      <Image
        style={{ width: 30, height: 30 }}
        source={require('../assets/images/airbnb_logo_solo.png')}
      />
    );
  }