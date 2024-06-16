import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
  FlatList,
  StatusBar,
  BackHandler
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import filter from "lodash.filter";
import Header from "../header/Header";

const API_ENDPOINT = `https://randomuser.me/api/?results=30`;
const CourseDetails = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [fullData, setFullData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(fullData, (user) => {
      return contains(user, formattedQuery);
    });
    setData(filteredData);
  };

  const contains = ({ name }, query) => {
    const { first = "", last = "" } = name;
    const formattedQuery = query.toLowerCase();
    return first.toLowerCase().includes(formattedQuery) || last.toLowerCase().includes(formattedQuery);
  };
  
  useEffect(() => {
    const handleBackPress = () => {
      if (navigation.isFocused()) {
        // Check if the current screen is focused
        navigation.goBack(); // Go back if the current screen is focused
        return true; // Prevent default behavior (exiting the app)
      }
      return false; // If not focused, allow default behavior (exit the app)
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [navigation]);

  useEffect(() => {
    setLoading(true);
    fetchData(API_ENDPOINT);
  }, []);

  const fetchData = async (url) => {
    try {
      const res = await fetch(url);
      const json = await res.json();
      setData(json.results);
      console.log(json.results);

      setFullData(json.results);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color="#5500dc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>
          {" "}
          Error in fetching data... Please check your internet connection
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
     <StatusBar translucent backgroundColor="transparent" />
     <View style={{paddingTop:15}}>
      <Header
        title={"Course Details"}
        icon={require("../../assets/back.png")}
      />
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.imageContainer}></View>
          <View style={styles.container1}>
            <Text style={styles.text}>
              You can choose the date and time as per your specific Domain You
              can choose the date and time as per your specific Domain
            </Text>
            <Text style={styles.text}>View More...</Text>
          </View>
          <View style={styles.container1}>
            <View
            //   style={{
            //     flexDirection: "row",
            //     justifyContent: "space-between",
            //     alignItems: "center",
            //   }}
            >
              <TextInput
                style={styles.searchBox}
                clearButtonMode="always"
                placeholder="Search"
                autoCapitalize="none"
                autoCorrect={false}
                value={searchQuery}
                onChangeText={(query) => handleSearch(query)}
              />
              {/* <View style={styles.filterContainer}>
                <Image
                  style={styles.image}
                  source={require("../../assets/filter.png")}
                />
              </View> */}
            </View>
            <FlatList
              data={data}
              keyExtractor={(item) => item.login.username}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Image
                    source={{ uri: item.picture.thumbnail }}
                    style={styles.avatarImg}
                  />
                  <View>
                    <Text style={styles.textName}>
                      {item.name.first} {item.name.last}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    width: wp(90),
    height: hp(20),
    // flex: 1,
    borderRadius: 10,
    backgroundColor: "#dcdcdc",
  },
  container1: {
    marginVertical: 20,
  },
  text: {
    fontFamily: "Poppins",
    fontSize: hp(2),
  },
  image: {
    width: 20,
    height: 20,
  },
  searchBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    flex: 1,
  },
  filterContainer: {
    width: 40,
    height: 45,
    borderRadius: 8,
    backgroundColor: "rgba(249, 250, 251, 1)",
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    marginLeft: 10, // Add margin to separate the filter button
  },
  avatarImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textName: {
    fontFamily: "Poppins",
    fontSize: 16,
    marginLeft: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
});

export default CourseDetails;
