import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function BackButton() {
    const navigation = useNavigation();
    return (
        <Button 
        title="Back"
        color="black"
        onPress={() => {
          navigation.navigate("Home");
        }}
        />
    )
};