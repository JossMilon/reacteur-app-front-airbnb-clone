import { Text, View, ScrollView, StyleSheet, Dimensions, Image } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

export default function RoomBlock({data}) {
    let stars = [];
    for (let i=0; i < data.ratingValue; i++) {
    stars.push(<FontAwesome key={i} name="star" size={24} color="#FFB621" />)
    };
    return (
        <ScrollView>
            <Image
                source={{uri: data.photos[0].url}}
                style={styles.image}
            />
            <Text style={styles.price}>{data.price} €</Text>
            <View style={styles.description}>
                <View style={styles.upperDesc}>
                <View>
                    <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>{data.title}</Text>
                    <View style={styles.ratings}>
                    <Text>{stars}</Text>
                    <Text style={styles.reviews}>{data.reviews} reviews</Text>
                    </View>
                </View>
                <Image
                    source={{uri: data.user.account.photo.url}}
                    style={styles.avatar}
                />
                </View>
                <Text ellipsizeMode="tail" numberOfLines={3}>{data.description}</Text>
            </View>
        </ScrollView>
    )
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      marginVertical: 10,
      position: "relative",
    },
    image: {
      height: 300,
      width: "100%", 
    },
    price: {
      padding: 5,
      fontSize: 20,
      color: "white",
      backgroundColor: "black",
      textAlign: "center",
      width: 75,
      position: "absolute",
      left: 0,
      top: 240,
    },
    description: {
      padding: 20,
    },
    upperDesc: {
      paddingVertical: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontSize: 18,
      maxWidth: screenWidth - 140,
      marginBottom: 10,
    },
    ratings: {
      flexDirection: "row",
      alignItems: "center",
    },
    reviews: {
      marginLeft: 5,
      color: "grey",
    },
    avatar: {
      borderRadius: 50,
      height: 80,
      width: 80,
    },
  });