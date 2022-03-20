import { Text, StyleSheet, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import axios from "axios";
import MapView from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

export default function AroundMe() {
    const navigation = useNavigation();
    const [lat, setLat] = useState();
    const [long, setLong] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState()
    useEffect(() => {
        const askPermissionAndGetlocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status === "granted") {
                    const location = await Location.getCurrentPositionAsync();
                    setLat(location.coords.latitude);
                    setLong(location.coords.longitude)
                       if (lat && long) {
                        const response = await axios.get(`https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${lat}&longitude=${long}`);
                        setData(response.data);
                        setIsLoading(false);
                       }
                }
                else {
                    const response = await axios.get(`https://express-airbnb-api.herokuapp.com/rooms/around`);
                    setData(response.data);
                    setIsLoading(false);
                }
            }
            catch(error) {
                console.log(error.message);
            }
        }
        askPermissionAndGetlocation();
    }, [lat, long]);
    return isLoading? 
            <ActivityIndicator size="large" color="tomato" style={{ marginTop: 100 }} />:
            <MapView
                style={styles.map}
                initialRegion={{
                latitude: lat? lat : 48.856614,
                longitude: long? long : 2.3522219,
                latitude: 48.856614,
                longitude: 2.3522219,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2
                }}
            >
                {data.map((marker) => {
                    return (
                        <MapView.Marker
                            onPress={() => navigation.navigate("Room", { id: marker._id })} 
                            key={marker._id}
                            coordinate={{
                                latitude: marker.location[1],
                                longitude: marker.location[0]
                            }}
                        />
                    );
                })}
            </MapView>
}

const styles = StyleSheet.create({
    map: {
        height: "100%",
      },
})