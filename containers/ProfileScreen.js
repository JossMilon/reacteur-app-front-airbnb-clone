// 622a44f5582238001840fa87
// OBQsB8wvlQfyfUSHO0znd2vpSziPNUvZIqo7khNgv36OdGXKgIPUUk5xnsn1tm06

import { Text, View, Image, TouchableOpacity, TextInput, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";


//Importing components
import InputField from "../components/InputField";
import { Avatar } from "react-native-paper";

export default function ProfileScreen({ userToken, userId, setToken, setId}) {
  // const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const updateProfile = async () => {
    try {
      const response = await axios.put(`https://express-airbnb-api.herokuapp.com/user/update`, {
        email: email,
        username: username,
        description: description
      },
      {headers: { Authorization: `Bearer ${userToken}` }});
      (response.status === 200) && alert("Profile modified");
    }
    catch(error) {
      console.log(error.message);
    }
  };
  const updatePicture = async () => {
    setUploading(true);
    try {
      const tabIm = image.split(".");
      const ext = tabIm[tabIm.length-1];
      console.log(tabIm[0]);
      const formData = new FormData();
      formData.append("photo", {
        uri: image,
        name: `avatar.${ext}`,
        type: `image/${ext}`
      });
      console.log(formData);
      console.log("trying to send data");
      const response = await axios.put(`https://express-airbnb-api.herokuapp.com/user/upload_picture`, 
                                  formData,
                                  {headers: { Authorization: `Bearer ${userToken}`}}
                                );

      console.log(response.data);
      (response.status === 200) && alert("Photo modified");
    }
    catch(error) {
      console.log("I failed")
      console.log(error.message)
      console.log(error.response.data.error);
    }
    setUploading(false);
  };
  useEffect(() => {
    const getUserInformation = async () => {
      const response = await axios.get(`https://express-airbnb-api.herokuapp.com/user/${userId}`,
      {headers: { Authorization: `Bearer ${userToken}` }});
      console.log(response.data.photo);
      setEmail(response.data.email);
      setUserName(response.data.username);
      setDescription(response.data.description);
      setImage(response.data.photo.url);
      setIsLoading(false);
    }
    getUserInformation();
  }, []);
  return isLoading? 
          <ActivityIndicator size="large" color="tomato" style={{ marginTop: 100 }} />:(
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.photoPart}>
              <View 
                style={styles.imageContainer}
              >
                {
                  uploading? 
                  <ActivityIndicator size="large" color="tomato" style={{ marginTop: 40 }} />:
                  <Image
                      source={image? {uri: image} : require("../assets/images/alf.png")}
                      style={styles.image}
                  />
                }
              </View>
              <View>
                <TouchableOpacity
                  onPress={async () => {
                    const cameraRollPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();
                    if (cameraRollPerm.status === "granted") {
                      const pickerResult = await ImagePicker.launchImageLibraryAsync({
                        allowsEditing: true,
                        aspect: [4, 3]
                      });
                      if (pickerResult.cancelled === false ) {
                        console.log(pickerResult.uri);
                        setImage(pickerResult.uri);
                      }
                      else {
                        console.log("No photo selected")
                      }
                    }
                  }}
                >
                  <Ionicons name="md-images-outline" size={40} color="tomato" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => {
                    const cameraPerm = await ImagePicker.requestCameraPermissionsAsync();
                    const cameraRollPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();
                    if (cameraPerm.status === "granted" && cameraRollPerm.status === "granted") {
                      const pickerResult = await ImagePicker.launchCameraAsync({
                        allowsEditing: true,
                        aspect: [4, 3]
                      });                  
                      if (pickerResult.cancelled === false) {
                        console.log(pickerResult.uri);
                        setImage(pickerResult.uri);
                      }
                      else {
                        console.log("Cancelled photo")
                      }
                    }
                  }}
                >
                  <Ionicons name="md-camera-outline" size={40} color="tomato" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputForm}>
              <InputField setData={setEmail} data={email} placeholder="Email"/>
              <InputField setData={setUserName} data={username} placeholder="Username"/>
              <TextInput style={styles.multiLineInputField} value={description} onChangeText={(text) => {setDescription(text)}} placeholder="Description" multiline={true}/>
            </View>
            <View>
              <TouchableOpacity
                onPress={updateProfile}
                style={styles.mainCta}
              >
              <Text style={styles.centerText}>Update info</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={updatePicture}
                style={styles.mainCta}
              >
              <Text style={styles.centerText}>Update photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.mainCta}
                onPress={() => {setToken(null), setId(null)}}
              >
              <Text style={styles.centerText}>Log out</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "space-between",
  },
  photoPart: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 120,
    height: 120,
    marginRight: 30,
    borderRadius: 100,
    borderColor: "tomato",
    borderWidth: 2,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
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
    marginTop: 20,
    width: 150,
  },
  centerText: {
    textAlign: "center",
  },
});
