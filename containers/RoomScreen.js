import { ActivityIndicator, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

import RoomBlock from "../components/roomBlock";

export default function RoomScreen({route}) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const existingParams = route.params.id;
    useEffect(() => {
      const fetchData = async () => {
        try {
          console.log(`https://express-airbnb-api.herokuapp.com/rooms/${existingParams}`)
          const response = await axios.get(`https://express-airbnb-api.herokuapp.com/rooms/${existingParams}`);
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
            <RoomBlock data={data}/>
        </SafeAreaView>
    )
};