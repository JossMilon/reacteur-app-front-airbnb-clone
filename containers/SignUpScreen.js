//Importing packages
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Text, TextInput, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import axios from "axios";
// import { backgroundColor, borderLeftColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//Importing components
import InputField from "../components/InputField";

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState(null);
  const handlePress = async () => {
    try {
      const formData = {
        email: email,
        username: username,
        description: description,
        password: password
      };
      const response = await axios.post("https://express-airbnb-api.herokuapp.com/user/sign_up", formData);
      setToken(response.token);
    }
    catch(error) {
        setError(error.response.data.error);
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
        <Text style={[styles.mainTitle, styles.centerText]}>Sign up</Text>
      </View>

      <View style={styles.inputForm}>
        <InputField setData={setEmail} placeholder="Email"/>
        <InputField setData={setUserName} placeholder="Username"/>
        <TextInput style={styles.multiLineInputField} onChangeText={(text) => {setDescription(text)}} placeholder="Description" multiline={true}/>
        <InputField setData={setPassword} placeholder="Password" password="true"/>
        <InputField setData={setConfirmPassword} placeholder="Confirm password" password="true"/>
      </View>

      <View>
        {error && <Text style={[styles.error, styles.centerText]}>{error}</Text>}
        <TouchableOpacity
            style={styles.mainCta}
            onPress={async () => {
              if (!(email && username &&description && password && confirmPassword)) {
                setError("Please fill in all information");
              }
              else if (password !== confirmPassword) {
                setError("Please make sure your passwords are matching");
              }
              else {
                handlePress();
                const userToken = null;
                setToken(userToken);
              }
            }}
          >
            <Text style={styles.centerText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={styles.altCta}>Already an account? Sign in</Text>
          </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView > 
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
  multiLineInputField: {
    borderWidth: 1,
    borderColor: "tomato",
    paddingVertical: 5,
    marginBottom: 20,
    height: 100,
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