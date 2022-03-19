import { Text, View, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function FlatBlock({id, item}) {
    const navigation = useNavigation();
    //Best way to display star ratings based on number of reviews
    let stars = [];
    for (let i=0; i < item.ratingValue; i++) {
    stars.push(<FontAwesome key={i} name="star" size={24} color="#FFB621" />)
    };
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Room", { id: id })} style={styles.container}>
        <Image
          source={{uri: item.photos[0].url}}
          style={styles.image}
        />
        <Text style={styles.price}>{item.price} €</Text>
        <View style={styles.bottomPart}>
          <View>
            <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>{item.title}</Text>
            <View style={styles.ratings}>
              <Text>{stars}</Text>
              <Text style={styles.reviews}>{item.reviews} reviews</Text>
            </View>
          </View>
          <Image
            source={{uri: item.user.account.photo.url}}
            style={styles.avatar}
          />
        </View>
      </TouchableOpacity>
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
      height: 200,
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
      left: 20,
      top: 150,
    },
    bottomPart: {
      paddingVertical: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: "lightgrey",
    },
    title: {
      fontSize: 18,
      maxWidth: screenWidth - 105,
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
      height: 60,
      width: 60,
    }
  });