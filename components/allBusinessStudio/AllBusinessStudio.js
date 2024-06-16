import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../header/Header";
import { getYogaStudio } from "../../action/yogaStudio/yogaStudio";
import { useDispatch } from "react-redux";

const AllBusinessStudio = () => {
  const dispatch = useDispatch();
  const navigation=useNavigation();
  const [loading, setLoading] = useState(false);
  const [yogaStudio, setYogaStudio] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getYogaStudio());
        // console.log(res.data);
        setYogaStudio(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const renderYogaStudioItem = ({ item }) => (
    (
      <View
        style={{ borderBottomWidth: 1, borderBottomColor: "#ccc" }}
      >
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => handlePress(item.id)}
        >
          <Image source={{ uri: item.images[0].path }} style={styles.image} />
          <View style={styles.infoCard}>
            <Text style={styles.businessName}>{item.businessName}</Text>
            <Text style={styles.rating}>4.5 ★ 155 Ratings</Text>
            <Text
              style={styles.address}
            >{`${item.block_building}, ${item.street_colony}, ${item.pincode}`}</Text>
            <Text style={styles.details}>Meditation Classes</Text>
            <Text style={styles.openNow}>Open 24 Hrs</Text>
          </View>
        </TouchableOpacity>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[
            {
              key: "Call",
              imageSource: require("../../assets/studio/call.png"),
              buttonText: "Call",
            },
            {
              key: "WhatsApp",
              imageSource: require("../../assets/studio/chat.png"),
              buttonText: "WhatsApp",
            },
            {
              key: "Direction",
              imageSource: require("../../assets/studio/direction.png"),
              buttonText: "Direction",
            },
            {
              key: "Write Reviews",
              imageSource: require("../../assets/studio/star.png"),
              buttonText: "Write Reviews",
            },
            {
              key: "Share",
              imageSource: require("../../assets/studio/direction.png"),
              buttonText: "Share",
            },
          ]}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.buttonRow}>
              <View style={styles.button}>
                <Image
                  source={item.imageSource}
                  style={{ width: 20, height: 20, marginRight: 8 }}
                />
                <Text style={styles.buttonText}>{item.buttonText}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    )
  );

  const handlePress = (id) => {
    navigation.navigate("ParticularStudio", { id: id })
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ paddingTop: 15 }}>
        <Header
          title={"Yoga Studios"}
          icon={require("../../assets/back.png")}
        />
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
        >
          <FlatList
            data={yogaStudio}
            renderItem={renderYogaStudioItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  infoCard: {
    padding: 20,
  },
  businessName: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  rating: {
    fontSize: 16,
    color: "#555",
    fontFamily: "Poppins",
  },
  address: {
    fontSize: 14,
    color: "#777",
    fontFamily: "Poppins",
  },
  details: {
    fontSize: 14,
    color: "#777",
    fontFamily: "Poppins",
  },
  openNow: {
    fontSize: 14,
    color: "#777",
    marginBottom: 16,
    fontFamily: "Poppins",
  },
  buttonRow: {
    flexDirection: "row",
    marginRight: 10,
  },
  button: {
    backgroundColor: "rgba(102, 42, 178, 1)",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Poppins",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AllBusinessStudio;
