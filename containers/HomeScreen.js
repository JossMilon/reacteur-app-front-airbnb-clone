import { SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

//Importing components
import FlatBlock from "../components/FlatListBlock";
import RoomBlock from "../components/roomBlock";

export default function HomeScreen(props) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const existingParams = props.route.params;
  const url = existingParams? `https://express-airbnb-api.herokuapp.com/rooms/${existingParams.id}`:`https://express-airbnb-api.herokuapp.com/rooms/`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Im triggered with url " + url)
        const response = await axios.get(url);
        setData(response.data);
        setLoading(false);
      }
      catch(error) {
        console.log("Server isn't responding");
      }
    }
    fetchData();
  }, [url]);

  return loading? <ActivityIndicator size="large" color="tomato" style={{ marginTop: 100 }} />:
  ( 
    //If param, then go to room/:id else go to room
    existingParams? 
    <RoomBlock data={data}/>
    :
    <SafeAreaView>
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


