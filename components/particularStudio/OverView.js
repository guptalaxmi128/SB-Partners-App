import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome } from "@expo/vector-icons";
import { getYogaStudioById } from "../../action/yogaStudio/yogaStudio";
import { useDispatch } from "react-redux";
import Reviews from "./Reviews";
import QuickInformation from "./QuickInformation";
import Services from "./Services";


const Overview = ({ id }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getYogaStudioById(id));
        // console.log(res.data);
        setData(res.data);
        setBanner(res.data.images);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  const renderImageItem = ({ item }) => {
    return (
      <Image
        source={{ uri: item.path }}
        style={styles.image}
      />
    );
  };

  return (<>
    {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentContainer}>
          <Text style={styles.textHeading}>Address</Text>
          <Text style={styles.text}>
          {`${data.block_building}, ${data.street_colony}, ${data.pincode}`}
          </Text>
          <View style={styles.separator} />
          <Text style={styles.textHeading}>Photos</Text>
          <View style={styles.flatListContainer}>
            <FlatList
              data={banner}
              horizontal={true}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderImageItem}
            />
          </View>
          <Text style={styles.textHeading}>Quick Information</Text>
         <QuickInformation id={id} />
            <Reviews />
            <Text style={styles.textHeading}>Services</Text>
            <Services />
        </View>
      </ScrollView>
    </View>)}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
    // paddingHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    marginTop: 10,
 
  },
  textHeading: {
    fontFamily: "PoppinsBold",
    fontSize: hp(2.2),
    fontWeight: "500",
    marginVertical: 8,
    paddingHorizontal:20
  },
  text: {
    fontFamily: "Poppins",
    fontSize: 14,
    paddingHorizontal:20
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 10,
    paddingHorizontal:20
  },
  flatListContainer: {
    width: wp(100),
    marginTop: 10,
    marginRight: 10,
    marginBottom:20,
    paddingHorizontal:20
  },
  image: {
    width: wp(40),
    height: hp(20),
    borderRadius: 5,
    marginHorizontal: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

});

export default Overview;
