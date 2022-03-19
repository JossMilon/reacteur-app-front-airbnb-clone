import { SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

//Importing components
import FlatBlock from "../components/FlatListBlock";
import RoomBlock from "../components/roomBlock";

export default function HomeScreen(props) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://express-airbnb-api.herokuapp.com/rooms/`);
        setData(response.data);
        setLoading(false);
      }
      catch(error) {
        console.log("Server isn't responding");
      }
    }
    fetchData();
  }, []);

  return loading? <ActivityIndicator size="large" color="tomato" style={{ marginTop: 100 }} />:
  (<SafeAreaView>
      <FlatList
        data = {data}
        keyExtractor = {(item) => {return item._id}}
        renderItem = {({item}) => {
          return(
            <FlatBlock id={item._id} item={item} />
        )
        }}
      />
    </SafeAreaView>
  );
};


