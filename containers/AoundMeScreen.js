import { Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";

export default function AroundMe() {
    const [coords, setCoords] = useState();
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState()
    useEffect(() => {
        const askPermissionAndGetlocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status === "granted") {
                    const location = await Location.getCurrentPositionAsync();
                    const obj = {
                        // latitude: location.coords.latitude,
                        // longitude: location.coords.longitude
                        latitude: 48.8918031,
                        longitude: 2.3349172
                    };
                    setCoords(obj);
                    const response = await axios.get(`https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${coords.latitude}&longitude=${coords.longitude}`);
                    setData(response.data);
                }
                else {
                    setError(true);
                }
                setIsLoading(false);
            }
            catch(error) {
                console.log(error.message);
            }
        }
        askPermissionAndGetlocation();
    }, []);

    // const markers = data.map((marker, index) => {
    //     return ({
    //         id: index,
    //         latitude: marker.location.latitude,
    //         longitude: marker.location.longitude,
    //         title: marker.title
    //     })
    // });
    return isLoading? 
            <Text>En cours de chargement</Text>:
            error? 
                <Text>Permission refusée</Text>:
                <View>
                    <Text>
                        Latitude: {coords.latitude}
                        Longitude: {coords.longitude}
                    </Text>
                    {/* <MapView
                        style={styles.map}
                        initialRegion={{
                        latitude: 48.856614,
                        longitude: 2.3522219,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1
                        }}
                    >
                        {markers.map((marker) => {
                            return (
                                <MapView.Marker
                                    key={marker.id}
                                    coordinate={{
                                        latitude: marker.latitude,
                                        longitude: marker.longitude
                                      }}
                                    title={markerr.title}
                                />
                            )
                        }
                        )}
                    </MapView> */}
                </View>
}

const styles = StyleSheet.create({
    map: {
        width: "100%",
        height: 200,
      },
})