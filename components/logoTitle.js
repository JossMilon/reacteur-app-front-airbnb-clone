import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

export default function LogoTitle() {
  const navigation = useNavigation();
    return (
      <TouchableOpacity onPress={() => {navigation.navigate("Home")}}>
        <Image
          style={{ width: 30, height: 30 }}
          source={require('../assets/images/airbnb_logo_solo.png')}
        />
      </TouchableOpacity>
    );
  }