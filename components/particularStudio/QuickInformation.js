import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
  BackHandler
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { getYogaStudioById } from "../../action/yogaStudio/yogaStudio";
import { useDispatch } from "react-redux";

const QuickInformation = ({ id }) => {
  const dispatch = useDispatch();
  const navigation=useNavigation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getYogaStudioById(id));
        console.log(res.data.contacts);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);


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

  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.contentContainer}>
              <Text style={styles.textHeading}>Contact</Text>
              <Text style={styles.text}>+91 {data?.contacts?.mobileNumber[0]}</Text>
              <View style={{ marginVertical: 5 }}>
                <Text style={styles.textHeading}>Business Hours</Text>
                <Text style={styles.text}>Open Now : Open 24 Hrs</Text>
              </View>
              <View style={{ marginVertical: 5 }}>
                <Text style={styles.textHeading}>Year of Establistment</Text>
                <Text style={styles.text}>2024</Text>
              </View>
            </View>
            <View style={{ marginVertical: 5 }}>
              <Text style={styles.textHeading}>Website</Text>
              <Text style={styles.text}>www.swastibharat.com</Text>
            </View>
            <Text style={styles.textHeading}>Social Media Presence</Text>
            <View style={{ flexDirection: "row",justifyContent:'space-around',marginBottom:20 }}>
              <View style={styles.socialText}>
              <FontAwesome name="facebook-square" size={24} color="blue" />
                <Text style={styles.text}>facebook</Text>
              </View>
                <View style={styles.socialText}>
                <FontAwesome name="twitter" size={24} color="lightblue" />
                <Text style={styles.text}>Twitter</Text>
              </View>
                 <View style={styles.socialText}>
                 <FontAwesome name="youtube-play" size={24} color="red" />
                <Text style={styles.text}>Youtube</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
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
    paddingHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    marginTop: 10,
  },
  textHeading: {
    fontFamily: "PoppinsBold",
    fontSize: hp(2),
    fontWeight: "500",
    marginVertical: 10,
    color: "#000",
  },
  text: {
    fontFamily: "Poppins",
    fontSize: 14,
    marginLeft:5
  },
  socialText: {
    fontFamily: "Poppins",
    fontSize: 14,
    padding: 10,
    borderWidth: 1,
    borderColor:'#f7f7f7',
    borderRadius: 5,
    flexDirection:'row'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default QuickInformation;
