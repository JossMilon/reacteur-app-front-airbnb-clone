import { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

//Importing components
import InputField from "../components/InputField";

export default function SignInScreen({ setToken, setId, userId, userToken }) {
  const [email, setEmail] = useState("Josselin");
  const [password, setPassword] = useState("aze");
  const [error, setError] = useState(false);
  const handlePress = async () => {
    try {
      const response = await axios.post("https://express-airbnb-api.herokuapp.com/user/log_in", {email: email, password: password});
      setToken(response.data.token);
      setId(response.data.id);
    }
    catch(error) {
      if (error.response) 
      {setError(error.response.data.error)};
    }
  }
  const navigation = useNavigation();
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View>
        <Image
          source={require("../assets/images/airbnb-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.mainTitle, styles.centerText]}>Sign In</Text>
      </View>

      <View style={styles.inputForm}>
        <InputField setData={setEmail} placeholder="Email"/>
        <InputField setData={setPassword} placeholder="Password" password="true"/>
      </View>

      <View>
        {error && <Text style={[styles.error, styles.centerText]}>{error}</Text>}
        <TouchableOpacity
            style={styles.mainCta}
            onPress={async () => {
              if (!email || !password) {
                setError(true);
              }
              else {
                handlePress();
                console.log(userId);
                console.log(userToken);
                // const userToken = null;
                // setToken(userToken);
              }
            }}
          >
            <Text style={styles.centerText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.altCta}>No account yet? Create one</Text>
          </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },
  logo: {
    height: 120,
    width: 120,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  inputForm: {
    width: "90%"
  },
  mainCta: {
    borderWidth: 2,
    borderColor: "tomato",
    borderRadius: 50,
    padding: 15,
  },
  altCta: {
    marginTop: 20,
    fontSize: 12,
  },
  centerText: {
    textAlign: "center",
  },
  error: {
    color: "tomato",
    fontSize: 12,
    marginBottom: 5,
  }
});